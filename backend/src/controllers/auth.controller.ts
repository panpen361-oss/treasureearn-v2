import { eq } from "drizzle-orm";
import { db } from "../lib/db.lib";
import { users, tokens, loginSessions } from "../schema";
import { fail, ok } from "../dtos/response.dto";
import { comparePassword, hashToken } from "../lib/hash.lib";
import { geoFromIp } from "../utils/lookup.util";

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60;
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60;

export const login = async ({
  body,
  jwt,
  set,
  cookie,
  server,
  request,
}: {
  body: { email: string; password: string };
  jwt: any;
  set: any;
  cookie: any;
  server: any;
  request: Request;
}) => {
  const { email, password } = body;

  if (!email || !password) {
    set.status = 400;
    return fail("400", "Email and password are required");
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    server?.requestIP(request)?.address ??
    "127.0.0.1";

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

  const ipPosition = await geoFromIp(ip);

  const [loginSession] = await db
    .select()
    .from(loginSessions)
    .where(eq(loginSessions.userId, user.id))
    .limit(1);

  if (loginSession) {
    if (
      ipPosition?.city !== loginSession.city ||
      ipPosition?.country !== loginSession.country
    ) {
      // TODO: Send confirmation email to user for new location verification
      set.status = 403;
      return fail(
        "403",
        "New login location detected. Please check your email to confirm.",
      );
    }
  } else {
    await db.insert(loginSessions).values({
      userId: user.id,
      ip,
      country: ipPosition?.country ?? "Unknown",
      city: ipPosition?.city ?? "Unknown",
    });
  }

  const accessToken = await jwt.sign({
    userId: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = await jwt.sign({
    userId: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRES_IN,
  });

  await db.insert(tokens).values({
    userId: user.id,
    hashToken: hashToken(refreshToken),
    type: "refresh",
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
  });

  cookie.refreshToken.set({
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
  });

  const { hashedPassword: _, ...safeUser } = user;

  return ok({
    accessToken,
    user: safeUser,
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
