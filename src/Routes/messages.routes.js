import express from 'express'
import { createMessage, getConversation } from '../Controllers/messageController.js'
import autMiddleware from '../Middlewares/auth.middleware.js'


const messageRouter = express.Router()

messageRouter.get('/conversation/:receiverId', autMiddleware, getConversation)
messageRouter.post('/send', autMiddleware, createMessage)



export default messageRouter