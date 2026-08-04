import "../chunk-BYZ2GIR3.js";
import slugify from "slugify";
import { FOLDER_BANNED_CHARS_ARR } from "./validateUtils";
const SLUG_SEPARATOR = "-";
const DEFAULT_FOLDER_NAME = "folder";
const PATH_SEPARATOR = "/";
const getSlug = (folder) => {
  var _a;
  return (folder == null ? void 0 : folder.id) ? [
    encodeURIComponent(
      slugify((_a = folder == null ? void 0 : folder.name) != null ? _a : "", { strict: true }) || DEFAULT_FOLDER_NAME
    ),
    folder.id
  ].join(SLUG_SEPARATOR) : null;
};
function sanitizeFolderName(input) {
  const bannedChars = new Set(FOLDER_BANNED_CHARS_ARR);
  return Array.from(input).filter((char) => !bannedChars.has(char)).join("");
}
function slugifyRedisKey(key) {
  return slugify(key, { strict: true });
}
const getSlugifiedKey = (folderPath) => {
  if (!folderPath) {
    return null;
  }
  const folderParts = folderPath.split(PATH_SEPARATOR);
  const slugifiedParts = folderParts.map((part) => {
    const sanitizedPart = sanitizeFolderName(part);
    return slugify(sanitizedPart || DEFAULT_FOLDER_NAME, {
      lower: true,
      strict: true
    });
  });
  return slugifiedParts.join(SLUG_SEPARATOR);
};
export {
  getSlug,
  getSlugifiedKey,
  sanitizeFolderName,
  slugifyRedisKey
};
//# sourceMappingURL=folderUtils.js.map
