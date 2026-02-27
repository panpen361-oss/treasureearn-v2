import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    decimal,
    uniqueIndex,
    index,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { offerClickSessions } from "./offerClickSession.schema";
import { completionStatusEnum } from "./enums.schema";
import { timestamps } from "./helper.schema";

// Bảng offer_completions: Lịch sử hoàn thành offer của user, quản lý trạng thái pending/locked/released.
export const offerCompletions = pgTable(
    "offer_completions",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        clickId: varchar("click_id").references(() => offerClickSessions.clickId),
        provider: varchar("provider", { length: 100 }).notNull(),
        offerId: varchar("offer_id", { length: 255 }).notNull(),
        transactionId: varchar("transaction_id", { length: 255 }).notNull(),
        payout: decimal("payout", { precision: 16, scale: 4 }).notNull(),
        status: completionStatusEnum("status").notNull(),
        unlockAt: timestamp("unlock_at", { mode: "date" }),
        ...timestamps,
    },
    (table) => {
        return {
            providerTransactionUniqueIdx: uniqueIndex(
                "completion_provider_transaction_idx",
            ).on(table.provider, table.transactionId),
            statusUnlockAtIdx: index("completion_status_unlock_idx").on(
                table.status,
                table.unlockAt,
            ),
        };
    },
);
