import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';
import { swaggerTags } from './swagger.tags';
import { swaggerSchemas } from './swagger.schemas';
import { swaggerPaths } from './swagger.paths';
import { swaggerResponses } from './swagger.responses';
import  Environment   from '../../../shared/constants/environment';

const getServerUrl = () => {
  const environment = Environment.nodeEnv || 'local'; // || 'developement';
  console.log(Environment.nodeEnv);

  if (environment === 'production') {
    return 'https://vivid-carrie-hache-b27df325.koyeb.app/';
  } else if (environment === 'staging') {
    return 'https://tu-staging-url.koyeb.app/'; // Opcional: para staging
  } else if (environment === 'development') {
    return 'https://vivid-carrie-hache-b27df325.koyeb.app/'; // Opcional: para staging
  } else {
    return 'http://localhost:3000';
  }
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hexagonal API',
    version: '1.0.0',
    description: 'API con Arquitectura Hexagonal y Swagger',
  },
  servers: [
     {
      url: getServerUrl(),
      description: `Servidor ${process.env.NODE_ENV || 'local'}`
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