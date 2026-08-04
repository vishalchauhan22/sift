import "../chunk-BYZ2GIR3.js";
import { DateTime } from "luxon";
const calendarMeetingsRange = (timeZone, days = 30) => {
  const now = DateTime.now();
  const rangeStart = now.setZone(timeZone).startOf("day").toString();
  const rangeEnd = now.setZone(timeZone).plus({ days }).startOf("day").toString();
  return { rangeStart, rangeEnd };
};
export {
  calendarMeetingsRange
};
//# sourceMappingURL=calendarMeetings.js.map
