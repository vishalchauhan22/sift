import "../chunk-BYZ2GIR3.js";
const PRODUCTION_ENV = "production";
const STAGING_ENV = "staging";
const TEST_ENV = "test";
const DEVELOPMENT_ENV = "development";
var DeepLinkingPrefixes = /* @__PURE__ */ ((DeepLinkingPrefixes2) => {
  DeepLinkingPrefixes2["Production"] = "loomDesktop";
  DeepLinkingPrefixes2["Staging"] = "loomDesktopStaging";
  DeepLinkingPrefixes2["Development"] = "loomDesktop";
  return DeepLinkingPrefixes2;
})(DeepLinkingPrefixes || {});
const chooseDeeplinkingPrefix = (environment) => {
  switch (environment) {
    case TEST_ENV:
    case DEVELOPMENT_ENV:
      return "loomDesktop" /* Development */;
    case STAGING_ENV:
      return "loomDesktopStaging" /* Staging */;
    case PRODUCTION_ENV:
      return "loomDesktop" /* Production */;
    default:
      return "loomDesktop" /* Production */;
  }
};
export {
  DEVELOPMENT_ENV,
  DeepLinkingPrefixes,
  PRODUCTION_ENV,
  STAGING_ENV,
  TEST_ENV,
  chooseDeeplinkingPrefix
};
//# sourceMappingURL=environment.js.map
