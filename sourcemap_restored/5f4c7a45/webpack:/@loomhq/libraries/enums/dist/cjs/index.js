"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AuthenticationStep: () => AuthenticationStep,
  AwsRegion: () => AwsRegion,
  BrowserExtensionMessage: () => BrowserExtensionMessage,
  CascadingRecordersMenuTrigger: () => CascadingRecordersMenuTrigger,
  DOMHooks: () => DOMHooks,
  Environment: () => Environment,
  EnvironmentUrl: () => EnvironmentUrl,
  FeatureExperiments: () => FeatureExperiments,
  FeatureFlags: () => FeatureFlags,
  FeatureGates: () => FeatureGates,
  LogLevel: () => LogLevel,
  LoomURL: () => LoomURL,
  OnboardingTutorialStep: () => OnboardingTutorialStep,
  OrgRoles: () => OrgRoles,
  Permalink: () => Permalink,
  PermissionErrors: () => PermissionErrors,
  PermissionState: () => PermissionState,
  PostRecordingConfirm: () => PostRecordingConfirm,
  PreRecordingModal: () => PreRecordingModal,
  QualityProfile: () => QualityProfile,
  RecordLayerStates: () => RecordLayerStates,
  RecorderClient: () => RecorderClient,
  RecorderVersion: () => RecorderVersion,
  RecordingPage: () => RecordingPage,
  RecordingScreenType: () => RecordingScreenType,
  RecordingStage: () => RecordingStage,
  RecordingType: () => RecordingType,
  ResultKind: () => ResultKind,
  S3Bucket: () => S3Bucket,
  SDKPackage: () => SDKPackage,
  SDKPermissionFailureReason: () => SDKPermissionFailureReason,
  SDKRecordingType: () => SDKRecordingType,
  SDKState: () => SDKState,
  SDKUnsupportedReasons: () => SDKUnsupportedReasons,
  SharedAuthEvent: () => SharedAuthEvent,
  StorageClass: () => StorageClass,
  ToastContent: () => ToastContent,
  WebSocketStatusCode: () => WebSocketStatusCode
});
module.exports = __toCommonJS(index_exports);

// src/authentication.ts
var AuthenticationStep = /* @__PURE__ */ ((AuthenticationStep2) => {
  AuthenticationStep2["First"] = "first-authentication-step";
  AuthenticationStep2["Second"] = "second-authentication-step";
  return AuthenticationStep2;
})(AuthenticationStep || {});
var OrgRoles = /* @__PURE__ */ ((OrgRoles2) => {
  OrgRoles2["Admin"] = "admin";
  OrgRoles2["Creator"] = "creator";
  OrgRoles2["CreatorLite"] = "creator_lite";
  OrgRoles2["Guest"] = "guest";
  OrgRoles2["Viewer"] = "viewer";
  return OrgRoles2;
})(OrgRoles || {});

// src/logging.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["Fatal"] = "fatal";
  LogLevel2["Error"] = "error";
  LogLevel2["Warning"] = "warn";
  LogLevel2["Info"] = "info";
  LogLevel2["Debug"] = "debug";
  return LogLevel2;
})(LogLevel || {});
var SharedAuthEvent = /* @__PURE__ */ ((SharedAuthEvent2) => {
  SharedAuthEvent2["Initiated"] = "Shared Auth Flow Initiated";
  SharedAuthEvent2["GraphQLSubscribed"] = "Shared Auth GraphQL Subscribed";
  SharedAuthEvent2["GraphQLHeardBack"] = "Shared Auth GraphQL Heard Back";
  SharedAuthEvent2["SessionRequestTokenReceived"] = "Shared Auth Received Session Request Token";
  SharedAuthEvent2["LoginSuccess"] = "Shared Auth Login Success";
  return SharedAuthEvent2;
})(SharedAuthEvent || {});

