import type { ServiceName, ServiceRoute } from "../types/api";

/**
 * Configuration for all service routes
 * Add new services here to automatically register them
 */
export const SERVICE_ROUTES: readonly ServiceRoute[] = [
	{
		prefix: "/api/sso",
		service: "sso",
		description: "Single Sign-On authentication service",
	},
	{
		prefix: "/api/core",
		service: "core",
		description: "Core business logic service",
	},
	{
		prefix: "/api/chat",
		service: "chat",
		description: "Real-time chat service",
	},
	{
		prefix: "/api/islamic",
		service: "islamic",
		description: "Islamic content and services",
	},
	{
		prefix: "/api/article",
		service: "article",
		description: "Article content and services",
	},
	{
		prefix: "/api/payment",
		service: "payment",
		description: "Payment content and services",
	},
] as const;

/**
 * Get service configuration by service name
 */
export const getServiceByName = (
	serviceName: ServiceName,
): ServiceRoute | undefined => {
	return SERVICE_ROUTES.find((route) => route.service === serviceName);
};

/**
 * Get service configuration by prefix
 */
export const getServiceByPrefix = (
	prefix: string,
): ServiceRoute | undefined => {
	return SERVICE_ROUTES.find((route) => route.prefix === prefix);
};

/**
 * Get all available service names
 */
export const getAllServiceNames = (): ServiceName[] => {
	return SERVICE_ROUTES.map((route) => route.service);
};

/**
 * Get all available service prefixes
 */
export const getAllServicePrefixes = (): string[] => {
	return SERVICE_ROUTES.map((route) => route.prefix);
};
