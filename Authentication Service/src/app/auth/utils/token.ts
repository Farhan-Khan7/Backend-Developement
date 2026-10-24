import JWT from "jsonwebtoken"
require("dotenv/config");
import { config } from "dotenv"

export interface userTokenPayload {
    id: string
}

export function createUserToken(payload: userTokenPayload) {
    const token = JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'myjwtsecret')
    return token
}

export function verifyUserToken(token: string) {
    try {
        const payload = JWT.verify(token, process.env.REFRESH_TOKEN_SECRET || 'myjwtsecret') as userTokenPayload
        return payload
    }catch(error){
        return null
    }
}


