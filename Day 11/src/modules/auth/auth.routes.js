import {Router} from "express"
import * as controller from "./auth.controller.js"
import validate from "../../common/middlewares/validate.middleware.js"
import RegisterDto from './dto/register.dto.js'
import Login from "./dto/login.dto.js"
import { isLoggedIn } from "./auth.middleware.js"

const router = Router()


router.post("/register", validate(RegisterDto), controller.register)
router.post("/login" , validate(Login) , controller.login)
router.post("/logout" , isLoggedIn , controller.logout )
router.post("/profile" , isLoggedIn , controller.profile)


export default router