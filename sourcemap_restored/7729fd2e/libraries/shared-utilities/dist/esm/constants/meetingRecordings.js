import "../chunk-BYZ2GIR3.js";
import { MeetingTypeEnum } from "./videoProperties";
const ALLOWED_MEETING_RECORDING_TAGS = [
  "b",
  "br",
  "h1",
  "h3",
  "li",
  "span",
  "table",
  "tbody",
  "td",
  "th",
  "tr",
  "ul"
];
const ALLOWED_MEETING_RECORDING_ATTR = ["class", "style"];
const SUPPORTED_REGENERATION_TYPES = /* @__PURE__ */ new Map([
  [MeetingTypeEnum.DEFAULT, "Meeting"],
  [MeetingTypeEnum.SALES_CALL, "Sales call"],
  [MeetingTypeEnum.CUSTOMER_CHECK_IN, "Customer check-in"],
  [MeetingTypeEnum.ALL_HANDS, "Company all hands"]
]);
export {
  ALLOWED_MEETING_RECORDING_ATTR,
  ALLOWED_MEETING_RECORDING_TAGS,
  SUPPORTED_REGENERATION_TYPES
};
//# sourceMappingURL=meetingRecordings.js.map
