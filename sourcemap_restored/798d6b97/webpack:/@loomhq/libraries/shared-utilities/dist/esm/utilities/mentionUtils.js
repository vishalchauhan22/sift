import {
  __publicField
} from "../chunk-BYZ2GIR3.js";
import * as regexConstants from "../constants/regex";
const { MENTION_MARKUP, MENTION_MARKUP_WHOLE } = regexConstants;
class Mention extends String {
  /**
   *
   * @param {String} displayText
   * @param {String} modelType
   * @param {String} modelId
   */
  constructor(displayText, modelType, modelId, mentionText) {
    super();
    __publicField(this, "displayText");
    __publicField(this, "modelType");
    __publicField(this, "modelId");
    __publicField(this, "markup");
    this.displayText = displayText;
    this.modelType = modelType;
    this.modelId = modelId;
    this.markup = mentionText;
  }
  toString() {
    return "@".concat(this.displayText);
  }
}
const isMentionValid = (mention) => parseMention(mention) instanceof Mention;
const parseMention = (mentionText) => {
  if (!mentionText) {
    return { displayText: "" };
  }
  const [, displayText, , modelTypeWithId] = mentionText.match(MENTION_MARKUP) || [];
  if (!displayText || !modelTypeWithId) {
    return { displayText: mentionText };
  }
  const [modelType, modelId] = modelTypeWithId.split(":");
  if (!modelType || !modelId) {
    return { displayText: mentionText };
  }
  return new Mention(displayText, modelType, modelId, mentionText);
};
const getParsedMentionsFromContent = (content, dedup = false) => {
  if (!content) {
    return [];
  }
  const mentionRegexp = new RegExp(MENTION_MARKUP, "gi");
  const mentions = content.match(mentionRegexp) || [];
  if (!dedup) {
    return mentions.map(parseMention).filter((mention) => mention instanceof Mention);
  }
  const alreadyMentioned = {};
  return mentions.map(parseMention).filter((mention) => {
    const key = mention instanceof Mention ? "".concat(mention.modelType).concat(mention.modelId) : "";
    const isMention = mention instanceof Mention;
    if (!isMention || alreadyMentioned[key]) {
      return false;
    }
    alreadyMentioned[key] = true;
    return true;
  });
};
const getSemanticCommentParts = (content) => {
  if (!(content == null ? void 0 : content.trim())) {
    return [];
  }
  const mentionRegexp = new RegExp(MENTION_MARKUP_WHOLE, "gi");
  const contentParts = content.split(mentionRegexp);
  return contentParts.reduce((components, part) => {
    if (!/^ *$/.test(part)) {
      if (part.match(MENTION_MARKUP_WHOLE)) {
        components.push(parseMention(part));
      } else {
        components.push(part);
      }
    }
    return components;
  }, []);
};
const getContentWithParsedMentionMarkups = (content) => getSemanticCommentParts(content).join("");
const getFinalDisplayText = (mention, teamMember) => {
  return teamMember ? "@".concat(teamMember.first_name, " ").concat(teamMember.last_name) : mention.displayText;
};
export {
  Mention,
  getContentWithParsedMentionMarkups,
  getFinalDisplayText,
  getParsedMentionsFromContent,
  getSemanticCommentParts,
  isMentionValid,
  parseMention
};
//# sourceMappingURL=mentionUtils.js.map
