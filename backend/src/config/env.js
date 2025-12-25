import dotenv from 'dotenv'

dotenv.config()

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
}

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    console.error(`❌ Missing environment variable: ${key}`)
    process.exit(1)
  }
})

export default env