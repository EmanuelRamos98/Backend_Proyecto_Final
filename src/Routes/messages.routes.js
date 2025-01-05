import express from 'express'
import { createMessage, deleteConversation, getConversation } from '../Controllers/messageController.js'
import autMiddleware from '../Middlewares/auth.middleware.js'


const messageRouter = express.Router()

messageRouter.get('/conversation/:receiverId', autMiddleware, getConversation)
messageRouter.post('/send', autMiddleware, createMessage)
messageRouter.delete('/delete-conversation/:receiverId', autMiddleware, deleteConversation)


export default messageRouter