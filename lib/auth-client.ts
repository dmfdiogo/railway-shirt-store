import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const {
  getSession,
  requestPasswordReset,
  resetPassword,
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;