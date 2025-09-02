import { CorsOptions } from 'cors';
import cors from 'cors';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // 1. Permitir requests sin origin (Postman, curl, mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    // 2. Lista de orígenes permitidos
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://vivid-carrie-hache-b27df325.koyeb.app',
      'http://localhost:3000',
      'http://localhost:5173', // Agrega también el puerto de Vite
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ].filter(Boolean) as string[];

    // 3. En desarrollo, permitir localhost y 127.0.0.1
    if (process.env.NODE_ENV === 'development') {
      const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
      if (isLocalhost) {
        return callback(null, true);
      }
    }

    // 4. Verificar si el origin está en la lista permitida
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      // Para comparación exacta
      if (origin === allowedOrigin) {
        return true;
      }
      
      // Para manejar wildcards o subdominios
      if (allowedOrigin.includes('*')) {
        const domain = allowedOrigin.replace('*.', '');
        return origin.endsWith(domain);
      }
      
      return false;
    });

    // 5. Devolver resultado
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('🚫 CORS bloqueado para origin:', origin);
      console.log('✅ Orígenes permitidos:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

export const corsMiddleware = cors(corsOptions);