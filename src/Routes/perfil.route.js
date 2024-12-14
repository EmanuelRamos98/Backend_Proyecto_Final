import express from 'express'
import autMiddleware from '../Middlewares/auth.middleware.js'
import { getPerfilController, updatePerfilController } from '../Controllers/perfilController.js'

const perfilRoute = express.Router()

perfilRoute.get('/', autMiddleware, getPerfilController)
perfilRoute.put('/update', autMiddleware, updatePerfilController)

export default perfilRoute