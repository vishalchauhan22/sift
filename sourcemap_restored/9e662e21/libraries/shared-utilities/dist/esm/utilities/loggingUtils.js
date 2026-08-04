import "../chunk-BYZ2GIR3.js";
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
export {
  resolveRequiredTags
};
//# sourceMappingURL=loggingUtils.js.map
