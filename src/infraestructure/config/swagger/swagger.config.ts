import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';
import { swaggerTags } from './swagger.tags';
import { swaggerSchemas } from './swagger.schemas';
import { swaggerPaths } from './swagger.paths';
import { swaggerResponses } from './swagger.responses';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hexagonal API',
    version: '1.0.0',
    description: 'API con Arquitectura Hexagonal y Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  tags: swaggerTags,
  paths: swaggerPaths,
  components: {
    schemas: swaggerSchemas,
    responses: swaggerResponses
  }
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);