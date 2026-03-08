import { pgEnum } from "drizzle-orm/pg-core";

// Enum: Định nghĩa các hằng số phân quyền, trạng thái chung để tái sử dụng và kiểm soát dữ liệu chặt chẽ ở cấp DB.
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const userStatusEnum = pgEnum("user_status", ["active", "banned"]);
export const riskTierEnum = pgEnum("risk_tier", [
  "low",
  "medium",
  "high",
  "banned",
]);

export const ledgerTypeEnum = pgEnum("ledger_type", [
  "offer_pending",
  "offer_hold",
  "offer_release",
  "offer_reversal",
  "withdraw_request",
  "withdraw_approve",
  "withdraw_deny_refund",
  "admin_adjust",
  "referral_bonus",
]);

export const completionStatusEnum = pgEnum("completion_status", [
  "pending",
  "locked",
  "released",
  "reversed",
]);
export const postbackStatusEnum = pgEnum("postback_status", [
  "approved",
  "denied",
  "chargeback",
  "pending",
]);
export const withdrawMethodEnum = pgEnum("withdraw_method", [
  "crypto_ltc",
  "crypto_sol",
  "crypto_eth",
  "paypal",
  "visa_virtual",
  "ach",
  "gc_roblox",
  "gc_steam",
]);
export const withdrawStatusEnum = pgEnum("withdraw_status", [
  "pending",
  "approved",
  "paid",
  "denied_refunded",
]);
export const notifyTypeEnum = pgEnum("notify_type", [
  "offer_credit",
  "offer_chargeback",
  "withdraw_status",
  "admin_alert",
  "system",
]);

export const tokenTypeEnum = pgEnum("token_type", [
  "refresh",
  "verification-email",
  "reset-password",
  "forgot-password",
  "withdrawal",
  "verification-new-ip",
]);
