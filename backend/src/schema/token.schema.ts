import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { tokenTypeEnum } from "./enums.schema";
import { timestamps } from "./helper.schema";

// Bảng tokens: Lưu trữ Refresh Token, OTP hoặc Token xác thực Email gắn với từng User.
export const tokens = pgTable("tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  hashToken: varchar("hash_token").notNull().unique(),
  type: tokenTypeEnum("type").default("refresh"),
  expiresAt: timestamp("expires_at").notNull(),
  ...timestamps,
});
