import jwt from 'jsonwebtoken'
import ENVIROMENT from '../Config/enviroment.js'
import AppError from '../Helpers/Error/app.error.js'

const autMiddleware = (req, res, next) => {
    try {
        const auth_header = req.headers['authorization']

        if (!auth_header) {
            return next(new AppError('Falta token de authorizacion', 400))
        }

        const access_token = auth_header.split(' ')[1]

        if (!access_token) {
            return next(new AppError('El token de autorizacion esta mal formado', 400))
        }

        const user_session_payload_decoded = jwt.verify(access_token, ENVIROMENT.SECRET_KEY)


        req.user = user_session_payload_decoded

        next()
    } catch (error) {
        next(error)
    }
}

export default autMiddleware