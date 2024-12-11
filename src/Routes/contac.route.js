import express from 'express'
import { addContac, getContacts } from '../Controllers/contacController.js'
import autMiddleware from '../Middlewares/auth.middleware.js'


const contacRouter = express.Router()

contacRouter.post('/add', autMiddleware , addContac)
contacRouter.get('/', autMiddleware, getContacts)

export default contacRouter