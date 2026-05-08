import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function buildClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing required environment variable: DATABASE_URL");
  const adapter = new PrismaPg({
    connectionString: url,
    idleTimeoutMillis: process.env.NODE_ENV === "production" ? 30_000 : 5_000,
    max: process.env.NODE_ENV === "production" ? 5 : 1,
  });
  return new PrismaClient({ adapter });
}

function getClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = buildClient();
  }

  return globalForPrisma.prisma;
}

function isCallable(value: unknown): value is (...args: never[]) => unknown {
  return typeof value === "function";
}

// Lazy proxy: DATABASE_URL is only validated on first use, not at module load time
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return isCallable(value) ? value.bind(client) : value;
  },
});

export default prisma;