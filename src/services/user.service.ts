import userModel from "../models/user.model";
import {User,NewUser} from "../interfaces";
export const addUser = async (newUser: NewUser): Promise<User> => {

    try{
        return await userModel.create({
            ...newUser
        })
    }catch (e){
       throw new Error('No se pudo crear el usuario')
    }

}


