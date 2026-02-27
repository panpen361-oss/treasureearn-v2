import {
  pgTable,
  uuid,
  varchar,
  decimal,
  integer,
  AnyPgColumn,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { withdrawMethodEnum, withdrawStatusEnum } from "./enums.schema";
import { timestamps } from "./helper.schema";

// Bảng withdrawals: Lưu trữ các lệnh rút tiền của User, trạng thái thanh toán và lưu vết các chỉ số gian lận tại thời điểm đặt lệnh.
export const withdrawals = pgTable(
  "withdrawals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    amount: decimal("amount", { precision: 16, scale: 4 }).notNull(),
    fee: decimal("fee", { precision: 16, scale: 4 }).notNull(),
    netAmount: decimal("net_amount", { precision: 16, scale: 4 }).notNull(),
    method: withdrawMethodEnum("method").notNull(),
    payoutAddress: varchar("payout_address", { length: 500 }).notNull(),
    status: withdrawStatusEnum("status").default("pending").notNull(),
    snapshotFraudScore: integer("snapshot_fraud_score").default(0),
    snapshotChargebackScore: integer("snapshot_chargeback_score").default(0),
    snapshotIp: varchar("snapshot_ip", { length: 45 }),
    adminId: uuid("admin_id").references((): AnyPgColumn => users.id),
    adminNote: varchar("admin_note", { length: 500 }),
    ...timestamps,
  },
  (table) => {
    return {
      statusCreatedAtIdx: index("withdrawal_status_created_idx").on(
        table.status,
        table.createdAt,
      ),
      userIdCreatedAtIdx: index("withdrawal_user_id_created_idx").on(
        table.userId,
        table.createdAt,
      ),
    };
  },
);
