import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export function authRoute(controller: AuthController): Router {
    const router = Router();
    router.post('/login', (req, res) => controller.login(req, res));

    return router;
}