# Simple Gateway 🚀

[![Author](https://img.shields.io/badge/Author-Wahyu%20Agus%20Arifin-blue?style=flat-square)](https://github.com/ItPohgero)
[![GitHub](https://img.shields.io/badge/GitHub-ItPohgero-black?style=flat-square&logo=github)](https://github.com/ItPohgero)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> API Gateway sederhana yang dibangun dengan Hono.js dan Bun untuk mengelola dan meneruskan permintaan ke berbagai layanan mikro.

## 📖 Daftar Isi

- [Tentang](#-tentang)
- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Konfigurasi](#️-konfigurasi)
- [Penggunaan](#-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [API Endpoints](#-api-endpoints)
- [Layanan yang Didukung](#-layanan-yang-didukung)
- [Middleware](#-middleware)
- [Development](#-development)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)
- [Author](#-author)

## 📋 Tentang

Simple Gateway adalah solusi API Gateway ringan yang dirancang untuk mengelola dan meneruskan permintaan HTTP ke berbagai layanan mikro. Dibangun dengan teknologi modern seperti Hono.js dan Bun, gateway ini menyediakan performa tinggi dengan overhead yang minimal.

### 🎯 Tujuan

- Menyederhanakan komunikasi antar layanan mikro
- Menyediakan titik masuk tunggal untuk semua API
- Mengelola CORS dan logging secara terpusat
- Memberikan monitoring dan health check untuk semua layanan

## ✨ Fitur

- 🔄 **Proxy Request**: Meneruskan permintaan ke layanan yang sesuai
- 🚦 **Health Check**: Monitoring status kesehatan gateway dan layanan
- 🔐 **CORS Support**: Konfigurasi CORS yang fleksibel
- 📊 **Logging**: Logging permintaan dan respons yang komprehensif
- ⚡ **High Performance**: Dibangun dengan Bun dan Hono untuk performa optimal
- 🛡️ **Error Handling**: Penanganan error yang robust
- 🔧 **Hot Reload**: Development dengan hot reload
- 📝 **TypeScript**: Full TypeScript support

## 🛠 Teknologi

- **Runtime**: [Bun](https://bun.sh/) - Runtime JavaScript yang cepat
- **Framework**: [Hono.js](https://hono.dev/) - Web framework yang ringan dan cepat
- **Language**: TypeScript
- **Package Manager**: Bun

## 📦 Instalasi

### Prasyarat

- [Bun](https://bun.sh/) >= 1.0.0
- Node.js >= 18 (opsional, untuk kompatibilitas)

### Langkah Instalasi

1. **Clone repository**

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

4. **Edit file .env** sesuai dengan konfigurasi Anda:

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

## ⚙️ Konfigurasi

Gateway menggunakan konfigurasi berbasis environment variables. Berikut adalah konfigurasi yang tersedia:

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port server | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `SSO_SERVICE_URL` | URL layanan SSO | `https://sso.com` |
| `CORE_SERVICE_URL` | URL layanan Core | `https://core.com` |
| `CHAT_SERVICE_URL` | URL layanan Chat | `https://chat.com` |
| `ISLAMIC_SERVICE_URL` | URL layanan Islamic | `https://islamic.com` |
| `CORS_ORIGIN` | CORS allowed origins | `*` |

### Struktur Konfigurasi

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

## 🚀 Penggunaan

### Menjalankan Development Server

```bash
bun run dev
```

Gateway akan berjalan di `http://localhost:3000`

### Build untuk Production

```bash
bun build
```

### Menjalankan di Production

```bash
bun start
```

## 📁 Struktur Proyek

```bash
x-apig/
├── src/
│   ├── config/           # Konfigurasi aplikasi
│   │   └── index.ts
│   ├── constants/        # Konstanta dan definisi layanan
│   │   └── services.ts
│   ├── middleware/       # Middleware untuk CORS dan logging
│   │   ├── cors.ts
│   │   └── logger.ts
│   ├── routes/           # Route handlers
│   │   └── gateway.ts
│   ├── services/         # Layanan proxy
│   │   ├── proxy.ts
│   │   └── proxy-backup.ts
│   ├── types/            # TypeScript type definitions
│   │   └── api.ts
│   ├── utils/            # Utility functions
│   │   └── response.ts
│   └── index.ts          # Entry point aplikasi
├── bun.lock             # Lock file dependencies
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # Dokumentasi
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

Gateway meneruskan permintaan dengan pola:

```bash
/api/{service}/{domain}/{function}
```

**Contoh:**

- `/api/sso/auth/login` → diteruskan ke SSO service
- `/api/core/user/profile` → diteruskan ke Core service
- `/api/chat/message/send` → diteruskan ke Chat service
- `/api/islamic/prayer/times` → diteruskan ke Islamic service

### Service Routes

| Prefix | Service | Base URL |
|--------|---------|----------|
| `/api/sso` | SSO Service | `SSO_SERVICE_URL` |
| `/api/core` | Core Service | `CORE_SERVICE_URL` |
| `/api/chat` | Chat Service | `CHAT_SERVICE_URL` |
| `/api/islamic` | Islamic Service | `ISLAMIC_SERVICE_URL` |

## 🔧 Layanan yang Didukung

### 1. SSO Service

- **Prefix**: `/api/sso`
- **Fungsi**: Autentikasi dan otorisasi pengguna
- **Endpoints**: `/api/sso/{domain}/{function}`

### 2. Core Service

- **Prefix**: `/api/core`
- **Fungsi**: Layanan inti aplikasi
- **Endpoints**: `/api/core/{domain}/{function}`

### 3. Chat Service

- **Prefix**: `/api/chat`
- **Fungsi**: Layanan pesan dan chat
- **Endpoints**: `/api/chat/{domain}/{function}`

### 4. Islamic Service

- **Prefix**: `/api/islamic`
- **Fungsi**: Layanan terkait Islam
- **Endpoints**: `/api/islamic/{domain}/{function}`

## 🔄 Middleware

### 1. CORS Middleware

- Menghandle Cross-Origin Resource Sharing
- Konfigurasi dinamis melalui environment variables
- Mendukung preflight requests

### 2. Logger Middleware

- Logging semua permintaan HTTP
- Informasi method, URL, dan waktu respons
- Format log yang mudah dibaca

### 3. Error Handler

- Global error handling
- Response error yang konsisten
- Debug information di development mode

## 🛠 Development

### Menambahkan Service Baru

1. **Update konfigurasi** di `src/config/index.ts`:

   ```typescript
   services: {
     // ... existing services
     newservice: {
       baseUrl: process.env.NEW_SERVICE_URL || 'https://newservice.com',
       timeout: 30000
     }
   }
   ```

2. **Tambahkan konstanta** di `src/constants/services.ts`:

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

Untuk debugging yang lebih detail, set environment:

```bash
NODE_ENV=development bun run dev
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines

- Gunakan TypeScript untuk type safety
- Follow existing code style
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika diperlukan

## 📄 Lisensi

Proyek ini dilisensikan under MIT License. Lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Author

### Wahyu Agus Arifin (ItPohgero)

- 🌐 GitHub: [@ItPohgero](https://github.com/ItPohgero)
- 📧 Email: <itpohgero@gmail.com>
- 🐦 Twitter: [@ItPohgero](https://twitter.com/ItPohgero)

---

⭐ Jika proyek ini membantu Anda, berikan star pada repository ini!

## 📞 Support

Jika Anda menemukan bug atau memiliki pertanyaan, silakan:

1. Buat issue di [GitHub Issues](https://github.com/ItPohgero/Simple-Gateway/issues)
2. Contact via email
3. Diskusi di GitHub Discussions

## 🔮 Roadmap

- [ ] Rate limiting
- [ ] Authentication middleware
- [ ] Request/Response caching
- [ ] Load balancing
- [ ] Metrics dan monitoring
- [ ] Docker support
- [ ] API versioning
- [ ] Request validation

---

<div align="center">
  <p>Made with ❤️ by <strong>Wahyu Agus Arifin (ItPohgero)</strong></p>
  <p>© 2024 Simple Gateway. All rights reserved.</p>
</div>
