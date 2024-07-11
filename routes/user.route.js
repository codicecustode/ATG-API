import Router from 'express'
const router = Router();
import {register, login, forgotUserPassword} from '../controllers/user.controller.js'
router.route('/signup').post(register)
router.route('/login').post(login)
router.route('/reset-password').post(forgotUserPassword)

export default router