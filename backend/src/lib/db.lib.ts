import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { logger_success, logger_error } from "../configs/consola.config";

if (!Bun.env.DATABASE_URL) {
  logger_error("DATABASE_URL is not defined");
  process.exit(1);
}

export async function connectWithRetry(
  retries = 5,
  delayMs = 2000,
): Promise<Client> {
  const client = new Client({
    connectionString: Bun.env.DATABASE_URL,
    ssl: Bun.env.NODE_ENV === "production",
  });

  for (let i = 1; i <= retries; i++) {
    try {
      await client.connect();
      logger_success(`DB connected (${i}/${retries})`);
      return client;
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
  throw new Error("Unreachable");
}

export const client = await connectWithRetry();
export const db = drizzle(client);
