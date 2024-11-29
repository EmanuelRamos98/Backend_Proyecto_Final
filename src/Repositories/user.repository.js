import User from "../Models/user.models.js";

class UserRepository {

    static async createUser(new_user_data) {
        const new_user = new User(new_user_data)
        return await new_user.save()
    }

    static async getUserByEmail(email) {
        return User.findOne({ email: email })
    }

    static async userUpdateByEmail(email, updateData) {
        return User.findOneAndUpdate({ email: email }, updateData)
    }

    static async userDelete(email) {
        const buscado = User.findOne({ email: email })
        buscado.active = false
        return await buscado.save()
    }
}


export default UserRepository