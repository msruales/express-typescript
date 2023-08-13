import userModel from "../models/user.model";
import {Auth, User} from "../interfaces";
import {verified} from "../utils";

export const checkUser =  ({email, password}: Auth): Promise<User>  => {

    return new Promise(async (resolve, reject)=> {
        const user = await userModel.findOne({email})

        if(!user){
            return reject('Error al intentar ingresar')
        }

        const validPassword = await verified(password, user.password)

        if(!validPassword) {
            return reject('Error al intentar ingresar')
        }

        resolve(user);

    })


}