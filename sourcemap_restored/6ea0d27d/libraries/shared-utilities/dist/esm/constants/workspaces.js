import "../chunk-BYZ2GIR3.js";
const PRIVATE_WORKSPACE = "private";
const SHARED_WORKSPACE = "shared";
const TEAM_WORKSPACE = "team";
const TEAM_WORKSPACE_DISPLAY_NAME = "Team Library";
const PRIVATE_WORKSPACE_DISPLAY_NAME = "Personal Library";
const ALL_WORKSPACES = [
  PRIVATE_WORKSPACE,
  SHARED_WORKSPACE,
  TEAM_WORKSPACE
];
const WORKSPACE_CREATION_METHOD_ADMIN_TOOL = "admin_tool";
const WORKSPACE_CREATION_METHOD_SIGNUP_FLOW = "signup_flow";
const WORKSPACE_CREATION_METHOD_CREATE_WORKSPACE_MODAL = "create_workspace_modal";
const WORKSPACE_CREATION_METHOD_SIGNUP_MODAL = "signup_modal";
const WORKSPACE_CREATION_METHOD_ANON_SHARE_GATE_MODAL = "anon_share_gate_modal";
const WORKSPACE_CREATION_METHOD_ACTIVATION = "activation";
const WORKSPACE_CREATION_METHOD_CLOUD_PROVISIONER = "cloud_provisioner";
const ACCOUNT_SUSPENSION_REASONS = {
  SUSPENDED_NON_PAYMENT: "suspended_non_payment"
};
var WorkspaceDeletionStage = /* @__PURE__ */ ((WorkspaceDeletionStage2) => {
  WorkspaceDeletionStage2["INITIAL"] = "initial";
  WorkspaceDeletionStage2["CONTENT"] = "content";
  WorkspaceDeletionStage2["WORKSPACE"] = "workspace";
  return WorkspaceDeletionStage2;
})(WorkspaceDeletionStage || {});
var WorkspaceDeletionStatus = /* @__PURE__ */ ((WorkspaceDeletionStatus2) => {
  WorkspaceDeletionStatus2["RECEIVED"] = "received";
  WorkspaceDeletionStatus2["SUCCESS"] = "success";
  WorkspaceDeletionStatus2["FAILURE"] = "failure";
  return WorkspaceDeletionStatus2;
})(WorkspaceDeletionStatus || {});
export {
  ACCOUNT_SUSPENSION_REASONS,
  ALL_WORKSPACES,
  PRIVATE_WORKSPACE,
  PRIVATE_WORKSPACE_DISPLAY_NAME,
  SHARED_WORKSPACE,
  TEAM_WORKSPACE,
  TEAM_WORKSPACE_DISPLAY_NAME,
  WORKSPACE_CREATION_METHOD_ACTIVATION,
  WORKSPACE_CREATION_METHOD_ADMIN_TOOL,
  WORKSPACE_CREATION_METHOD_ANON_SHARE_GATE_MODAL,
  WORKSPACE_CREATION_METHOD_CLOUD_PROVISIONER,
  WORKSPACE_CREATION_METHOD_CREATE_WORKSPACE_MODAL,
  WORKSPACE_CREATION_METHOD_SIGNUP_FLOW,
  WORKSPACE_CREATION_METHOD_SIGNUP_MODAL,
  WorkspaceDeletionStage,
  WorkspaceDeletionStatus
};
//# sourceMappingURL=workspaces.js.map
