import express from 'express'
import autMiddleware from '../Middlewares/auth.middleware.js'
import { addContac, getContacts, getProfileContactController, searchContac } from '../Controllers/contacController.js'


const contacRouter = express.Router()

contacRouter.get('/profile-contact/:receiverId', autMiddleware, getProfileContactController)
contacRouter.get('/search', autMiddleware, searchContac)
contacRouter.post('/add', autMiddleware, addContac)
contacRouter.get('/', autMiddleware, getContacts)

export default contacRouter