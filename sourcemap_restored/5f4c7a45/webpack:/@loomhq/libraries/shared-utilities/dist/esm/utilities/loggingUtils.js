import {
  __spreadValues
} from "../chunk-BYZ2GIR3.js";
import {
  Feature,
  getTeamFromFeatureName,
  Team
} from "../constants/product";
const resolveRequiredTags = ({
  team,
  feature
}) => {
  let featureName = Feature.Undetermined.name;
  if (feature) {
    if (typeof feature === "string") {
      featureName = feature;
    } else {
      featureName = feature.name;
    }
  }
  let teamName = Team.Undetermined.name;
  if (team) {
    teamName = typeof team === "string" ? team : team.name;
  }
  if (teamName === Team.Undetermined.name) {
    teamName = getTeamFromFeatureName(featureName).name;
  }
  return { team: teamName, feature: featureName };
};
const sanitizeEmailFields = (obj) => {
  if (obj && typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map(sanitizeEmailFields);
    }
    const sanitized = __spreadValues({}, obj);
    Object.keys(sanitized).forEach((key) => {
      if (key === "email" && typeof sanitized[key] === "string") {
        delete sanitized[key];
      } else if (typeof sanitized[key] === "object") {
        sanitized[key] = sanitizeEmailFields(sanitized[key]);
      }
    });
    return sanitized;
  }
  return obj;
};
export {
  resolveRequiredTags,
  sanitizeEmailFields
};
//# sourceMappingURL=loggingUtils.js.map
