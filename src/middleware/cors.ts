import type { Context, Next } from "hono";
import { config } from "../config/index.js";

export const corsMiddleware = async (c: Context, next: Next) => {
	const origin = c.req.header("origin");

	// Handle preflight requests
	if (c.req.method === "OPTIONS") {
		const headers: Record<string, string> = {};

		// Set Access-Control-Allow-Origin
		if (config.cors.origin.includes("*")) {
			headers["Access-Control-Allow-Origin"] = "*";
		} else if (origin && config.cors.origin.includes(origin)) {
			headers["Access-Control-Allow-Origin"] = origin;
			headers["Vary"] = "Origin";
		}

		// Set other CORS headers
		headers["Access-Control-Allow-Methods"] = config.cors.methods.join(",");
		headers["Access-Control-Allow-Headers"] = config.cors.headers.join(",");
		headers["Access-Control-Max-Age"] = "86400";
		headers["Access-Control-Allow-Credentials"] = "true";

		return new Response(null, {
			status: 200,
			headers,
		});
	}

	await next();

	// Add CORS headers to actual response
	if (config.cors.origin.includes("*")) {
		c.header("Access-Control-Allow-Origin", "*");
	} else if (origin && config.cors.origin.includes(origin)) {
		c.header("Access-Control-Allow-Origin", origin);
		c.header("Vary", "Origin");
	}

	c.header("Access-Control-Allow-Methods", config.cors.methods.join(","));
	c.header("Access-Control-Allow-Headers", config.cors.headers.join(","));
	c.header("Access-Control-Allow-Credentials", "true");
};
