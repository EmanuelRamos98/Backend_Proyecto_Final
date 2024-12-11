import ResporderBuilder from "../Helpers/Builders/responder.build.js";
import AppError from "../Helpers/Error/app.error.js";
import UserRepository from "../Repositories/user.repository.js";

export const addContac = async (req, res, next) => {
    try {
        const user_id = req.user.user_id 
        const { contact_username } = req.body
        const user_found = await UserRepository.findUserByUsername(contact_username)

        if (!user_found) {
            return next(new AppError('User not found', 404))
        }

        const user = await UserRepository.findUserById(user_id)
        if (user.contacts.includes(user_found._id)) {
            return next(new AppError('User already in contacts', 400))
        }

        await UserRepository.addContact(user_id, user_found._id)

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Contact added successfully')
            .build()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const getContacts = async (req, res, next) => {
    try {
        const user_id = req.user.user_id

        const user = await UserRepository.findContacts(user_id)
        if (!user) {
            return next(new AppError('user not found', 404))
        }

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Contacts found')
            .setPayload(
                { contacts: user.contacts }
            )
            .build()
        return res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}