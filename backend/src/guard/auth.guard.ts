import Elysia from "elysia";
import { jwtConfig } from "../configs/jwt.config";

export const authGuard = new Elysia()
  .use(jwtConfig)
  .derive(async ({ jwt, set, request }) => {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      set.status = 401;
      throw new Error("Unauthorized: Missing token");
    }

    const payload = await jwt.verify(token);

    if (!payload) {
      set.status = 401;
      throw new Error("Unauthorized: Invalid or expired token");
    }

    return {
      auth: {
        userId: payload.userId as string,
        role: payload.role as string,
      },
    };
  });
