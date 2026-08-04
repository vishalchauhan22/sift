import { ComponentType, SemanticPart, GenericOptions } from '../types';

type TextsHandlerFnType = (
  semanticPart: Array<SemanticPart | string>,
  options: GenericOptions
) => SemanticPart[];

export const textsHandler: TextsHandlerFnType = semanticParts =>
  semanticParts.map(semanticPart => {
    if (typeof semanticPart === 'string') {
      return {
        type: ComponentType.Text,
        displayText: semanticPart,
        trimmable: true,
      };
    }

    return semanticPart;
  });