// src/routes.ts
var Permalink = /* @__PURE__ */ ((Permalink2) => {
  Permalink2["EXTENSION_RECORDING_SUPPORT_ARTICLE"] = "https://support.loom.com/hc/en-us/articles/360002187698-Getting-started-with-the-Chrome-Extension";
  Permalink2["DESKTOP_RECORDING_SUPPORT_ARTICLE"] = "https://support.loom.com/hc/en-us/articles/360002207917-Getting-started-with-the-Desktop-App";
  Permalink2["CHROME_EXTENSION_INSTALL"] = "https://chrome.google.com/webstore/detail/loom-video-recorder-scree/liecbddmkiiihnedobmlmillhodjkdmb";
  return Permalink2;
})(Permalink || {});
var LoomURL = /* @__PURE__ */ ((LoomURL2) => {
  LoomURL2["Production"] = "https://loom.com";
  LoomURL2["Staging"] = "https://stage.loom.com";
  LoomURL2["Development"] = "https://loomlocal.com:4444";
  return LoomURL2;
})(LoomURL || {});

// src/messages.ts
var BrowserExtensionMessage = /* @__PURE__ */ ((BrowserExtensionMessage2) => {
  BrowserExtensionMessage2["INITIATE_LOOM_RECORDER_FROM_BUTTON"] = "initiate-loom-recorder-from-script";
  return BrowserExtensionMessage2;
})(BrowserExtensionMessage || {});

// src/recorders.ts
var RecorderVersion = /* @__PURE__ */ ((RecorderVersion2) => {
  RecorderVersion2["V5"] = "v5";
  RecorderVersion2["V3"] = "v3";
  RecorderVersion2["V7"] = "v7";
  return RecorderVersion2;
})(RecorderVersion || {});
var RecorderClient = /* @__PURE__ */ ((RecorderClient2) => {
  RecorderClient2["CHROME"] = "chrome";
  RecorderClient2["SDK"] = "sdk";
  return RecorderClient2;
})(RecorderClient || {});
var PostRecordingConfirm = /* @__PURE__ */ ((PostRecordingConfirm2) => {
  PostRecordingConfirm2["CloseModal"] = "close-modal";
  PostRecordingConfirm2["DeleteRecording"] = "delete-modal";
  PostRecordingConfirm2["RedoRecording"] = "restart-recording";
  PostRecordingConfirm2["InsertRecording"] = "insert-recording";
  return PostRecordingConfirm2;
})(PostRecordingConfirm || {});
var PreRecordingModal = /* @__PURE__ */ ((PreRecordingModal2) => {
  PreRecordingModal2["RecordingControls"] = "recording-controls";
  PreRecordingModal2["Authentication"] = "authentication";
  PreRecordingModal2["Offline"] = "offline";
  PreRecordingModal2["SystemPermissions"] = "system-permissions";
  PreRecordingModal2["MemberVideoLimitPaywall"] = "member-video-limit-paywall";
  PreRecordingModal2["ErrorModal"] = "error-modal";
  return PreRecordingModal2;
})(PreRecordingModal || {});
var RecordingStage = /* @__PURE__ */ ((RecordingStage2) => {
  RecordingStage2["OnboardingTutorial"] = "onboarding-tutorial";
  RecordingStage2["Cascaded"] = "cascaded";
  RecordingStage2["PreRecording"] = "pre-recording";
  RecordingStage2["Countdown"] = "countdown";
  RecordingStage2["CountdownSkipped"] = "countdown-skipped";
  RecordingStage2["Recording"] = "recording";
  RecordingStage2["Paused"] = "paused";
  RecordingStage2["PostRecording"] = "post-recording";
  RecordingStage2["Closed"] = "closed";
  return RecordingStage2;
})(RecordingStage || {});
var RecordingType = /* @__PURE__ */ ((RecordingType2) => {
  RecordingType2["ScreenAndCamera"] = "screen_cam";
  RecordingType2["ScreenOnly"] = "screen";
  RecordingType2["CameraOnly"] = "cam";
  return RecordingType2;
})(RecordingType || {});
var RecordingScreenType = /* @__PURE__ */ ((RecordingScreenType2) => {
  RecordingScreenType2["Camera"] = "cam";
  RecordingScreenType2["Desktop"] = "desktop";
  RecordingScreenType2["Tab"] = "tab";
  return RecordingScreenType2;
})(RecordingScreenType || {});
var SDKRecordingType = /* @__PURE__ */ ((SDKRecordingType2) => {
  SDKRecordingType2["FullScreen"] = "full_screen";
  SDKRecordingType2["Window"] = "window";
  SDKRecordingType2["CurrentTab"] = "current_tab";
  SDKRecordingType2["CameraOnly"] = "camera_only";
  return SDKRecordingType2;
})(SDKRecordingType || {});
var RecordingPage = /* @__PURE__ */ ((RecordingPage2) => {
  RecordingPage2["About"] = "about-tab";
  RecordingPage2["Notifications"] = "notifications-tab";
  RecordingPage2["PreRecord"] = "pre-recording-tab";
  RecordingPage2["Settings"] = "settings-tab";
  RecordingPage2["OSPermissionsTour"] = "os-permission-tour";
  RecordingPage2["Effects"] = "effects";
  RecordingPage2["Canvas"] = "canvas";
  RecordingPage2["VideoLimit"] = "videoLimit";
  RecordingPage2["Blur"] = "blurText";
  RecordingPage2["NetworkError"] = "networkError";
  RecordingPage2["UpdateBrowser"] = "updateBrowser";
  RecordingPage2["SignUp"] = "sign-up";
  RecordingPage2["GenericError"] = "generic-error";
  RecordingPage2["ScreenSystemPermissions"] = "screen-system-permissions";
  RecordingPage2["AudioCameraSystemPermissions"] = "audio-camera-system-permissions";
  RecordingPage2["StoragePermissions"] = "storage-permissions";
  return RecordingPage2;
})(RecordingPage || {});
var ToastContent = /* @__PURE__ */ ((ToastContent2) => {
  ToastContent2["Summary"] = "summary";
  ToastContent2["Chapters"] = "chapters";
  return ToastContent2;
})(ToastContent || {});

