import type { Context, Next } from "hono";
import { config } from "../config/index.js";

export const corsMiddleware = async (c: Context, next: Next) => {
	// Handle preflight requests
	if (c.req.method === "OPTIONS") {
		return new Response(null, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": config.cors.origin.includes("*")
					? "*"
					: config.cors.origin.join(","),
				"Access-Control-Allow-Methods": config.cors.methods.join(","),
				"Access-Control-Allow-Headers": config.cors.headers.join(","),
				"Access-Control-Max-Age": "86400",
			},
		});
	}

	await next();

	// Add CORS headers to response
	const origin = c.req.header("origin");
	if (
		origin &&
		(config.cors.origin.includes("*") || config.cors.origin.includes(origin))
	) {
		c.header("Access-Control-Allow-Origin", origin);
	} else if (config.cors.origin.includes("*")) {
		c.header("Access-Control-Allow-Origin", "*");
	}

	c.header("Access-Control-Allow-Methods", config.cors.methods.join(","));
	c.header("Access-Control-Allow-Headers", config.cors.headers.join(","));
};
