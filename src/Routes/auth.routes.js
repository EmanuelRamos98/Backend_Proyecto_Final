import express from 'express'
import { registerController } from '../Controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)

export default authRouter