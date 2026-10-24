import { email, z } from 'zod'

export const  signupPayload = z.object({
    firstName : z.string().nonempty().min(2),
    lastName : z.string().nullable().optional(),
    email : z.email(),
    password : z.string().min(6).max(8)
})


export const loginPayload = z.object({
    email : z.email(),
    password : z.string().min(6).max(8)
})