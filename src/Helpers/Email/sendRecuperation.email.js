import jwt from 'jsonwebtoken'
import transporterEmail from './emailTransporter.email.js'
import ENVIROMENT from '../../Config/enviroment.js'


const sendRecuperationEmail = async (email) => {
    const reset_token = jwt.sign(
        { email: email },
        ENVIROMENT.SECRET_KEY,
        { expiresIn: '1d' }
    )

    const resetUrl = `${ENVIROMENT.FRONTEND_URL}/auth/recovery-password/${reset_token}`

    const result = await transporterEmail.sendMail({
        subject: 'Recuperar Contraseña',
        to: email,
        html:
            `
            <h1>Recuperar Contraseña</h1>
            <p>Para recuperar tu contraseña da click <a href='${resetUrl}'>aqui</a></p>
        `
    })
    return result
}

export default sendRecuperationEmail