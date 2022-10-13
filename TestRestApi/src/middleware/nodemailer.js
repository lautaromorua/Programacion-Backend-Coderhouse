import { claves } from '../config.js'
import { createTransport } from 'nodemailer'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: claves.nodemailer_mail,
        pass: claves.nodemailer_pass
    }
})

const mailOptions = {
    from: 'Server Node.JS',
    to: claves.admin_mail,
    subject: 'New user registered!',
    html: ''
}

export { transporter, mailOptions }