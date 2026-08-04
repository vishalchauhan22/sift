import "../chunk-BYZ2GIR3.js";
import {
  APPLE,
  ATLASSIAN,
  AUTH0,
  GOOGLE,
  SLACK,
  WINDOWS,
  WORKOS
} from "./oAuthKeys";
const USERNAME = "username";
const NONE = "none";
const AuthTypes = {
  ATLASSIAN,
  APPLE,
  AUTH0,
  GOOGLE,
  SLACK,
  WORKOS,
  USERNAME,
  WINDOWS,
  NONE
};
const AuthTypeList = [
  ATLASSIAN,
  APPLE,
  AUTH0,
  GOOGLE,
  SLACK,
  WORKOS,
  USERNAME,
  WINDOWS,
  NONE
];
const AUTH_TYPES_SORT_ORDER = /* @__PURE__ */ new Map([
  [USERNAME, 0],
  [GOOGLE, 1],
  [SLACK, 2],
  [APPLE, 3],
  [WINDOWS, 4]
]);
function isAuthType(input) {
  return AuthTypeList.includes(input);
}
export {
  APPLE,
  ATLASSIAN,
  AUTH0,
  AUTH_TYPES_SORT_ORDER,
  AuthTypeList,
  AuthTypes,
  GOOGLE,
  NONE,
  SLACK,
  USERNAME,
  WINDOWS,
  WORKOS,
  isAuthType
};
//# sourceMappingURL=authTypes.js.map
