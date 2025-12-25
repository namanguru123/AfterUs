import crypto from 'crypto'
import env from '../config/env.js'

const algorithm = 'aes-256-gcm'
const key = Buffer.from(env.ENCRYPTION_KEY)

export const encrypt = (plainText) => {
  const iv = crypto.randomBytes(12) // recommended for GCM
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(plainText, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag().toString('hex')

  return {
    iv: iv.toString('hex'),
    content: encrypted,
    authTag
  }
}