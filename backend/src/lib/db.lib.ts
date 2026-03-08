import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { logger_success, logger_error } from "../configs/consola.config";

if (!Bun.env.DATABASE_URL) {
  logger_error("DATABASE_URL is not defined");
  process.exit(1);
}

const client = new Client({
  connectionString: Bun.env.DATABASE_URL,
  ssl: Bun.env.NODE_ENV === "production",
});

export async function connectDB(
  retries = 5,
  delayMs = 2000,
): Promise<void> {
  for (let i = 1; i <= retries; i++) {
    try {
      await client.connect();
      logger_success(`DB connected (attempt ${i}/${retries})`);
      return;
    } catch (err: unknown) {
      logger_error(`DB connection failed (${i}/${retries})`);

      if (i === retries) {
        if (err instanceof Error) {
          logger_error(err.message);
        } else {
          logger_error("Unknown database error");
        }
        process.exit(1);
      }

      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

import * as schema from "../schema";

export const db = drizzle(client, { schema });
