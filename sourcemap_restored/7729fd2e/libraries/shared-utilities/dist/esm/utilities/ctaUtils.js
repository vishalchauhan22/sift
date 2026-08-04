import {
  __spreadProps,
  __spreadValues
} from "../chunk-BYZ2GIR3.js";
import urlRegexSafe from "url-regex-safe";
import { BTN_LOCATION_OPTIONS, DEFAULT_CTA_MODS } from "../constants/cta";
import { isHexColor } from "./validateUtils";
const undesiredSchemes = [
  "about:",
  "blob:",
  "data:",
  "javascript:",
  "file:",
  "chrome:",
  "chrome-extension:"
];
const isValidCtaUrl = (ctaUrl) => {
  for (const scheme of undesiredSchemes) {
    if (ctaUrl.startsWith(scheme)) {
      return false;
    }
  }
  return true;
};
function isValidBtnLocation(location) {
  for (const option of BTN_LOCATION_OPTIONS) {
    if (option.value === location) {
      return true;
    }
  }
  return false;
}
const validateCta = (cta) => {
  var _a, _b, _c, _d;
  if (!cta.url || !isValidCtaUrl(cta.url) || cta.url.includes("javascript:") || !urlRegexSafe({
    apostrophes: true,
    parens: true,
    exact: true,
    strict: false,
    re2: false
  }).test(cta.url)) {
    return null;
  }
  if (!Number.isInteger(Number((_a = cta.mods) == null ? void 0 : _a.border_radius))) {
    return __spreadProps(__spreadValues({}, cta), {
      mods: __spreadProps(__spreadValues({}, cta.mods), { border_radius: DEFAULT_CTA_MODS.border_radius })
    });
  }
  if (!isValidBtnLocation((_b = cta.mods) == null ? void 0 : _b.location)) {
    return __spreadProps(__spreadValues({}, cta), {
      mods: __spreadProps(__spreadValues({}, cta.mods), { location: DEFAULT_CTA_MODS.location })
    });
  }
  if (!isHexColor((_c = cta.mods) == null ? void 0 : _c.background_color)) {
    return __spreadProps(__spreadValues({}, cta), {
      mods: __spreadProps(__spreadValues({}, cta.mods), {
        background_color: DEFAULT_CTA_MODS.background_color
      })
    });
  }
  if (!isHexColor((_d = cta.mods) == null ? void 0 : _d.color)) {
    return __spreadProps(__spreadValues({}, cta), {
      mods: __spreadProps(__spreadValues({}, cta.mods), { color: DEFAULT_CTA_MODS.color })
    });
  }
  return cta;
};
export {
  isValidBtnLocation,
  isValidCtaUrl,
  validateCta
};
//# sourceMappingURL=ctaUtils.js.map
