import "../chunk-BYZ2GIR3.js";
import {
  UnfurlType,
  QueryParam,
  AutoPublishToPrimarySpaceSetting
} from "../constants/slack";
const getUnfurlType = () => {
  const unfurl = new URL(window.location.href).searchParams.get(
    QueryParam.Unfurl
  );
  switch (unfurl) {
    case UnfurlType.Blocks:
      return UnfurlType.Blocks;
    default:
      return UnfurlType.Legacy;
  }
};
const isVideoBlockUnfurl = () => {
  return new URL(window.location.href).searchParams.get(QueryParam.Unfurl) === UnfurlType.Blocks;
};
const getAutoPublishToPrimarySpaceSettingFromSlackUserConnection = (slackUserConnection) => {
  var _a, _b;
  const setting = (_b = (_a = slackUserConnection.metadata) == null ? void 0 : _a.publish) == null ? void 0 : _b.autoPublishToPrimarySpaceEnabled;
  if (setting === void 0) {
    return AutoPublishToPrimarySpaceSetting.NotSet;
  } else if (setting) {
    return AutoPublishToPrimarySpaceSetting.Enabled;
  }
  return AutoPublishToPrimarySpaceSetting.Disabled;
};
export {
  getAutoPublishToPrimarySpaceSettingFromSlackUserConnection,
  getUnfurlType,
  isVideoBlockUnfurl
};
//# sourceMappingURL=slackUtils.js.map
