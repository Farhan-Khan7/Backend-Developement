import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    user : {
        type : String,
        required : [true , "Username is required"],
        unique : [true , "Username must be unique"]
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : [true , "Email must be unique"]
    },
    hashPassword : {
        type : String,
        required : [true , "Password is required"]
    }
})

const userModel = mongoose.model("authUser" , userSchema )


export default userModel;