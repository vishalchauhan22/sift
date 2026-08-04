export const isTokenSelected = (
  tokenIndex: number,
  selectionStartTokenIndex: number | null,
  selectionEndTokenIndex: number | null
): boolean => {
  const isSelected =
    selectionStartTokenIndex !== null &&
    selectionEndTokenIndex !== null &&
    tokenIndex >= selectionStartTokenIndex &&
    tokenIndex <= selectionEndTokenIndex;

  return isSelected;
};
