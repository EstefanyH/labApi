import express from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from '../../infraestructure/persistence/repositories/user.repository';
import { Database } from '../../infraestructure/persistence/database/database';

export class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    // Inicializar dependencias
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository);
    const authController = new AuthController(loginUseCase);

    // Rutas
    this.app.post('/api/login', (req, res) => authController.login(req, res));
    
    // Ruta de health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Servidor funcionando' });
    });
  }

  public async start(): Promise<void> {
    try {
      // Conectar a base de datos
      await Database.connect();
      
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${this.port}`);
        console.log(`📋 Health check: http://localhost:${this.port}/health`);
        console.log(`🔐 Login: POST http://localhost:${this.port}/api/login`);
      });
    } catch (error) {
      console.error('Error al iniciar servidor:', error);
      process.exit(1);
    }
  }
}