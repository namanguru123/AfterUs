import crypto from 'crypto'
import env from '../config/env.js'

const algorithm = 'aes-256-gcm'
const key = Buffer.from(env.ENCRYPTION_KEY)

export const decrypt = (encryptedData) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(encryptedData.iv, 'hex')
  )

  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'))

  let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}