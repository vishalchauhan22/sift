import * as loggerx from '@js/utilities/loggerx';

import { unicodeSlice } from '@js/utilities/unicode/unicodeSlice';

import { SemanticPart, ComponentType, GenericOptions } from '../types';

type TrimHandlerType = (
  semanticPart: SemanticPart[],
  options: GenericOptions
) => SemanticPart[];

export const trimHandler: TrimHandlerType = (semanticParts, options = {}) => {
  const maxAllowedLength = options.maxAllowedLength || Number.POSITIVE_INFINITY;
  const result: SemanticPart[] = [];
  let length = 0;
  let hasReachedTheEnd = false;

  for (const semanticPart of semanticParts) {
    if (hasReachedTheEnd) {
      break;
    }

    switch (semanticPart.type) {
      case ComponentType.Text:
      case ComponentType.Link:
      case ComponentType.Mention:
        if (length + semanticPart.displayText.length >= maxAllowedLength) {
          if (semanticPart.trimmable) {
            result.push({
              ...semanticPart,
              trimmedDisplayText: unicodeSlice(
                semanticPart.displayText,
                0,
                maxAllowedLength - length
              ),
            });
          }

          result.push({ type: ComponentType.Ellipse });
          hasReachedTheEnd = true;
        } else {
          length += semanticPart.displayText.length;
          result.push(semanticPart);
        }

        break;
      case ComponentType.Ellipse:
      case ComponentType.LineBreak:
      case ComponentType.LoomLink:
        result.push(semanticPart);

        break;
      default:
        loggerx.warning(
          'A different component type was left in the trim handler and it was skipped',
          semanticPart
        );
    }
  }

  return result;
};
