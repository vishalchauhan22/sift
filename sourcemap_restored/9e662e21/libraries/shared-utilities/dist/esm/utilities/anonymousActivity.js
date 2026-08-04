import "../chunk-BYZ2GIR3.js";
import {
  base64ToObjectAndDecrypt,
  objectToBase64AndEncrypt
} from "./encodingUtils";
import {
  KEY_ANON_COMMENT_DATA,
  KEY_ANON_REACTION_DATA,
  KEY_ANON_REDIRECT_DATA,
  KEY_ANON_REPLY_RECORDING_DATA,
  KEY_ANON_SDK_RECORDING_DATA
} from "../constants/cookie";
const fieldsToEncrypt = [
  "recordedReplyVideoId",
  "repliedToVideoId",
  "addReplyId",
  "anonCommentVideoId",
  "anonReactionVideoId",
  "anonParentPostId",
  "anonSDKRecordingVideoId"
];
const _getAnonRecordingParams = (anonData) => {
  const recordingData = anonData;
  return {
    recordedReplyVideoId: recordingData.recordedReplyVideoId,
    repliedToVideoId: recordingData.repliedToVideoId,
    videoCurrentTime: recordingData.videoCurrentTime,
    addReplyId: recordingData.addReplyId
  };
};
const _getAnonCommentParams = (anonData) => {
  const commentData = anonData;
  return {
    anonComment: commentData.anonComment,
    anonCommentVideoId: commentData.anonCommentVideoId,
    anonCommentTimestamp: commentData.anonCommentTimestamp ? Number(commentData.anonCommentTimestamp) : null,
    anonParentPostId: commentData.anonParentPostId
  };
};
const _getAnonReactionParams = (anonData) => {
  const reactionData = anonData;
  return {
    anonReaction: reactionData.anonReaction,
    anonReactionVideoId: reactionData.anonReactionVideoId,
    anonReactionTimestamp: reactionData.anonReactionTimestamp ? Number(reactionData.anonReactionTimestamp) : null
  };
};
const _getAnonRedirectParams = (anonData) => {
  const redirectData = anonData;
  return {
    anonRedirect: redirectData.anonRedirect
  };
};
const _getAnonSDKRecordingParams = (anonData) => {
  const sdkRecordingData = anonData;
  return {
    anonSDKRecordingVideoId: sdkRecordingData.anonSDKRecordingVideoId
  };
};
const getBase64EncodedAnonActivityData = (anonData, skipEncryption) => {
  if (!anonData || Object.values(anonData).every(
    (value) => value === void 0 || value === null
  )) {
    return {
      anonRecordingBase64: null,
      anonCommentBase64: null,
      anonReactionBase64: null,
      anonRedirectBase64: null,
      anonSDKRecordingBase64: null
    };
  }
  const anonRecording = _getAnonRecordingParams(anonData);
  const anonComment = _getAnonCommentParams(anonData);
  const anonReaction = _getAnonReactionParams(anonData);
  const anonRedirect = _getAnonRedirectParams(anonData);
  const anonSDKRecording = _getAnonSDKRecordingParams(anonData);
  const anonActivityData = {
    anonRecordingBase64: objectToBase64AndEncrypt({
      obj: anonRecording,
      fieldsToEncrypt,
      skipEncryption
    }),
    anonCommentBase64: objectToBase64AndEncrypt({
      obj: anonComment,
      fieldsToEncrypt,
      skipEncryption
    }),
    anonReactionBase64: objectToBase64AndEncrypt({
      obj: anonReaction,
      fieldsToEncrypt,
      skipEncryption
    }),
    anonRedirectBase64: objectToBase64AndEncrypt({
      obj: anonRedirect,
      fieldsToEncrypt,
      skipEncryption
    }),
    anonSDKRecordingBase64: objectToBase64AndEncrypt({
      obj: anonSDKRecording,
      fieldsToEncrypt,
      skipEncryption
    })
  };
  return anonActivityData;
};
const getDecodedAnonActivityData = (enocodedAnonActivityData, skipDecryption) => {
  const anonRecording = enocodedAnonActivityData.anonRecordingBase64 ? base64ToObjectAndDecrypt({
    base64String: enocodedAnonActivityData.anonRecordingBase64,
    fieldsToDecrypt: fieldsToEncrypt,
    skipDecryption
  }) : null;
  const anonComment = enocodedAnonActivityData.anonCommentBase64 ? base64ToObjectAndDecrypt({
    base64String: enocodedAnonActivityData.anonCommentBase64,
    fieldsToDecrypt: fieldsToEncrypt,
    skipDecryption
  }) : null;
  const anonReaction = enocodedAnonActivityData.anonReactionBase64 ? base64ToObjectAndDecrypt({
    base64String: enocodedAnonActivityData.anonReactionBase64,
    fieldsToDecrypt: fieldsToEncrypt,
    skipDecryption
  }) : null;
  const anonRedirect = enocodedAnonActivityData.anonRedirectBase64 ? base64ToObjectAndDecrypt({
    base64String: enocodedAnonActivityData.anonRedirectBase64,
    fieldsToDecrypt: fieldsToEncrypt,
    skipDecryption
  }) : null;
  const anonSDKRecording = enocodedAnonActivityData.anonSDKRecordingBase64 ? base64ToObjectAndDecrypt({
    base64String: enocodedAnonActivityData.anonSDKRecordingBase64,
    fieldsToDecrypt: fieldsToEncrypt,
    skipDecryption
  }) : null;
  return {
    anonRecording,
    anonComment,
    anonReaction,
    anonRedirect,
    anonSDKRecording
  };
};
const MAP_ANON_FIELD_TO_COOKIE_KEY = {
  anonRecording: KEY_ANON_REPLY_RECORDING_DATA,
  anonComment: KEY_ANON_COMMENT_DATA,
  anonReaction: KEY_ANON_REACTION_DATA,
  anonRedirect: KEY_ANON_REDIRECT_DATA,
  anonSDKRecording: KEY_ANON_SDK_RECORDING_DATA
};
export {
  MAP_ANON_FIELD_TO_COOKIE_KEY,
  getBase64EncodedAnonActivityData,
  getDecodedAnonActivityData
};
//# sourceMappingURL=anonymousActivity.js.map
