import dotenv from "dotenv";

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const MONGODB_ATLAS_URL =
    "mongodb+srv://nallu:nandakishore@Products.wzria.mongodb.net/Book-Store?retryWrites=true&w=majority";

export default {
    port: process.env.PORT,
    host: "localhost",
    databaseURL: MONGODB_ATLAS_URL,

    logs: {
        level: process.env.LOG_LEVEL || "simple",
    },
    oktaConfig: {
        domain: process.env.OKTA_CLIENT_ORGURL || "https://dev-17020959.okta.com",
        clientId: process.env.OKTA_OAUTH2_CLIENT_ID_WEB || "0oa1h0vbvmBiF7STb5d7",
        clientSecret:
            process.env.OKTA_OAUTH2_CLIENT_SECRET_WEB ||
            "ADDT1boPI6PkjNIaR-M-fcd6XxbvNvHB22Lf-BoK",
        baseUrl: process.env.SERVER_URL || "http://localhost:3000",
        issuer:
            process.env.OKTA_OAUTH2_ISSUER ||
            "https://dev-17020959.okta.com/oauth2/default",
        scope: process.env.SCOPE || "authorise",
        apiToken:
            process.env.OKTA_APP_TOKEN ||
            "00O7mtxN0SE0mzFhVrlKxhhmoAss6PHXtcNlOmEYBm",
    },
}