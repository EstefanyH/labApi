export const swaggerSchemas = {
    // Schema para la respuesta estándar
  ApiResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: 'Operación exitosa' },
      data: { type: 'object', description: 'Datos de la respuesta' },
      error: { type: 'string', description: 'Mensaje de error (solo si success es false)' },
      timestamp: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' }
    }
  },

  Profile: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Juan Pérez' },
      email: { type: 'string', format: 'email', example: 'juan@email.com' },
      createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' }
    }
  },
  Error: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: 'Error message' },
      error: { type: 'string', example: 'Detailed error' },
      timestamp: { type: 'string', format: 'date-time' }
    }
  }
};