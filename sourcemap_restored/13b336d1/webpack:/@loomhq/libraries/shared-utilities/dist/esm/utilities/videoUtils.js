import "../chunk-BYZ2GIR3.js";
import * as recordingClientsConstants from "../constants/recordingClients";
import * as recordingTypesConstants from "../constants/recordingTypes";
import * as recordingVersionsConstants from "../constants/recordingVersions";
import * as videoConstants from "../constants/video";
const { IOS } = recordingClientsConstants;
const { VIDEO_PRIVACY_PUBLIC } = videoConstants;
const { SCREEN } = recordingTypesConstants;
const { V3, V4, V5, V6, V7, V8 } = recordingVersionsConstants;
const isPrivateOrPasswordProtectedVideo = (video) => isPrivate(video) || hasPassword(video) || video.is_protected;
const isPublicVideo = (video) => !isPrivateOrPasswordProtectedVideo(video);
const isPrivate = (video) => video.privacy !== null && video.privacy !== void 0 && video.privacy !== VIDEO_PRIVACY_PUBLIC;
const hasPassword = (video) => video.password !== null && video.password !== void 0;
const viewersCanWeaveVideo = (video) => video.getViewersCanWeave();
const getRecordingVersion = (video) => video.get("video_properties").recording_version;
const shouldFilterSensitiveData = (video, isOwner) => {
  if (video.viewer_needs_permission === void 0 || video.needs_password === void 0) {
    throw new Error(
      "shouldFilterSensitiveData can only be used on video objects with viewer_needs_permission and needs_password defined"
    );
  }
  return !isOwner && (video.viewer_needs_permission || video.needs_password);
};
const isCurrentUserOwner = (video, user) => video.currentUserIsOwner(user);
const getIsUnweavableIOSVideo = (video) => {
  var _a, _b, _c;
  return ((_a = video.video_properties) == null ? void 0 : _a.recordingClient) === IOS && ((_b = video.video_properties) == null ? void 0 : _b.recording_type) === SCREEN && ((_c = video.video_properties) == null ? void 0 : _c.format) === void 0;
};
const getIsUnweavableRecordingVersionVideo = (video) => {
  var _a;
  return ![V3, V4, V5, V6, V7, V8].includes(
    (_a = video.video_properties) == null ? void 0 : _a.recording_version
  );
};
const getIsUnweavableVideo = (video) => {
  return getIsUnweavableRecordingVersionVideo(video) || getIsUnweavableIOSVideo(video);
};
export {
  getIsUnweavableIOSVideo,
  getIsUnweavableRecordingVersionVideo,
  getIsUnweavableVideo,
  getRecordingVersion,
  hasPassword,
  isCurrentUserOwner,
  isPrivate,
  isPrivateOrPasswordProtectedVideo,
  isPublicVideo,
  shouldFilterSensitiveData,
  viewersCanWeaveVideo
};
//# sourceMappingURL=videoUtils.js.map
