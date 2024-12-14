import ResporderBuilder from "../Helpers/Builders/responder.build.js"
import Validations from "../Helpers/Builders/validations.js"
import AppError from "../Helpers/Error/app.error.js"
import UserRepository from "../Repositories/user.repository.js"


export const getPerfilController = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        if (!user_id) {
            next(new AppError('User_id not found', 404))
        }

        const user = await UserRepository.findUserById(user_id)
        if (!user) {
            next(new AppError('User not found', 404))
        }
        const user_profile = {
            id: user._id,
            name: user.name,
            email: user.email,
            estado: user.estado
        }
        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('sucsses')
            .setPayload(user_profile)
            .build()
        return res.status(200).json(response)

    } catch (error) {
        next(error)
    }

}

export const updatePerfilController = async (req, res, next) => {
    try {
        const { estado, avatar } = req.body
        const user_id = req.user.user_id

        if (!user_id) {
            next(new AppError('User_id not found', 404))
        }

        const validador = new Validations({ estado })

        validador
            .isString('estado').max_min_length('estado', 0, 50)

        const errores = validador.obtenerErrores()
        if (errores.length > 0) {
            next(new AppError('Error de validacion', 400, errores))
        }

        const new_data = {}
        if (estado) {
            new_data.estado = estado
        }
        if (avatar) {
            new_data.avatar = avatar
        }

        await UserRepository.userUpdateById(user_id, new_data)

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Update succes')
            .build()
        return res.status(200).json(response)


    } catch (error) {
        next(error)
    }
}