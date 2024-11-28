import Validations from "../Helpers/validations.js"


export const registerController = async (req, res) => {
    try {
        const { name, password, email } = req.body

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
        return res.status(200).json({
            ok: true,
            message: "Registro exitoso",
            user: {
                name: name,
                password: password,
                email: email
            }
        }
        )
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}