import crypto from "crypto";

const ALGO = "aes-256-gcm";
const KEY = Buffer.from(process.env.FILE_ENCRYPTION_KEY, "utf8");

export const encryptFileBuffer = (buffer) => {
  const iv = crypto.randomBytes(12); // recommended for GCM
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(buffer),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    encryptedBuffer: encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    algorithm: ALGO,
  };
};

export const decryptFileBuffer = ({ buffer, iv, authTag }) => {
  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  return Buffer.concat([
    decipher.update(buffer),
    decipher.final(),
  ]);
};
