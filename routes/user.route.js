import Router from 'express'
const router = Router();
import {register, login} from '../controllers/user.controller.js'
router.route('/signup').post(register)
router.route('/login').post(login)

export default router