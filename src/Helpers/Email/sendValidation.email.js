import jwt from 'jsonwebtoken'
import transporterEmail from './emailTransporter.email.js'
import ENVIROMENT from '../../Config/enviroment.js'


const sendValidationEmail = async (email, name) => {
    const validation_token = jwt.sign(
        { email: email },
        ENVIROMENT.SECRET_KEY,
        { expiresIn: '1d' }
    )

    const redirectUrl = `https://backend-proyecto-final-iota.vercel.app/api/auth/verify-email/${validation_token}`


    const result = await transporterEmail.sendMail({
        subject: 'Validacion',
        to: email,
        html:
            `
            <h1>Valida tu email</h1>
            <h2>Bienvenido ${name}</h2/>
            <p>Para validar tu email da click <a href='${redirectUrl}'>aqui</a></p>
        `
    })
    return result
}

export default sendValidationEmail