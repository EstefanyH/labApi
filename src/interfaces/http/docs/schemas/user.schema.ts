export const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '1'
    },
    email: {
      type: 'string',
      example: 'usuario@example.com'
    },
    name: {
      type: 'string',
      example: 'Juan Pérez'
    }
  }
};

export const userResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'Operación exitosa'
    },
    data: {
      $ref: '#/components/schemas/User'
    }
  }
};