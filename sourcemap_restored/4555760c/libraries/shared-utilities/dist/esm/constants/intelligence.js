import "../chunk-BYZ2GIR3.js";
var INTELLIGENCE_STATUS = /* @__PURE__ */ ((INTELLIGENCE_STATUS2) => {
  INTELLIGENCE_STATUS2["INVALID"] = "INVALID";
  INTELLIGENCE_STATUS2["UNKNOWN"] = "UNKNOWN";
  INTELLIGENCE_STATUS2["PENDING"] = "PENDING";
  INTELLIGENCE_STATUS2["USER"] = "USER";
  INTELLIGENCE_STATUS2["AUTO"] = "AUTO";
  return INTELLIGENCE_STATUS2;
})(INTELLIGENCE_STATUS || {});
var INTELLIGENCE_COMPLETION_STATUS = /* @__PURE__ */ ((INTELLIGENCE_COMPLETION_STATUS2) => {
  INTELLIGENCE_COMPLETION_STATUS2["INVALID"] = "INVALID";
  INTELLIGENCE_COMPLETION_STATUS2["FINAL"] = "FINAL";
  INTELLIGENCE_COMPLETION_STATUS2["SPECULATIVE"] = "SPECULATIVE";
  return INTELLIGENCE_COMPLETION_STATUS2;
})(INTELLIGENCE_COMPLETION_STATUS || {});
var INTELLIGENCE_CONTENT = /* @__PURE__ */ ((INTELLIGENCE_CONTENT2) => {
  INTELLIGENCE_CONTENT2["AUTO_GENERATED"] = "AUTO_GENERATED";
  INTELLIGENCE_CONTENT2["DEFAULT"] = "DEFAULT";
  INTELLIGENCE_CONTENT2["USER_EDITED_AUTO_GENERATED"] = "USER_EDITED_AUTO_GENERATED";
  INTELLIGENCE_CONTENT2["USER_EDITED_DEFAULT"] = "USER_EDITED_DEFAULT";
  INTELLIGENCE_CONTENT2["ATTEMPTED_AUTO_GENERATION"] = "ATTEMPTED_AUTO_GENERATION";
  return INTELLIGENCE_CONTENT2;
})(INTELLIGENCE_CONTENT || {});
const AUTO_CONTEXT_INELIGIBLE = "ineligible";
const AUTO_CONTEXT_CONTROL = "control";
const AUTO_CONTEXT_CHATGPT = "variant-chatgpt";
const AUTO_CONTEXT_CHATGPT_EXCLUDED = "variant-chatgpt-excluded";
const AUTO_CONTEXT_VARIANT_EXCLUDED = "variant-excluded";
const SEMANTIC_SEARCH_CONTROL = "control";
const SEMANTIC_SEARCH_VARIANT_OPENAI = "variant-openai";
const SEMANTIC_SEARCH_DUMMY_CONTROL = "dummy-control";
const SEMANTIC_SEARCH_DUMMY_VARIANT = "dummy-variant";
const SEMANTIC_SEARCH_INELIGIBLE = "ineligible";
const SEMANTIC_SEARCH_VARIANT_OPENAI_EXCLUDED = "variant-openai-excluded";
const SEMANTIC_SEARCH_CONTROL_EXCLUDED = "control-excluded";
const SEMANTIC_SEARCH_ENABLED_VARIANTS = [
  SEMANTIC_SEARCH_VARIANT_OPENAI,
  SEMANTIC_SEARCH_VARIANT_OPENAI_EXCLUDED
];
const SEMANTIC_SEARCH_BACKFILL_ENABLED_VARIANTS = [
  SEMANTIC_SEARCH_VARIANT_OPENAI,
  SEMANTIC_SEARCH_VARIANT_OPENAI_EXCLUDED
];
const INTELLIGENCE_VARIANTS = [
  AUTO_CONTEXT_CHATGPT,
  AUTO_CONTEXT_CHATGPT_EXCLUDED,
  AUTO_CONTEXT_VARIANT_EXCLUDED
];
const AUTO_CTA_METRICS_FEATURE_NAME = "auto_cta";
const AUTO_CHAPTERS_MINIMUM_VIDEO_DURATION = 180;
var AUTO_CHAPTER_STATUS_TYPE = /* @__PURE__ */ ((AUTO_CHAPTER_STATUS_TYPE2) => {
  AUTO_CHAPTER_STATUS_TYPE2["UNSUPPORTED"] = "unsupported";
  AUTO_CHAPTER_STATUS_TYPE2["IN_PROGRESS"] = "in_progress";
  AUTO_CHAPTER_STATUS_TYPE2["SUCCESS"] = "success";
  AUTO_CHAPTER_STATUS_TYPE2["FAILURE"] = "failure";
  AUTO_CHAPTER_STATUS_TYPE2["NOT_STARTED"] = "not_started";
  return AUTO_CHAPTER_STATUS_TYPE2;
})(AUTO_CHAPTER_STATUS_TYPE || {});
var CHAPTER_GENERATION_METHOD = /* @__PURE__ */ ((CHAPTER_GENERATION_METHOD2) => {
  CHAPTER_GENERATION_METHOD2["AUTO_GENERATION"] = "AUTO_GENERATION";
  CHAPTER_GENERATION_METHOD2["USER_EDITED"] = "USER_EDITED";
  CHAPTER_GENERATION_METHOD2["AUTO_GENERATION_FAILED"] = "AUTO_GENERATION_FAILED";
  return CHAPTER_GENERATION_METHOD2;
})(CHAPTER_GENERATION_METHOD || {});
var WORKFLOW_TEMPLATE = /* @__PURE__ */ ((WORKFLOW_TEMPLATE2) => {
  WORKFLOW_TEMPLATE2["SOP"] = "sop";
  WORKFLOW_TEMPLATE2["CODE_DOCS"] = "code_docs";
  WORKFLOW_TEMPLATE2["PR_DESCRIPTION"] = "pr_description";
  WORKFLOW_TEMPLATE2["QA_STEPS"] = "qa_steps";
  WORKFLOW_TEMPLATE2["STEP_BY_STEP"] = "step_by_step";
  WORKFLOW_TEMPLATE2["SUMMARY"] = "summary";
  WORKFLOW_TEMPLATE2["LOOM_CATEGORIZATION"] = "loom_categorization";
  WORKFLOW_TEMPLATE2["CATEGORIZATION_FACTUALITY"] = "categorization_factuality";
  WORKFLOW_TEMPLATE2["EMAIL"] = "email";
  WORKFLOW_TEMPLATE2["CHAT"] = "chat";
  WORKFLOW_TEMPLATE2["JIRA"] = "jira";
  WORKFLOW_TEMPLATE2["LINEAR"] = "linear";
  WORKFLOW_TEMPLATE2["ISSUE_GENERATION"] = "issue_generation";
  WORKFLOW_TEMPLATE2["BUG_REPORT"] = "BUG_REPORT";
  WORKFLOW_TEMPLATE2["MESSAGE"] = "MESSAGE";
  return WORKFLOW_TEMPLATE2;
})(WORKFLOW_TEMPLATE || {});
var WORKFLOW_TYPE = /* @__PURE__ */ ((WORKFLOW_TYPE2) => {
  WORKFLOW_TYPE2["SCRIBE"] = "scribe";
  WORKFLOW_TYPE2["SHARE_MESSAGE"] = "share_message";
  WORKFLOW_TYPE2["CATEGORIZATION"] = "categorization";
  WORKFLOW_TYPE2["JIRA"] = "jira";
  WORKFLOW_TYPE2["LINEAR"] = "linear";
  WORKFLOW_TYPE2["ISSUE"] = "issue";
  WORKFLOW_TYPE2["SUMMARY"] = "summary_for_viewers";
  return WORKFLOW_TYPE2;
})(WORKFLOW_TYPE || {});
var SMART_PROMPT_CATEGORIES = /* @__PURE__ */ ((SMART_PROMPT_CATEGORIES2) => {
  SMART_PROMPT_CATEGORIES2["BUG_REPORT"] = "bug report";
  SMART_PROMPT_CATEGORIES2["QA_STEPS"] = "qa steps";
  SMART_PROMPT_CATEGORIES2["PR_DESCRIPTION"] = "pull request description";
  SMART_PROMPT_CATEGORIES2["CODE_DOCS"] = "code documentation";
  SMART_PROMPT_CATEGORIES2["PROCESS_WALKTHROUGH"] = "process walkthrough";
  SMART_PROMPT_CATEGORIES2["STEP_BY_STEP"] = "step by step";
  SMART_PROMPT_CATEGORIES2["OTHER"] = "other";
  return SMART_PROMPT_CATEGORIES2;
})(SMART_PROMPT_CATEGORIES || {});
const acceptableCategories = /* @__PURE__ */ new Set([
  "bug report" /* BUG_REPORT */
]);
const SHARE_MESSAGE_LINK_PLACEHOLDER = "{loom_link}";
const COMPOSER_SRC_URL_PARAM = "src=composer";
const COMPLETION_TOKENS_COUNT = 1e3;
var FailureReason = /* @__PURE__ */ ((FailureReason2) => {
  FailureReason2["MISSING_VIDEO"] = "missing_video";
  FailureReason2["MISSING_USER"] = "missing_user";
  FailureReason2["NOT_IN_EXPERIMENT"] = "not_in_experiment";
  FailureReason2["EXCLUDE_ENTERPRISE"] = "reason_exclude_enterprise";
  FailureReason2["INVALID_DURATION"] = "invalid_duration";
  FailureReason2["USER_SETTING_DISABLED"] = "user_setting_disabled";
  FailureReason2["WORKSPACE_SETTING_DISABLED"] = "workspace_setting_disabled";
  FailureReason2["UPLOAD_OR_TRIM"] = "upload_or_trim";
  FailureReason2["USER_EDITED"] = "user_edited";
  FailureReason2["AUTO_EDITED"] = "auto_edited";
  FailureReason2["NO_COMPLETION_TIME"] = "no_completion_time";
  FailureReason2["TIMEOUT"] = "timeout";
  FailureReason2["EMPTY_TRANSCRIPT"] = "empty_transcript";
  FailureReason2["MINIMUM_TRANSCRIPT_LENGTH"] = "minimum_transcript_length";
  FailureReason2["FAILED_TO_PARSE_MESSAGE"] = "failed_to_parse_message";
  FailureReason2["FAILED_ERROR_CODE"] = "failed_error_code";
  FailureReason2["EMPTY_MEETING_SUMMRY"] = "empty_meeting_summry";
  FailureReason2["NO_RESPONSE_STREAM"] = "no_response_stream";
  FailureReason2["USAGE_LIMIT"] = "usage_limit";
  FailureReason2["ADD_ON_PLAN"] = "add_on_plan";
  FailureReason2["NO_TASKS_DETECTED"] = "no_tasks_detected";
  FailureReason2["EMPTY_CHAPTERS"] = "empty chapters";
  FailureReason2["FAILED_FORMAT_CHAPTERS"] = "failed to format video chapters with auto chapters";
  FailureReason2["FAILED_FORMAT_NUDGES"] = "failed to format video nudges with auto nudges";
  FailureReason2["PRE_CALL_PROCESS_FAILED"] = "pre_call_process_failed";
  FailureReason2["POST_CALL_PROCESS_FAILED"] = "post_call_process_failed";
  FailureReason2["MEETING_VIDEO"] = "meeting_video";
  FailureReason2["MISSING_SCREENSHOT"] = "missing_screenshot";
  FailureReason2["FAILED_FORMAT_SCREENSHOT_TITLE"] = "failed_format_screenshot_title";
  FailureReason2["FAILED_FETCH_SCREENSHOT"] = "failed_fetch_screenshot";
  FailureReason2["FAILED_IMAGE_MODERATION"] = "failed_image_moderation";
  FailureReason2["ITX_UNHANDLED_ERROR"] = "itx_unhandled_error";
  FailureReason2["ITX_INVALID_LANGUAGE"] = "itx_invalid_language";
  FailureReason2["ITX_LARGE_FILE"] = "itx_large_file";
  FailureReason2["ITX_MANIFEST_MISMATCH"] = "itx_manifest_mismatch";
  FailureReason2["ITX_MANIFEST_NOT_RESOLVED"] = "itx_manifest_not_resolved";
  FailureReason2["ITX_SESSION_TERMINATED"] = "itx_session_terminated";
  FailureReason2["UNHANDLED_ERROR"] = "unhandled_error";
  return FailureReason2;
})(FailureReason || {});
const REASON_METADATA = {
  ["add_on_plan" /* ADD_ON_PLAN */]: {
    description: "The user is not on the AI Add On plan. This is not an error, but rather the user is not in an eligible workspace."
  },
  ["auto_edited" /* AUTO_EDITED */]: {
    description: "The feature was already edited by the system automatically (not by the user). This is an error because the system should apply multiple edits to the feature."
  },
  ["empty_transcript" /* EMPTY_TRANSCRIPT */]: {
    description: "The video has an empty transcript. This is a catch all for many issues including: (1) no transcript was available yet by the time intelligence was processed, even after retries. (2) the video has no vocal audio (user does not talk, their microphone is on mute). (3) the video has no unintelligible audio, either quality or a non-supported language. (4) infrastructure failure in fetching the transcript from AWS S3, either from our end or AWS."
  },
  ["reason_exclude_enterprise" /* EXCLUDE_ENTERPRISE */]: {
    description: "The video is in an enterprise account, and is excluded for this feature"
  },
  ["failed_error_code" /* FAILED_ERROR_CODE */]: {
    description: "The ChatGPT response has an error code. ChatGPT is likely down, or there is an invalid request being passed in (too many tokens, etc.)."
  },
  ["failed_fetch_screenshot" /* FAILED_FETCH_SCREENSHOT */]: {
    description: "Failed to fetch the screenshot image data from url."
  },
  ["failed to format video chapters with auto chapters" /* FAILED_FORMAT_CHAPTERS */]: {
    description: "Video chapters were not parsable from the ChatGPT response, likely a malformed response."
  },
  ["failed to format video nudges with auto nudges" /* FAILED_FORMAT_NUDGES */]: {
    description: "Video nudges were not parsable from the ChatGPT response, likely a malformed response."
  },
  ["failed_format_screenshot_title" /* FAILED_FORMAT_SCREENSHOT_TITLE */]: {
    description: "The screenshot title was not parsable from the Gemini response, likely a malformed response."
  },
  ["failed_to_parse_message" /* FAILED_TO_PARSE_MESSAGE */]: {
    description: "The ChatGPT response could not be parsed. This is most likely due to a malformed response from ChatGPT."
  },
  ["invalid_duration" /* INVALID_DURATION */]: {
    description: "The video is not long enough to be processed by this feature."
  },
  ["itx_invalid_language" /* ITX_INVALID_LANGUAGE */]: {
    description: "The video is not in a supported language for this feature."
  },
  ["itx_large_file" /* ITX_LARGE_FILE */]: {
    description: "The transcription process could not handle the recorded file size."
  },
  ["itx_manifest_mismatch" /* ITX_MANIFEST_MISMATCH */]: {
    description: "The transcription process found a problem in the recording manifest."
  },
  ["itx_manifest_not_resolved" /* ITX_MANIFEST_NOT_RESOLVED */]: {
    description: "The transcription process could not find the recording manifest."
  },
  ["itx_session_terminated" /* ITX_SESSION_TERMINATED */]: {
    description: "The transcription process waited too long for the recording completion."
  },
  ["itx_unhandled_error" /* ITX_UNHANDLED_ERROR */]: {
    description: "Generic error during transcription."
  },
  ["minimum_transcript_length" /* MINIMUM_TRANSCRIPT_LENGTH */]: {
    description: "The video has a transcript that is too short to be processed by this feature. Currently the limit is 150 characters, and this is enforced for all languages. This means denser languages by character length may require more more transcript to be available"
  },
  ["missing_screenshot" /* MISSING_SCREENSHOT */]: {
    description: "The screenshot could not be found, mostly likely it's been deleted before intelligence could be processed."
  },
  ["missing_user" /* MISSING_USER */]: {
    description: "The user could not be found, mostly likely something is down with the database preventing users from being fetched."
  },
  ["missing_video" /* MISSING_VIDEO */]: {
    description: "The video could not be found, mostly likely it's been deleted or canceled before intelligence could be processed."
  },
  ["no_completion_time" /* NO_COMPLETION_TIME */]: {
    description: "The video has no known completion time, which means the timeout cannot be calculated."
  },
  ["no_response_stream" /* NO_RESPONSE_STREAM */]: {
    description: "The ChatGPT response has no response stream. This is most due to an outage by ChatGPT preventing a streaming connection from being set up."
  },
  ["no_tasks_detected" /* NO_TASKS_DETECTED */]: {
    description: "ChatGPT did not detect any tasks in the video transcript. This is not necessarily a problem. Many, if not most recordings do not contain tasks."
  },
  ["not_in_experiment" /* NOT_IN_EXPERIMENT */]: {
    description: "The user is not in the experiment for this particular feature."
  },
  ["timeout" /* TIMEOUT */]: {
    description: "Intelligence took too long to process. Preventing any intelligence from overriding the results on the video."
  },
  ["upload_or_trim" /* UPLOAD_OR_TRIM */]: {
    description: "The video is either an upload (v4) or a trim (v6), and is not eligible for this feature."
  },
  ["usage_limit" /* USAGE_LIMIT */]: {
    description: "The user has used up their free AI Add On plan usage limit. This can be bumped in the admin console if needed"
  },
  ["user_edited" /* USER_EDITED */]: {
    description: "The feature was edited by the user before intelligence could be made available."
  },
  ["user_setting_disabled" /* USER_SETTING_DISABLED */]: {
    description: "The user has disabled this feature in their settings. This is not an error, but rather a user preference."
  },
  ["workspace_setting_disabled" /* WORKSPACE_SETTING_DISABLED */]: {
    description: "The workspace has disabled this feature. This is not an error, but rather a setting from workspace admin."
  }
};
const AI_FEATURES_DEFAULT_VALUE = {};
export {
  AI_FEATURES_DEFAULT_VALUE,
  AUTO_CHAPTERS_MINIMUM_VIDEO_DURATION,
  AUTO_CHAPTER_STATUS_TYPE,
  AUTO_CONTEXT_CHATGPT,
  AUTO_CONTEXT_CHATGPT_EXCLUDED,
  AUTO_CONTEXT_CONTROL,
  AUTO_CONTEXT_INELIGIBLE,
  AUTO_CONTEXT_VARIANT_EXCLUDED,
  AUTO_CTA_METRICS_FEATURE_NAME,
  CHAPTER_GENERATION_METHOD,
  COMPLETION_TOKENS_COUNT,
  COMPOSER_SRC_URL_PARAM,
  FailureReason,
  INTELLIGENCE_COMPLETION_STATUS,
  INTELLIGENCE_CONTENT,
  INTELLIGENCE_STATUS,
  INTELLIGENCE_VARIANTS,
  REASON_METADATA,
  SEMANTIC_SEARCH_BACKFILL_ENABLED_VARIANTS,
  SEMANTIC_SEARCH_CONTROL,
  SEMANTIC_SEARCH_CONTROL_EXCLUDED,
  SEMANTIC_SEARCH_DUMMY_CONTROL,
  SEMANTIC_SEARCH_DUMMY_VARIANT,
  SEMANTIC_SEARCH_ENABLED_VARIANTS,
  SEMANTIC_SEARCH_INELIGIBLE,
  SEMANTIC_SEARCH_VARIANT_OPENAI,
  SEMANTIC_SEARCH_VARIANT_OPENAI_EXCLUDED,
  SHARE_MESSAGE_LINK_PLACEHOLDER,
  SMART_PROMPT_CATEGORIES,
  WORKFLOW_TEMPLATE,
  WORKFLOW_TYPE,
  acceptableCategories
};
//# sourceMappingURL=intelligence.js.map
