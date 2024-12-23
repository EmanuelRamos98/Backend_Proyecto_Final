import ResporderBuilder from "../Helpers/Builders/responder.build.js";
import AppError from "../Helpers/Error/app.error.js";
import UserRepository from "../Repositories/user.repository.js";

export const searchContac = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        if (!user_id) {
            return next(new AppError('User not found', 404))
        }

        const contacts = await UserRepository.getAllUsers()
        if (!contacts) {
            next(new AppError('Contacts not found', 404))
        }

        const lista_users = contacts.filter((user) => user.id !== user_id)
        const users = lista_users.map(users => ({
            id: users._id,
            name: users.name,
            estado: users.estado,
            email: users.email,
            image: users.image_base64
        }))

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Sucsses')
            .setPayload({
                users
            })
            .build()
        return res.status(200).json(response)

    } catch (error) {
        next(error)
    }

}


export const addContac = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        if (!user_id) {
            return next(new AppError('User not found', 404))
        }

        const { contact_username } = req.body
        if (!contact_username) {
            return next(new AppError('Contact_username not found', 404))
        }
        const user_found = await UserRepository.findUserByUsername(contact_username)

        if (!user_found) {
            return next(new AppError('User not found', 404))
        }
        const contac_data = {
            contactId: user_found._id,
            image_base64: user_found.image_base64,
            estado: user_found.estado
        }

        const user = await UserRepository.findUserById(user_id)
        
        if (user.contacts.some(contact => contact.contactId.toString() === user_found._id.toString())) {
            return next(new AppError('User already in contacts', 400))
        }
        await UserRepository.addContact(user_id, contac_data)



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
        if (!user_id) {
            return next(new AppError('User not found', 404))
        }

        const user = await UserRepository.findContacts(user_id)
        if (!user) {
            return next(new AppError('user not found', 404))
        }

        const contacts = user.contacts.map(contact => ({
            id: contact.contactId?._id,
            name: contact.contactId?.name,
            estado: contact.contactId?.estado,
            image: contact.contactId?.image_base64
        }))
        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Contacts found')
            .setPayload(
                { contacts }
            )
            .build()
        return res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}

export const getProfileContactController = async (req, res, next) => {
    try {
        const { receiverId } = req.params
        if (!receiverId) {
            return next(new AppError('ReceiverId not found', 404))
        }

        const contac = await UserRepository.findUserById(receiverId)

        if (!contac) {
            return next(new AppError('Contact not found', 404))
        }

        const profileContact = {
            name: contac.name,
            imagen: contac.image_base64,
            estado: contac.estado,
            email: contac.email
        }

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('succes')
            .setPayload(profileContact)
            .build()
        return res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}