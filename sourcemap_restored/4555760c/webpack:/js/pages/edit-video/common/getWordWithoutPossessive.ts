import { POSSESSIVE_TOKEN } from './constants';

export const getWordWithoutPossessive = (word: string): string => {
  let newWord: string = word;

  if (newWord.endsWith(POSSESSIVE_TOKEN)) {
    newWord = newWord.slice(0, POSSESSIVE_TOKEN.length * -1);
  }

  return newWord;
};
