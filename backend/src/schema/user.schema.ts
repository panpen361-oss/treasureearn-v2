import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    decimal,
    integer,
    AnyPgColumn,
} from "drizzle-orm/pg-core";
import { roleEnum, userStatusEnum, riskTierEnum } from "./enums.schema";
import { timestamps } from "./helper.schema";

// Bảng users: Lưu thông tin tài khoản, phân quyền, trạng thái và tổng hợp số dư ví tự động từ ledger.
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    role: roleEnum("role").default("user").notNull(),
    status: userStatusEnum("status").default("active").notNull(),
    emailVerifiedAt: timestamp("email_verified_at", { mode: "date" }),
    referralCode: varchar("referral_code", { length: 20 }).unique(),
    referredBy: uuid("referred_by").references((): AnyPgColumn => users.id),
    availableBalance: decimal("available_balance", { precision: 16, scale: 4 })
        .default("0")
        .notNull(),
    pendingBalance: decimal("pending_balance", { precision: 16, scale: 4 })
        .default("0")
        .notNull(),
    lockedBalance: decimal("locked_balance", { precision: 16, scale: 4 })
        .default("0")
        .notNull(),
    lifetimeEarned: decimal("lifetime_earned", { precision: 16, scale: 4 })
        .default("0")
        .notNull(),
    lifetimeWithdrawn: decimal("lifetime_withdrawn", { precision: 16, scale: 4 })
        .default("0")
        .notNull(),
    riskTier: riskTierEnum("risk_tier").default("low").notNull(),
    fraudScore: integer("fraud_score").default(0).notNull(),
    chargebackScore: integer("chargeback_score").default(0).notNull(),
    ...timestamps,
});
