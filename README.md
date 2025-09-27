# Simple Gateway 🚀

[![Author](https://img.shields.io/badge/Author-Wahyu%20Agus%20Arifin-blue?style=flat-square)](https://github.com/ItPohgero)
[![GitHub](https://img.shields.io/badge/GitHub-ItPohgero-black?style=flat-square&logo=github)](https://github.com/ItPohgero)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> A lightweight API Gateway built with Hono.js and Bun for managing and proxying requests to various microservices.

**[🇮🇩 Indonesian Version](README.id.md)**

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Supported Services](#supported-services)
- [Middleware](#middleware)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 📋 About

Simple Gateway is a lightweight API Gateway solution designed to manage and proxy HTTP requests to various microservices. Built with modern technologies like Hono.js and Bun, this gateway provides high performance with minimal overhead.

### 🎯 Goals

- Simplify communication between microservices
- Provide a single entry point for all APIs
- Centrally manage CORS and logging
- Provide monitoring and health checks for all services

## ✨ Features

- 🔄 **Request Proxying**: Forward requests to appropriate services
- 🚦 **Health Check**: Monitor gateway and service health status
- 🔐 **CORS Support**: Flexible CORS configuration
- 📊 **Logging**: Comprehensive request and response logging
- ⚡ **High Performance**: Built with Bun and Hono for optimal performance
- 🛡️ **Error Handling**: Robust error handling
- 🔧 **Hot Reload**: Development with hot reload
- 📝 **TypeScript**: Full TypeScript support

## 🛠 Technologies

- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Framework**: [Hono.js](https://hono.dev/) - Lightweight and fast web framework
- **Language**: TypeScript
- **Package Manager**: Bun

## 📦 Installation

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- Node.js >= 18 (optional, for compatibility)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ItPohgero/Simple-Gateway.git
   cd Simple-Gateway
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Edit the .env file** according to your configuration:

   ```env
   PORT=3000
   NODE_ENV=development
   
   # Service URLs
   SSO_SERVICE_URL=https://sso-service.com
   CORE_SERVICE_URL=https://core-service.com
   CHAT_SERVICE_URL=https://chat-service.com
   ISLAMIC_SERVICE_URL=https://islamic-service.com
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
   ```

## ⚙️ Configuration

The gateway uses environment variable-based configuration. Here are the available configurations:

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `SSO_SERVICE_URL` | SSO service URL | `https://sso.com` |
| `CORE_SERVICE_URL` | Core service URL | `https://core.com` |
| `CHAT_SERVICE_URL` | Chat service URL | `https://chat.com` |
| `ISLAMIC_SERVICE_URL` | Islamic service URL | `https://islamic.com` |
| `CORS_ORIGIN` | CORS allowed origins | `*` |

### Configuration Structure

```typescript
interface ServiceConfig {
    baseUrl: string;
    timeout?: number;
}

interface GatewayConfig {
    port: number;
    services: Record<string, ServiceConfig>;
    cors: {
        origin: string[];
        methods: string[];
        headers: string[];
    };
}
```

## 🚀 Usage

### Running Development Server

```bash
bun run dev
```

The gateway will run at `http://localhost:3000`

### Build for Production

```bash
bun build
```

### Running in Production

```bash
bun start
```

## 📁 Project Structure

```bash
x-apig/
├── src/
│   ├── config/           # Application configuration
│   │   └── index.ts
│   ├── constants/        # Constants and service definitions
│   │   └── services.ts
│   ├── middleware/       # Middleware for CORS and logging
│   │   ├── cors.ts
│   │   └── logger.ts
│   ├── routes/           # Route handlers
│   │   └── gateway.ts
│   ├── services/         # Proxy services
│   │   ├── proxy.ts
│   │   └── proxy-backup.ts
│   ├── types/            # TypeScript type definitions
│   │   └── api.ts
│   ├── utils/            # Utility functions
│   │   └── response.ts
│   └── index.ts          # Application entry point
├── bun.lock             # Dependency lock file
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # Documentation
```

## 📡 API Endpoints

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "gateway": "api-gateway",
  "version": "1.0.0",
  "services": ["sso", "core", "chat", "islamic"]
}
```

### Service Proxy

The gateway forwards requests with the pattern:

```bash
/api/{service}/{domain}/{function}
```

**Examples:**

- `/api/sso/auth/login` → forwarded to SSO service
- `/api/core/user/profile` → forwarded to Core service
- `/api/chat/message/send` → forwarded to Chat service
- `/api/islamic/prayer/times` → forwarded to Islamic service

### Service Routes

| Prefix | Service | Base URL |
|--------|---------|----------|
| `/api/sso` | SSO Service | `SSO_SERVICE_URL` |
| `/api/core` | Core Service | `CORE_SERVICE_URL` |
| `/api/chat` | Chat Service | `CHAT_SERVICE_URL` |
| `/api/islamic` | Islamic Service | `ISLAMIC_SERVICE_URL` |

## 🔧 Supported Services

### 1. SSO Service

- **Prefix**: `/api/sso`
- **Function**: User authentication and authorization
- **Endpoints**: `/api/sso/{domain}/{function}`

### 2. Core Service

- **Prefix**: `/api/core`
- **Function**: Core application services
- **Endpoints**: `/api/core/{domain}/{function}`

### 3. Chat Service

- **Prefix**: `/api/chat`
- **Function**: Messaging and chat services
- **Endpoints**: `/api/chat/{domain}/{function}`

### 4. Islamic Service

- **Prefix**: `/api/islamic`
- **Function**: Islamic-related services
- **Endpoints**: `/api/islamic/{domain}/{function}`

## 🔄 Middleware

### 1. CORS Middleware

- Handles Cross-Origin Resource Sharing
- Dynamic configuration through environment variables
- Supports preflight requests

### 2. Logger Middleware

- Logs all HTTP requests
- Information includes method, URL, and response time
- Easy-to-read log format

### 3. Error Handler

- Global error handling
- Consistent error responses
- Debug information in development mode

## 🛠 Development

### Adding a New Service

1. **Update configuration** in `src/config/index.ts`:

   ```typescript
   services: {
     // ... existing services
     newservice: {
       baseUrl: process.env.NEW_SERVICE_URL || 'https://newservice.com',
       timeout: 30000
     }
   }
   ```

2. **Add constant** in `src/constants/services.ts`:

   ```typescript
   export const SERVICE_ROUTES = [
     // ... existing routes
     { prefix: '/api/newservice', service: 'newservice' as const }
   ];
   ```

3. **Update environment variables**:

   ```env
   NEW_SERVICE_URL=https://your-new-service.com
   ```

### Testing

```bash
# Test health check
curl http://localhost:3000/health

# Test service proxy
curl http://localhost:3000/api/sso/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test"}'
```

### Debugging

For detailed debugging, set the environment:

```bash
NODE_ENV=development bun run dev
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow existing code style
- Add tests for new features
- Update documentation when necessary

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

### Wahyu Agus Arifin (ItPohgero)

- 🌐 GitHub: [@ItPohgero](https://github.com/ItPohgero)
- 📧 Email: <itpohgero@gmail.com>
- 🐦 Twitter: [@ItPohgero](https://twitter.com/ItPohgero)

---

⭐ If this project helps you, please give a star to this repository!

## 📞 Support

If you find bugs or have questions, please:

1. Create an issue at [GitHub Issues](https://github.com/ItPohgero/Simple-Gateway/issues)
2. Contact via email
3. Discuss in GitHub Discussions

## 🔮 Roadmap

- [ ] Rate limiting
- [ ] Authentication middleware
- [ ] Request/Response caching
- [ ] Load balancing
- [ ] Metrics and monitoring
- [ ] Docker support
- [ ] API versioning
- [ ] Request validation

---

<div align="center">
  <p>Made with ❤️ by <strong>Wahyu Agus Arifin (ItPohgero)</strong></p>
  <p>© 2024 Simple Gateway. All rights reserved.</p>
</div>
