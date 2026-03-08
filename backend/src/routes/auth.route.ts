import Elysia, { t } from "elysia";
import { jwtConfig } from "../configs/jwt.config";
import { authRateLimitConfig, otpRateLimitConfig } from "../configs/rate-limit.config";
import {
  login,
  logout,
  refresh,
  register,
  sendOtp,
  verify,
  verifyIp,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { authGuard } from "../guard/auth.guard";

export const publicAuth = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .use(authRateLimitConfig)
  .post("/login", login, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 1 }),
    }),
  })
  .post("/register", register, {
    body: t.Object({
      email: t.String({ format: "email" }),
      username: t.String({ minLength: 3, maxLength: 100 }),
      password: t.String({ minLength: 8 }),
      confirmPassword: t.String({ minLength: 8 }),
      referralCode: t.Optional(t.String()),
    }),
  })
  .post("/verify", verify, {
    body: t.Object({
      token: t.String({ minLength: 1 }),
    }),
  })
  .post("/verify-ip", verifyIp, {
    body: t.Object({
      token: t.String({ minLength: 1 }),
    }),
  })
  .use(otpRateLimitConfig)
  .post("/send-otp", sendOtp, {
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  })
  .post("/forgot-password", forgotPassword, {
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  })
  .post("/reset-password", resetPassword, {
    body: t.Object({
      token: t.String({ minLength: 1 }),
      password: t.String({ minLength: 8 }),
    }),
  })
  .post("/refresh", refresh)
  .post("/logout", logout);

export const protectedAuth = new Elysia({ prefix: "/auth" })
  .use(authGuard)
  .get("/me", getMe);
