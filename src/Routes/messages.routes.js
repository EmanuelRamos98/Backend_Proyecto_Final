import express from 'express'
import { createMessage, getConversation } from '../Controllers/messageController.js'
import autMiddleware from '../Middlewares/auth.middleware.js'


const messageRouter = express.Router()

messageRouter.post('/send', autMiddleware, createMessage)
messageRouter.get('/conversation/:receiverId', autMiddleware, getConversation)



export default messageRouter