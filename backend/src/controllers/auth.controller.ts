import { eq, and, or } from "drizzle-orm";
import { db } from "../lib/db.lib";
import { users, tokens, loginSessions, blacklistTokens } from "../schema";
import { fail, ok } from "../dtos/response.dto";
import { comparePassword, hashPassword, hashToken } from "../lib/hash.lib";
import { geoFromIp } from "../utils/lookup.util";
import {
  sendVerificationEmail,
  sendVerificationNewIPAddressEmail,
  sendResetPasswordEmail,
} from "../utils/email.util";

const ACCESS_TOKEN_EXPIRES_IN = 15 * 60;
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60;
const VERIFY_IP_TOKEN_EXPIRES_IN = 15 * 60;
const VERIFY_EMAIL_TOKEN_EXPIRES_IN = 24 * 60 * 60; // 24 hours
const RESET_PASSWORD_TOKEN_EXPIRES_IN = 1 * 60 * 60; // 1 hour

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

  if (!user.emailVerifiedAt) {
    set.status = 403;
    return fail("403", "Please verify your email before logging in.");
  }

  const ipPosition = await geoFromIp(ip);
  const currentCity = ipPosition?.city ?? "Unknown";
  const currentCountry = ipPosition?.country ?? "Unknown";

  const userSessions = await db
    .select()
    .from(loginSessions)
    .where(eq(loginSessions.userId, user.id));

  if (userSessions.length > 0) {
    const isTrustedLocation = userSessions.some(
      (session) =>
        session.city === currentCity && session.country === currentCountry,
    );

    if (!isTrustedLocation) {
      const rawToken = crypto.randomUUID();
      const hashedVerifyToken = hashToken(rawToken);

      await db.insert(tokens).values({
        userId: user.id,
        hashToken: hashedVerifyToken,
        type: "verification-new-ip",
        expiresAt: new Date(Date.now() + VERIFY_IP_TOKEN_EXPIRES_IN * 1000),
      });

      await sendVerificationNewIPAddressEmail(
        rawToken,
        user.username,
        user.email,
      );

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

export const register = async ({
  body,
  set,
}: {
  body: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    referralCode?: string;
  };
  set: any;
}) => {
  const { email, username, password, confirmPassword, referralCode } = body;

  if (password !== confirmPassword) {
    set.status = 400;
    return fail("400", "Passwords do not match");
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, email), eq(users.username, username)))
    .limit(1);

  if (existingUser) {
    set.status = 409;
    if (existingUser.email === email) {
      return fail("409", "Email already registered");
    }
    return fail("409", "Username already taken");
  }

  let referredByUserId: string | null = null;
  if (referralCode) {
    const [referrer] = await db
      .select()
      .from(users)
      .where(eq(users.referralCode, referralCode))
      .limit(1);

    if (!referrer) {
      set.status = 400;
      return fail("400", "Invalid referral code");
    }
    referredByUserId = referrer.id;
  }

  let newReferralCode = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    const candidate = crypto.randomUUID().slice(0, 8).toUpperCase();
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.referralCode, candidate))
      .limit(1);
    if (!existing) {
      newReferralCode = candidate;
      break;
    }
  }
  if (!newReferralCode) {
    set.status = 500;
    return fail("500", "Failed to generate referral code. Please try again.");
  }

  const hashedPw = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      username,
      hashedPassword: hashedPw,
      referralCode: newReferralCode,
      referredBy: referredByUserId,
    })
    .returning();

  const rawToken = crypto.randomUUID();
  const hashedVerifyToken = hashToken(rawToken);

  await db.insert(tokens).values({
    userId: newUser.id,
    hashToken: hashedVerifyToken,
    type: "verification-email",
    expiresAt: new Date(Date.now() + VERIFY_EMAIL_TOKEN_EXPIRES_IN * 1000),
  });

  await sendVerificationEmail(rawToken, newUser.username, newUser.email);

  const { hashedPassword: _, ...safeUser } = newUser;

  set.status = 201;
  return ok({
    message:
      "Registration successful. Please check your email to verify your account.",
    user: safeUser,
  });
};

