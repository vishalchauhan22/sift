import "../chunk-BYZ2GIR3.js";
import {
  ORG_ROLE_HIERARCHY,
  ORG_ROLE_DISPLAY_NAMES,
  ORG_ROLE_CREATOR,
  TEMP_ORG_ROLE_MEMBER_DISPLAY_NAME
} from "../constants/organizationRoles";
const getMemberRoleWithSmallestOrdinality = (roles) => {
  const current = {
    role: null,
    ordinalValue: Number.MAX_SAFE_INTEGER
  };
  roles.forEach((role) => {
    const roleOrdinalValue = ORG_ROLE_HIERARCHY[role];
    if (roleOrdinalValue && roleOrdinalValue <= current.ordinalValue) {
      current.role = role;
      current.ordinalValue = roleOrdinalValue;
    }
  });
  if (!current.role) {
    throw new Error("Unable to determine a minimum role from possible roles");
  }
  return current.role;
};
const getRoleDisplayName = (role, config) => {
  const roleName = role ? role.toLocaleLowerCase() : "";
  if (roleName === ORG_ROLE_CREATOR && config.hideViewer) {
    return TEMP_ORG_ROLE_MEMBER_DISPLAY_NAME;
  }
  return ORG_ROLE_DISPLAY_NAMES[roleName];
};
export {
  getMemberRoleWithSmallestOrdinality,
  getRoleDisplayName
};
//# sourceMappingURL=membershipsUtils.js.map
