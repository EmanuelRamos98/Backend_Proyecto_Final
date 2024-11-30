import express from 'express'
import { forgotPasswordController, loginController, recoveryPasswordController, registerController, verifiEmailController } from '../Controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)

authRouter.get('/verify-email/:validation_token', verifiEmailController)

authRouter.post('/login', loginController)

authRouter.post('/forgot-password', forgotPasswordController)

authRouter.put('/recovery-password/:reset_token', recoveryPasswordController)

export default authRouter