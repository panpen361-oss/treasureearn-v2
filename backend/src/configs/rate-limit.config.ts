import { rateLimit } from "elysia-rate-limit";

// Global rate limit — general API protection
export const rateLimitConfig = rateLimit({
  max: 100,
  duration: 60_000,
  generator: (req, server) => {
    return (
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      server?.requestIP(req)?.address ??
      "unknown"
    );
  },
  errorResponse: new Response(
    JSON.stringify({ success: false, error: { code: "429", message: "Too many requests. Please try again later." } }),
    { status: 429, headers: { "Content-Type": "application/json" } },
  ),
});

// Strict rate limit for auth endpoints (login, register, verify)
export const authRateLimitConfig = rateLimit({
  max: 5,
  duration: 60_000,
  generator: (req, server) => {
    return (
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      server?.requestIP(req)?.address ??
      "unknown"
    );
  },
  errorResponse: new Response(
    JSON.stringify({ success: false, error: { code: "429", message: "Too many attempts. Please wait a minute." } }),
    { status: 429, headers: { "Content-Type": "application/json" } },
  ),
});

// Extra strict rate limit for OTP/email sending
export const otpRateLimitConfig = rateLimit({
  max: 3,
  duration: 60_000,
  generator: (req, server) => {
    return (
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      server?.requestIP(req)?.address ??
      "unknown"
    );
  },
  errorResponse: new Response(
    JSON.stringify({ success: false, error: { code: "429", message: "Too many requests. Please wait before requesting again." } }),
    { status: 429, headers: { "Content-Type": "application/json" } },
  ),
});

export default rateLimitConfig;
