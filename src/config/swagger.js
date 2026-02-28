const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Whatsapp Gateway Cht API',
            version: '1.4.0',
            description: `Backend API WhatsApp yang andal dibangun dengan Express.js dan pustaka Baileys.

## Tautan Cepat
- [🎛️ Dasbor](/dashboard) - Dasbor Admin dengan Penguji API
- [🔌 Uji WebSocket](/ws-test) - Uji event WebSocket real-time
- [📄 OpenAPI JSON](/api-docs.json) - Unduh spesifikasi API


## Fitur
- Dukungan Multi-Sesi
- Event WebSocket Real-time
- Manajemen Grup
- Kirim Pesan (Teks, Gambar, Dokumen, Lokasi, Kontak)
- Simpan Media Otomatis
- Penyimpanan Persisten
- Autentikasi API Key

## Autentikasi
Semua endpoint API memerlukan header \`X-Api-Key\` (jika API_KEY dikonfigurasi di .env).

## Dokumentasi Lengkap
- [https://docs.chatery.app](https://docs.chatery.app)
- [https://chatery-whatsapp-documentation.appwrite.network](https://chatery-whatsapp-documentation.appwrite.network)

## Dukung Proyek Ini
- [⭐ Star di GitHub](https://github.com/mfth12/wa-gateway-cht) - Beri kami bintang!
- [☕ Dukung Kami (saweria)](https://saweria.co/mfth12) - Dukung pengembang

            `,
            contact: {
                name: 'Miftahul Haq',
                email: 'ciftah12@gmail.com',
                url: 'https://github.com/mfth12'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: '/',
                description: 'Current Server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Local Development'
            }
        ],
        tags: [
            { name: 'Health', description: 'Health check endpoints' },
            { name: 'Sessions', description: 'WhatsApp session management' },
            { name: 'Messaging', description: 'Send messages (text, image, document, etc.)' },
            { name: 'Bulk Messaging', description: 'Send bulk messages to multiple recipients (max 100 per request)' },
            { name: 'Chat History', description: 'Get chats, messages, contacts' },
            { name: 'Groups', description: 'Group management operations' },
            { name: 'WebSocket', description: 'WebSocket connection info' }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-Api-Key',
                    description: 'API Key for authentication (configured in .env)'
                }
            },
            schemas: {
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Operation successful' },
                        data: { type: 'object' }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Error message' }
                    }
                },
                Session: {
                    type: 'object',
                    properties: {
                        sessionId: { type: 'string', example: 'mysession' },
                        status: { type: 'string', enum: ['connecting', 'connected', 'disconnected'], example: 'connected' },
                        isConnected: { type: 'boolean', example: true },
                        phoneNumber: { type: 'string', example: '628123456789' },
                        name: { type: 'string', example: 'John Doe' }
                    }
                },
                Message: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        chatId: { type: 'string' },
                        fromMe: { type: 'boolean' },
                        timestamp: { type: 'integer' },
                        type: { type: 'string' },
                        content: { type: 'object' }
                    }
                },
                Chat: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        isGroup: { type: 'boolean' },
                        unreadCount: { type: 'integer' },
                        lastMessage: { type: 'object' }
                    }
                },
                Group: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        subject: { type: 'string' },
                        owner: { type: 'string' },
                        creation: { type: 'integer' },
                        participants: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    admin: { type: 'string', nullable: true }
                                }
                            }
                        }
                    }
                },
                Webhook: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', format: 'uri', example: 'https://your-server.com/webhook' },
                        events: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['message', 'connection.update']
                        }
                    }
                }
            }
        },
        security: [{ ApiKeyAuth: [] }]
    },
    apis: ['./src/config/swagger-paths.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
