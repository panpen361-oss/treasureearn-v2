import swagger from "@elysiajs/swagger";
import { jwtConfig } from "./configs/jwt.config";
import rateLimitConfig from "./configs/rate-limit.config";
import { connectDB } from "./lib/db.lib";
import cors from "@elysiajs/cors";
import { corsConfig } from "./configs/cors.config";
import Elysia from "elysia";
import { protectedAuth, publicAuth } from "./routes/auth.route";
import { publicPostback } from "./routes/postback.route";
import { protectedOffer } from "./routes/offer.route";
import { authGuard } from "./guard/auth.guard";
import { startWorker } from "./workers/postback.worker";
import * as dotenv from "dotenv";
import path from "path";

async function bootstrap() {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
  const port = Bun.env.PORT || 3001;
  await connectDB();
  startWorker();

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
    .group("/api/v1", (app) =>
      app
        .use(publicAuth)
        .use(publicPostback)
        .use(authGuard)
        .use(protectedAuth)
        .use(protectedOffer),
    )
    .listen(port);

  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
  );
}

bootstrap();
