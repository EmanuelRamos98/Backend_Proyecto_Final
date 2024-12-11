import Message from "../Models/mensaje.models.js";

class MessageRepository {
    
    static async createMessage(message_data) {
        return Message.create(message_data)
    }

    static async findMessagesBetweenUsers(user_id_1, user_id_2) {
        return Message.find(
            {
                $or: [
                    { authorId: user_id_1, receiverId: user_id_2 },
                    { authorId: user_id_2, receiverId: user_id_1 }
                ]
            }
        )
    }
}

export default MessageRepository