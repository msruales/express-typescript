import {sign, verify} from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET || 'Este es el secret del token'


const generateToken = <T extends object>(payload: T): Promise<string> => {
    return new Promise( (resolve, reject) => {

        sign({...payload}, JWT_SECRET, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err || token === undefined ) {
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const verifyToken = <T extends object>(jwt: string) => {
     return verify(jwt, JWT_SECRET) as T
}

export {
    generateToken,
    verifyToken
}