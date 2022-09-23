import { claves } from '../config.js'
import twilio from 'twilio'

const client = twilio(claves.account_sid, claves.authtoken_twilio)

const options = {
    body: '',
    from: `whatsapp: ${claves.twilio_wsp_sandbox}`,
    to: `whatsapp: ${claves.admin_number}`
}

export { client, options }