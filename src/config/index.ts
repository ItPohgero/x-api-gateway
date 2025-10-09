export interface ServiceConfig {
	baseUrl: string;
	timeout?: number;
}

export interface GatewayConfig {
	port: number;
	services: Record<string, ServiceConfig>;
	cors: {
		origin: string[];
		methods: string[];
		headers: string[];
	};
}

export const config: GatewayConfig = {
	port: parseInt(process.env.PORT || "3000", 10),
	services: {
		sso: {
			baseUrl: process.env.SSO_SERVICE_URL || "https://sso.com",
			timeout: 30000,
		},
		core: {
			baseUrl: process.env.CORE_SERVICE_URL || "https://core.com",
			timeout: 30000,
		},
		chat: {
			baseUrl: process.env.CHAT_SERVICE_URL || "https://chat.com",
			timeout: 30000,
		},
		islamic: {
			baseUrl: process.env.ISLAMIC_SERVICE_URL || "https://islamic.com",
			timeout: 30000,
		},
		article: {
			baseUrl: process.env.ARTICLE_SERVICE_URL || "https://article.com",
			timeout: 30000,
		},
		payment: {
			baseUrl: process.env.PAYMENT_SERVICE_URL || "https://payment.com",
			timeout: 30000,
		},
	},
	cors: {
		origin: process.env.CORS_ORIGIN?.split(",") || ["*"],
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
		headers: [
			"Content-Type", 
			"Authorization", 
			"X-Requested-With",
			"Accept",
			"Origin",
			"Access-Control-Request-Method",
			"Access-Control-Request-Headers",
			"sec-ch-ua",
			"sec-ch-ua-mobile",
			"sec-ch-ua-platform",
			"User-Agent",
			"Referer"
		],
	},
};
