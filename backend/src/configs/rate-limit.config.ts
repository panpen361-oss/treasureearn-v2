import { rateLimit } from "elysia-rate-limit";

export const rateLimitConfig = rateLimit({
  max: 100,
  errorResponse: new Response(
    JSON.stringify({ message: "Too many requests, chill guy" }),
    { status: 429 },
  ),
});

export default rateLimitConfig;
