import {
  __spreadProps,
  __spreadValues
} from "../chunk-BYZ2GIR3.js";
const JOY = "joy";
const LOVE = "love";
const WOW = "wow";
const NERVOUS = "nervous";
const UP = "up";
const DOWN = "down";
const YAY = "yay";
const EXTENDED = "extended";
const LOOM = "loom";
const EMOJIS = {
  [JOY]: "\u{1F602}",
  [LOVE]: "\u{1F60D}",
  [WOW]: "\u{1F62E}",
  [NERVOUS]: "\u{1F615}",
  [UP]: "\u{1F44D}",
  [DOWN]: "\u{1F44E}",
  [YAY]: "\u{1F64C}"
};
const LOOM_REACTIONS = {
  1: JOY,
  2: LOVE,
  3: WOW,
  4: NERVOUS,
  5: YAY,
  6: UP,
  7: DOWN
};
const EmojiTypes = __spreadProps(__spreadValues({}, LOOM_REACTIONS), {
  8: EXTENDED
});
const EMOJI_STRING_TO_KEY = Object.entries(EmojiTypes).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {}
);
const LOOM_TO_EXTENDED_MAP = {
  1: "joy",
  2: "heart_eyes",
  3: "open_mouth",
  4: "confused",
  5: "raised_hands",
  6: "+1",
  7: "-1",
  [JOY]: "joy",
  [LOVE]: "heart_eyes",
  [WOW]: "open_mouth",
  [NERVOUS]: "confused",
  [YAY]: "raised_hands",
  [UP]: "+1",
  [DOWN]: "-1"
};
const getReactionType = (type) => {
  return type in EMOJIS ? LOOM : EXTENDED;
};
var emojiReactions_default = EmojiTypes;
const MAX_FETCH_REACTIONS = 50;
export {
  DOWN,
  EMOJIS,
  EMOJI_STRING_TO_KEY,
  EXTENDED,
  JOY,
  LOOM,
  LOOM_REACTIONS,
  LOOM_TO_EXTENDED_MAP,
  LOVE,
  MAX_FETCH_REACTIONS,
  NERVOUS,
  UP,
  WOW,
  YAY,
  emojiReactions_default as default,
  getReactionType
};
//# sourceMappingURL=emojiReactions.js.map
