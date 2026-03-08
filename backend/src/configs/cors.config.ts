import { CORSConfig } from "@elysiajs/cors";

const devOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

const prodOrigins = [
  "https://treasureearn.com",
  "https://app.treasureearn.com",
];

export const corsConfig: CORSConfig = {
  origin: Bun.env.NODE_ENV === "production" ? prodOrigins : devOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600,
};
