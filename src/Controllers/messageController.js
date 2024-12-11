import ResporderBuilder from "../Helpers/Builders/responder.build.js";
import MessageRepository from "../Repositories/message.repository.js";

export const createMessage = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        const { receiverId, content } = req.body
    
    
        const new_message = await MessageRepository.createMessage(
            {
                authorId: user_id,
                receiverId: receiverId,
                content: content
            })

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Message Created')
            .setPayload({
                message: new_message
            })
            .build()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const getConversation = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        const { receiverId } = req.params

        const conversation = await MessageRepository.findMessagesBetweenUsers(user_id, receiverId)
        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Conversation found')
            .setPayload({
                conversation
            })
            .build()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}