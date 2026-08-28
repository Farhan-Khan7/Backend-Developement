const express = require('express')
const userModel = require('../models/user.model')
const JWT = require('jsonwebtoken')
const authRouter = express.Router();


authRouter.post('/register' , async (req , res) => {
    const {name , email , password} = req.body;

    const userIsExist = await userModel.findOne({email})

    if(userIsExist){
        return res.status(400).json({
            message : "User already Registerd with this same email address!"
        })
    }

    const user = await userModel.create({
        name , email,  password
    })

    const token = JWT.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_token" , token);

    res.status(201).json({
        message : "User created Successfully!",
        user,
        token
    })
})

module.exports = authRouter