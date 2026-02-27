import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    jsonb,
    uniqueIndex,
} from "drizzle-orm/pg-core";
import { postbackStatusEnum } from "./enums.schema";

// Bảng postback_logs: Lưu trữ raw data từ các mạng quảng cáo gửi về (webhook), phục vụ chạy nền Worker và đối soát lỗi.
export const postbackLogs = pgTable(
    "postback_logs",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        provider: varchar("provider", { length: 100 }).notNull(),
        transactionId: varchar("transaction_id", { length: 255 }).notNull(),
        rawPayload: jsonb("raw_payload").notNull(),
        headers: jsonb("headers").notNull(),
        parsedStatus: postbackStatusEnum("parsed_status"),
        workerStatus: varchar("worker_status", { length: 50 }).notNull(),
        workerReason: varchar("worker_reason", { length: 500 }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => {
        return {
            providerTransactionUniqueIdx: uniqueIndex(
                "postback_provider_transaction_idx",
            ).on(table.provider, table.transactionId),
        };
    },
);
