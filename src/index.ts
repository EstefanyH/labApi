import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from "./interfaces/http/server";

const port = Number(process.env.PORT) || 3000;

const server = new Server(port);
server.start();