// src/outcomes.ts
var ResultKind = /* @__PURE__ */ ((ResultKind2) => {
  ResultKind2["Success"] = "success";
  ResultKind2["Failed"] = "failed";
  return ResultKind2;
})(ResultKind || {});

// src/websocket.ts
var WebSocketStatusCode = /* @__PURE__ */ ((WebSocketStatusCode2) => {
  WebSocketStatusCode2[WebSocketStatusCode2["WS_CLOSE_CODE_NORMAL"] = 1e3] = "WS_CLOSE_CODE_NORMAL";
  WebSocketStatusCode2[WebSocketStatusCode2["WS_CLOSE_CODE_GOING_AWAY"] = 1001] = "WS_CLOSE_CODE_GOING_AWAY";
  WebSocketStatusCode2[WebSocketStatusCode2["WS_CLOSE_UNSUPPORTED_DATA"] = 1003] = "WS_CLOSE_UNSUPPORTED_DATA";
  WebSocketStatusCode2[WebSocketStatusCode2["WS_CLOSE_CODE_ABNORMAL_CLOSE"] = 1006] = "WS_CLOSE_CODE_ABNORMAL_CLOSE";
  return WebSocketStatusCode2;
})(WebSocketStatusCode || {});

// src/recordlayer.ts
var RecordLayerStates = /* @__PURE__ */ ((RecordLayerStates2) => {
  RecordLayerStates2["Abandoning"] = "wrucore-is-abandoning";
  RecordLayerStates2["Abandoned"] = "wrucore-is-abandoned";
  RecordLayerStates2["Intitializing"] = "wrucore-is-initializing";
  RecordLayerStates2["Ready"] = "wrucore-is-ready";
  RecordLayerStates2["Starting"] = "wrucore-is-starting";
  RecordLayerStates2["Recording"] = "wrucore-is-recording";
  RecordLayerStates2["Pausing"] = "wrucore-is-pausing";
  RecordLayerStates2["Paused"] = "wrucore-is-paused";
  RecordLayerStates2["Resuming"] = "wrucore-is-resuming";
  RecordLayerStates2["Resumed"] = "wrucore-is-resumed";
  RecordLayerStates2["Cancelling"] = "wrucore-is-cancelling";
  RecordLayerStates2["Cancelled"] = "wrucore-is-cancelled";
  RecordLayerStates2["MediaStreamStopped"] = "wrucore-is-media-stream-stopped";
  RecordLayerStates2["Completing"] = "wrucore-is-completing";
  RecordLayerStates2["FinishedUploading"] = "wrucore-is-finished-uploading";
  RecordLayerStates2["Completed"] = "wrucore-is-completed";
  RecordLayerStates2["Unknown"] = "wrucore-unknown-state";
  return RecordLayerStates2;
})(RecordLayerStates || {});

