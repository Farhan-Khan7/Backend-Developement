const mongoose = require("mongoose");


const connectToDB = () => {
    try{
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Database connected Successfully!")
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = connectToDB