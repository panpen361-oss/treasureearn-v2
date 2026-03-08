import { Resend } from "resend";
import { logger_error } from "../configs/consola.config";

const resend = new Resend(Bun.env.RESEND_API_KEY);
const APP_URL = Bun.env.APP_URL || "http://localhost:5173";
const FROM_EMAIL = Bun.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export const sendVerificationEmail = async (
  token: string,
  username: string,
  email: string,
) => {
  const { data, error } = await resend.emails.send({
    to: email,
    from: FROM_EMAIL,
    subject: "Verify your email",
    html: `<h1>Hello ${username}</h1>
    <p>Please click the link below to verify your email address.</p>
    <p><a href="${APP_URL}/verify/${token}">Verify Email</a></p>
    <p>If you did not request this email, please ignore this message.</p>
    <p>Thanks for using TreasureEarn!</p>`,
  });

  if (error) {
    logger_error(`Email failed (Verification): ${error.message}`);
  }
  return data;
};

export const sendResetPasswordEmail = async (
  token: string,
  username: string,
  email: string,
) => {
  const { data, error } = await resend.emails.send({
    to: email,
    from: FROM_EMAIL,
    subject: "Reset your password",
    html: `<h1>Hello ${username}</h1>
    <p>Please click the link below to reset your password.</p>
    <p><a href="${APP_URL}/reset-password/${token}">Reset Password</a></p>
    <p>If you did not request this email, please ignore this message.</p>
    <p>Thanks for using TreasureEarn!</p>`,
  });

  if (error) {
    logger_error(`Email failed (Verification): ${error.message}`);
  }
  return data;
};

export const sendVerificationNewIPAddressEmail = async (
  token: string,
  username: string,
  email: string,
) => {
  const { data, error } = await resend.emails.send({
    to: email,
    from: FROM_EMAIL,
    subject: "Verify your new IP address",
    html: `<h1>Hello ${username}</h1>
    <p>Please click the link below to verify your new IP address.</p>
    <p><a href="${APP_URL}/verify-ip/${token}">Verify IP Address</a></p>
    <p>If you did not request this email, please ignore this message.</p>
    <p>Thanks for using TreasureEarn!</p>`,
  });

  if (error) {
    logger_error(error.message);
  }
  return data;
};
