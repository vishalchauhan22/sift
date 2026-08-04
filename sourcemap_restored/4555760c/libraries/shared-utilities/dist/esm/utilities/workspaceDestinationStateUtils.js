import "../chunk-BYZ2GIR3.js";
var WorkspaceDestinationState = /* @__PURE__ */ ((WorkspaceDestinationState2) => {
  WorkspaceDestinationState2["EMPTY"] = "empty";
  WorkspaceDestinationState2["ALMOST_EMPTY"] = "almost_empty";
  WorkspaceDestinationState2["NOT_EMPTY"] = "not_empty";
  return WorkspaceDestinationState2;
})(WorkspaceDestinationState || {});
const ALMOST_EMPTY_VIDEO_THRESHOLD = 2;
const ALMOST_EMPTY_USER_THRESHOLD = 2;
const NOT_EMPTY_VIDEO_THRESHOLD = 20;
const NOT_EMPTY_USER_THRESHOLD = 5;
function getWorkspaceDestinationState({
  publishedVideoCounts,
  totalUsers
}) {
  if (publishedVideoCounts < ALMOST_EMPTY_VIDEO_THRESHOLD || totalUsers < ALMOST_EMPTY_USER_THRESHOLD) {
    return "empty" /* EMPTY */;
  } else if (publishedVideoCounts < NOT_EMPTY_VIDEO_THRESHOLD || totalUsers < NOT_EMPTY_USER_THRESHOLD) {
    return "almost_empty" /* ALMOST_EMPTY */;
  }
  return "not_empty" /* NOT_EMPTY */;
}
export {
  ALMOST_EMPTY_USER_THRESHOLD,
  ALMOST_EMPTY_VIDEO_THRESHOLD,
  NOT_EMPTY_USER_THRESHOLD,
  NOT_EMPTY_VIDEO_THRESHOLD,
  WorkspaceDestinationState,
  getWorkspaceDestinationState
};
//# sourceMappingURL=workspaceDestinationStateUtils.js.map
