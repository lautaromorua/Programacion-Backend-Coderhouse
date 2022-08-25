import dotenv from 'dotenv'
dotenv.config()

export const claves = {
    connectionStringMongo: process.env.connectionStringMongo || `mongodb+srv://CoderHouse:12345@lautarocluster.j9eit.mongodb.net/?retryWrites=true&w=majorit`,
    sessionSecret: process.env.sessionSecret || 'coderProyect'
}

// export default {
//     mongodb: {
//         connectionString: 'mongodb+srv://CoderHouse:12345@lautarocluster.j9eit.mongodb.net/?retryWrites=true&w=majorit',
//     },
//     firebase:
//     {
//         "type": "service_account",
//         "project_id": "ecommercecoder-f3898",
//         "private_key_id": "e7b67b702a878db9ce1d00e33e6bcd430e310687",
//         "private_key": process.env.PAK_FIREBASE,
//         "client_email": "firebase-adminsdk-vigci@ecommercecoder-f3898.iam.gserviceaccount.com",
//         "client_id": "102315543855716285848",
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vigci%40ecommercecoder-f3898.iam.gserviceaccount.com"
//     },
// };

