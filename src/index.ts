import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from "./interfaces/http/server";
export * from './interfaces/middlewares/cors.middleware';

const port = Number(process.env.PORT) || 3000;

const server = new Server(port);
server.start();