export const logout = async ({ cookie, set }: { cookie: any; set: any }) => {
  const refreshTokenValue = cookie.refreshToken?.value;

  if (!refreshTokenValue) {
    set.status = 400;
    return fail("400", "No refresh token provided");
  }

  const hashedRefresh = hashToken(refreshTokenValue);

  const [tokenRecord] = await db
    .select()
    .from(tokens)
    .where(and(eq(tokens.hashToken, hashedRefresh), eq(tokens.type, "refresh")))
    .limit(1);

  if (tokenRecord) {
    await db.insert(blacklistTokens).values({
      userId: tokenRecord.userId,
      hashToken: hashedRefresh,
      expiredAt: tokenRecord.expiresAt,
    });

    await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));
  }

  cookie.refreshToken.remove();

  return ok({ message: "Logged out successfully" });
};

export const verify = async ({
  body,
  set,
}: {
  body: { token: string };
  set: any;
}) => {
  const { token } = body;

  if (!token) {
    set.status = 400;
    return fail("400", "Token is required");
  }

  const hashedToken = hashToken(token);

  const [tokenRecord] = await db
    .select()
    .from(tokens)
    .where(
      and(
        eq(tokens.hashToken, hashedToken),
        eq(tokens.type, "verification-email"),
      ),
    )
    .limit(1);

  if (!tokenRecord) {
    set.status = 400;
    return fail("400", "Invalid verification token");
  }

  if (tokenRecord.expiresAt < new Date()) {
    await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));
    set.status = 400;
    return fail(
      "400",
      "Verification token has expired. Please request a new one.",
    );
  }

  await db
    .update(users)
    .set({ emailVerifiedAt: new Date() })
    .where(eq(users.id, tokenRecord.userId));

  await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));

  return ok({ message: "Email verified successfully. You can now login." });
};

export const sendOtp = async ({
  body,
  set,
}: {
  body: { email: string };
  set: any;
}) => {
  const { email } = body;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    set.status = 400;
    return fail("400", "Email not found");
  }

  if (user.emailVerifiedAt) {
    set.status = 400;
    return fail("400", "Email is already verified");
  }

  await db
    .delete(tokens)
    .where(
      and(eq(tokens.userId, user.id), eq(tokens.type, "verification-email")),
    );

  const rawToken = crypto.randomUUID();
  const hashedVerifyToken = hashToken(rawToken);

  await db.insert(tokens).values({
    userId: user.id,
    hashToken: hashedVerifyToken,
    type: "verification-email",
    expiresAt: new Date(Date.now() + VERIFY_EMAIL_TOKEN_EXPIRES_IN * 1000),
  });

  await sendVerificationEmail(rawToken, user.username, user.email);

  return ok({ message: "Verification email sent. Please check your inbox." });
};

export const refresh = async ({
  cookie,
  set,
  jwt,
}: {
  cookie: any;
  set: any;
  jwt: any;
}) => {
  const refreshTokenValue = cookie.refreshToken?.value;

  if (!refreshTokenValue) {
    set.status = 400;
    return fail("400", "No refresh token provided");
  }

  const hashedRefresh = hashToken(refreshTokenValue);

  const [tokenRecord] = await db
    .select()
    .from(tokens)
    .where(and(eq(tokens.hashToken, hashedRefresh), eq(tokens.type, "refresh")))
    .limit(1);

  if (!tokenRecord) {
    set.status = 401;
    cookie.refreshToken.remove();
    return fail("401", "Invalid or expired refresh token");
  }

  await db.insert(blacklistTokens).values({
    userId: tokenRecord.userId,
    hashToken: hashedRefresh,
    expiredAt: tokenRecord.expiresAt,
  });

  await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));

  if (tokenRecord.expiresAt < new Date()) {
    set.status = 401;
    cookie.refreshToken.remove();
    return fail("401", "Refresh token expired. Please login again.");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, tokenRecord.userId))
    .limit(1);

  if (!user) {
    set.status = 401;
    cookie.refreshToken.remove();
    return fail("401", "User not found");
  }

  const newAccessToken = await jwt.sign({
    userId: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRES_IN,
  });

  const newRefreshToken = await jwt.sign({
    userId: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRES_IN,
  });

  await db.insert(tokens).values({
    userId: user.id,
    hashToken: hashToken(newRefreshToken),
    type: "refresh",
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
  });

  cookie.refreshToken.set({
    value: newRefreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
  });

  return ok({
    accessToken: newAccessToken,
  });
};

