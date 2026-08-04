export const makeKey = function (
  clipPosition: number,
  phraseIndex: number,
  rangeIndex: number
): string {
  return `${clipPosition}:${phraseIndex}:${rangeIndex}`;
};
