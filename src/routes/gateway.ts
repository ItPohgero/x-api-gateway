import type { Context } from "hono";
import { Hono } from "hono";
import {
	getAllServiceNames,
	getAllServicePrefixes,
	SERVICE_ROUTES,
} from "../constants/services";
import { proxyRequest } from "../services/proxy";
import type {
	HealthCheckResponse,
	NotFoundResponse,
	ServiceName,
} from "../types/api";

const gateway = new Hono();

/**
 * Generic route handler for all service routes
 * Handles the common pattern: /api/{service}/{domain}/{function}
 */
const createServiceRouteHandler = (serviceName: ServiceName) => {
	return async (c: Context) => {
		const domain = c.req.param("domain");
		const functionPath = c.req.param("function");

		// Validate required parameters
		if (!domain || !functionPath) {
			return c.json(
				{
					error: "Bad Request",
					message: "Missing required parameters: domain and function",
					path: c.req.path,
				},
				400,
			);
		}

		// Construct the target path
		const targetPath = `/api/${serviceName}/${domain}/${functionPath}`;

		return proxyRequest(c, serviceName, targetPath);
	};
};

// Register all service routes dynamically
SERVICE_ROUTES.forEach(({ prefix, service }) => {
	gateway.all(
		`${prefix}/:domain/:function{.*}`,
		createServiceRouteHandler(service),
	);
});

// Health check endpoint
gateway.get("/health", (c: Context) => {
	const response: HealthCheckResponse = {
		status: "healthy",
		timestamp: new Date().toISOString(),
		gateway: "api-gateway",
		version: "1.0.0",
		services: getAllServiceNames(),
	};

	return c.json(response);
});

// API documentation endpoint
gateway.get("/api", (c: Context) => {
	return c.json({
		name: "API Gateway",
		version: "1.0.0",
		description: "Central API Gateway for microservices",
		endpoints: {
			health: "/health",
			documentation: "/api",
			services: SERVICE_ROUTES.map((route) => ({
				service: route.service,
				prefix: route.prefix,
				description: route.description,
				pattern: `${route.prefix}/:domain/:function`,
				example: `${route.prefix}/auth/login`,
			})),
		},
		usage: {
			pattern: "/api/{service}/{domain}/{function}",
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
			examples: [
				"/api/sso/auth/sign-in",
				"/api/core/user/profile",
				"/api/chat/room/messages",
				"/api/islamic/prayer/times",
			],
		},
	});
});

// Root endpoint
gateway.get("/", (c: Context) => {
	return c.json({
		message: "Welcome to API Gateway",
		version: "1.0.0",
		documentation: "/api",
		health: "/health",
	});
});

// Catch-all route for unmatched paths
gateway.all("*", (c: Context) => {
	const response: NotFoundResponse = {
		error: "Not Found",
		message: "The requested endpoint was not found",
		path: c.req.path,
		availableServices: getAllServicePrefixes(),
	};

	return c.json(response, 404);
});

export default gateway;
