# Better Auth

Better Auth is the most comprehensive authentication framework for TypeScript, designed to be framework-agnostic and work across Node.js, Bun, Deno, and Cloudflare Workers. It provides a complete set of features out of the box including email/password authentication, social sign-on (Google, GitHub, Apple, Discord, and 40+ providers), session management, and a powerful plugin ecosystem for advanced functionalities like two-factor authentication, passkeys, organizations, and more.

The library follows a server-client architecture where you configure authentication on your server using `betterAuth()` and interact with it from clients using `createAuthClient()`. Better Auth uses standard cookie-based session management, supports multiple database adapters (PostgreSQL, MySQL, SQLite, MongoDB, Prisma, Drizzle), and provides type-safe APIs with full TypeScript inference. The plugin system allows extending base functionalities with minimal code, making it easy to add features like 2FA, multi-tenant organizations, magic links, and API keys.

## Server Configuration - betterAuth()

The `betterAuth()` function initializes the authentication server instance. It accepts configuration options for database, authentication methods, session management, and plugins. The auth instance provides a handler for HTTP requests and an API object for server-side authentication operations.

```typescript
// auth.ts - Server configuration
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  // Database configuration - supports pg, mysql2, better-sqlite3, or ORM adapters
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Auto sign-in after registration (default: true)
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Social providers configuration
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    updateAge: 60 * 60 * 24, // Update session expiry every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
  },

  // App name (used for TOTP issuer, email templates)
  appName: "My App",

  // Plugins array
  plugins: [
    // Add plugins here
  ],
});

// Type export for client inference
export type Auth = typeof auth;
```

## Database Adapters

Better Auth supports multiple database backends through built-in adapters. You can use raw database connections or ORM adapters like Prisma, Drizzle, or MongoDB.

```typescript
// Using Drizzle ORM adapter
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // Your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // "pg" | "mysql" | "sqlite"
  }),
});

// Using Prisma adapter
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // "postgresql" | "mysql" | "sqlite"
  }),
});

// Using MongoDB adapter
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(client),
});

// Using SQLite directly
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
});
```

## Route Handler Setup

Better Auth needs to handle HTTP requests on your server. You mount the handler at a catch-all route (default: `/api/auth/*`). Helper functions are provided for popular frameworks.

```typescript
// Next.js App Router - app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);

// Express.js - server.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();
app.all("/api/auth/*", toNodeHandler(auth));
app.listen(8000);

// Hono - src/index.ts
import { Hono } from "hono";
import { auth } from "./auth";

const app = new Hono();
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// SvelteKit - hooks.server.ts
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

export async function handle({ event, resolve }) {
  return svelteKitHandler({ event, resolve, auth });
}

// Cloudflare Workers
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/auth")) {
      return auth.handler(request);
    }
    return new Response("Not found", { status: 404 });
  },
};
```

## Client Configuration - createAuthClient()

The `createAuthClient()` function creates a client instance for interacting with your auth server. Framework-specific imports provide reactive hooks like `useSession`. The client automatically handles cookies and session management.

```typescript
// React client - lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Optional if same domain
});

// Export individual methods for convenience
export const { signIn, signUp, signOut, useSession } = authClient;

// Vue client
import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Svelte client
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Vanilla JS client
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

## Email/Password Sign Up

Sign up new users with email and password. The `signUp.email` method creates a user account and optionally auto-signs them in. Callbacks provide hooks for loading states, success, and error handling.

```typescript
// Client-side sign up
import { authClient } from "@/lib/auth-client";

const handleSignUp = async () => {
  const { data, error } = await authClient.signUp.email({
    email: "user@example.com",
    password: "securePassword123",
    name: "John Doe",
    image: "https://example.com/avatar.jpg", // Optional
    callbackURL: "/dashboard", // Redirect after email verification
  }, {
    onRequest: (ctx) => {
      // Show loading spinner
      setLoading(true);
    },
    onSuccess: (ctx) => {
      // User created and signed in
      router.push("/dashboard");
    },
    onError: (ctx) => {
      // Handle error
      setError(ctx.error.message);
    },
  });

  if (error) {
    console.error("Sign up failed:", error.message);
  }
};

// Server-side sign up
import { auth } from "./auth";

