import {Request, Response} from "express";
import userModel from "../models/user.model";
import {userAuth} from "../middlewares/auth.middleware";

export const getUsers = async (req: Request , res: Response) => {

    try {
        const userAuthenticated = userAuth(req)

        const users = await userModel.find({})


        res.json({
            msg: 'getUsers',
            userAuthenticated,
            users
        })
    }catch (e) {
        res.status(500).json({
            msg: 'Algo salio mal',
        })
    }

}

export const getUser = (req: Request , res: Response) => {
    const {id} = req.params;

    res.json({
        msg: 'getUser',
        id,
    })
}

export const postUser = (req: Request , res: Response) => {
    const {body} = req;

    res.json({
        msg: 'postUser',
        body
    })
}
export const putUser = (req: Request , res: Response) => {
    const {id} = req.params;
    const {body} = req;

    res.json({
        msg: 'deleteUser',
        body,
        id
    })
}

export const deleteUser = (req: Request , res: Response) => {
    const {id} = req.params;
    const {body} = req;

    res.json({
        msg: 'putUsers',
        body,
        id
    })
}