export const swaggerPaths = {
  '/api/profile': {
    post: {
      summary: 'Crear un nuevo perfil',
      tags: ['Profiles'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'lastname', 'documentId', 'documentNumber'],
              properties: {
                name: { type: 'string', example: 'Juan' },
                lastname: { type: 'string', example: 'Perez' },
                documentId: { type: 'string', example: '1' },
                documentNumber: { type: 'string', example: '11111111' }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Perfil creado exitosamente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiResponse' }
            }
          }
        },
        '400': { $ref: '#/components/responses/BadRequest' },
        '500': { $ref: '#/components/responses/ServerError' }
      }
    }
  }, 
  // GET PROFILE BY ID - GET
  '/api/profile/{id}': {
    get: {
      summary: 'Obtener un perfil por ID',
      tags: ['Profiles'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { 
            type: 'integer',
            format: 'int64',
            example: 123 
          },
          description: 'ID del perfil'
        }
      ],
      responses: {
        '200': {
          description: 'Perfil obtenido exitosamente',
          content: {
            'application/json': {
              schema: { 
                $ref: '#/components/schemas/ApiResponse' 
              }
            }
          }
        },
        '400': {
          description: 'ID inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        '404': {
          description: 'Perfil no encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        '500': { $ref: '#/components/responses/ServerError' }
      }
    },

    // UPDATE PROFILE - PUT
    put: {
      summary: 'Actualizar un perfil existente',
      tags: ['Profiles'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { 
            type: 'integer',
            format: 'int64',
            example: 123 
          },
          description: 'ID del perfil a actualizar'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { 
                  type: 'string', 
                  example: 'Juan Updated',
                  description: 'Nombre del perfil' 
                },
                lastname: { 
                  type: 'string', 
                  example: 'Pérez Updated',
                  description: 'Apellido del perfil' 
                },
                documentId: { 
                  type: 'number', 
                  example: 1,
                  description: 'Tipo de documento' 
                },
                documentNumber: { 
                  type: 'string', 
                  example: '87654321',
                  description: 'Número de documento' 
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Perfil actualizado exitosamente',
          content: {
            'application/json': {
              schema: { 
                $ref: '#/components/schemas/ApiResponse' 
              }
            }
          }
        },
        '400': {
          description: 'Datos de entrada inválidos'
        },
        '404': {
          description: 'Perfil no encontrado'
        },
        '500': { $ref: '#/components/responses/ServerError' }
      }
    },

    // DELETE PROFILE - DELETE
    delete: {
      summary: 'Eliminar un perfil',
      tags: ['Profiles'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { 
            type: 'integer',
            format: 'int64',
            example: 123 
          },
          description: 'ID del perfil a eliminar'
        }
      ],
      responses: {
        '204': {
          description: 'Perfil eliminado exitosamente',
          content: {
            'application/json': {
              schema: { 
                $ref: '#/components/schemas/ApiResponse' 
              }
            }
          }
        },
        '400': {
          description: 'ID inválido',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        '404': {
          description: 'Perfil no encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        '500': { $ref: '#/components/responses/ServerError' }
      }
    }
  }, // ← CIERRE CORRECTO del objeto /api/profile/{id}

  '/health': {
    get: {
      summary: 'Health check del sistema',
      tags: ['Health'],
      responses: {
        '200': {
          description: 'Sistema funcionando correctamente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'OK' },
                  timestamp: { type: 'string', format: 'date-time' },
                  service: { type: 'string', example: 'user-service' }
                }
              }
            }
          }
        }
      }
    }
  }
};