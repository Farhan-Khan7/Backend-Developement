import express from "express"
import app from "./src/app/app.js"
import connectDB from "./src/config/db.js"
import dotenv from "dotenv/config"


const port = process.env.PORT || 4000


const start = async () => {
    await connectDB()

    app.listen(port , () => {
        console.log(`server is running on port ${port} in ${process.env.DEVELOPMENT_STATUS} mode`)
    })
}


start().catch((err) => {
    console.log(`failed to start server ${err}`)
    process.exit(1)
})