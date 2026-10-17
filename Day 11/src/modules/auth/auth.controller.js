import * as authService from './auth.service.js'
import second from '../../common/utils/ApiResponse.js'
import ApiResponse from '../../common/utils/ApiResponse.js'

const register = async (req , res) => {
    const user = await authService.register(req.body)

    ApiResponse.created(res , "Registration Success" , user)
}

export{
    register,
}