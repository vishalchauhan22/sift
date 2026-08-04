import { ComponentType, HandlerFnType, SemanticPart } from '../types';

export const lineBreaksHandler: HandlerFnType = semanticParts => {
  const result: Array<SemanticPart | string> = [];

  semanticParts.forEach(semanticPart => {
    if (typeof semanticPart === 'string') {
      const splittedString = semanticPart.split('\n');

      splittedString.forEach((stringElem, index) => {
        if (stringElem !== '') {
          result.push(stringElem);
        }

        if (index < splittedString.length - 1) {
          result.push({ type: ComponentType.LineBreak });
        }
      });
    } else {
      result.push(semanticPart);
    }
  });

  return result;
};
