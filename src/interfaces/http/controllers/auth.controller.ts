import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

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