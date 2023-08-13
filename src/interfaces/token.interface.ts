import {Types} from "mongoose";

export interface TokenPayload {
    uid: Types.ObjectId,
    email: string
}