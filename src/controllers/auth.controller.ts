import {Request, Response} from "express";
import {generateToken} from "../utils";
import {TokenPayload} from "../interfaces";
import {addUser,checkUser} from "../services";

export const login = async (req: Request , res: Response) => {
    const {body} = req;
    const {email,password} = body;

    try {
        const user = await checkUser({email, password})

        const jwt = await generateToken<TokenPayload>({uid: user.uid, email})

        res.json({
            msg: 'ok',
            user,
            jwt
        })
    }catch (e){
        res.status(500).json({
            msg: e,
        })
    }

}

export const register = async (req: Request , res: Response) => {
    try{
        const {body} = req;

        const newUser = await addUser(body);

        const jwt = await generateToken<TokenPayload>({uid: newUser.uid, email: newUser.email})

        res.json({
            msg: 'register',
            token: jwt,
            user: newUser
        })
    }catch (e){
        res.status(500).json({
            msg: 'Error al registrar',
        })
    }

}