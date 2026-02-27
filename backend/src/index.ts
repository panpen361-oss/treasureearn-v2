import { Elysia } from "elysia";
import { connectWithRetry } from "./lib/db.lib";
import { corsConfig } from "./configs/cors.config";
import cors from "@elysiajs/cors";
import { jwtConfig } from "./configs/jwt.config";
import rateLimitConfig from "./configs/rate-limit.config";

await connectWithRetry();

const app = new Elysia()
  .use(cors(corsConfig))
  .use(rateLimitConfig)
  .use(jwtConfig)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
