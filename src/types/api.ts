export type ServiceName = "sso" | "core" | "chat" | "islamic" | "article" | "payment";

export interface ServiceRoute {
	prefix: string;
	service: ServiceName;
	description?: string;
}

export interface ApiResponse<T = unknown> {
	data?: T;
	error?: string;
	message?: string;
	timestamp?: string;
}

export interface HealthCheckResponse {
	status: "healthy" | "unhealthy";
	timestamp: string;
	gateway: string;
	version: string;
	services: ServiceName[];
}

export interface NotFoundResponse {
	error: "Not Found";
	message: string;
	path: string;
	availableServices: string[];
}
