import Elysia, { t } from "elysia";
import { jwtConfig } from "../configs/jwt.config";
import {
  login,
  logout,
  refresh,
  register,
  sendOtp,
  verify,
} from "../controllers/auth.controller";

export const publicAuth = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .post("/login", login, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 1 }),
    }),
  })
  .post("/register", register)
  .post("/verify", verify)
  .post("/send-otp", sendOtp);

export const protectedAuth = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .post("/logout", logout)
  .post("/refresh", refresh);
