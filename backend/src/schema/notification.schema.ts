import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    jsonb,
    index,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { notifyTypeEnum } from "./enums.schema";

// Bảng notifications: Lưu trữ hệ thống chuông báo cho người dùng (ví dụ: tiền về, rút tiền thành công).
export const notifications = pgTable(
    "notifications",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
        type: notifyTypeEnum("type").notNull(),
        title: varchar("title", { length: 255 }).notNull(),
        message: varchar("message", { length: 1000 }).notNull(),
        meta: jsonb("meta"),
        readAt: timestamp("read_at", { mode: "date" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => {
        return {
            userIdCreatedAtIdx: index("notification_user_created_idx").on(
                table.userId,
                table.createdAt,
            ),
            userIdReadAtIdx: index("notification_user_read_idx").on(
                table.userId,
                table.readAt,
            ),
        };
    },
);
