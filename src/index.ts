import { Server } from "./interfaces/http/server";
import * as dotenv from 'dotenv';

dotenv.config();

export * from './interfaces/middlewares/cors.middleware';

const PORT = process.env.PORT || 3000;

const server = new Server();
server.start(Number(PORT));