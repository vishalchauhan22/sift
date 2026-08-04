import {
  ORG_ROLE_HIERARCHY,
  PAID_ORG_ROLES,
  ROLE_DEMOTION,
  ROLE_PROMOTION,
  ORG_ROLE_DISPLAY_NAMES
} from "@loomhq/shared-utilities/constants/organizationRoles";
import { ALL_SALES_SUPPORT_TYPES } from "@loomhq/shared-utilities/constants/salesSupportTypes";
import {
  ACTION_WORKSPACE_BILLABLE_ADDED,
  ACTION_WORKSPACE_BILLABLE_DELETED,
  ACTION_WORKSPACE_BILLABLE_ROLE_CHANGE,
  ACTION_WORKSPACE_BILLABLE_STATUS_CHANGE
} from "@loomhq/shared-utilities/constants/workspaceAuditLog";
import {
  WORKSPACE_MEMBER_STATUS_ACTIVE,
  WORKSPACE_MEMBER_STATUS_DEACTIVATED,
  WORKSPACE_MEMBER_STATUS_DEACTIVATED_SCIM
} from "@loomhq/shared-utilities/constants/workspaceMemberStatus";
import {
  TEAM_WORKSPACE_PLANS,
  WORKSPACE_PLAN_ENTERPRISE,
  WORKSPACE_PLAN_BUSINESS,
  ALL_WORKSPACE_ADD_ON_PLANS,
  WORKSPACE_ADD_ON_PLAN_AI,
  WORKSPACE_PLAN_STARTER_FREE,
  WORKSPACE_PLAN_HIERARCHY
} from "@loomhq/shared-utilities/constants/workspacePlans";
import {
  LOOM_BUSINESS_DISPLAY_NAME,
  LOOM_ENTERPRISE_DISPLAY_NAME,
  LOOM_STARTER_FREE_DISPLAY_NAME,
  SALES_LED_SEAT_COUNT_THRESHOLD,
  LOOM_DEV_BUSINESS_AI_PRODUCT,
  LOOM_TEST_BUSINESS_AI_PRODUCT,
  LOOM_LIVE_BUSINESS_AI_PRODUCT,
  LOOM_DEV_BUSINESS_PRODUCT,
  LOOM_TEST_BUSINESS_PRODUCT,
  LOOM_LIVE_BUSINESS_PRODUCT,
  LOOM_DEV_ENTERPRISE_PRODUCT,
  LOOM_TEST_ENTERPRISE_PRODUCT,
  LOOM_LIVE_ENTERPRISE_PRODUCT,
  LOOM_DEV_AI_PRODUCT,
  LOOM_TEST_AI_PRODUCT,
  LOOM_LIVE_AI_PRODUCT,
  LOOM_DEV_AI_SALES_LED_PRODUCT,
  LOOM_TEST_AI_SALES_LED_PRODUCT,
  LOOM_LIVE_AI_SALES_LED_PRODUCT,
  LOOM_DEV_BUSINESS_SALES_LED_PRODUCT,
  LOOM_TEST_BUSINESS_SALES_LED_PRODUCT,
  LOOM_LIVE_BUSINESS_SALES_LED_PRODUCT,
  LOOM_BUSINESS_AI_DISPLAY_NAME
} from "./constant";
const buildAtlassianAdminHubUrl = (siteId) => "https://www.atlassian.com/".concat(siteId);
function getRoleChangeType(from, to) {
  if (from === null && to === null) {
    throw new Error(
      "Cannot determine role change type when both from and to roles are null"
    );
  }
  if (from === null) {
    return ROLE_PROMOTION;
  }
  if (to === null) {
    return ROLE_DEMOTION;
  }
  return ORG_ROLE_HIERARCHY[from] < ORG_ROLE_HIERARCHY[to] ? ROLE_PROMOTION : ROLE_DEMOTION;
}
function roleChangeHasSelfServeBillingImpact(roleChange, plan, salesSupportType) {
  const { fromRole, toRole } = roleChange;
  const planBillable = isCurrentPlanBillable(plan);
  const selfServe = isSelfServe(plan, salesSupportType);
  const roleChangeBillable = isBillableRoleChange({
    fromRole,
    toRole
  });
  return {
    impacting: planBillable && selfServe && roleChangeBillable,
    roleChangeType: getRoleChangeType(fromRole, toRole)
  };
}
function isBillableRoleChange({
  fromRole,
  toRole
}) {
  if (fromRole === null && toRole === null) {
    throw new Error(
      "Cannot determine if role change is billable when both from and to roles are null"
    );
  }
  if (fromRole === null && toRole) {
    return PAID_ORG_ROLES.includes(toRole);
  }
  if (fromRole && toRole === null) {
    return false;
  }
  const isBillableDowngrade = PAID_ORG_ROLES.includes(fromRole != null ? fromRole : "") && !PAID_ORG_ROLES.includes(toRole != null ? toRole : "");
  const isBillableUpgrade = !PAID_ORG_ROLES.includes(fromRole != null ? fromRole : "") && PAID_ORG_ROLES.includes(toRole != null ? toRole : "");
  return isBillableDowngrade || isBillableUpgrade;
}
function isCurrentPlanBillable(plan) {
  if (plan === "education" || plan === "starter_free") {
    return false;
  }
  return TEAM_WORKSPACE_PLANS.includes(plan);
}
function isSelfServe(workspacePlan, salesSupportType) {
  const salesLed = salesSupportType ? ALL_SALES_SUPPORT_TYPES.includes(salesSupportType) : false;
  const enterprise = workspacePlan === WORKSPACE_PLAN_ENTERPRISE;
  return !salesLed && !enterprise;
}
function shouldCreatePendingDowngrade(roleChange, plan, salesSupportType, hasActiveTrial) {
  const { impacting: hasBillingImpact, roleChangeType } = roleChangeHasSelfServeBillingImpact(roleChange, plan, salesSupportType);
  return hasBillingImpact && roleChangeType === ROLE_DEMOTION && !hasActiveTrial;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getDisplayNameFromGrants(grants) {
  var _a, _b;
  const baseProduct = grants.find((g) => g.base);
  const addonProduct = grants.find((g) => g.addon);
  const baseProductName = capitalizeFirstLetter(
    (_a = baseProduct == null ? void 0 : baseProduct.base) != null ? _a : ""
  ).replaceAll("_", " ");
  const addonProductName = capitalizeFirstLetter(
    (_b = addonProduct == null ? void 0 : addonProduct.addon) != null ? _b : ""
  ).replaceAll("_", " ");
  if (baseProductName && addonProductName) {
    return "".concat(baseProductName, " + ").concat(addonProductName);
  }
  if (baseProductName) {
    return "".concat(baseProductName);
  }
  if (addonProductName) {
    return "".concat(addonProductName);
  }
  return "";
}
const getPlanDisplayNameFromWorkspaceType = (workspaceType, aiAddOn = false) => {
  switch (workspaceType) {
    case "starter_free":
      return LOOM_STARTER_FREE_DISPLAY_NAME;
    case "business":
      return aiAddOn ? LOOM_BUSINESS_AI_DISPLAY_NAME : LOOM_BUSINESS_DISPLAY_NAME;
    case "enterprise":
      return LOOM_ENTERPRISE_DISPLAY_NAME;
    case "education":
      return "for Education";
    default:
      return "";
  }
};
const getActionString = ({
  action,
  data,
  quantityDeltas,
  useMemberInsteadOfCreator
}) => {
  switch (action) {
    case ACTION_WORKSPACE_BILLABLE_ADDED:
      if (quantityDeltas.admins === 1) {
        return "Admin added";
      }
      if (quantityDeltas.creators === 1) {
        return useMemberInsteadOfCreator ? "Member added" : "Creator added";
      }
      break;
    case ACTION_WORKSPACE_BILLABLE_DELETED:
      if (quantityDeltas.admins === -1) {
        return "Admin removed";
      }
      if (quantityDeltas.creators === -1) {
        return "Creator removed";
      }
      break;
    case ACTION_WORKSPACE_BILLABLE_ROLE_CHANGE: {
      const currentRole = data.currentValue;
      const previousRole = data.previousValue;
      const roleChangeComp = ORG_ROLE_HIERARCHY[currentRole] - ORG_ROLE_HIERARCHY[previousRole];
      if (roleChangeComp > 0) {
        return "Promoted to ".concat(ORG_ROLE_DISPLAY_NAMES[currentRole]);
      } else if (roleChangeComp < 0) {
        return "Demoted to ".concat(ORG_ROLE_DISPLAY_NAMES[currentRole]);
      }
      break;
    }
    case ACTION_WORKSPACE_BILLABLE_STATUS_CHANGE: {
      const isActivated = data.currentValue === WORKSPACE_MEMBER_STATUS_ACTIVE;
      const isDeactivated = (/* @__PURE__ */ new Set([
        WORKSPACE_MEMBER_STATUS_DEACTIVATED,
        WORKSPACE_MEMBER_STATUS_DEACTIVATED_SCIM
      ])).has(data.currentValue);
      if (isActivated) {
        if (quantityDeltas.admins === 1) {
          return "Admin reactivated";
        }
        if (quantityDeltas.creators === 1) {
          return "Creator reactivated";
        }
      }
      if (isDeactivated) {
        if (quantityDeltas.admins === -1) {
          return "Admin deactivated";
        }
        if (quantityDeltas.creators === -1) {
          return "Creator deactivated";
        }
      }
      break;
    }
    default:
      return "";
  }
  return "";
};
const getCurrentMonthlyWindowFromBillingDetails = (billingDetails) => {
  var _a;
  if (!billingDetails || !((_a = billingDetails == null ? void 0 : billingDetails.billing_period) == null ? void 0 : _a.period_start)) {
    return [null, null];
  }
  const {
    billing_period: { period_start: currentPeriodStartMillis }
  } = billingDetails;
  return getMonthlyWindow(currentPeriodStartMillis);
};
const getMonthlyWindow = (currentPeriodStartMillis) => {
  const today = new Date(Date.now());
  const todayDate = today.getDate();
  const currentPeriodStartDate = new Date(currentPeriodStartMillis).getDate();
  if (todayDate >= currentPeriodStartDate) {
    return [
      new Date(today.getFullYear(), today.getMonth(), currentPeriodStartDate),
      new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        currentPeriodStartDate - 1,
        23,
        59,
        59,
        999
      )
    ];
  }
  return [
    new Date(today.getFullYear(), today.getMonth() - 1, currentPeriodStartDate),
    new Date(
      today.getFullYear(),
      today.getMonth(),
      currentPeriodStartDate - 1,
      23,
      59,
      59,
      999
    )
  ];
};
function intervalToBillingCadence(interval, intervalCount) {
  if (interval === "year" && intervalCount === 1) {
    return "yearly";
  }
  if (interval === "month" && intervalCount === 3) {
    return "quarterly";
  }
  if (interval === "month" && intervalCount === 1) {
    return "monthly";
  }
  throw new Error("Unsupported billing cadence");
}
function billingCadenceToInterval(cadence) {
  switch (cadence) {
    case "yearly":
    case "year":
      return {
        interval: "year",
        intervalCount: 1
      };
    case "quarterly":
    case "quarter":
      return {
        interval: "month",
        intervalCount: 3
      };
    case "monthly":
    case "month":
      return {
        interval: "month",
        intervalCount: 1
      };
    default:
      throw new Error("unknown cadence ".concat(cadence));
  }
}
function billingCadenceToPendingInvoiceItemInterval(cadence) {
  switch (cadence) {
    case "yearly":
    case "year":
    case "quarterly":
    case "quarter":
      return {
        pending_invoice_item_interval: {
          interval: "month",
          interval_count: 1
        }
      };
    case "monthly":
    case "month":
      return {};
    default:
      throw new Error("unknown cadence ".concat(cadence));
  }
}
function billingCadenceToBillingTerms(cadence) {
  switch (cadence) {
    case "yearly":
      return 12;
    case "quarterly":
      return 3;
    case "monthly":
      return 1;
    default:
      throw new Error("unknown cadence ".concat(cadence));
  }
}
function isQuantityDeltaBillImpacting(quantityDeltas) {
  if (!quantityDeltas || !quantityDeltas.admins || !quantityDeltas.creators) {
    return false;
  }
  return quantityDeltas.admins !== 0 || quantityDeltas.creators !== 0;
}
const isSeatCountAtWarningThreshold = (usedSeatCount, minimumSeatCount) => {
  const isOneLeft = Math.max(minimumSeatCount - usedSeatCount, 0) === 1;
  const isAtThreshold = usedSeatCount / minimumSeatCount >= SALES_LED_SEAT_COUNT_THRESHOLD;
  return isOneLeft || isAtThreshold;
};
function isBaseSubscriptionItem(subscriptionItem) {
  var _a, _b, _c;
  const productId = (_c = (_b = (_a = subscriptionItem == null ? void 0 : subscriptionItem.price) == null ? void 0 : _a.product) == null ? void 0 : _b.toString()) != null ? _c : "";
  const grant = getProductGrants(productId);
  return Boolean(grant.base);
}
function getRoleOfValue(roles, type, exclude = []) {
  let role;
  let value;
  roles = roles.filter((r) => !exclude.includes(r));
  if (!roles.length) {
    throw new Error("No roles provided");
  }
  roles.forEach((r) => {
    const hierarchyValue = ORG_ROLE_HIERARCHY[r];
    if (type === "max") {
      if (value === void 0 || hierarchyValue > value) {
        role = r;
        value = hierarchyValue;
      }
    } else {
      if (value === void 0 || hierarchyValue < value) {
        role = r;
        value = hierarchyValue;
      }
    }
  });
  if (!role) {
    throw new Error("No role found");
  }
  return role;
}
function productIsAddOn(product) {
  return productIsBundledType(product) || ALL_WORKSPACE_ADD_ON_PLANS.includes(product);
}
function productIsBundledType(product) {
  const bundledProducts = [
    LOOM_DEV_BUSINESS_AI_PRODUCT,
    LOOM_TEST_BUSINESS_AI_PRODUCT,
    LOOM_LIVE_BUSINESS_AI_PRODUCT
  ];
  return bundledProducts.includes(product);
}
function getLoomMasteredProductGrants(product) {
  switch (product) {
    case LOOM_DEV_BUSINESS_PRODUCT:
    case LOOM_TEST_BUSINESS_PRODUCT:
    case LOOM_LIVE_BUSINESS_PRODUCT:
    case LOOM_DEV_BUSINESS_SALES_LED_PRODUCT:
    case LOOM_TEST_BUSINESS_SALES_LED_PRODUCT:
    case LOOM_LIVE_BUSINESS_SALES_LED_PRODUCT:
      return {
        base: WORKSPACE_PLAN_BUSINESS
      };
    case LOOM_DEV_ENTERPRISE_PRODUCT:
    case LOOM_TEST_ENTERPRISE_PRODUCT:
    case LOOM_LIVE_ENTERPRISE_PRODUCT:
      return {
        base: WORKSPACE_PLAN_ENTERPRISE,
        addon: WORKSPACE_ADD_ON_PLAN_AI
      };
    case LOOM_DEV_AI_PRODUCT:
    case LOOM_TEST_AI_PRODUCT:
    case LOOM_LIVE_AI_PRODUCT:
    case LOOM_DEV_AI_SALES_LED_PRODUCT:
    case LOOM_TEST_AI_SALES_LED_PRODUCT:
    case LOOM_LIVE_AI_SALES_LED_PRODUCT:
      return {
        addon: WORKSPACE_ADD_ON_PLAN_AI
      };
    case LOOM_DEV_BUSINESS_AI_PRODUCT:
    case LOOM_TEST_BUSINESS_AI_PRODUCT:
    case LOOM_LIVE_BUSINESS_AI_PRODUCT:
      return {
        base: WORKSPACE_PLAN_BUSINESS,
        addon: WORKSPACE_ADD_ON_PLAN_AI
      };
    default:
      return {
        base: void 0,
        addon: void 0
      };
  }
}
function getAtlassianMasteredProductGrants(product) {
  switch (product) {
    case 1e3:
      return {
        base: WORKSPACE_PLAN_STARTER_FREE
      };
    case 2e3:
      return {
        base: WORKSPACE_PLAN_BUSINESS
      };
    case 3e3:
      return {
        base: WORKSPACE_PLAN_BUSINESS,
        addon: WORKSPACE_ADD_ON_PLAN_AI
      };
    case 4e3:
      return {
        base: WORKSPACE_PLAN_ENTERPRISE,
        addon: WORKSPACE_ADD_ON_PLAN_AI
      };
    default:
      return {
        base: void 0,
        addon: void 0
      };
  }
}
function getProductGrants(product) {
  if (typeof product === "number") {
    return getAtlassianMasteredProductGrants(product);
  }
  return getLoomMasteredProductGrants(product);
}
function isGrantGreater(grant, grantToCompare) {
  if (grant.base && !grantToCompare.base) {
    return true;
  }
  if (grant.base && grantToCompare.base) {
    const grantValue = WORKSPACE_PLAN_HIERARCHY[grant.base];
    const grantToCompareValue = WORKSPACE_PLAN_HIERARCHY[grantToCompare.base];
    if (grantValue === grantToCompareValue && grant.addon && !grantToCompare.addon) {
      return true;
    }
    return grantValue > grantToCompareValue;
  }
  return false;
}
function getGrantHierarchy(grant) {
  let score = 0;
  if (grant.base) {
    score += WORKSPACE_PLAN_HIERARCHY[grant.base];
  }
  if (grant.addon) {
    score += 1;
  }
  return score;
}
export {
  billingCadenceToBillingTerms,
  billingCadenceToInterval,
  billingCadenceToPendingInvoiceItemInterval,
  buildAtlassianAdminHubUrl,
  getActionString,
  getCurrentMonthlyWindowFromBillingDetails,
  getDisplayNameFromGrants,
  getGrantHierarchy,
  getMonthlyWindow,
  getPlanDisplayNameFromWorkspaceType,
  getProductGrants,
  getRoleChangeType,
  getRoleOfValue,
  intervalToBillingCadence,
  isBaseSubscriptionItem,
  isGrantGreater,
  isQuantityDeltaBillImpacting,
  isSeatCountAtWarningThreshold,
  isSelfServe,
  productIsAddOn,
  productIsBundledType,
  roleChangeHasSelfServeBillingImpact,
  shouldCreatePendingDowngrade
};
//# sourceMappingURL=utility.js.map
