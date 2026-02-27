import { timestamp } from "drizzle-orm/pg-core";

// Helper: Tái sử dụng block createdAt và updatedAt cho mọi bảng để code chuẩn DRY.
export const timestamps = {
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
};
