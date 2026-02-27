import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { timestamps } from "./helper.schema";

// Bảng login_session: Ghi dấu thiết bị và IP đăng nhập để bảo mật và báo động đăng nhập lạ.
export const loginSessions = pgTable("login_session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ip: varchar("ip").notNull(),
  country: varchar("country").notNull(),
  city: varchar("city").notNull(),
  ...timestamps,
});
