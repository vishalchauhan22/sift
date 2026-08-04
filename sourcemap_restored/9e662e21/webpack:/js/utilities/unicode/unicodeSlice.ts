import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

export const unicodeSlice = (
  str: string,
  start?: number,
  end?: number
): string => splitter.splitGraphemes(str).slice(start, end).join('');