// src/quality-profile.ts
var QualityProfile = /* @__PURE__ */ ((QualityProfile2) => {
  QualityProfile2["Lowest"] = "lowest";
  QualityProfile2["Low"] = "low";
  QualityProfile2["Normal"] = "normal";
  QualityProfile2["High"] = "high";
  QualityProfile2["Highest"] = "highest";
  return QualityProfile2;
})(QualityProfile || {});

// src/s3-bucket.ts
var S3Bucket = /* @__PURE__ */ ((S3Bucket2) => {
  S3Bucket2["Development"] = "loom-media-dev";
  S3Bucket2["Test"] = "loom-media-test";
  S3Bucket2["Stage"] = "loom-media-staging";
  S3Bucket2["StageEU"] = "loom-stg-euc1-media";
  S3Bucket2["Production"] = "loom-media-production";
  return S3Bucket2;
})(S3Bucket || {});
var StorageClass = /* @__PURE__ */ ((StorageClass2) => {
  StorageClass2["IntelligentTiering"] = "INTELLIGENT_TIERING";
  return StorageClass2;
})(StorageClass || {});

// src/aws.ts
var AwsRegion = /* @__PURE__ */ ((AwsRegion2) => {
  AwsRegion2["USWest2"] = "us-west-2";
  return AwsRegion2;
})(AwsRegion || {});

// src/permissions.ts
var PermissionState = /* @__PURE__ */ ((PermissionState2) => {
  PermissionState2["Granted"] = "granted";
  PermissionState2["Prompt"] = "prompt";
  PermissionState2["Denied"] = "denied";
  return PermissionState2;
})(PermissionState || {});
var SDKPermissionFailureReason = /* @__PURE__ */ ((SDKPermissionFailureReason2) => {
  SDKPermissionFailureReason2["SystemPermissionNotGranted"] = "SystemPermissionNotGranted";
  SDKPermissionFailureReason2["ChromePermissionNotGranted"] = "ChromePermissionNotGranted";
  return SDKPermissionFailureReason2;
})(SDKPermissionFailureReason || {});
var PermissionErrors = /* @__PURE__ */ ((PermissionErrors2) => {
  PermissionErrors2["PermissionDismissedError"] = "PermissionDismissedError";
  return PermissionErrors2;
})(PermissionErrors || {});

// src/environment.ts
var Environment = /* @__PURE__ */ ((Environment2) => {
  Environment2["Development"] = "development";
  Environment2["Testbench"] = "testbench";
  Environment2["Staging"] = "staging";
  Environment2["Production"] = "production";
  return Environment2;
})(Environment || {});
var EnvironmentUrl = /* @__PURE__ */ ((EnvironmentUrl2) => {
  EnvironmentUrl2["Development"] = "https://loomlocal.com:4444";
  EnvironmentUrl2["Staging"] = "https://stage.loom.com";
  EnvironmentUrl2["Production"] = "https://www.loom.com";
  return EnvironmentUrl2;
})(EnvironmentUrl || {});

