import "../chunk-BYZ2GIR3.js";
import slugify from "slugify";
import { LOOM_SPACE_PAGE_REGEX_STR } from "./validateUtils";
const SLUG_SEPARATOR = "-";
const DEFAULT_SPACE_NAME = "space";
const getSlug = (space) => {
  var _a;
  return (space == null ? void 0 : space.id) ? [
    encodeURIComponent(
      slugify((_a = space == null ? void 0 : space.name) != null ? _a : "", { strict: true }) || DEFAULT_SPACE_NAME
    ),
    space.id
  ].join(SLUG_SEPARATOR) : null;
};
const getSpaceUrl = ({
  id,
  url,
  name
}) => {
  return name ? "".concat(url, "/spaces/").concat(getSlug({ id, name })) : "".concat(url, "/spaces/").concat(id);
};
const getSpaceIdFromUrl = (url) => {
  var _a, _b;
  try {
    new URL(url);
    const loomRegex = new RegExp(LOOM_SPACE_PAGE_REGEX_STR);
    const match = url.match(loomRegex);
    return (_b = (_a = match == null ? void 0 : match.groups) == null ? void 0 : _a.spaceId) != null ? _b : null;
  } catch (e) {
    return null;
  }
};
export {
  getSlug,
  getSpaceIdFromUrl,
  getSpaceUrl
};
//# sourceMappingURL=spacesUtils.js.map
