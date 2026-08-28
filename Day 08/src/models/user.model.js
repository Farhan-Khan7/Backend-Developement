const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : [true , "With this email user account already exist"]
    },
    password : String,
})

const userModel = mongoose.model("registerdUser" , userSchema);

module.exports = userModel;