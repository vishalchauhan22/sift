import "../chunk-BYZ2GIR3.js";
import { EmailGatingSetting } from "./emailGating";
import { AI_FEATURES_DEFAULT_VALUE, WORKFLOW_TEMPLATE } from "./intelligence";
import { Language } from "../types/transcription";
var MeetingPromptEnum = /* @__PURE__ */ ((MeetingPromptEnum2) => {
  MeetingPromptEnum2["ACTION_ITEMS_PROMPT"] = "actionItems";
  MeetingPromptEnum2["BUSINESS_OVERVIEW_PROMPT"] = "businessOverview";
  MeetingPromptEnum2["COMPANY_ANNOUNCEMENTS_PROMPT"] = "companyAnnouncements";
  MeetingPromptEnum2["CUSTOMER_NEXT_STEPS_PROMPT"] = "customerNextSteps";
  MeetingPromptEnum2["DEADLINES_PROMPT"] = "deadlines";
  MeetingPromptEnum2["QUESTIONS_ASKED_PROMPT"] = "questionsAsked";
  MeetingPromptEnum2["QUESTIONS_AND_KEY_POINTS_PROMPT"] = "questionsAndKeyPoints";
  MeetingPromptEnum2["SALES_BLOCKERS_PROMPT"] = "salesBlockers";
  MeetingPromptEnum2["SALES_BUDGET_PROMPT"] = "salesBudget";
  MeetingPromptEnum2["SALES_CUSTOMER_REACTIONS_PROMPT"] = "salesCustomerReactions";
  MeetingPromptEnum2["SALES_CUSTOMER_USE_CASES_PROMPT"] = "salesCustomerUseCases";
  MeetingPromptEnum2["SALES_COMPETITORS_MENTIONED_PROMPT"] = "salesCompetitorsMentioned";
  MeetingPromptEnum2["SALES_DECISION_PROCESS_PROMPT"] = "salesDecisionProcess";
  MeetingPromptEnum2["SALES_PRODUCT_SERVICE_DISCUSSION_PROMPT"] = "salesProductServiceDiscussion";
  MeetingPromptEnum2["SALES_PROSPECT_INFORMATION_PROMPT"] = "salesProspectInformation";
  MeetingPromptEnum2["SALES_RISKS_AND_OBSTACLES_PROMPT"] = "salesRisksAndObstacles";
  MeetingPromptEnum2["SALES_TIMING_PROMPT"] = "salesTiming";
  MeetingPromptEnum2["SUMMARY_AND_RECAP_PROMPT"] = "shortSummaryAndDetailedRecap";
  MeetingPromptEnum2["STRATEGIC_DIRECTION_PROMPT"] = "strategicDirection";
  MeetingPromptEnum2["TEAM_UPDATES_PROMPT"] = "teamUpdates";
  return MeetingPromptEnum2;
})(MeetingPromptEnum || {});
var MeetingTypeEnum = /* @__PURE__ */ ((MeetingTypeEnum2) => {
  MeetingTypeEnum2["DEFAULT"] = "default";
  MeetingTypeEnum2["ALL_HANDS"] = "allHands";
  MeetingTypeEnum2["CUSTOMER_CHECK_IN"] = "customerCheckIn";
  MeetingTypeEnum2["REWATCH_ALL_HANDS"] = "rewatchAllHands";
  MeetingTypeEnum2["SALES_CALL"] = "salesCall";
  return MeetingTypeEnum2;
})(MeetingTypeEnum || {});
var VideoPropertyEnum = /* @__PURE__ */ ((VideoPropertyEnum2) => {
  VideoPropertyEnum2["BOOLEAN_VALUE"] = "booleanValue";
  VideoPropertyEnum2["NUMBER_VALUE"] = "numberValue";
  VideoPropertyEnum2["STRING_VALUE"] = "stringValue";
  VideoPropertyEnum2["JSON_VALUE"] = "jsonValue";
  VideoPropertyEnum2["CHAPTERS"] = "chapters";
  VideoPropertyEnum2["AUTO_TRIM_SILENCE_AND_FILLER_WORDS"] = "auto_trim_silence_and_filler_words";
  VideoPropertyEnum2["EMAIL_GATE_VIDEO_TYPE"] = "email_gate_video_type";
  VideoPropertyEnum2["EXPIRATION_DATE"] = "expiration_date";
  VideoPropertyEnum2["SALESFORCE_ENGAGEMENT_TRACKING"] = "salesforce_engagement_tracking";
  VideoPropertyEnum2["VIDEO_VARIABLES"] = "video_variables";
  VideoPropertyEnum2["AUTO_TITLE_STATUS"] = "auto_title_status";
  VideoPropertyEnum2["AUTO_SUMMARY_STATUS"] = "auto_summary_status";
  VideoPropertyEnum2["AUTO_CHAPTERS_STATUS"] = "auto_chapters_status";
  VideoPropertyEnum2["AUTO_TASKS_STATUS"] = "auto_tasks_status";
  VideoPropertyEnum2["AFFIRMATION_STATUS"] = "affirmation_ai_status";
  VideoPropertyEnum2["INQUIRY_STATUS"] = "inquiry_ai_status";
  VideoPropertyEnum2["TRANSCRIPTION_LANGUAGE"] = "transcription_language";
  VideoPropertyEnum2["MEETING"] = "meeting";
  VideoPropertyEnum2["VARIABLES_RECIPIENT_EMAIL"] = "variablesRecipientEmail";
  VideoPropertyEnum2["REWATCH_IMPORT"] = "rewatch_import";
  VideoPropertyEnum2["VIEWER_CAPTIONS_ON"] = "viewer_captions_on";
  VideoPropertyEnum2["STYLIZED_CAPTIONS"] = "stylized_captions";
  VideoPropertyEnum2["SUMMARY_PROMPT_OVERRIDE"] = "summary_prompt_override";
  VideoPropertyEnum2["PROMPT_OVERRIDES"] = "prompt_overrides";
  VideoPropertyEnum2["DISMISS_WORKFLOW_SNEAKPEEK"] = "dismiss_workflow_sneekpeek";
  VideoPropertyEnum2["LOOM_CATEGORY"] = "loom_category";
  VideoPropertyEnum2["GEN_VIDEO_DRAFT_ID"] = "gen_video_draft_id";
  VideoPropertyEnum2["RECORDING_DOCUMENTATION_TYPE"] = "recording_documentation_type";
  return VideoPropertyEnum2;
})(VideoPropertyEnum || {});
const videoProperties = {
  // Used for testing
  ["booleanValue" /* BOOLEAN_VALUE */]: {
    defaultValue: false,
    type: Boolean
  },
  // Used for testing
  ["numberValue" /* NUMBER_VALUE */]: {
    defaultValue: 0,
    type: Number
  },
  // Used for testing
  ["stringValue" /* STRING_VALUE */]: {
    defaultValue: "",
    type: String
  },
  // Used for testing
  ["jsonValue" /* JSON_VALUE */]: {
    defaultValue: null,
    type: JSON
  },
  ["chapters" /* CHAPTERS */]: {
    defaultValue: {},
    type: JSON
  },
  ["auto_trim_silence_and_filler_words" /* AUTO_TRIM_SILENCE_AND_FILLER_WORDS */]: {
    defaultValue: {
      hasTrimmedSilences: false,
      hasTrimmedFillerWords: false,
      hasTrimmedFillerWordsPlus: false,
      secondsOfSilenceTrimmed: 0,
      numberOfFillerWordsTrimmed: 0,
      numberOfFillerWordsPlusTrimmed: 0
    },
    type: JSON
  },
  ["email_gate_video_type" /* EMAIL_GATE_VIDEO_TYPE */]: {
    defaultValue: EmailGatingSetting.None,
    type: typeof EmailGatingSetting
  },
  ["expiration_date" /* EXPIRATION_DATE */]: {
    defaultValue: "",
    type: String
    //ISO string
  },
  ["salesforce_engagement_tracking" /* SALESFORCE_ENGAGEMENT_TRACKING */]: {
    defaultValue: false,
    type: Boolean
  },
  ["video_variables" /* VIDEO_VARIABLES */]: {
    defaultValue: {},
    type: JSON
  },
  ["auto_title_status" /* AUTO_TITLE_STATUS */]: {
    defaultValue: AI_FEATURES_DEFAULT_VALUE,
    type: JSON
  },
  ["auto_summary_status" /* AUTO_SUMMARY_STATUS */]: {
    defaultValue: AI_FEATURES_DEFAULT_VALUE,
    type: JSON
  },
  ["auto_chapters_status" /* AUTO_CHAPTERS_STATUS */]: {
    defaultValue: AI_FEATURES_DEFAULT_VALUE,
    type: JSON
  },
  ["auto_tasks_status" /* AUTO_TASKS_STATUS */]: {
    defaultValue: AI_FEATURES_DEFAULT_VALUE,
    type: JSON
  },
  ["inquiry_ai_status" /* INQUIRY_STATUS */]: {
    defaultValue: AI_FEATURES_DEFAULT_VALUE,
    type: JSON
  },
  ["affirmation_ai_status" /* AFFIRMATION_STATUS */]: {
    defaultValue: AI_FEATURES_DEFAULT_VALUE,
    type: JSON
  },
  ["transcription_language" /* TRANSCRIPTION_LANGUAGE */]: {
    defaultValue: Language.UNKNOWN,
    type: String
  },
  ["meeting" /* MEETING */]: {
    defaultValue: {},
    type: JSON
  },
  ["variablesRecipientEmail" /* VARIABLES_RECIPIENT_EMAIL */]: {
    defaultValue: "",
    type: String
  },
  ["rewatch_import" /* REWATCH_IMPORT */]: {
    defaultValue: {},
    type: JSON
  },
  ["viewer_captions_on" /* VIEWER_CAPTIONS_ON */]: {
    defaultValue: false,
    type: Boolean
  },
  ["stylized_captions" /* STYLIZED_CAPTIONS */]: {
    defaultValue: false,
    type: Boolean
  },
  // Deprecated - TODO This field is deprecated in favor of PROMPT_OVERRIDES. Remove after DB cleanup.
  ["summary_prompt_override" /* SUMMARY_PROMPT_OVERRIDE */]: {
    defaultValue: "",
    type: String
  },
  ["prompt_overrides" /* PROMPT_OVERRIDES */]: {
    defaultValue: {},
    type: JSON
  },
  ["dismiss_workflow_sneekpeek" /* DISMISS_WORKFLOW_SNEAKPEEK */]: {
    defaultValue: false,
    type: Boolean
  },
  ["loom_category" /* LOOM_CATEGORY */]: {
    defaultValue: {
      category: "",
      confidence: 0
    },
    type: JSON
  },
  ["gen_video_draft_id" /* GEN_VIDEO_DRAFT_ID */]: {
    defaultValue: "",
    type: String
  },
  ["recording_documentation_type" /* RECORDING_DOCUMENTATION_TYPE */]: {
    defaultValue: null,
    type: WORKFLOW_TEMPLATE
  }
};
export {
  MeetingPromptEnum,
  MeetingTypeEnum,
  VideoPropertyEnum,
  videoProperties
};
//# sourceMappingURL=videoProperties.js.map
