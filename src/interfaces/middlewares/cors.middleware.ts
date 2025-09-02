import { CorsOptions } from 'cors';
import cors from 'cors';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Desarrollo: permite localhost y sin origin
    if (!origin || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // Producción: origines específicos
    const allowedOrigins = [
      'https://vivid-carrie-hache-b27df325.koyeb.app',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean) as string[];

    const isAllowed = allowedOrigins.some(allowedOrigin => 
      origin === allowedOrigin || origin.endsWith(allowedOrigin.replace('*.', ''))
    );

    isAllowed ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

export const corsMiddleware = cors(corsOptions);