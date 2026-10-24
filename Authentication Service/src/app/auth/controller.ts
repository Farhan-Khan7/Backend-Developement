import type { Request, Response } from "express";
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { signupPayload, loginPayload } from "../models";
import { db } from "../../db";
import { userTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { error } from "console";
import { createUserToken, userTokenPayload } from "./utils/token";


export class AuthenticationController {
    public async handleSignup(req: Request, res: Response) {
        const validationResult = await signupPayload.safeParseAsync(req.body);

        if (validationResult.error) {
            return res
                .status(400)
                .json({ message: "Validation failed!", error: validationResult.error.issues });
        }

        const { firstName, lastName, email, password } = validationResult.data

        const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email))

        if (userEmailResult.length > 0) {
            return res.status(400).json({
                error: `Duplicate Entry `,
                message: `user with email ${email} already exist`
            })
        }

        const salt = crypto.randomBytes(30).toString("hex")
        const hash = crypto.createHmac("sha256", salt).update(password).digest('hex')

        const result = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password: hash,
            salt
        }).returning({ id: userTable.id })

        return res.status(201).json({
            message: "user has been created successfully!",
            date: {
                id: result[0]?.id
            }
        })

    }

    public async handleLogin(req: Request, res: Response) {
        const validationResult = await loginPayload.safeParseAsync(req.body)

        if (validationResult.error) {
            return res.status(400).json({
                message: "body validation failed",
                error: validationResult.error.issues
            })
        }

        const { email, password } = validationResult.data

        const [userExist] = await db.select().from(userTable).where(eq(userTable.email, email))

        if (!userExist) {
            return res.status(404).json({
                message: `user with email ${email} does not exist`
            })
        }

        const salt = userExist.salt!
        const hash = crypto.createHmac("sha256", salt).update(password).digest("hex")

        if (userExist.password !== hash) {
            return res.status(400).json({
                message: `email or password is incorrect`
            })
        }
        {
            // Token banao or return kardo 

            const token = createUserToken({ id: userExist.id })


            return res.status(200).json({
                message: `LogIn successfully `,
                data: {
                    token
                }
            })

        }

    }

    public async handleMe(req : Request, res: Response) {
        // @ts-ignore
        const { id } = req.user! as userTokenPayload

        
        const [userResult] = await db.select().from(userTable).where(eq(userTable.id , id))

        return res.json({
            firstName : userResult?.firstName,
            lastName : userResult?.lastName,
            email : userResult?.email
        })


    }
}
