import swaggerJSDoc from 'swagger-jsdoc';
import { userSchema, userResponseSchema } from './schemas/user.schema';
import { loginRequestSchema, loginResponseSchema } from './schemas/auth.schema';


// Determinar la URL base según el entorno
const getServerUrl = (): string => {
  const env = process.env.NODE_ENV || 'development';
  const port = process.env.PORT || '3000';
  
  if (env === 'production') {
    return process.env.FRONTEND_URL || 'http://localhost:3000';
  }
  
  // Para desarrollo y otros entornos
  return `http://localhost:${port}`;
};


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hexagonal API',
    version: '1.0.0',
    description: 'API con Arquitectura Hexagonal y Swagger',
    contact: {
      name: 'Tu Nombre',
      email: 'tu@email.com'
    }
  },
   servers: [
    {
      url: getServerUrl(),
      description: process.env.NODE_ENV === 'production' 
        ? 'Servidor de producción' 
        : 'Servidor local'
    },
    // Servidor adicional para desarrollo si estás en producción
    ...(process.env.NODE_ENV === 'production' ? [{
      url: 'http://localhost:3000',
      description: 'Servidor local (desarrollo)'
    }] : [])
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: userSchema,
      UserResponse: userResponseSchema,
      LoginRequest: loginRequestSchema,
      LoginResponse: loginResponseSchema
    }
  }
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [
    './src/interfaces/http/controllers/*.ts',
    './src/interfaces/http/server.ts'
  ],
};

export const swaggerSpec = swaggerJSDoc(options);