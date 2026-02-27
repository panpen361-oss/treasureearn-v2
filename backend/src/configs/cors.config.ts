import { CORSConfig } from "@elysiajs/cors";

export const corsConfig: CORSConfig = {
  origin: ["https://treasureearn.com", "https://app.treasureearn.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600,
};
