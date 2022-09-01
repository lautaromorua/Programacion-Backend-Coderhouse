import dotenv from 'dotenv'
dotenv.config()

export const claves = {
    connectionStringMongo: process.env.connectionStringMongo || `mongodb+srv://CoderHouse:12345@lautarocluster.j9eit.mongodb.net/?retryWrites=true&w=majorit`,
    sessionSecret: process.env.sessionSecret || 'coderProyect'
}
