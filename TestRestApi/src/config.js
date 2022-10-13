import dotenv from 'dotenv'
dotenv.config()

export const claves = {
    connectionStringMongo: process.env.connectionStringMongo || `mongodb+srv://CoderHouse:12345@lautarocluster.j9eit.mongodb.net/?retryWrites=true&w=majority`,
    sessionSecret: process.env.sessionSecret || 'coderProyect',
    nodemailer_mail: process.env.nodemailer_mail || '',
    nodemailer_pass: process.env.nodemailer_pass || '',
    admin_mail: process.env.admin_mail || '',
    account_sid: process.env.account_sid || '',
    authtoken_twilio: process.env.authtoken_twilio || '',
    admin_number: process.env.admin_number || '',
    twilio_wsp_sandbox: process.env.twilio_wsp_sandbox || ''
}
