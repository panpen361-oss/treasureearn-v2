import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connectDB } from "./lib/db.lib";
import * as dotenv from "dotenv";
import path from "path";

async function runMigrations() {
    // Load .env.local if it exists (for local development)
    dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

    await connectDB();

    console.log("Running migrations...");

    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        console.log("Migrations applied successfully!");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        process.exit();
    }
}

runMigrations();
