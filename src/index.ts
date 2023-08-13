import dotenv from "dotenv"
import Server from "./server/server";

//Configuracion de dont.env
dotenv.config();
const server = new Server();

server.listen();
