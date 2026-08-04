import "../chunk-BYZ2GIR3.js";
import crypto from "crypto";
const getHashSecretKey = () => {
  const key = process.env.HASH_SECRET_KEY;
  if (!key) {
    throw new Error("HASH_SECRET_KEY environment variable is not set");
  }
  return key;
};
const getHashSecretIV = () => {
  const iv = process.env.HASH_SECRET_IV;
  if (!iv) {
    throw new Error("HASH_SECRET_IV environment variable is not set");
  }
  return iv;
};
const getEncryptionMethod = () => {
  const method = process.env.HASH_ENCRYPTION_METHOD;
  if (!method) {
    throw new Error("HASH_ENCRYPTION_METHOD environment variable is not set");
  }
  return method;
};
const getHashKey = () => crypto.createHash("sha256").update(getHashSecretKey(), "utf-8").digest("hex").substr(0, 32);
const getHashIv = () => crypto.createHash("sha256").update(getHashSecretIV(), "utf-8").digest("hex").substr(0, 16);
const encryptIdentifier = (identifier) => {
  const cipher = crypto.createCipheriv(
    getEncryptionMethod(),
    getHashKey(),
    getHashIv()
  );
  let encrypted = cipher.update(identifier, "utf8", "base64");
  encrypted += cipher.final("base64");
  return Buffer.from(encrypted).toString("base64");
};
const decryptIdentifier = (encodedIdentifier) => {
  const buff = Buffer.from(encodedIdentifier, "base64");
  const encrypted = buff.toString("utf-8");
  const decryptor = crypto.createDecipheriv(
    getEncryptionMethod(),
    getHashKey(),
    getHashIv()
  );
  return decryptor.update(encrypted, "base64", "utf8") + decryptor.final("utf8");
};
export {
  decryptIdentifier,
  encryptIdentifier
};
//# sourceMappingURL=encryptionUtils.js.map