const response = await auth.api.signUpEmail({
  body: {
    email: "user@example.com",
    password: "securePassword123",
    name: "John Doe",
  },
});
```

## Email/Password Sign In

Authenticate existing users with email and password. The `signIn.email` method validates credentials and creates a session. The `rememberMe` option controls session persistence.

```typescript
// Client-side sign in
import { authClient } from "@/lib/auth-client";

const handleSignIn = async () => {
  const { data, error } = await authClient.signIn.email({
    email: "user@example.com",
    password: "securePassword123",
    callbackURL: "/dashboard",
    rememberMe: true, // Persist session (default: true)
  }, {
    onSuccess: (ctx) => {
      // Check for 2FA requirement
      if (ctx.data.twoFactorRedirect) {
        // User has 2FA enabled, redirect to verification
        router.push("/two-factor");
        return;
      }
      router.push("/dashboard");
    },
    onError: (ctx) => {
      setError(ctx.error.message);
    },
  });
};

// Server-side sign in
import { auth } from "./auth";

const response = await auth.api.signInEmail({
  body: {
    email: "user@example.com",
    password: "securePassword123",
  },
  asResponse: true, // Return Response object with cookies
});
```

## Social Sign-On

Authenticate users via OAuth providers like Google, GitHub, Apple, Discord, and 40+ others. The `signIn.social` method redirects users to the provider's authorization page.

```typescript
// Client-side social sign in
import { authClient } from "@/lib/auth-client";

// Sign in with GitHub
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
  errorCallbackURL: "/error",
  newUserCallbackURL: "/welcome", // Redirect for new users
});

// Sign in with Google
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
});

// Sign in without redirect (get authorization URL)
const { data } = await authClient.signIn.social({
  provider: "github",
  disableRedirect: true,
});
console.log(data.url); // Authorization URL

// Sign in with ID token (mobile apps, one-tap)
await authClient.signIn.social({
  provider: "google",
  idToken: {
    token: googleIdToken,
  },
});
```

## Session Management - useSession Hook

The `useSession` hook provides reactive access to the current user session. It automatically updates when the session changes (sign in, sign out, etc.). Available for React, Vue, Svelte, and Solid.

```typescript
// React component using useSession
import { authClient } from "@/lib/auth-client";

function UserProfile() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!session) return <div>Not signed in</div>;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <img src={session.user.image} alt="Avatar" />
      <button onClick={() => authClient.signOut()}>Sign Out</button>
    </div>
  );
}

// Vanilla JS subscription
authClient.useSession.subscribe((value) => {
  if (value.data) {
    console.log("User:", value.data.user);
  }
});

// Server-side session retrieval (Next.js example)
import { auth } from "./auth";
import { headers } from "next/headers";

async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}
```

## Sign Out

End the user's session and clear authentication cookies. The `signOut` method supports callbacks for redirect handling.

```typescript
// Client-side sign out
import { authClient } from "@/lib/auth-client";

// Basic sign out
await authClient.signOut();

// Sign out with redirect
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login");
    },
  },
});

// Revoke all sessions (sign out from all devices)
await authClient.revokeSessions();

// Revoke other sessions (keep current)
await authClient.revokeOtherSessions();
```

## Two-Factor Authentication Plugin

The 2FA plugin adds TOTP (authenticator app) and OTP (email/SMS) second factor authentication. It includes backup codes and trusted device management.

```typescript
// Server configuration - auth.ts
import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "My App", // Used as TOTP issuer
  plugins: [
    twoFactor({
      issuer: "My App", // Optional, defaults to appName
      otpOptions: {
        async sendOTP({ user, otp }, ctx) {
          // Send OTP via email or SMS
          await sendEmail({
            to: user.email,
            subject: "Your verification code",
            body: `Your code is: ${otp}`,
          });
        },
      },
    }),
  ],
});

// Client configuration - auth-client.ts
import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect({ twoFactorMethods }) {
        // twoFactorMethods: ["totp"] or ["totp", "otp"]
        router.push("/two-factor");
      },
    }),
  ],
});

// Enable 2FA for a user
const { data } = await authClient.twoFactor.enable({
  password: "userPassword", // Required for credential accounts
});
// data.totpURI - QR code URI for authenticator app
// data.backupCodes - Recovery codes

// Verify TOTP code during sign in
await authClient.twoFactor.verifyTotp({
  code: "123456",
  trustDevice: true, // Remember device for 30 days
});

// Send and verify OTP
await authClient.twoFactor.sendOtp();
await authClient.twoFactor.verifyOtp({
  code: "123456",
  trustDevice: true,
});

