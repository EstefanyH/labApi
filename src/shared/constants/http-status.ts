export class HttpStatus {
  // Success
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly ACCEPTED = 202;
  static readonly NO_CONTENT = 204;

  // Client errors
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly METHOD_NOT_ALLOWED = 405;
  static readonly CONFLICT = 409;
  static readonly UNPROCESSABLE_ENTITY = 422;

  // Server errors
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly BAD_GATEWAY = 502;
  static readonly SERVICE_UNAVAILABLE = 503;

  // Métodos de utilidad
  static isSuccess(code: number): boolean {
    return code >= 200 && code < 300;
  }

  static isClientError(code: number): boolean {
    return code >= 400 && code < 500;
  }

  static isServerError(code: number): boolean {
    return code >= 500 && code < 600;
  }

  static getStatusText(code: number): string {
    const statusTexts: { [key: number]: string } = {
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
      501: 'Not Implemented',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    };

    return statusTexts[code] || 'Unknown Status';
  }
}