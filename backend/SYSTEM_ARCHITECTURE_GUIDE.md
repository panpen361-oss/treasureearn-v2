# TREASUREEARN - USE CASES & BACKEND WORKFLOWS

Tài liệu này dịch Master Spec của dự án TreasureEarn (Get-Paid-To) thành các Use Cases và luồng xử lý (Workflow) chi tiết dành cho Backend Developer xây dựng API.

---

## 1. UC1: Bắt đầu làm nhiệm vụ (Start Offer)

**Tác nhân:** User
**Mục tiêu:** Ghi nhận lượt nhấp hợp lệ để chuẩn bị đối chiếu kết quả khi mạng quảng cáo trả thưởng.

### Luồng xử lý (Flow):
1. User bấm nút "Start Offer" trên UI đối với một nhiệm vụ cụ thể.
2. Frontend gọi API: `POST /api/offers/start` gửi kèm `provider` (VD: Torox) và `offerId`.
3. Backend tiếp nhận request:
   - Dùng middleware lấy IP, UserAgent, và check thông số Device (Device fingerprinting cơ bản).
   - Kiểm tra xem User này có đang bị Ban không?
4. Tạo record mới trong bảng `offer_click_sessions`:
   - Sinh ra một `clickId` ngẫu nhiên (UUID).
   - Gắn IP, User-Agent, Country, `provider`, `offerId`, `userId` vào.
5. Backend trả về URL điều hướng (Tracking URL của Provider):
   - Móc nối URL gốc cộng thêm tham số click của user. 
   - *Ví dụ:* `https://torox.com/api?offer=123&subid={clickId_vừa_tạo}`
6. Frontend tự động Redirect User sang trang nhiệm vụ của Torox.

---

## 2. UC2: Nhận tín hiệu trả thưởng từ Mạng quảng cáo (Postback Webhook)

**Tác nhân:** Offerwall Provider (Mạng quảng cáo như RevU, Torox)
**Mục tiêu:** Hứng thông báo hoàn thành nhiệm vụ và đưa vào hàng chờ xử lý để tránh sập luồng.

### Luồng xử lý (Flow):
1. Provider gọi API Webhook: `GET/POST /api/postback/{provider}` (Tùy mạng hỗ trợ GET hoặc POST).
2. Backend tiếp nhận:
   - **Xác thực (Verify):** Check IP Allowlist (nếu có). Check Hash Secret/Signature đính kèm để chống Fake Request.
   - Bóc tách lấy `transactionId` (số biên lai của Provider) và Raw Payload.
3. Backend Insert ngay lập tức vào bảng `postback_logs`:
   - Trạng thái `workerStatus: queued`.
   - Báo lỗi ngay `HTTP 400 Duplicate` hoặc bỏ qua nếu Database quăng lỗi trùng `transactionId` + `provider` (Sử dụng lệnh Upsert `ON CONFLICT DO NOTHING`).
4. Trả về `HTTP 200 OK` cho Provider. (Không xử lý cộng tiền ở API này).
5. Đẩy tín hiệu (Enqueue) vào Background Job / Worker để xử lý vạch đệm.

---

## 3. UC3: Xử lý cộng thưởng Nhiệm vụ (Postback Worker) 

**Tác nhân:** Worker/Cronjob Background
**Mục tiêu:** Xử lý các Webhook đang `queued`, tính toán rủi ro và cộng tiền vào Sổ cái (Ledger).

### Luồng xử lý (Flow):
1. Worker duyệt các `postback_logs` có trạng thái: `queued`.
2. Kiểm tra `clickId` (subid) có khớp với bảng `offer_click_sessions` không?
   - **NẾU KHÔNG KHỚP** -> Cộng Fraud Score cho User, chuyển `postback_logs.workerStatus = ignored`, Dừng.
3. Tính toán Hold Policy dựa vào giá trị trả thưởng (`payout`):
   - Check Rules: <$10 hold 1 ngày, >$50 hold 25 ngày... Xác định `unlockAt`.
4. Mở DB Transaction (Khóa chéo chống ghi đè):
   - Đổi `offer_click_sessions.isCompleted = true`.
   - Insert vào `offer_completions` (Lịch sử làm nhiệm vụ).
   - Dựa vào Hold Policy:
     - Nếu phải Hold: Insert bảng `ledger` (`type: offer_hold`, `deltaPending = payout`). Tính ngược lại cho `users.pendingBalance`.
     - Nếu không phải Hold: Insert bảng `ledger` (`type: offer_release`, `deltaAvailable = payout`). Tính ngược vào `users.availableBalance`.
5. Đổi `postback_logs.workerStatus = processed`.
6. Insert bảng `notifications` (Push báo User đã cộng tiền).

---

## 4. UC4: Mở khóa tiền bị giam (Release Hold Money)

**Tác nhân:** Worker/Cronjob Background (Chạy mỗi 1 giờ)
**Mục tiêu:** Kiểm kê tiền đã hết hạn Hold, chuyển từ `Pending` sang `Available` để User được quyền rút.

