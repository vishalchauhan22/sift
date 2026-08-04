import "../chunk-BYZ2GIR3.js";
import { PresetVariablesEnum } from "../types/personalizedVideos";
const REGEX = /({[^}]+}|\s+)/;
const splitStringToFindVariableIndex = ({
  inputText,
  includeBraces = true
}) => {
  const elements = inputText.split(REGEX);
  const allowedVariablesSet = new Set(
    Object.values(PresetVariablesEnum).map((variable) => "{".concat(variable, "}"))
  );
  const variableIndexes = elements.reduce((indexes, el, index) => {
    if (allowedVariablesSet.has(el) && /{\w+}/.test(el)) {
      indexes.push(index);
    }
    return indexes;
  }, []);
  if (!includeBraces && variableIndexes.length > 0) {
    const variableWithoutBraces = elements[variableIndexes[0]].slice(1, -1);
    for (const variableIndex of variableIndexes) {
      elements[variableIndex] = variableWithoutBraces;
    }
  }
  return {
    text: elements,
    variableIndexes
  };
};
const checkIfTitleIncludesVariables = (title) => {
  const videoTitleSplit = splitStringToFindVariableIndex({
    inputText: title,
    includeBraces: false
  });
  return Boolean(videoTitleSplit.variableIndexes);
};
function makeReplacer(stringToReplace) {
  const sanitizedStringToReplace = stringToReplace.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
  const wordBoundariesAndPossessiveRegex = new RegExp(
    "(?<![\\w\\d][\"'-])\\b".concat(sanitizedStringToReplace, "('s)?\\b(?![\"'-][\\w\\d])"),
    "gi"
  );
  const trailingPunctuationRegex = new RegExp(
    "".concat(sanitizedStringToReplace, "[.,!?;:]*"),
    "gi"
  );
  return (replacementString, targetText) => {
    let result = targetText.replace(
      wordBoundariesAndPossessiveRegex,
      (_match, hasPossessive) => {
        return hasPossessive ? "".concat(replacementString, "'s") : replacementString;
      }
    );
    if (/[.,!?;:]/.test(stringToReplace)) {
      result = result.replace(trailingPunctuationRegex, (match) => {
        const trailingPunctuation = match.slice(
          sanitizedStringToReplace.length
        );
        return replacementString + trailingPunctuation;
      });
    }
    return result;
  };
}
export {
  checkIfTitleIncludesVariables,
  makeReplacer,
  splitStringToFindVariableIndex
};
//# sourceMappingURL=personalizedVideosUtils.js.map
