import jwt from 'jsonwebtoken'
import transporterEmail from './emailTransporter.email.js'
import ENVIROMENT from '../../Config/enviroment.js'


const sendValidationEmail = async (email, name) => {
    const validationToken = jwt.sign(
        { email: email },
        ENVIROMENT.SECRET_KEY,
        { expiresIn: '1d' }
    )

    const redirectUrl = `http://localhost:3030/api/auth/verify-email/${validationToken}`

    const result = await transporterEmail.sendMail({
        subject: 'Validacion',
        to: email,
        html:
            `
            <h1>Valida tu email</h1>
            <h2>Bienvenido ${name}</h2/>
            <p>Para validar tu email da click <a href='${redirectUrl}'>aqui</a>
        `
    })
    return result
}

export default sendValidationEmail