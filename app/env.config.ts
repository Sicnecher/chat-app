import dotenv from "dotenv"
dotenv.config()

class EnvConfig {
        baseUrl = process.env.API_BASE_URI as string
        googleClientId = process.env.GOOGLE_CLIENT_ID as string
        facebookClientId = process.env.FACEBOOK_CLIENT_ID as string
        githubClientId = process.env.GITHUB_CLIENT_ID as string
}

export default new EnvConfig()

