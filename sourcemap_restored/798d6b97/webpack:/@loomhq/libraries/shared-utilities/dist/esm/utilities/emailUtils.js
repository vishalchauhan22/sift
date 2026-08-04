import "../chunk-BYZ2GIR3.js";
import validator from "validator";
import * as publicEmailsConstants from "../constants/publicEmails";
import { PUBLIC_PROVIDERS_TO_NORMALIZE } from "./publicDomainUtils";
import * as validate from "./validateUtils";
const { BLOCKED_DOMAINS, DEFAULT_DOMAINS, GOOGLE_MAIL_DOMAINS } = publicEmailsConstants;
const DOMAIN_BLOCKED_ERROR_MESSAGE = "Domain not eligible.";
const DOMAIN_INVALID_MESSAGE = "Domain invalid.";
const EMAIL_ADDRESS_INVALID_MESSAGE = "Email address invalid.";
const CANNOT_NORMALIZE_EMAIL = "Cannot normalize email";
function isDomainInProvidersToNormalizeList(providersToNormalizeList, domain) {
  return providersToNormalizeList.includes(domain);
}
const IGNORE_LIST_REGEX = [
  // loom.platform.root.${type}${getNumberFrom0To999()}+${uuidv4()}@gmail.com
  /^loom\.platform\.root\+.{36}\.(guest|admin)@gmail\.com$/
];
function shouldSkipEmail(fullEmailOrDomain) {
  const result = IGNORE_LIST_REGEX.find((exp) => exp.test(fullEmailOrDomain));
  return result != null;
}
function shouldStoreNormalizedEmail(fullEmailOrDomain, fullEmail) {
  let domain;
  if (shouldSkipEmail(fullEmail)) {
    return false;
  }
  if (fullEmailOrDomain.includes("@")) {
    [, domain] = parseNormalizedLocalAndDomain(fullEmailOrDomain);
  } else {
    domain = fullEmailOrDomain;
  }
  return isDomainInProvidersToNormalizeList(
    PUBLIC_PROVIDERS_TO_NORMALIZE,
    domain
  );
}
function normalizeEmail(email) {
  const res = validator.normalizeEmail(email);
  if (!res) {
    throw new Error(CANNOT_NORMALIZE_EMAIL);
  }
  return res;
}
const parseDomain = (domainOrEmail) => {
  var _a, _b;
  return (_b = (_a = domainOrEmail == null ? void 0 : domainOrEmail.split("@").reverse().shift()) == null ? void 0 : _a.toLowerCase()) != null ? _b : "";
};
function parseNormalizedLocalAndDomain(email) {
  email = email.trim();
  if (!validate.email(email)) {
    throw new Error(EMAIL_ADDRESS_INVALID_MESSAGE);
  }
  const normalizedEmail = normalizeEmail(email);
  const [local, domain] = normalizedEmail.split("@");
  if (!local || !domain) {
    throw new Error(EMAIL_ADDRESS_INVALID_MESSAGE);
  }
  return [local, domain];
}
const checkForDisallowedDomain = (domain) => {
  if (BLOCKED_DOMAINS.includes(domain)) {
    throw new Error(DOMAIN_BLOCKED_ERROR_MESSAGE);
  }
};
const validateDomain = (domain) => {
  if (!domain || !validate.domain(domain)) {
    throw new Error(DOMAIN_INVALID_MESSAGE);
  }
  if (BLOCKED_DOMAINS.includes(domain)) {
    throw new Error(DOMAIN_BLOCKED_ERROR_MESSAGE);
  }
};
const isDefaultDomain = (domain) => {
  if (DEFAULT_DOMAINS.includes(domain)) {
    return true;
  }
  return false;
};
const isGoogleMailEmailAddress = (email) => {
  if (!email) {
    return false;
  }
  const domain = parseDomain(email);
  if (GOOGLE_MAIL_DOMAINS.includes(domain)) {
    return true;
  }
  return false;
};
export {
  DOMAIN_BLOCKED_ERROR_MESSAGE,
  DOMAIN_INVALID_MESSAGE,
  EMAIL_ADDRESS_INVALID_MESSAGE,
  checkForDisallowedDomain,
  isDefaultDomain,
  isDomainInProvidersToNormalizeList,
  isGoogleMailEmailAddress,
  normalizeEmail,
  parseDomain,
  parseNormalizedLocalAndDomain,
  shouldSkipEmail,
  shouldStoreNormalizedEmail,
  validateDomain
};
//# sourceMappingURL=emailUtils.js.map
