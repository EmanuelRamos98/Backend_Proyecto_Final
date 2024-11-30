import nodemailer from 'nodemailer'
import ENVIROMENT from '../../Config/enviroment.js'

const transporterEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIROMENT.EMAIL_USER,
        pass: ENVIROMENT.EMAIL_PASSWORD
    }
})

export default transporterEmail