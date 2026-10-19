import Joi, { extend } from "joi";
import BaseDto from "../../../common/dto/base.dto.js";


class Login extends BaseDto {
    static Schema = Joi.object({
        email : Joi.string().trim().lowercase().required(),
        password: Joi.string().min(8).required().message("Password must contain 8 chars minimum")
    })
}  

export default Login