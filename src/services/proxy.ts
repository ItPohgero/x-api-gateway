import type { Context } from 'hono';
import { config } from '../config/index.js';
import { createErrorResponse, extractRequestHeaders, logRequest, generateRequestId } from '../utils/response';
import type { ServiceName } from '../types/api';

export interface ProxyOptions {
    serviceName: ServiceName;
    targetPath: string;
    method: string;
    headers: Record<string, string>;
    body?: any;
    requestId?: string;
}

export class ProxyService {
    /**
     * Headers that should not be forwarded to upstream services
     */
    private static readonly HOP_BY_HOP_HEADERS = [
        'connection',
        'keep-alive',
        'proxy-authenticate',
        'proxy-authorization',
        'te',
        'trailers',
        'transfer-encoding',
        'upgrade',
        'host'
    ];

    /**
     * Response headers that should not be forwarded to client
     */
    private static readonly RESPONSE_HEADERS_TO_FILTER = [
        'content-encoding',
        'transfer-encoding'
    ];

    /**
     * Make HTTP request to upstream service
     */
    private static async makeRequest(options: ProxyOptions): Promise<Response> {
        const { serviceName, targetPath, method, headers, body, requestId } = options;

        const serviceConfig = config.services[serviceName];
        if (!serviceConfig) {
            throw new Error(`Service '${serviceName}' not configured`);
        }

        const targetUrl = `${serviceConfig.baseUrl}${targetPath}`;
        const filteredHeaders = this.filterRequestHeaders(headers);

        // Add request ID for tracing
        if (requestId) {
            filteredHeaders['x-request-id'] = requestId;
        }

        console.log(`[PROXY:${requestId}] ${method} ${targetUrl}`);

        try {
            const response = await fetch(targetUrl, {
                method,
                headers: filteredHeaders,
                body: body ? JSON.stringify(body) : undefined,
                signal: AbortSignal.timeout(serviceConfig.timeout || 30000)
            });

            console.log(`[PROXY:${requestId}] Response: ${response.status} ${response.statusText}`);
            return response;

        } catch (error) {
            console.error(`[PROXY:${requestId}] Error ${method} ${targetUrl}:`, error);
            throw error;
        }
    }

    /**
     * Filter out hop-by-hop headers that shouldn't be forwarded
     */
    private static filterRequestHeaders(headers: Record<string, string>): Record<string, string> {
        const filtered: Record<string, string> = {};

        for (const [key, value] of Object.entries(headers)) {
            if (!this.HOP_BY_HOP_HEADERS.includes(key.toLowerCase())) {
                filtered[key] = value;
            }
        }

        return filtered;
    }

    /**
     * Filter response headers that shouldn't be forwarded to client
     */
    private static filterResponseHeaders(headers: Headers): Record<string, string> {
        const filtered: Record<string, string> = {};

        headers.forEach((value, key) => {
            if (!this.RESPONSE_HEADERS_TO_FILTER.includes(key.toLowerCase())) {
                filtered[key] = value;
            }
        });

        return filtered;
    }

    /**
     * Extract request body based on content type
     */
    private static async extractRequestBody(c: Context): Promise<any> {
        if (c.req.method === 'GET' || c.req.method === 'HEAD') {
            return undefined;
        }

        const contentType = c.req.header('content-type') || '';

        try {
            if (contentType.includes('application/json')) {
                return await c.req.json();
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                return await c.req.text();
            } else if (contentType.includes('multipart/form-data')) {
                return await c.req.formData();
            } else {
                return await c.req.text();
            }
        } catch (error) {
            console.warn(`[PROXY] Failed to parse request body: ${error}`);
            return undefined;
        }
    }

    /**
     * Main proxy request handler
     */
    static async proxyRequest(c: Context, serviceName: ServiceName, targetPath: string): Promise<Response> {
        const requestId = generateRequestId();
        
        try {
            // Log the incoming request
            logRequest(c, serviceName);

            // Extract request headers and body
            const headers = extractRequestHeaders(c);
            const body = await this.extractRequestBody(c);

            // Make the proxied request
            const response = await this.makeRequest({
                serviceName,
                targetPath,
                method: c.req.method,
                headers,
                body,
                requestId
            });

            // Get response content
            const responseBody = await response.text();
            const responseHeaders = this.filterResponseHeaders(response.headers);

            // Add tracing headers
            responseHeaders['x-request-id'] = requestId;
            responseHeaders['x-proxied-by'] = 'api-gateway';

            return new Response(responseBody, {
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders
            });

        } catch (error) {
            console.error(`[PROXY:${requestId}] Request failed:`, error);

            // Handle specific error types
            if (error instanceof TypeError && error.message.includes('timeout')) {
                return createErrorResponse(
                    'Gateway Timeout',
                    'The upstream service did not respond in time',
                    504,
                    { requestId, service: serviceName }
                );
            }

            if (error instanceof Error && error.message.includes('not configured')) {
                return createErrorResponse(
                    'Service Unavailable',
                    `Service '${serviceName}' is not configured`,
                    503,
                    { requestId, service: serviceName }
                );
            }

            // Generic error response
            return createErrorResponse(
                'Bad Gateway',
                'Failed to reach upstream service',
                502,
                { requestId, service: serviceName }
            );
        }
    }
}