### Luồng xử lý (Flow):
1. Worker quét bảng `offer_completions` đếm tìm các record có: `status = locked` VÀ `unlockAt <= NOW()`.
2. Duyệt qua từng record, Mở DB Transaction:
   - Ghi vào bảng `ledger`:
     - `type: offer_release`
     - `deltaPending: -payout` (Trừ tiền Pending)
     - `deltaAvailable: +payout` (Cộng tiền thực Available)
     - `idempotencyKey: release_{offer_completion_id}` (Chống cộng 2 lần)
   - Quét cập nhật lại số dư ví ở `users.balances`.
   - Update `offer_completions.status = released`.
3. Ghi `notifications`: "Your $x for Offer Y has been unlocked!".

---

## 5. UC5: Xử lý yêu cầu Rút Tiền (Withdraw Request)

**Tác nhân:** User
**Mục tiêu:** Kiểm tra điều kiện ngặt nghèo trước khi cho phép User rút tiền và đóng băng số tiền chờ duyệt.

### Luồng xử lý (Flow):
1. User bấm lệnh rút tiền (VD: $10 PayPal) tại UI `/cashout`.
2. Frontend gọi API: `POST /api/withdrawals`.
3. Backend tiếp nhận và kiểm tra điều kiện (Risk Gates):
   - Bắt buộc phải `emailVerified == true`.
   - `available_balance >= amount`.
   - `fraud_score <= 35%`.
   - Limit: Check hôm nay đã quá 5 lượt rút chưa? Rút lần đầu có đạt min $10 không?
4. Tính toán Fee rút: (VD: Fee 1%). -> Khấu trừ User `$10`, nhưng thực trả (`netAmount`) xuống sàn là `$9.9`.
5. Mở DB Transaction:
   - Trừ tiền thật User: Insert `ledger` (`type: withdraw_request`, `deltaAvailable: -amount`, `deltaLocked: +amount`). (Đẩy tiền vào hòm sắt Locked chờ Admin xét).
   - Tính toán Balance gộp lưu vào `users.balances`.
   - Insert bảng `withdrawals` (`status: pending`, sao lưu thông số rủi ro Fraud Score, IP hiện tại lúc rút).
6. Ghi `notifications` báo Admin có lệnh rút cần duyệt.

---

## 6. UC6: Duyệt lệnh Rút Tiền (Admin Moderation)

**Tác nhân:** Admin
**Mục tiêu:** Phê duyệt tiền chuyển khoản ra ngoài, hoặc từ chối và hoàn trả vào ví User.

### Luồng xử lý (Flow):
1. Admin xem danh sách rút tiền (Các tham số Fraud/Chargeback đỏ đen sẽ hiển thị cảnh báo luôn).
2. Quyết định: APPROVE hoặc DENY.
3. Nếu **APPROVE** (Đồng ý thanh toán):
   - Mở DB Transaction.
   - Insert `ledger` (`type: withdraw_approve`, `deltaLocked: -amount`). Mục tiêu là trừ mất sạch số tiền trong Locked, và cập nhật tăng số `lifetimeWithdrawn` của User.
   - Update `withdrawals.status = paid`.
   - Insert `admin_action_logs` ghi vết ông admin nào mới duyệt.
4. Nếu **DENY** (Khóa, Refund):
   - Mở DB Transaction.
   - Insert `ledger` (`type: withdraw_deny_refund`, `deltaLocked: -amount`, `deltaAvailable: +amount`). Trả số tiền từ hòm sắt Locked về cho User bấm Rút cái khác.
   - Update `withdrawals.status = denied_refunded`.
5. Thông báo qua `notifications` báo tin vui/buồn cho User.

---

## 7. UC7: Cập nhật Rủi ro Thu hồi tiền (Chargeback Reversal)

**Tác nhân:** Mạng quảng cáo (Postback)
**Mục tiêu:** Xử lý việc nhà cung cấp phát hiện User dùng xảo trá và tự động đòi lại tiền đã trả trên hệ thống mình.

### Luồng xử lý (Flow):
1. Provider gọi API Webhook gửi tín hiệu `status: chargeback`.
2. Worker tiếp nhận, tìm đúng ID nhiệm vụ trong `offer_completions`.
3. Mở DB Transaction xử lý ÂM TIỀN:
   - Rơi vào trường hợp tiền vẫn đang Hold (Nằm trong Pending): 
     - Insert `ledger` trừ số Pending đó đi. Update `offer_completions` thành `reversed`. Khỏa lấp êm đẹp.
   - Rơi vào trường hợp tiền đã Release (Nằm trong Available) và User đã rút rồi: 
     - Insert `ledger`: Trừ thẳng `availableBalance` khiến tài khoản người dùng về số ÂM.
   - **QUAN TRỌNG:** Cộng một lượng điểm Phạt lớn vào `users.chargebackScore` và điều chỉnh tự động `riskTier = high`.
