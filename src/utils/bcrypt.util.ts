import {compare, hash} from "bcryptjs"

const encrypt = async (pass: string):Promise<string> => {
    return await hash(pass, 8);
}

const verified = async (pass: string, passHash: string):Promise<boolean> => {
    return await compare(pass,passHash);
}

export {
    encrypt,
    verified
}