import express from "express"
import app from "./src/app.js"
import dotenv from "dotenv/config"


const port = process.env.PORT || 4000


const start = async () => {
    // database connection

    app.listen(port , () => {
        console.log(`server is running on port ${port} in ${process.env.NODE_ENV} mode`)
    })
}


start().catch((err) => {
    console.log(`failed to start server ${err}`)
    process.exit(1)
})