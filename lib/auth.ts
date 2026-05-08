import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

import prisma from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export const authBaseUrl = process.env.BETTER_AUTH_URL ?? process.env.APP_URL;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export function isGoogleAuthConfigured() {
  return Boolean(googleClientId && googleClientSecret);
}

export function isAuthConfigured() {
  return Boolean(process.env.BETTER_AUTH_SECRET && authBaseUrl);
}

export function isEmailVerificationConfigured() {
  return emailVerificationEnabled;
}

const trustedOrigins = [
  process.env.APP_URL,
  process.env.BETTER_AUTH_URL,
  process.env.NODE_ENV !== "production" ? "http://localhost:3000" : null,
].filter((value): value is string => Boolean(value));

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const emailVerificationEnabled = Boolean(resend);

// Use Resend's shared test domain when no custom domain is configured.
// Replace with a verified domain address before going live.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export const auth = betterAuth({
  appName: "Be Art",
  baseURL: authBaseUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      addressLine1: {
        type: "string",
        required: false,
      },
      addressLine2: {
        type: "string",
        required: false,
      },
      neighborhood: {
        type: "string",
        required: false,
      },
      city: {
        type: "string",
        required: false,
      },
      state: {
        type: "string",
        required: false,
      },
      postalCode: {
        type: "string",
        required: false,
      },
      country: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: isGoogleAuthConfigured()
    ? {
        google: {
          clientId: googleClientId!,
          clientSecret: googleClientSecret!,
        },
      }
    : undefined,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: emailVerificationEnabled,
    sendResetPassword: resend
      ? async ({ user, url }) => {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: "Redefina sua senha — Be Art",
            html: `<p>Olá, ${user.name ?? user.email}!</p><p>Clique no link abaixo para redefinir sua senha. O link expira em 1 hora.</p><p><a href="${url}">${url}</a></p><p>Se você não solicitou a redefinição, ignore este email — sua senha permanece a mesma.</p>`,
          });
        }
      : undefined,
  },
  emailVerification: resend
    ? {
        autoSignInAfterVerification: true,
        sendOnSignIn: true,
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
          await resend!.emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: "Confirme seu email — Be Art",
            html: `<p>Olá, ${user.name ?? user.email}!</p><p>Clique no link abaixo para confirmar seu endereço de email.</p><p><a href="${url}">${url}</a></p>`,
          });
        },
      }
    : undefined,
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins,
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          sendWelcomeEmail({ to: user.email, name: user.name ?? user.email }).catch(
            (err) => console.error("[welcome-email] failed:", err),
          );
        },
      },
    },
  },
});