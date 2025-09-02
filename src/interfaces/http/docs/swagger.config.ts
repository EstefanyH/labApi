import swaggerJSDoc from 'swagger-jsdoc';
import { userSchema, userResponseSchema } from './schemas/user.schema';
import { loginRequestSchema, loginResponseSchema } from './schemas/auth.schema';

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
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
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