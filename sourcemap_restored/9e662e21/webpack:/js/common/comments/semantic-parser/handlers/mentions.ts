import { mentionUtils } from '@loomhq/shared-utilities';
import {
  MENTION_MARKUP,
  MENTION_MARKUP_WHOLE,
} from '@loomhq/shared-utilities/constants/regex';

import { ComponentType, HandlerFnType, SemanticPart } from '../types';

export const mentionsHandler: HandlerFnType = semanticParts => {
  const { parseMention } = mentionUtils;

  const result: Array<SemanticPart | string> = [];

  semanticParts.forEach(semanticPart => {
    if (typeof semanticPart === 'string') {
      const splittedString = semanticPart.split(MENTION_MARKUP_WHOLE);

      splittedString.forEach(stringElem => {
        if (MENTION_MARKUP.test(stringElem)) {
          const mention: { displayText: string } = parseMention(stringElem);

          result.push({
            type: ComponentType.Mention,
            displayText: `@${mention.displayText}`,
            mention: stringElem,
          });
        } else if (stringElem !== '') {
          result.push(stringElem);
        }
      });
    } else {
      result.push(semanticPart);
    }
  });

  return result;
};
