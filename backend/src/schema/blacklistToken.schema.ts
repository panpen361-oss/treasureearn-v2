import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { timestamps } from "./helper.schema";

// Bảng blacklist_token: Lưu trữ danh sách token đã bị thu hồi/đăng xuất trước thời hạn.
export const blacklistTokens = pgTable("blacklist_token", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  hashToken: varchar("hash_token").notNull(),
  expiredAt: timestamp("expired_at").defaultNow().notNull(),
  ...timestamps,
});
