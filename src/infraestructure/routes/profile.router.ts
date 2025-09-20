import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

export function profileRoute(controller: ProfileController): Router {
    const router = Router();

    router.post('/', (req, res) => controller.create(req, res));
    router.get('/:id', (req, res) => controller.findId(req, res));
    router.put('/:id', (req, res) => controller.update(req, res)); // ← Nueva ruta PUT
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
}