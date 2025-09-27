import type { Context } from "hono";
import type { ApiResponse } from "../types/api";

/**
 * Standard error response helper
 */
export const createErrorResponse = (
	error: string,
	message: string,
	statusCode: number = 500,
	additionalData?: Record<string, unknown>,
): Response => {
	const response: ApiResponse & { error: string; message: string } & Record<
			string,
			unknown
		> = {
		error,
		message,
		timestamp: new Date().toISOString(),
		...additionalData,
	};

	return new Response(JSON.stringify(response), {
		status: statusCode,
		headers: { "Content-Type": "application/json" },
	});
};

/**
 * Standard success response helper
 */
export const createSuccessResponse = <T>(
	data: T,
	statusCode: number = 200,
	message?: string,
): Response => {
	const response: ApiResponse<T> = {
		data,
		timestamp: new Date().toISOString(),
		...(message && { message }),
	};

	return new Response(JSON.stringify(response), {
		status: statusCode,
		headers: { "Content-Type": "application/json" },
	});
};

/**
 * Validate required route parameters
 */
export const validateRouteParams = (
	c: Context,
	requiredParams: string[],
): { isValid: boolean; missingParams: string[] } => {
	const missingParams: string[] = [];

	for (const param of requiredParams) {
		const value = c.req.param(param);
		if (!value || value.trim() === "") {
			missingParams.push(param);
		}
	}

	return {
		isValid: missingParams.length === 0,
		missingParams,
	};
};

/**
 * Extract and validate request headers
 */
export const extractRequestHeaders = (c: Context): Record<string, string> => {
	const headers: Record<string, string> = {};

	for (const [key, value] of Object.entries(c.req.header())) {
		if (value !== undefined && typeof value === "string") {
			headers[key] = value;
		}
	}

	return headers;
};

/**
 * Log request information for debugging
 */
export const logRequest = (c: Context, serviceName?: string): void => {
	const timestamp = new Date().toISOString();
	const method = c.req.method;
	const path = c.req.path;
	const userAgent = c.req.header("user-agent") || "Unknown";

	console.log(
		`[${timestamp}] ${method} ${path} ${serviceName ? `-> ${serviceName}` : ""} (${userAgent})`,
	);
};

/**
 * Generate unique request ID for tracing
 */
export const generateRequestId = (): string => {
	return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
