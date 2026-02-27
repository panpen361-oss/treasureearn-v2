import { pgTable, uuid, varchar, decimal, index } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { ledgerTypeEnum } from "./enums.schema";
import { timestamps } from "./helper.schema";

// Bảng ledger: Lưu vết mọi biến động số dư một cách bất biến (Immutable) chống gian lận
export const ledger = pgTable(
    "ledger",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        type: ledgerTypeEnum("type").notNull(),
        deltaAvailable: decimal("delta_available", { precision: 16, scale: 4 })
            .default("0")
            .notNull(),
        deltaPending: decimal("delta_pending", { precision: 16, scale: 4 })
            .default("0")
            .notNull(),
        deltaLocked: decimal("delta_locked", { precision: 16, scale: 4 })
            .default("0")
            .notNull(),
        idempotencyKey: varchar("idempotency_key", { length: 255 })
            .notNull()
            .unique(),
        referenceId: uuid("reference_id"),
        description: varchar("description", { length: 500 }).notNull(),
        ...timestamps,
    },
    (table) => {
        return {
            userIdIdx: index("ledger_user_id_idx").on(table.userId, table.createdAt),
        };
    },
);
