import type { Context, Next } from 'hono';

export const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  const method = c.req.method;
  const path = c.req.path;
  const userAgent = c.req.header('user-agent') || '';
  const forwardedFor = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';

  console.log(`[REQUEST] ${method} ${path} - ${forwardedFor} - ${userAgent}`);

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;
  
  console.log(`[RESPONSE] ${method} ${path} - ${status} - ${duration}ms`);
};