import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
 
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginResponse'
   *       401:
   *         description: Credenciales inválidas
   *       500:
   *         description: Error interno del servidor
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      const result = await this.loginUseCase.execute({ email, password });
      
      res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}