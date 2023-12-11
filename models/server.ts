import express from 'express';
import * as authRoutes from '../routes/auth';
import * as penaltyRoutes from '../routes/penalty';
import * as driverRoutes from '../routes/driver';
import cors from 'cors';

class Server {
    
    private app: express.Application;
    private port: string; 

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '4321';

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        const PATH = '/api/v1';
        this.app.use(PATH, authRoutes.default);
        this.app.use(PATH, penaltyRoutes.default);
        this.app.use(PATH, driverRoutes.default);
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server running on port: ' + this.port);
        })
    }
}

export default Server;