export const verifyIp = async ({
  body,
  set,
  server,
  request,
}: {
  body: { token: string };
  set: any;
  server: any;
  request: Request;
}) => {
  const { token } = body;

  if (!token) {
    set.status = 400;
    return fail("400", "Token is required");
  }

  const hashedToken = hashToken(token);

  const [tokenRecord] = await db
    .select()
    .from(tokens)
    .where(
      and(
        eq(tokens.hashToken, hashedToken),
        eq(tokens.type, "verification-new-ip"),
      ),
    )
    .limit(1);

  if (!tokenRecord) {
    set.status = 400;
    return fail("400", "Token is invalid");
  }

  if (tokenRecord.expiresAt < new Date()) {
    await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));
    set.status = 400;
    return fail(
      "400",
      "Token has expired. Please login again to get a new verification email.",
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    server?.requestIP(request)?.address ??
    "127.0.0.1";

  const ipPosition = await geoFromIp(ip);

  await db.insert(loginSessions).values({
    userId: tokenRecord.userId,
    ip,
    country: ipPosition?.country ?? "Unknown",
    city: ipPosition?.city ?? "Unknown",
  });

  await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));

  return ok({
    message: "New IP address verified successfully. You can now login.",
  });
};

export const getMe = async ({ auth, set }: any) => {
  const { userId } = auth;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    set.status = 404;
    return fail("404", "User not found");
  }

  const { hashedPassword: _, ...safeUser } = user;

  return ok(safeUser);
};

export const forgotPassword = async ({
  body,
  set,
}: {
  body: { email: string };
  set: any;
}) => {
  const { email } = body;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // For security, don't reveal if email exists, but we can return success
    // Actually, in many apps, showing "Email not found" is preferred for UX.
    // Let's stick to UX but keep it safe.
    set.status = 404;
    return fail("404", "Email not found");
  }

  // Delete any existing reset tokens for this user
  await db
    .delete(tokens)
    .where(and(eq(tokens.userId, user.id), eq(tokens.type, "reset-password")));

  const rawToken = crypto.randomUUID();
  const hashedToken = hashToken(rawToken);

  await db.insert(tokens).values({
    userId: user.id,
    hashToken: hashedToken,
    type: "reset-password",
    expiresAt: new Date(Date.now() + RESET_PASSWORD_TOKEN_EXPIRES_IN * 1000),
  });

  await sendResetPasswordEmail(rawToken, user.username, user.email);

  return ok({
    message: "If your email is registered, you will receive a reset link.",
  });
};

export const resetPassword = async ({
  body,
  set,
}: {
  body: { token: string; password: string };
  set: any;
}) => {
  const { token, password } = body;

  if (!token || !password) {
    set.status = 400;
    return fail("400", "Token and new password are required");
  }

  const hashedToken = hashToken(token);

  const [tokenRecord] = await db
    .select()
    .from(tokens)
    .where(
      and(eq(tokens.hashToken, hashedToken), eq(tokens.type, "reset-password")),
    )
    .limit(1);

  if (!tokenRecord) {
    set.status = 400;
    return fail("400", "Invalid or expired reset token");
  }

  if (tokenRecord.expiresAt < new Date()) {
    await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));
    set.status = 400;
    return fail("400", "Reset token has expired. Please request a new one.");
  }

  const hashedPassword = await hashPassword(password);

  await db
    .update(users)
    .set({ hashedPassword, updatedAt: new Date() })
    .where(eq(users.id, tokenRecord.userId));

  // Delete the used token
  await db.delete(tokens).where(eq(tokens.id, tokenRecord.id));

  // Also delete all refresh tokens to force logout everywhere
  await db
    .delete(tokens)
    .where(
      and(eq(tokens.userId, tokenRecord.userId), eq(tokens.type, "refresh")),
    );

  return ok({ message: "Password reset successfully. You can now login." });
};
