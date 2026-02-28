import { eq } from "drizzle-orm";
import { db } from "../lib/db.lib";
import { users, tokens } from "../schema";
import { fail, ok } from "../dtos/response.dto";
import { comparePassword, hashToken } from "../lib/hash.lib";

interface LoginRequest {
  email: string;
  password: string;
}

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60;
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60;

export const login = async ({
  body,
  jwt,
  set,
  cookie,
}: {
  body: LoginRequest;
  jwt: any;
  set: any;
  cookie: any;
}) => {
  const { email, password } = body;

  if (!email || !password) {
    set.status = 400;
    return fail("400", "Email and password are required");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    set.status = 400;
    return fail("400", "Email not found");
  }

  const isPasswordValid = await comparePassword(password, user.hashedPassword);

  if (!isPasswordValid) {
    set.status = 400;
    return fail("400", "Password is incorrect");
  }

  const accessToken = await jwt.sign({
    sub: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = await jwt.sign({
    sub: user.id,
    type: "refresh",
    exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRES_IN,
  });

  const hashedRefreshToken = hashToken(refreshToken);
  await db.insert(tokens).values({
    userId: user.id,
    hashToken: hashedRefreshToken,
    type: "refresh",
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
  });

  cookie.refreshToken.set({
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_EXPIRES_IN,
    path: "/auth/refresh",
  });

  const { hashedPassword: _, ...safeUser } = user;

  return ok({
    user: safeUser,
    accessToken: accessToken,
  });
};

export const register = () => {
  return "register";
};

export const logout = () => {
  return "logout";
};

export const verify = () => {
  return "verify";
};

export const sendOtp = () => {
  return "sendOtp";
};

export const refresh = () => {
  return "refresh";
};
