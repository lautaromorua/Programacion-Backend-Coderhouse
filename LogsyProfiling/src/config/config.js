import dotenv from "dotenv"
dotenv.config()

export const enviroment = {
    STRING_CONNECTION_MONGO: process.env.STRING_CONNECTION_MONGO || '',
    SECRET_SESSION: process.env.SECRET_SESSION || ''
}