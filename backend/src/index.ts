import swagger from "@elysiajs/swagger";
import { jwtConfig } from "./configs/jwt.config";
import rateLimitConfig from "./configs/rate-limit.config";
import { connectWithRetry } from "./lib/db.lib";
import cors from "@elysiajs/cors";
import { corsConfig } from "./configs/cors.config";
import Elysia from "elysia";
import { protectedAuth, publicAuth } from "./routes/auth.route";

async function bootstrap() {
  const port = Bun.env.PORT || 3000;
  await connectWithRetry();

  const app = new Elysia()
    .use(cors(corsConfig))
    .use(
      swagger({
        documentation: {
          info: {
            title: "TreasureEarn API",
            version: "1.0.0",
          },
        },
      }),
    )
    .use(rateLimitConfig)
    .use(jwtConfig)
    .group("/api/v1", (app) => app.use(publicAuth).use(protectedAuth))
    .listen(port);

  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
  );
}

bootstrap();
