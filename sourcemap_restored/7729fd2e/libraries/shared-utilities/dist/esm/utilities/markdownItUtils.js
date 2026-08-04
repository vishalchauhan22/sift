import "../chunk-BYZ2GIR3.js";
const timestampPlugin = (md, {
  timestampClassName = "timestamp",
  videoUrl,
  // Video length in seconds. This is used to determine if a timestamp is
  // valid, but I'm not ready tackle that yet.
  videoLength: _videoLength
}) => {
  const arrayReplaceAt = md.utils.arrayReplaceAt;
  const escapeRegex = md.utils.escapeRE;
  const UNICODE_PUNCT_RE = md.utils.lib.ucmicro.P.source;
  const UNICODE_SPACE_RE = md.utils.lib.ucmicro.Z.source;
  const OTHER_CHARS_RE = "[" + " \r\n$+<=>^`|~".split("").map(escapeRegex).join("") + "]";
  const WORD_BOUNDARY_REGEX = "".concat(UNICODE_PUNCT_RE, "|").concat(UNICODE_SPACE_RE, "|").concat(OTHER_CHARS_RE);
  const TIMESTAMP_REGEX = "\\d*\\d:\\d?\\d(:\\d\\d)?";
  const SECONDS_IN_HOUR = 60 * 60;
  const SECONDS_IN_MINUTE = 60;
  function timestamp_replace(state) {
    const blockTokens = state.tokens;
    const regSimple = /\d/;
    const regText = (
      // start of line or non-word character
      "(^|".concat(WORD_BOUNDARY_REGEX, ")") + // regexp for timestamp
      "(".concat(TIMESTAMP_REGEX, ")") + // end of line or non-word character
      "($|".concat(WORD_BOUNDARY_REGEX, ")")
    );
    const reg = new RegExp(regText, "g");
    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== "inline") {
        continue;
      }
      let tokens = blockTokens[j].children;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const currentToken = tokens[i];
        if (currentToken.type !== "text") {
          continue;
        }
        let pos = 0;
        const text = currentToken.content;
        reg.lastIndex = 0;
        const nodes = [];
        if (!regSimple.test(text)) {
          continue;
        }
        let match;
        while (match = reg.exec(text)) {
          if (match.index > 0 || match[1].length > 0) {
            const textBeforeMatch = text.slice(
              pos,
              match.index + match[1].length
            );
            const token = new state.Token("text", "", 0);
            token.content = textBeforeMatch;
            nodes.push(token);
          }
          const [seconds, minutes, hours] = match[2].split(":").map((x) => parseInt(x)).reverse();
          const hoursAsSeconds = (hours || 0) * SECONDS_IN_HOUR;
          const minutesAsSeconds = minutes * SECONDS_IN_MINUTE;
          const asSeconds = hoursAsSeconds + minutesAsSeconds + seconds;
          const openAnchorTagToken = new state.Token("timestamp_open", "a", 1);
          openAnchorTagToken.attrs = [
            ["class", timestampClassName],
            ["data-seconds", asSeconds],
            ["href", "".concat(videoUrl, "?t=").concat(asSeconds)]
          ];
          nodes.push(openAnchorTagToken);
          const timestampTextToken = new state.Token("text", "", 0);
          timestampTextToken.content = match[2];
          nodes.push(timestampTextToken);
          const closeAnchorTagToken = new state.Token(
            "timestamp_close",
            "a",
            -1
          );
          nodes.push(closeAnchorTagToken);
          reg.lastIndex -= match[4].length;
          pos = reg.lastIndex;
        }
        if (!nodes.length) {
          continue;
        }
        if (pos < text.length) {
          const token = new state.Token("text", "", 0);
          token.content = text.slice(pos);
          nodes.push(token);
        }
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
  md.core.ruler.after("linkify", "timestamp_replace", timestamp_replace);
};
export {
  timestampPlugin
};
//# sourceMappingURL=markdownItUtils.js.map
