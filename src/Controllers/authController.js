import sendValidationEmail from "../Helpers/Email/sendValidation.email.js"
import AppError from "../Helpers/Error/app.error.js"
import ResporderBuilder from "../Helpers/responder.build.js"
import Validations from "../Helpers/validations.js"
import UserRepository from "../Repositories/user.repository.js"
import bcrypt from 'bcrypt'


export const registerController = async (req, res, next) => {
    try {
        const { name, password, email } = req.body

        if (!name || !password || !email) {
            return next(new AppError('Todos los campos deben estar completos', 400))
        }

        const validador = new Validations({ name, password, email })

        validador
            .isString('name').max_min_length('name', 4, 50)
            .isString('password').max_min_length('password', 8, 20)
            .isEmail('email')

        const errores = validador.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError('Errores de validación', 400, errores))
        }

        await sendValidationEmail(email, name)

        const passwordHased = await bcrypt.hash(password, 10)

        const user = {
            name: name,
            password: passwordHased,
            email: email
        }

        await UserRepository.createUser(user)

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Susses')
            .setPayload({
                detail: 'Usuario creado con exito'
            })
            .build()
        return res.status(200).json(response)

    } catch (error) {
        if (error.code === 11000) {
            return next(new AppError('El email ya esta en uso', 500))
        }
        return next(error)
    }
}