// src/feature-flags.ts
var FeatureGates = /* @__PURE__ */ ((FeatureGates2) => {
  FeatureGates2["ROLLOUT_SDK_CASCADING_RECORDERS_M3"] = "rollout-sdk-cascading-recorders-m3";
  return FeatureGates2;
})(FeatureGates || {});
var FeatureExperiments = /* @__PURE__ */ ((FeatureExperiments2) => {
  FeatureExperiments2["DESKTOP_SUBSCRIPTION_TIMEOUT"] = "cascading-recorders-desktop-subscription-timeout";
  FeatureExperiments2["ROLLOUT_NEW_SDK_ONBOARDING"] = "release-sdk-onboarding";
  return FeatureExperiments2;
})(FeatureExperiments || {});
var FeatureFlags = /* @__PURE__ */ ((FeatureFlags2) => {
  FeatureFlags2["GUEST_RECORDING_LIMITS"] = "guest-recording-limits";
  FeatureFlags2["ROLLOUT_NEW_SDK_ONBOARDING"] = "release-sdk-onboarding";
  FeatureFlags2["ROLLOUT_AI_SDK"] = "rollout-ai-in-sdk";
  FeatureFlags2["ROLLOUT_SDK_CASCADING_RECORDERS_M1"] = "rollout-sdk-cascading-recorders-m1";
  FeatureFlags2["ROLLOUT_SDK_M25_UI"] = "rollout-sdk-m25-ui-and-upsell";
  FeatureFlags2["ROLLOUT_SDK_PERMISSIONS_VISIBILITY"] = "rollout-sdk-permissions-visibility";
  FeatureFlags2["ROLLOUT_SDK_RECORDER_EDUCATION"] = "rollout-sdk-recorder-education";
  return FeatureFlags2;
})(FeatureFlags || {});

// src/api.ts
var SDKState = /* @__PURE__ */ ((SDKState2) => {
  SDKState2["Closed"] = "closed";
  SDKState2["PreRecording"] = "pre-recording";
  SDKState2["ActiveRecording"] = "active-recording";
  SDKState2["PostRecording"] = "post-recording";
  SDKState2["Cascaded"] = "cascaded";
  return SDKState2;
})(SDKState || {});

// src/chrome-extension.ts
var DOMHooks = /* @__PURE__ */ ((DOMHooks2) => {
  DOMHooks2["ContentContainer"] = "lo-engage-ext-container";
  DOMHooks2["Shadow"] = "loom-shadow";
  DOMHooks2["PreRecordingOverlay"] = "lo-pre-recording-overlay";
  return DOMHooks2;
})(DOMHooks || {});

// src/onboarding-tutorial.ts
var OnboardingTutorialStep = /* @__PURE__ */ ((OnboardingTutorialStep2) => {
  OnboardingTutorialStep2["PermissionsStep"] = "permissions-step";
  OnboardingTutorialStep2["RecorderSettingsStep"] = "recorder-settings-step";
  OnboardingTutorialStep2["RecordingControlsStep"] = "recording-controls-step";
  OnboardingTutorialStep2["StartRecordingStep"] = "start-recording-step";
  OnboardingTutorialStep2["PermissionsBlockedStep"] = "permissions-blocked-step";
  return OnboardingTutorialStep2;
})(OnboardingTutorialStep || {});

// src/is-supported.ts
var SDKUnsupportedReasons = /* @__PURE__ */ ((SDKUnsupportedReasons2) => {
  SDKUnsupportedReasons2["IncompatibleBrowser"] = "incompatible-browser";
  SDKUnsupportedReasons2["ThirdPartyCookiesDisabled"] = "third-party-cookies-disabled";
  SDKUnsupportedReasons2["NoMediaStreamsSupport"] = "no-media-streams-support";
  SDKUnsupportedReasons2["GenericError"] = "generic-error";
  return SDKUnsupportedReasons2;
})(SDKUnsupportedReasons || {});

// src/sdk-package.ts
var SDKPackage = /* @__PURE__ */ ((SDKPackage2) => {
  SDKPackage2["Custom"] = "SDK Custom";
  SDKPackage2["FirstPartyMode"] = "First Party Mode";
  SDKPackage2["Standard"] = "SDK Standard";
  return SDKPackage2;
})(SDKPackage || {});

// src/cascading-recorders.ts
var CascadingRecordersMenuTrigger = /* @__PURE__ */ ((CascadingRecordersMenuTrigger2) => {
  CascadingRecordersMenuTrigger2["OpenPrerecordingMenu"] = "open-prerecording-menu";
  CascadingRecordersMenuTrigger2["Overlay"] = "overlay";
  CascadingRecordersMenuTrigger2["Unknown"] = "unknown";
  return CascadingRecordersMenuTrigger2;
})(CascadingRecordersMenuTrigger || {});
//# sourceMappingURL=index.js.map
