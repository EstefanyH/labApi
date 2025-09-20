import { HttpStatus } from '../constants/http-status';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  statusCode: number; // ← Nuevo campo
}

export class ResponseUtil {
  static success<T>(message: string, data?: T, statusCode: number = HttpStatus.OK): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      statusCode,
      timestamp: new Date().toISOString()
    };
  }

  static error(message: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
      statusCode,
      timestamp: new Date().toISOString()
    };
  }

  // Métodos específicos para cada status code
  static created<T>(message: string, data?: T): ApiResponse<T> {
    return this.success(message, data, HttpStatus.CREATED);
  }

  static accepted<T>(message: string, data?: T): ApiResponse<T> {
    return this.success(message, data, HttpStatus.ACCEPTED);
  }

  static noContent(message: string = 'No content'): ApiResponse {
    return this.success(message, undefined, HttpStatus.NO_CONTENT);
  }

  static badRequest(message: string = 'Solicitud incorrecta', error?: string): ApiResponse {
    return this.error(message, HttpStatus.BAD_REQUEST, error);
  }

  static unauthorized(message: string = 'No autorizado', error?: string): ApiResponse {
    return this.error(message, HttpStatus.UNAUTHORIZED, error);
  }

  static forbidden(message: string = 'Acceso prohibido', error?: string): ApiResponse {
    return this.error(message, HttpStatus.FORBIDDEN, error);
  }

  static notFound(message: string = 'Recurso no encontrado', error?: string): ApiResponse {
    return this.error(message, HttpStatus.NOT_FOUND, error);
  }

  static conflict(message: string = 'Conflicto', error?: string): ApiResponse {
    return this.error(message, HttpStatus.CONFLICT, error);
  }

  static unprocessableEntity(message: string = 'Entidad no procesable', error?: string): ApiResponse {
    return this.error(message, HttpStatus.UNPROCESSABLE_ENTITY, error);
  }

  static serverError(message: string = 'Error interno del servidor', error?: string): ApiResponse {
    return this.error(message, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }

  static notImplemented(message: string = 'No implementado', error?: string): ApiResponse {
    return this.error(message, HttpStatus.NOT_IMPLEMENTED, error);
  }
}