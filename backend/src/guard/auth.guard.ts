import Elysia from "elysia";
import { jwtConfig } from "../configs/jwt.config";

export const authGuard = new Elysia().use(jwtConfig).derive(({ jwt, set }) => {
  const payload = jwt.verify();

  if (!payload) {
    set.status = 401;
    throw new Error("Unauthorized");
  }

  return {
    user: payload,
  };
});
