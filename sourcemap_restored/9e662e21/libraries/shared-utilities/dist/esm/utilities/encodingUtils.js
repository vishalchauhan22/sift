import {
  __spreadProps,
  __spreadValues
} from "../chunk-BYZ2GIR3.js";
import { encryptIdentifier, decryptIdentifier } from "./encryptionUtils";
const base64ToObjectAndDecrypt = ({
  base64String,
  fieldsToDecrypt,
  skipDecryption
}) => {
  if (!base64String || base64String === "") {
    return null;
  }
  const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
  const jsonObject = JSON.parse(jsonString);
  if (!skipDecryption) {
    fieldsToDecrypt.forEach((field) => {
      if (jsonObject[field]) {
        jsonObject[field] = decryptIdentifier(jsonObject[field]);
      }
    });
  }
  return jsonObject;
};
const objectToBase64AndEncrypt = ({
  obj,
  fieldsToEncrypt,
  skipEncryption = false
}) => {
  if (!obj || Object.values(obj).every((value) => value === void 0 || value === null)) {
    return null;
  }
  if (!skipEncryption) {
    fieldsToEncrypt.forEach((field) => {
      if (obj[field]) {
        obj[field] = encryptIdentifier(obj[field]);
      }
    });
  }
  const jsonString = JSON.stringify(__spreadProps(__spreadValues({}, obj), { encrypted: !skipEncryption }));
  return Buffer.from(jsonString, "utf-8").toString("base64");
};
export {
  base64ToObjectAndDecrypt,
  objectToBase64AndEncrypt
};
//# sourceMappingURL=encodingUtils.js.map
