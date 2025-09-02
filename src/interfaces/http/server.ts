import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from '../../infraestructure/persistence/repositories/user.repository';
//import { TursoClient } from '../../infraestructure/persistence/database/turso.client';
//import { DIContainer } from '../../infraestructure/config/di.container';
import { swaggerSpec } from './docs/swagger.config';


export class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number = 3000) {
    
    this.app = express();
    this.port = port;
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupSwagger();
  }

  private setupMiddleware(): void {
    
    this.app.use(express.json());
  }

  private setupSwagger(): void {
    // Servir documentación Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Endpoint para obtener el spec JSON
    this.app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }

  private setupRoutes(): void {
    // Inicializar dependencias
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository);
    const authController = new AuthController(loginUseCase);

    // Rutas
    this.app.post('/api/auth/login', (req, res) => authController.login(req, res));
    
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Servidor funcionando' });
    });
  }

  public async start(): Promise<void> {
    try {
      
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${this.port}`);
        console.log(`📚 Swagger UI: http://localhost:${this.port}/api-docs`);
        console.log(`🔐 Login: POST http://localhost:${this.port}/api/auth/login`);
        console.log(`❤️ Health: GET http://localhost:${this.port}/health`);
      });
    } catch (error) {
      console.error('Error al iniciar servidor:', error);
      process.exit(1);
    }
  }
}