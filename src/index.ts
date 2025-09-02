import { Server } from "./interfaces/http/server";

const server = new Server(3000);
server.start();