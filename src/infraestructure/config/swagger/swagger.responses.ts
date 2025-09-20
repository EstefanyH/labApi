export const swaggerResponses = {
  Success: {
    description: 'Operación exitosa',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ApiResponse'
        }
      }
    }
  },

  Created: {
    description: 'Recurso creado exitosamente',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ApiResponse'
        }
      }
    }
  },

  BadRequest: {
    description: 'Petición incorrecta',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Error' }
      }
    }
  },

  ServerError: {
    description: 'Error interno del servidor',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Error' }
      }
    }
  },

  NotFound: {
    description: 'Recurso no encontrado',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Error' }
      }
    }
  }
};