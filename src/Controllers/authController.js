import ResporderBuilder from "../Helpers/responder.build.js"
import Validations from "../Helpers/validations.js"
import UserRepository from "../Repositories/user.repository.js"
import bcrypt from 'bcrypt'


export const registerController = async (req, res) => {
    try {
        const { name, password, email } = req.body

        if (!name || !password || !email) {
            return res.status(404).json({
                ok: false,
                errores: 'Todos los campos deben esta completos'
            })
        }

        const validador = new Validations({ name, password, email })

        validador
            .isString('name').max_min_length('name', 4, 50)
            .isString('password').max_min_length('password', 8, 20)
            .isEmail('email')

        const errores = validador.obtenerErrores()
        if (errores.length > 0) {
            return res.status(400).json({
                ok: false,
                errores: errores
            })
        }

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
            return res.status(500).json({ error: 'El email ya esta en uso' })
        }
        return res.status(500).json({ error: error.message })
    }
}