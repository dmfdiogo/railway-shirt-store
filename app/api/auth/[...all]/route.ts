import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";
import {
	consumeRateLimit,
	createRateLimitHeaders,
	getRateLimitIdentifier,
} from "@/lib/rate-limit";

export const runtime = "nodejs";

const authHandlers = toNextJsHandler(auth.handler);

export const GET = authHandlers.GET;

export async function POST(request: Request) {
	const rateLimit = consumeRateLimit({
		identifier: getRateLimitIdentifier(request),
		maxRequests: 30,
		namespace: `auth:${new URL(request.url).pathname}`,
		windowMs: 10 * 60 * 1000,
	});

	if (!rateLimit.allowed) {
		return Response.json(
			{ error: "Too many authentication requests. Please try again in a few minutes." },
			{ status: 429, headers: createRateLimitHeaders(rateLimit) }
		);
	}

	const response = await authHandlers.POST(request);
	const headers = createRateLimitHeaders(rateLimit);
	headers.forEach((value, key) => {
		response.headers.set(key, value);
	});

	return response;
}