import { claves } from '../config/config.js'
import { createTransport } from 'nodemailer'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: claves.nodemailer_mail,
        pass: claves.nodemailer_pass
    }
})

const sendMail = async (subject, body) => {
    const mailOptions = {
        from: 'E-commerce Node.JS',
        to: claves.admin_mail,
        subject: subject,
        html: `<span>${body}</span>`
    };

    const data = await transporter.sendMail(mailOptions);
};

export { sendMail }