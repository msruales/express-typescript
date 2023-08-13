import express, {Application} from 'express'
import {dbConnection} from "../database/config";
import cors from "cors"

// Routes
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";

class Server {
    private app: Application;
    private readonly port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',

    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        // Metodos Iniciales
        this.connectDB();
        this.middlewares();
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use( this.apiPaths.auth, authRoutes)
        this.app.use( this.apiPaths.users, userRoutes)
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor !! corriendo en puerto ' + this.port);
        })
    }
}
export default Server;