4. Nếu điểm `chargebackScore > 15%`, lập tức treo tài khoản (`status = banned`) và vứt thông báo sang Notification cho Admin xử lý.

## 8. UC8: Quét Gian Lận & Cảnh Báo Sớm (Fraud Score Engine)

**Tác nhân:** Hệ thống / Background Job
**Mục tiêu:** Tính toán điểm rủi ro liên tục trên mỗi hành động của User để có cơ sở tự động khóa tài khoản trước khi bị bòn rút tiền thật.

### Luồng xử lý (Flow):
1. Mỗi khi User có hành động nhạy cảm (Đăng nhập, Mở Click Session, Nhận Postback, Đặt lệnh Rút tiền):
   - Đẩy Event ngầm vào hệ thống Risk Engine.
2. Kiểm tra tín hiệu:
   - **Signal 1:** `IP/Device Mismatch`: Lần trước làm nhiệm vụ bằng IP VN, nay ấn rút tiền bằng IP Mỹ -> Cộng `+20` Fraud Score.
   - **Signal 2:** `Burst Completions`: Trong vòng 5 phút làm xong 5 cái "Survey 30 phút" -> Cộng `+30` Fraud Score. 
   - **Signal 3:** `VPN/Proxy Detection`: Sử dụng hàm check từ thư viện hoặc API bên thừ 3. Nếu là IP rác -> Cộng `+50` Fraud Score.
   - **Signal 4:** Tỷ lệ Chargeback trong vòng 30 ngày qua (Check bảng `offer_completions`). Nếu cao bất thường -> Tăng `chargebackScore`.
3. Ghi điểm vào `users.fraudScore` và `users.chargebackScore`.
4. Kích hoạt Actions tự động (Auto-flag):
   - Nếu `fraudScore > 35`: Update `users.riskTier = high`. 
   - Đóng băng nút Rút Tiền ở Frontend. Đẩy notification yêu cầu KYC (Tải Căn Cước/Xác Minh Danh Tính).
   - Nếu `chargebackScore > 15`: Cảnh báo đỏ. Bắt buộc Admin can thiệp. Mọi tiền cộng vào tương lai sẽ tự động bị `Hold`.

---

## 9. UC9: Hệ Thống Thông Báo (Notifications Engine)

**Tác nhân:** User & Admin
**Mục tiêu:** Cập nhật trạng thái thời gian thực qua biểu tượng Chuông ở header để nhắc nhở người dùng tương tác, và cảnh báo Admin về sự kiện khẩn cấp.

### Luồng xử lý (Flow):
**A. Tạo thông báo (Backend):**
1. Từ các Use Cases trên (Postback Worker, Withdraw System), Backend gọi hàm tiện ích: `createNotification(userId, type, message, meta)`.
2. Insert vào bảng `notifications`. (Nếu `userId = null` thì Broadcast cho toàn bộ hệ thống hoặc Admin).
*(Gợi ý Dev: Nếu mảng này phình to, cân nhắc tích hợp Redis / Websocket (Socket.io) để bắn Real-time đến Fontend thay vì bắt Frontend fetch liên tục).*

**B. Đọc thông báo (Frontend):**
1. User đăng nhập -> Frontend gọi `GET /api/notifications/unread`. Hiển thị chấm báo đỏ trên UI.
2. Bấm vào Dropdown -> Fetch `GET /api/notifications` (phân trang).
3. Ấn nút "Mark all as read" -> Backend gọi `UPDATE notifications SET readAt = NOW() WHERE userId = ? AND readAt IS NULL`.

---

## 10. UC10: Quản Lý Bài Viết (Lite CMS Blog)

**Tác nhân:** Admin
**Mục tiêu:** Tạo Content Marketing & SEO để kéo Traffic tự nhiên về cho website.

### Luồng xử lý (Flow):
1. Xây dựng bộ API cơ bản CRUD (Create, Read, Update, Delete) cho bảng `posts` (cần tạo thêm bảng nếu làm tính năng này).
   - Gồm các field: `title`, `slug`, `content_md` (Markdown), `thumbnail`, `status: draft | published`, `publishedAt`.
2. Admin vào UI tạo bài viết -> Gọi API Create/Update -> Ghi vào Database. 
   - Phải tự động format SEO slug hợp lệ: Tên bài "Cách kiếm thẻ Roblox" -> slug: `cach-kiem-the-roblox`.
3. Frontend (Trang Blog ngoài public) -> Fetch `GET /api/posts?status=published` (Cho phép Phân trang + Sort theo publishedAt).
   - *Gợi ý cho Next.js Developer:* Tận dụng cơ chế `Static Site Generation (SSG)` hoặc `Incremental Static Regeneration (ISR)` của Next.js khi fetch bài viết để lên Top Google nhanh nhất, tiết kiệm số lần query Database.
