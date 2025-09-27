import { Hono } from 'hono';
import gateway from './routes/gateway';
import { loggerMiddleware } from './middleware/logger';
import { corsMiddleware } from './middleware/cors';
import { config } from './config/index';

const app = new Hono();

// Apply middleware
app.use('*', loggerMiddleware);
app.use('*', corsMiddleware);

// Mount gateway routes
app.route('/', gateway);

// Global error handler
app.onError((err, c) => {
  console.error('[ERROR]', err);
  
  return c.json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  }, 500);
});

console.log(`🚀 API Gateway starting on port ${config.port}`);
console.log(`📋 Configured services:`, Object.keys(config.services));

export default {
  port: config.port,
  fetch: app.fetch,
};