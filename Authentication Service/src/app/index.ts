import express from "express"
import type { Express } from "express"

import {authRouter} from './auth/router'
import { authenticationMiddleware } from "./middlewares/auth.middleware"


export function createExpressApplication() : Express {
    const app = express()

    // Middlewares
    app.use(express.json())
    app.use(authenticationMiddleware())


    // Routes

    app.get('/' , (req , res) => {
        return res.json({
            message : "Welcome to chai code auth service!"
        })
    })

    app.use('/auth' , authRouter)

    return app
}