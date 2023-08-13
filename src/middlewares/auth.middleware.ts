import {NextFunction,Request, Response} from "express";
import {verifyToken} from "../utils";
import {TokenPayload, User} from "../interfaces";
import userModel from "../models/user.model";

export interface RequestAuth extends Request {
    user: User
}

export const userAuth = (reqExpress: Request): User | null => {
    const req = reqExpress as RequestAuth

    if(req?.user){
        return req.user
    }else {
        return null
    }
}
const authMiddleware = async( expressRequest : Request, res : Response, next: NextFunction ) => {

    const req = expressRequest as RequestAuth
    const token = req.header('x-token');

    if ( !token ) {
         res.status(401).json({
            msg: 'No hay token en la petición'
        });
        return
    }

    try {

        const {email} = verifyToken<TokenPayload>(  token );
        // leer el usuario que corresponde al uid
        const user = await userModel.findOne({email} );
        if( !user ) {
             res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
            return
        }

        // Verificar si el uid tiene estado true
        // if ( !user.estado ) {
        //      res.status(401).json({
        //         msg: 'Token no válido - usuario con estado: false'
        //     })
        //     return
        // }
        req.user = user;
        res.locals.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

export default authMiddleware;