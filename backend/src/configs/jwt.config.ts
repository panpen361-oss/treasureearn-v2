import { jwt } from "@elysiajs/jwt";
import { logger_error } from "./consola.config";

let jwtSecret: string;

if (!Bun.env.JWT_SECRET) {
  logger_error("JWT_SECRET is not defined");
  process.exit(1);
} else {
  jwtSecret = Bun.env.JWT_SECRET as string;
}

export const jwtConfig = jwt({
  name: "jwt",
  secret: jwtSecret,
});
