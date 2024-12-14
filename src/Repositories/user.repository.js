import AppError from "../Helpers/Error/app.error.js";
import User from "../Models/user.models.js";

class UserRepository {

    static async createUser(new_user_data) {
        const new_user = new User(new_user_data)
        return await new_user.save()
    }

    static async addContact(user_id, contac_id) {
        return User.findByIdAndUpdate(user_id, {
            $push: {
                contacts: contac_id
            }
        })
    }

    static async findUserById(user_id) {
        return User.findById(user_id)
    }

    static async findUserByUsername(name) {
        return User.findOne({ name: name })
    }

    static async findContacts(user_id) {
        return User.findById(user_id).populate('contacts', 'name')
    }


    static async getAllUsers() {
        return User.find({ activo: true })
    }

    static async getUserByEmail(email) {
        return User.findOne({ email: email })
    }

    static async userUpdateById(user_id, updateData) {
        return User.findByIdAndUpdate(user_id,
            { $set: updateData },
            { new: true }
        )
    }

    static async userUpdatePassword(email, new_password) {
        const user = await User.findOne({ email: email })
        if (!user) {
            return new AppError('No se encontro el usuario', 500)
        }
        user.password = new_password
        return await user.save()
    }

    static async userVerificate(email) {
        const user_to_verify = await User.findOne({ email: email })
        if (!user_to_verify) {
            return new AppError('No se encontro el usuario a verificar', 500)
        }
        user_to_verify.emailVerified = true
        return await user_to_verify.save()
    }

    static async userDelete(email) {
        const buscado = User.findOne({ email: email })
        buscado.active = false
        return await buscado.save()
    }
}


export default UserRepository