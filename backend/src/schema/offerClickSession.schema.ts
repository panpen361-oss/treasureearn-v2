import { pgTable, uuid, varchar, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { timestamps } from "./helper.schema";

// Bảng offer_click_sessions: Ghi nhận lượt bấm vào offer, dùng để đối chiếu khi postback nổ về chống fake.
export const offerClickSessions = pgTable(
    "offer_click_sessions",
    {
        clickId: varchar("click_id", { length: 255 }).primaryKey(),
        userId: uuid("user_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        provider: varchar("provider", { length: 100 }).notNull(),
        offerId: varchar("offer_id", { length: 255 }).notNull(),
        ip: varchar("ip", { length: 45 }),
        userAgent: varchar("user_agent", { length: 500 }),
        deviceFingerprint: varchar("device_fingerprint", { length: 255 }),
        country: varchar("country", { length: 2 }),
        isCompleted: boolean("is_completed").default(false).notNull(),
        ...timestamps,
    },
    (table) => {
        return {
            userIdIdx: index("click_session_user_id_idx").on(
                table.userId,
                table.createdAt,
            ),
        };
    },
);
