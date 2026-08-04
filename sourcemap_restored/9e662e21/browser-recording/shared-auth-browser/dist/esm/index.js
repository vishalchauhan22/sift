// src/index.ts
import { Buffer } from "buffer";
var encode = (value) => Buffer.from(value).toString("base64");
var decode = (value) => Buffer.from(value, "base64");
var formatAsPem = (str) => {
  let finalString = "-----BEGIN PUBLIC KEY-----\n";
  while (str.length > 0) {
    finalString += str.substring(0, 64) + "\n";
    str = str.substring(64);
  }
  finalString = finalString + "-----END PUBLIC KEY-----";
  return finalString;
};
var generateRSAKeys = async () => {
  const keypair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-1" }
    },
    true,
    ["encrypt", "decrypt"]
  );
  const { publicKey, privateKey } = keypair;
  const key = await window.crypto.subtle.exportKey("spki", publicKey);
  const encodedKey = encode(key);
  const publicKeyAsPem = formatAsPem(encodedKey);
  return { publicKeyAsPem, privateKey, publicKey };
};
var privateDecrypt = async (privateKey, encryptedBuffer) => {
  const buffer = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    encryptedBuffer
  );
  return Buffer.from(buffer);
};
export {
  decode,
  encode,
  generateRSAKeys,
  privateDecrypt
};
//# sourceMappingURL=index.js.map
