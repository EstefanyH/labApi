export const loginRequestSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: '41111111'
    },
    password: {
      type: 'string',
      format: 'password',
      example: '41111111'
    }
  }
};

export const loginResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    message: {
      type: 'string',
      example: 'Login exitoso'
    },
    data: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        },
        user: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};