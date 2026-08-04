const ELLIPSIS = '…';

export const truncateText = (text: string, maxCharacters = 80): string => {
  if (text.length > maxCharacters - ELLIPSIS.length) {
    return text.substring(0, maxCharacters - ELLIPSIS.length) + ELLIPSIS;
  }

  return text;
};

export const hasWhitespace = (workspaceName: string): boolean => {
  return /\s/g.test(workspaceName);
};

export const newNameOfDuplicates = (newName: string): string => {
  return `Copy of ${newName}`;
};

export function titleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
