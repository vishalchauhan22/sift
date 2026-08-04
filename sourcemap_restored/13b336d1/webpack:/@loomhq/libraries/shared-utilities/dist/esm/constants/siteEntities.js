import "../chunk-BYZ2GIR3.js";
var SiteEntityEnum = /* @__PURE__ */ ((SiteEntityEnum2) => {
  SiteEntityEnum2["ASSET"] = "asset";
  SiteEntityEnum2["FOLDER"] = "folder";
  SiteEntityEnum2["INVITE_LINK"] = "invite-link";
  SiteEntityEnum2["SPACE"] = "space";
  SiteEntityEnum2["SCREENSHOT"] = "screenshot";
  SiteEntityEnum2["SITE"] = "site";
  SiteEntityEnum2["REFERRAL_LINK"] = "referral-link";
  SiteEntityEnum2["VIDEO_IMPORT_REDIRECT"] = "video-import-redirect";
  SiteEntityEnum2["VIDEO"] = "video";
  SiteEntityEnum2["WORKSPACE"] = "workspace";
  SiteEntityEnum2["SDK_APP_ID"] = "sdk-app-id";
  SiteEntityEnum2["WORK_OS_ORGANIZATION"] = "work-os-organization";
  SiteEntityEnum2["WORK_OS_DIRECTORY"] = "work-os-directory";
  return SiteEntityEnum2;
})(SiteEntityEnum || {});
const SITE_ENTITY_TYPES = Object.values(
  SiteEntityEnum
);
const EntityRoutingHeader = "X-Loom-Entity-Routing";
const EntityRoutingSessionCookie = "loom_entity_routing_session";
export {
  EntityRoutingHeader,
  EntityRoutingSessionCookie,
  SITE_ENTITY_TYPES,
  SiteEntityEnum
};
//# sourceMappingURL=siteEntities.js.map
