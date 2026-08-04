import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  Mention as MentionComponent,
  Text as TextComponent,
  Link as LinkComponent,
  LoomLinkUnfurledInComments as LoomLinkComponent,
} from '../components';

import { ComponentFnType, ComponentType } from '../types';

export const componentsHandler: ComponentFnType = (semanticParts, options) => {
  const uniqueId = uuidv4();

  return semanticParts.map((semanticPart, index) => {
    switch (semanticPart.type) {
      case ComponentType.Mention:
        return (
          <MentionComponent
            key={`${uniqueId}-${index}`}
            mention={semanticPart.mention}
            withPills={options.withPills}
          />
        );
      case ComponentType.LineBreak:
        return <br key={`${uniqueId}-${index}`} />;
      case ComponentType.Link:
        return (
          <LinkComponent key={`${uniqueId}-${index}`} url={semanticPart.url}>
            {semanticPart.trimmedDisplayText ?? semanticPart.displayText}
          </LinkComponent>
        );
      case ComponentType.LoomLink:
        return (
          <LoomLinkComponent
            key={`${uniqueId}-${index}`}
            videoId={semanticPart.videoId}
          />
        );
      case ComponentType.Ellipse:
        return <span key="triple-dots">...&nbsp;&nbsp;</span>;
      default:
        return (
          <TextComponent
            key={`${uniqueId}-${index}`}
            inPlayer={options.inPlayer}
          >
            {semanticPart.trimmedDisplayText ?? semanticPart.displayText}
          </TextComponent>
        );
    }
  });
};