// Use backup code for recovery
await authClient.twoFactor.verifyBackupCode({
  code: "backup-code-here",
});
```

## Organization Plugin

The organization plugin enables multi-tenant support with organizations, members, roles, invitations, and teams. It includes a flexible access control system with customizable permissions.

```typescript
// Server configuration - auth.ts
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = `https://myapp.com/accept-invitation/${data.id}`;
        await sendEmail({
          to: data.email,
          subject: `Join ${data.organization.name}`,
          body: `You've been invited by ${data.inviter.user.name}. Click here: ${inviteLink}`,
        });
      },
      allowUserToCreateOrganization: async (user) => {
        // Restrict org creation to premium users
        return user.plan === "premium";
      },
    }),
  ],
});

// Client configuration - auth-client.ts
import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [organizationClient()],
});

// Create organization
const { data: org } = await authClient.organization.create({
  name: "Acme Inc",
  slug: "acme",
  logo: "https://example.com/logo.png",
});

// Set active organization
await authClient.organization.setActive({
  organizationId: org.id,
});

// Invite member
await authClient.organization.inviteMember({
  email: "newuser@example.com",
  role: "member", // "owner" | "admin" | "member"
});

// Accept invitation (after user clicks invite link)
await authClient.organization.acceptInvitation({
  invitationId: "invitation-id",
});

// List organizations
const { data: orgs } = authClient.useListOrganizations();

// Get active organization
const { data: activeOrg } = authClient.useActiveOrganization();

// Update member role
await authClient.organization.updateMemberRole({
  memberId: "member-id",
  role: "admin",
});

// Check permissions
const { data: hasPermission } = await authClient.organization.hasPermission({
  permissions: {
    project: ["create", "delete"],
  },
});
```

## Passkey Plugin

The passkey plugin enables passwordless authentication using WebAuthn/FIDO2. Users can register and sign in with biometrics, security keys, or platform authenticators.

```typescript
// Server configuration - auth.ts
import { betterAuth } from "better-auth";
import { passkey } from "@better-auth/passkey";

export const auth = betterAuth({
  plugins: [
    passkey({
      rpID: "localhost", // Your domain (e.g., "example.com")
      rpName: "My App",
      origin: "http://localhost:3000", // Full origin URL
    }),
  ],
});

// Client configuration - auth-client.ts
import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";

export const authClient = createAuthClient({
  plugins: [passkeyClient()],
});

// Register a passkey (user must be signed in)
const { data, error } = await authClient.passkey.addPasskey({
  name: "My MacBook", // Optional label
  authenticatorAttachment: "platform", // "platform" | "cross-platform"
});

// Sign in with passkey
await authClient.signIn.passkey({
  autoFill: true, // Enable browser autofill (conditional UI)
  fetchOptions: {
    onSuccess() {
      router.push("/dashboard");
    },
    onError(ctx) {
      console.error("Passkey auth failed:", ctx.error.message);
    },
  },
});

// List user's passkeys
const { data: passkeys } = await authClient.passkey.listUserPasskeys();

// Delete a passkey
await authClient.passkey.deletePasskey({
  id: "passkey-id",
});

// Conditional UI setup (React example)
useEffect(() => {
  if (PublicKeyCredential.isConditionalMediationAvailable?.()) {
    authClient.signIn.passkey({ autoFill: true });
  }
}, []);
```

## Magic Link Plugin

The magic link plugin enables passwordless email authentication. Users receive a link via email that signs them in when clicked.

```typescript
// Server configuration - auth.ts
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    magicLink({
      async sendMagicLink({ email, url, token }, ctx) {
        await sendEmail({
          to: email,
          subject: "Sign in to My App",
          body: `Click here to sign in: ${url}`,
        });
      },
      expiresIn: 60 * 10, // 10 minutes
    }),
  ],
});

// Client configuration - auth-client.ts
import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
});

// Send magic link
await authClient.signIn.magicLink({
  email: "user@example.com",
  callbackURL: "/dashboard",
});

// The user clicks the link in their email, which contains a token
// Better Auth automatically verifies the token and creates a session
```

## Admin Plugin

The admin plugin provides administrative capabilities for managing users, including impersonation, banning, and user management.

```typescript
// Server configuration - auth.ts
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    admin({
      defaultRole: "user",
      adminRole: "admin",
    }),
  ],
});

// Client configuration - auth-client.ts
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [adminClient()],
});

