import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../infraestructure/config/swagger/swagger.config';
import { ProfileRepository } from '../../infraestructure/persistence/repositories/profile.repository';
import { ProfileServiceImpl } from '../../domain/servicesImpl/profile.service.impl';
import { ProfileController } from '../../infraestructure/controllers/profile.controller';
import { profileRoute } from '../../infraestructure/routes/profile.router';

export class Server {
  private app = express();

  constructor() {
    this.setupMiddleware();
    this.setupSwagger(); // ← DESCOMENTADO
    this.setupDependencies();
    this.setupRoutes();
  }

  private setupDependencies(){
    const profileRepository = new ProfileRepository();
    const profileService = new ProfileServiceImpl(profileRepository);
    const profileController = new ProfileController(profileService); // ← Corregido

    const profileRoutes = profileRoute(profileController); // ← Variable correcta

    this.app.use('/api/profile', profileRoutes); // ← Variable correcta
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
  }

  private setupSwagger(): void {
    // Servir documentación Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Endpoint para obtener el spec JSON
    this.app.get('/api-docs.json', (req, res) => {
      res.json(swaggerSpec);
    });
  }

  private setupRoutes(): void {
    this.app.get("/health", (req, res) => {
      res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        service: "user-service",
        docs: "/api-docs" // ← Agregar link para referencia
      });
    });

    // Manejo de rutas no encontradas (DEBE IR AL FINAL)
    this.app.use("*", (req, res) => {
      res.status(404).json({ 
        error: "Route not found",
        path: req.originalUrl,
        availableRoutes: [
          "/health",
          "/api-docs",
          "/api-docs.json",
          "/api/profile"
        ]
      });
    });
  }

  public start(port: number) {
    try {
      this.app.listen(port, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
        console.log(`📚 Swagger UI: http://localhost:${port}/api-docs`);
        console.log(`📋 Swagger JSON: http://localhost:${port}/api-docs.json`);
        console.log(`👤 Profile API: http://localhost:${port}/api/profile`);
        console.log(`❤️ Health: http://localhost:${port}/health`);
      });
    } catch (error) {
      console.error('Error al iniciar servidor:', error);
      process.exit(1);
    }
  }
}