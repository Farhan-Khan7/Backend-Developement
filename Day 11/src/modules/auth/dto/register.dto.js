import Joi from "joi"
import BaseDto from "../../../common/dto/base.dto.js"


class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name : Joi.string().trim().min(2).max(50)
    })
}