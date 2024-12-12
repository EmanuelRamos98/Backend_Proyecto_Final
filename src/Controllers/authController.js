import sendValidationEmail from "../Helpers/Email/sendValidation.email.js"
import AppError from "../Helpers/Error/app.error.js"
import ResporderBuilder from "../Helpers/Builders/responder.build.js"
import Validations from "../Helpers/Builders/validations.js"
import UserRepository from "../Repositories/user.repository.js"
import bcrypt from 'bcrypt'
import ENVIROMENT from "../Config/enviroment.js"
import jwt from 'jsonwebtoken'
import sendRecuperationEmail from "../Helpers/Email/sendRecuperation.email.js"

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

export const verifiEmailController = async (req, res, next) => {
    try {
        const { validation_token } = req.params
        if (!validation_token) {
            return next(new AppError('No se encontro Validation_token', 404))
        }

        const payload = jwt.verify(validation_token, ENVIROMENT.SECRET_KEY)
        if (!payload.email) {
            return next(new AppError('Error de token', 400))
        }

        const email_to_verify = payload.email
        await UserRepository.userVerificate(email_to_verify)

        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new AppError('Todos los campos deben estar completos', 400))
        }

        const validador = new Validations({ email, password })

        validador
            .isString('password').max_min_length('password', 8, 20)
            .isEmail('email')

        const errores = validador.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError('Errores de validación', 400, errores))
        }

        const user = await UserRepository.getUserByEmail(email)
        if (!user) {
            return next(new AppError('El usuario no existe', 404))
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(new AppError('La password es incorrecta', 404))
        }
        if (!user.emailVerified) {
            return next(new AppError('Email no verificado, acceso restringido', 403))
        }

        const accesToken = jwt.sign(
            {
                user_id: user.id,
                name: user.name,
                email: user.email,
                contacts: user.contacts,
                role: user.role,
            },
            ENVIROMENT.SECRET_KEY,
            { expiresIn: '1d' }
        )
        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Logged succes')
            .setPayload({
                accesToken: accesToken,
                user_info: {
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            })
            .build()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const getAllUsersController = async (req, res, next) => {
    try {
        const users = await UserRepository.getAllUsers()
        if (!users) {
            return next(new AppError('No se encontraron usuarios', 404))
        }
        const filteredUser = users.map(user => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                estado: user.estado,
                role: user.role
            }
        })

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Succes')
            .setPayload({
                users: filteredUser
            })
            .build()
        return res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body
        const validador = new Validations({ email })

        validador
            .isEmail('email')

        const errores = validador.obtenerErrores();
        if (errores.length > 0) {
            return next(new AppError('Errores de validación', 400, errores))
        }

        const user = await UserRepository.getUserByEmail(email)
        if (!user) {
            return next(new AppError('El usuario no existe', 404))
        }

        await sendRecuperationEmail(email)

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Succes')
            .setPayload({
                detail: `Email de recuperacion enviado a ${email}`
            })
            .build()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const recoveryPasswordController = async (req, res, next) => {
    try {
        const { reset_token } = req.params
        if (!reset_token) {
            return next(new AppError('No se encotro reset_token', 400))
        }

        const { password } = req.body
        if (!password) {
            return next(new AppError('Todos los campos deben estar llenos', 400))
        }

        const validador = new Validations({ password })
        validador
            .isString('password').max_min_length('password', 8, 20)

        const errores = validador.obtenerErrores()
        if (errores.length > 0) {
            return next(new AppError('Error de validacion', 400, errores))
        }

        const codificado = jwt.verify(reset_token, ENVIROMENT.SECRET_KEY)
        const passwordHased = await bcrypt.hash(password, 10)

        await UserRepository.userUpdatePassword(codificado.email, passwordHased)

        const response = new ResporderBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Succes')
            .setPayload({
                detail: 'Contraseña cambiada con exito'
            })
            .build()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}