import type { Request, Response } from "express";
import crypto from "crypto"
import { signupPayload } from "../models";
import { db } from "../../db";
import { userTable } from "../../db/schema";
import { eq } from "drizzle-orm";


export class AuthenticationController {
  public async handleSignup(req: Request, res: Response) {
    const validationResult = await signupPayload.safeParseAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: "Validation failed!", error: validationResult.error.issues });
    }

    const {firstName , lastName, email , password } = validationResult.data

    const userEmailResult = await db.select().from(userTable).where(eq(userTable.email , email))

    if(userEmailResult.length > 0){
        return res.status(400).json({
            error : `Duplicate Entry `,
            message : `user with email ${ email } already exist`
        })
    }

    const salt = crypto.randomBytes(30).toString("hex")
    const hash = crypto.createHmac("sha256" , salt).update(password).digest('hex')

    const result = await db.insert(userTable).values({
        firstName,
        lastName,
        email,
        password : hash,
        salt
    }).returning({id : userTable.id})

    return res.status(201).json({
        message : "user has been created successfully!",
        date : {
            id : result[0]?.id
        }
    })

  }
}
