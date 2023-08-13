import {Types} from "mongoose";

export interface Auth {
    email: string;
    password: string;
}
export interface User extends Auth {
    uid: Types.ObjectId;
    firstName: string;
    lastName?: string;
    username: string;
    gender?: Gender;
}

enum Gender {
    Male = 1,
    Female = 0
}

export type NewUser = Omit<User, "uid">

