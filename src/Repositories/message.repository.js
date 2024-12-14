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
        ).sort({ createdAt: 1 })
    }

    static async isRead(message_id) {
        return Message.findByIdAndUpdate(
            message_id,
            { $set: { isRead: true } },
            { new: rue }
        )
    }
}

export default MessageRepository