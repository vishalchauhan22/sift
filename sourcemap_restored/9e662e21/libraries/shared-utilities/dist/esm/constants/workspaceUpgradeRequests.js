import "../chunk-BYZ2GIR3.js";
const REQUEST_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved"
};
const UPGRADE_TYPES = {
  PLAN: "plan",
  ROLE: "role",
  ADD_ON: "add_on"
};
function isUpgradeType(potentialUpgradeType) {
  return Object.values(UPGRADE_TYPES).includes(
    potentialUpgradeType
  );
}
export {
  REQUEST_STATUSES,
  UPGRADE_TYPES,
  isUpgradeType
};
//# sourceMappingURL=workspaceUpgradeRequests.js.map
