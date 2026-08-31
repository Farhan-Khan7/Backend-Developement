const mongoose = require('mongoose')

function connectToDB() {
    try{
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Database Connected Successfully!")
        })
    }catch(error){
        console.log(`This is Database connection error : ${error}`)
    }
}

module.exports = connectToDB