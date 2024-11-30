import jwt from 'jsonwebtoken'
import transporterEmail from './emailTransporter.email.js'
import ENVIROMENT from '../../Config/enviroment.js'


const sendRecuperationEmail = async (email) => {
    const validationToken = jwt.sign(
        { email: email },
        ENVIROMENT.SECRET_KEY,
        { expiresIn: '1d' }
    )

    const resetUrl = `http://localhost:3030/api/auth/recovery-password/${validationToken}`

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