// List all users (admin only)
const { data: users } = await authClient.admin.listUsers({
  limit: 10,
  offset: 0,
  sortBy: "createdAt",
  sortDirection: "desc",
});

// Impersonate a user
await authClient.admin.impersonateUser({
  userId: "user-id",
});

// Stop impersonation
await authClient.admin.stopImpersonation();

// Ban a user
await authClient.admin.banUser({
  userId: "user-id",
  banReason: "Violated terms of service",
  banExpiresIn: 60 * 60 * 24 * 7, // 7 days
});

// Unban a user
await authClient.admin.unbanUser({
  userId: "user-id",
});

// Create user (admin only)
await authClient.admin.createUser({
  email: "newuser@example.com",
  name: "New User",
  password: "tempPassword123",
  role: "user",
});
```

## Server-Side API Methods

The `auth.api` object provides server-side methods for all authentication operations. These are useful for server actions, API routes, and background jobs.

```typescript
import { auth } from "./auth";
import { headers } from "next/headers";

// Get current session
const session = await auth.api.getSession({
  headers: await headers(),
});

// Sign in on server
const result = await auth.api.signInEmail({
  body: {
    email: "user@example.com",
    password: "password",
  },
  asResponse: true, // Return Response with set-cookie headers
});

// Create user programmatically
const user = await auth.api.signUpEmail({
  body: {
    email: "user@example.com",
    password: "password",
    name: "User Name",
  },
});

// List sessions for a user
const sessions = await auth.api.listSessions({
  headers: await headers(),
});

// Revoke a session
await auth.api.revokeSession({
  headers: await headers(),
  body: {
    token: "session-token",
  },
});

// Change password
await auth.api.changePassword({
  headers: await headers(),
  body: {
    currentPassword: "oldPassword",
    newPassword: "newPassword",
    revokeOtherSessions: true,
  },
});
```

## Database Hooks

Database hooks allow you to intercept and modify data before and after database operations. Useful for adding custom fields, validation, or side effects.

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Modify user data before creation
          return {
            data: {
              ...user,
              customField: "default value",
            },
          };
        },
        after: async (user) => {
          // Run side effects after user creation
          await sendWelcomeEmail(user.email);
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          // Set default active organization
          const org = await getDefaultOrg(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: org?.id,
            },
          };
        },
      },
    },
  },
});
```

## Custom Session with customSession Plugin

The customSession plugin allows extending session data with custom fields computed at runtime.

```typescript
// Server configuration - auth.ts
import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    customSession(async ({ user, session }) => {
      // Fetch additional data
      const roles = await getUserRoles(user.id);
      const permissions = await getPermissions(user.id);

      return {
        user: {
          ...user,
          roles,
        },
        session,
        permissions, // Add custom top-level field
      };
    }),
  ],
});

// Client configuration - auth-client.ts
import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
});

// Access custom session data
const { data } = authClient.useSession();
console.log(data?.permissions);
console.log(data?.user.roles);
```

## CLI Commands

Better Auth provides CLI commands for database schema management. Run migrations or generate schema files for your ORM.

```bash
# Run database migrations (creates/updates tables)
npx auth migrate

# Generate schema for your ORM (Prisma, Drizzle)
npx auth generate

# Initialize Better Auth in a new project
npx auth init

# Generate secret key
openssl rand -base64 32
```

## Environment Variables

Better Auth uses environment variables for configuration. The secret is required, while the URL defaults to `http://localhost:3000`.

```bash
# .env file
BETTER_AUTH_SECRET=your-32-character-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Social provider credentials
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database connection
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

## Summary

Better Auth provides a complete authentication solution for TypeScript applications with a focus on developer experience and flexibility. The core library handles email/password authentication and social sign-on out of the box, while the plugin system enables advanced features like two-factor authentication, passkeys, organizations with RBAC, magic links, and admin tools. The framework-agnostic design means it works with Next.js, Nuxt, SvelteKit, Express, Hono, and any other framework that handles HTTP requests.

Integration follows a consistent pattern: configure `betterAuth()` on your server with your database and desired plugins, mount the handler at a catch-all route, and create a client with `createAuthClient()` for your frontend. Server-side operations use `auth.api` methods, while client-side code uses the client instance with reactive hooks like `useSession`. The TypeScript-first approach ensures full type inference across server and client, and the CLI tools automate database schema management for quick setup and plugin additions.
