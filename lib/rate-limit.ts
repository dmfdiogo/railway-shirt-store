type RateLimitOptions = {
  identifier: string;
  maxRequests: number;
  namespace: string;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __beartRateLimitStore?: Map<string, RateLimitEntry>;
};

function getRateLimitStore() {
  if (!globalForRateLimit.__beartRateLimitStore) {
    globalForRateLimit.__beartRateLimitStore = new Map<string, RateLimitEntry>();
  }

  return globalForRateLimit.__beartRateLimitStore;
}

function pruneExpiredEntries(store: Map<string, RateLimitEntry>, now: number) {
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function getRateLimitIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const cfConnectingIp = request.headers.get("cf-connecting-ip")?.trim();

  return forwardedFor || realIp || cfConnectingIp || "unknown-client";
}

export function consumeRateLimit(options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const store = getRateLimitStore();

  if (store.size > 1000) {
    pruneExpiredEntries(store, now);
  }

  const key = `${options.namespace}:${options.identifier}`;
  const entry = store.get(key);
  const baseEntry = !entry || entry.resetAt <= now
    ? { count: 0, resetAt: now + options.windowMs }
    : entry;

  const nextCount = baseEntry.count + 1;
  const nextEntry = {
    count: nextCount,
    resetAt: baseEntry.resetAt,
  };

  store.set(key, nextEntry);

  const remaining = Math.max(0, options.maxRequests - nextCount);
  const retryAfterSeconds = Math.max(1, Math.ceil((nextEntry.resetAt - now) / 1000));

  return {
    allowed: nextCount <= options.maxRequests,
    limit: options.maxRequests,
    remaining,
    resetAt: nextEntry.resetAt,
    retryAfterSeconds,
  };
}

export function createRateLimitHeaders(result: RateLimitResult) {
  const headers = new Headers();
  headers.set("X-RateLimit-Limit", String(result.limit));
  headers.set("X-RateLimit-Remaining", String(result.remaining));
  headers.set("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));

  if (!result.allowed) {
    headers.set("Retry-After", String(result.retryAfterSeconds));
  }

  return headers;
}
