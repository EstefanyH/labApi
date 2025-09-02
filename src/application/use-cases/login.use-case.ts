import { UserRepositoryPort } from '../../domain/ports/user.repository.port';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    password: string;
  };
}

export class LoginUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(request.email);
    
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    // Validación básica de password (en producción usar bcrypt)
    if (user.password !== request.password) {
      return { success: false, message: 'Contraseña incorrecta' };
    }

    return {
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        username: user.username,
        password: user.password
      }
    };
  }
}