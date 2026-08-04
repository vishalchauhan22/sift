import "../chunk-BYZ2GIR3.js";
var BannerInsightName = /* @__PURE__ */ ((BannerInsightName2) => {
  BannerInsightName2["TEAM_VIDEOS_CONSUMED"] = "TEAM_VIDEOS_CONSUMED";
  BannerInsightName2["TEAM_VIDEOS_POSTED"] = "TEAM_VIDEOS_POSTED";
  BannerInsightName2["USER_LIBRARY"] = "USER_LIBRARY";
  BannerInsightName2["ADMIN_LOOMS_WATCHED_TIME"] = "ADMIN_LOOMS_WATCHED_TIME";
  BannerInsightName2["ADMIN_INTERACTIONS"] = "ADMIN_INTERACTIONS";
  BannerInsightName2["ADMIN_MEETINGS_SAVED"] = "ADMIN_MEETINGS_SAVED";
  BannerInsightName2["ADMIN_LOOMS_RECORDED"] = "ADMIN_LOOMS_RECORDED";
  return BannerInsightName2;
})(BannerInsightName || {});
var BannerInsightType = /* @__PURE__ */ ((BannerInsightType2) => {
  BannerInsightType2["USER"] = "USER";
  BannerInsightType2["TEAM"] = "TEAM";
  BannerInsightType2["ADMIN"] = "ADMIN";
  return BannerInsightType2;
})(BannerInsightType || {});
var BannerFormattingType = /* @__PURE__ */ ((BannerFormattingType2) => {
  BannerFormattingType2["PLAIN"] = "PLAIN";
  BannerFormattingType2["EMPHASIZED"] = "EMPHASIZED";
  return BannerFormattingType2;
})(BannerFormattingType || {});
var DateTypeMembers = /* @__PURE__ */ ((DateTypeMembers2) => {
  DateTypeMembers2["LAST_NINETY_DAYS"] = "LAST_NINETY_DAYS";
  DateTypeMembers2["LAST_YEAR"] = "LAST_YEAR";
  DateTypeMembers2["ALL_TIME"] = "ALL_TIME";
  return DateTypeMembers2;
})(DateTypeMembers || {});
var HubDateRange = /* @__PURE__ */ ((HubDateRange2) => {
  HubDateRange2["WEEK"] = "WEEK";
  HubDateRange2["MONTH"] = "MONTH";
  HubDateRange2["NINETY_DAYS"] = "NINETY_DAYS";
  return HubDateRange2;
})(HubDateRange || {});
var ImpactfulVideoTypes = /* @__PURE__ */ ((ImpactfulVideoTypes2) => {
  ImpactfulVideoTypes2["OLD_GEM"] = "OLD_GEM";
  ImpactfulVideoTypes2["INFLUENTIAL"] = "INFLUENTIAL";
  ImpactfulVideoTypes2["SINGLE_VIDEO"] = "SINGLE_VIDEO";
  ImpactfulVideoTypes2["ONE_ON_ONE_LOOP"] = "ONE_ON_ONE_LOOP";
  return ImpactfulVideoTypes2;
})(ImpactfulVideoTypes || {});
var DurationUnits = /* @__PURE__ */ ((DurationUnits2) => {
  DurationUnits2["HOUR"] = "hour";
  DurationUnits2["MINUTE"] = "min";
  return DurationUnits2;
})(DurationUnits || {});
var InsightsAsyncBehavior = /* @__PURE__ */ ((InsightsAsyncBehavior2) => {
  InsightsAsyncBehavior2["ASYNC_BEHAVIOR"] = "ASYNC_BEHAVIOR";
  return InsightsAsyncBehavior2;
})(InsightsAsyncBehavior || {});
var InsightsSpeechClarity = /* @__PURE__ */ ((InsightsSpeechClarity2) => {
  InsightsSpeechClarity2["SPEECH_CLARITY"] = "SPEECH_CLARITY";
  return InsightsSpeechClarity2;
})(InsightsSpeechClarity || {});
var InsightsFields = /* @__PURE__ */ ((InsightsFields2) => {
  InsightsFields2["NUMBER_OF_WORDS"] = "numberOfWords";
  InsightsFields2["NUMBER_OF_FILLER_WORDS"] = "numberOfFillerWords";
  InsightsFields2["VIDEO_VIEW"] = "videoView";
  InsightsFields2["VIDEO_REACTION"] = "videoReaction";
  InsightsFields2["VIDEO_COMMENT"] = "videoComment";
  InsightsFields2["VIEW_DURATION"] = "viewDuration";
  return InsightsFields2;
})(InsightsFields || {});
const YEAR_CUTOFF_IN_MINUTES = 525600;
const DAY_CUTOFF_IN_MINUTES = 480;
const HOUR_CUTOFF_IN_MINUTES = 60;
const THIRTY_DAY_WINDOW_SIZE = 30;
const NUM_DAILY_ACTIVE_USER_DATAPOINTS = 120;
const VIDEO_VIEWS_THRESHOLD = 3;
const POWER_USER_MEETINGS_REPLACED_THRESHOLD = 50;
const AVG_WORDS_TYPED_PER_MINUTE = 50;
const AVG_WORDS_TYPED_PER_SECOND = 50 / 60;
const PersonalityTypeMap = {
  aiWizard: {
    background: "#B3359B",
    highlight: "#F7C7E1",
    body: "#ffffff",
    title: "AI Wizard",
    description: "Your productivity levels are absolutely magical. Your AI wizarding ways help you and your team save time and focus on what counts.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/ai-wizard.png"
  },
  allStar: {
    background: "#565ADD",
    highlight: "#D1D1F7",
    body: "#ffffff",
    title: "All Star",
    description: "Do you have space for a trophy? You\u2019ll need some. You\u2019re a top user of Loom, and it shows. You use Loom to do your best work.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/all-star.png"
  },
  eliteEditor: {
    background: "#41764D",
    highlight: "#E8F5E3",
    body: "#ffffff",
    title: "Elite Editor",
    description: "You have an editor\u2019s eye. You dive into the details and make sure every edit enhances the quality of your video.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/elite-editor.png"
  },
  sculptor: {
    background: "#41764D",
    highlight: "#E8F5E3",
    body: "#ffffff",
    title: "Elite Editor",
    description: "You have an editor\u2019s eye. You dive into the details and make sure every edit enhances the quality of your video.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/elite-editor.png"
  },
  partyStarter: {
    background: "#D46211",
    highlight: "#FDF3CD",
    body: "#ffffff",
    title: "Party Starter",
    description: "The party doesn\u2019t start by itself \u2014 you\u2019re the one that starts it. From emojis, to video replies, to stellar comments, you bring the hype.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/party-starter.png"
  },
  scholar: {
    background: "#0C66E4",
    highlight: "#CCE9FF",
    body: "#ffffff",
    title: "Scholar",
    description: "Where there\u2019s a question, you have a sage answer. Constantly taking in information from your team\u2019s Looms, you\u2019re always in the know.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/scholar.png"
  },
  timeSaver: {
    background: "#565ADD",
    highlight: "#D1D1F7",
    body: "#ffffff",
    title: "Time Saver",
    description: "You\u2019re the person that gets the job done. You cross those t\u2019s, dot those i\u2019s and save everyone time, while making their work better. Great job.",
    image: "https://cdn.loom.com/assets/marketing/email/badges/time-saver.png"
  }
};
export {
  AVG_WORDS_TYPED_PER_MINUTE,
  AVG_WORDS_TYPED_PER_SECOND,
  BannerFormattingType,
  BannerInsightName,
  BannerInsightType,
  DAY_CUTOFF_IN_MINUTES,
  DateTypeMembers,
  DurationUnits,
  HOUR_CUTOFF_IN_MINUTES,
  HubDateRange,
  ImpactfulVideoTypes,
  InsightsAsyncBehavior,
  InsightsFields,
  InsightsSpeechClarity,
  NUM_DAILY_ACTIVE_USER_DATAPOINTS,
  POWER_USER_MEETINGS_REPLACED_THRESHOLD,
  PersonalityTypeMap,
  THIRTY_DAY_WINDOW_SIZE,
  VIDEO_VIEWS_THRESHOLD,
  YEAR_CUTOFF_IN_MINUTES
};
//# sourceMappingURL=insights.js.map
