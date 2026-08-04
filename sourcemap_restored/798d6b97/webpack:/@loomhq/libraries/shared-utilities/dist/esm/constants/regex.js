import "../chunk-BYZ2GIR3.js";
const MENTION_MARKUP = /@\[([^\]]+?)\](\(([^)]+?)\))?/;
const MENTION_MARKUP_WHOLE = /(@\[[^\]]+?\](?:\([^)]+?\))?)/;
const LINK_REGEX = /(?:(?:https?|ftp|file):\/\/|www.|ftp.)(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[A-Z0-9+&@#/%=~_|$])/gim;
const DOMAIN_REGEX = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/;
export {
  DOMAIN_REGEX,
  LINK_REGEX,
  MENTION_MARKUP,
  MENTION_MARKUP_WHOLE
};
//# sourceMappingURL=regex.js.map
