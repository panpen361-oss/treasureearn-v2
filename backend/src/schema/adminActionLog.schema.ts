import { pgTable, uuid, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

// Bảng admin_action_logs: Nhật ký Audit Trail ghi lại mọi hành động nhạy cảm của Admin (Ban, Cấp tiền, Duyệt rút)
export const adminActionLogs = pgTable("admin_action_logs", {
    id: uuid("id").primaryKey().defaultRandom(),
    adminId: uuid("admin_id")
        .references(() => users.id)
        .notNull(),
    targetUserId: uuid("target_user_id").references(() => users.id),
    action: varchar("action", { length: 100 }).notNull(),
    reason: varchar("reason", { length: 500 }),
    metadata: jsonb("metadata"),
    ip: varchar("ip", { length: 45 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
