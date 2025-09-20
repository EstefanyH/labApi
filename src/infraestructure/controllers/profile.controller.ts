import { ProfileService } from "../../domain/services/profile.service";
import { Request, Response } from 'express';
import { ResponseUtil } from "../../shared/dto/api-response.dto";
import { HttpStatus } from "../../shared/constants/http-status";

export class ProfileController {
    constructor(private _service: ProfileService) {}

    async create(req: Request, res: Response): Promise<void> {
        try{
            const { name, lastname, documentId, documentNumber } = req.body;
            const model = {
                name,
                lastname,
                documentId,
                documentNumber
            };

            if (!name || !documentNumber) {
                const response = ResponseUtil.badRequest('Nombre y email son requeridos');
                res.status(HttpStatus.BAD_REQUEST).json(response);
                return;
            }
            
            const result = await this._service.create(model);
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

    async update(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const { name, lastname, documentId, documentNumber } = req.body;
            
            const profileId = Number(id);
            const type = Number(documentId);
            
            const model = {
                id : profileId,
                name,
                lastname,
                documentId: type,
                documentNumber
            };

            if (!name || !documentId || !documentNumber) {
                const response = ResponseUtil.badRequest('Nombre y email son requeridos');
                res.status(HttpStatus.BAD_REQUEST).json(response);
                return;
            }
            
            const result = await this._service.update(model);
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

    async findId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await this._service.findById(Number(id));
      // Simular búsqueda en base de datos
      if (result == null) {
        const response = ResponseUtil.notFound('Perfil no encontrado');
        res.status(HttpStatus.NOT_FOUND).json(response);
        return;
      } 

      const response = ResponseUtil.success('Perfil obtenido exitosamente', result);
      res.status(HttpStatus.OK).json(response);
      
    } catch (error) {
      const response = ResponseUtil.serverError('',
        error instanceof Error ? error.message : 'Unknown error'
      );
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
    
      const result = await this._service.delete(Number(id));
       
      const response = ResponseUtil.noContent('Perfil eliminado exitosamente');
      res.status(HttpStatus.NO_CONTENT).json(response);
      
    } catch (error) {
      const response = ResponseUtil.serverError(
        'Error al eliminar el perfil',
        error instanceof Error ? error.message : 'Unknown error'
      );
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }


}