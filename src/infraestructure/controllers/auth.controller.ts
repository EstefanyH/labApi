import { AuthService } from "../../domain/services/auth.service";
import { HttpStatus } from "../../shared/constants/http-status";
import { ResponseUtil } from "../../shared/dto/api-response.dto";
import { Request, Response } from 'express';

export class AuthController {
    constructor(private _service: AuthService) {}
    
    async login(req: Request, res: Response): Promise<void> {
        try{
            const { username, password } = req.body;
            
            if (!username || !password) {
                const response = ResponseUtil.badRequest('Nombre y email son requeridos');
                res.status(HttpStatus.BAD_REQUEST).json(response);
                return;
            }
            
            const result = await this._service.findUser(username, password);
            const response = ResponseUtil.created('', result);
            res.status(HttpStatus.CREATED).json(response);

        }catch(err){
            const response = ResponseUtil.serverError(
                'Error interno del servidor',
                err instanceof Error ? err.message : 'Unknown error'
            );
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
        }
    }
}