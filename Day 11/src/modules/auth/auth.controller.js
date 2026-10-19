import cookie from "cookie-parser"
import * as authService from './auth.service.js'
import second from '../../common/utils/ApiResponse.js'
import ApiResponse from '../../common/utils/ApiResponse.js'

const register = async (req , res) => {
    const user = await authService.register(req.body)

    ApiResponse.created(res , "Registration Success" , user)
}

const login = async (req , res) => {
    const {user , refreshToken , accessToken} = await authService.login(req.body)

    res.cookie("accessToken" , accessToken)

    ApiResponse.ok(res , "Login Successfully!")
}

const logout = async (req , res) => {
    await authService.logout(req.user.id);
    res.clearCookie("accessToken")
    ApiResponse.ok(res , "Logout Successfully!")
}

const profile = async (req , res) => {
    const user = await authService.profile(req.user.id)

    ApiResponse.ok(res , "Profile fetch Successfully!" , user)
}

export{
    register,
    login,
    logout,
    profile
}