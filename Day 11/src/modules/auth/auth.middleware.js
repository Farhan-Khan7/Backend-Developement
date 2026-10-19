import ApiError from "../../common/utils/ApiError.js"
import {verifyAccessToken} from "../../common/utils/jwt.utils.js"
import userModel from "./auth.model.js"



const   isLoggedIn = async (req , res , next) => {

    let token;

    if(!req.headers.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) throw ApiError.unauthorized("Not authenticated");

    const decoded = verifyAccessToken(token)

    const user = await userModel.findById(decoded.id)


    if(!user) throw ApiError.unauthorized("User no longer Exists");


    req.user = {
        id : user._id,
        role : user.role,
        name : user.name,
        email : user.email
    }

    next()
}


const authorize =  (...roles) => {
    return (req, res , next) => {
        if(!roles.includes(req.user.role)) {
            throw ApiError.forbidden("you do not have permission to perform this action ");
        }
        next();
    };
};


export {
    isLoggedIn,
    authorize
}