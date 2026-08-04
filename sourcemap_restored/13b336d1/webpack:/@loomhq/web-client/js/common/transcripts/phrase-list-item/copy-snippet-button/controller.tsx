import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { TranscriptCopySnippetButtonComponent } from './component';

const COPY_SNIPPET_TOOLTIP = 'Copy snippet';
const CLICKED_COPY_SNIPPET_TOOLTIP = 'Snippet copied!';

type TranscriptCopySnippetButtonControllerProps = {
  snippet: string;
  onHoverStateChange?: (isHovering: boolean) => void;
};

export const TranscriptCopySnippetButtonController = ({
  snippet,
  onHoverStateChange,
}: TranscriptCopySnippetButtonControllerProps): JSX.Element => {
  const [copyTooltipContent, setCopyTooltipContent] =
    useState<string>(COPY_SNIPPET_TOOLTIP);

  const onCopyButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCopyTooltipContent(CLICKED_COPY_SNIPPET_TOOLTIP);
    copy(snippet);
  };

  const onMouseEnter = () => {
    setCopyTooltipContent(COPY_SNIPPET_TOOLTIP);
    onHoverStateChange?.(true);
  };

  const onMouseLeave = () => {
    onHoverStateChange?.(false);
  };

  return (
    <TranscriptCopySnippetButtonComponent
      copyTooltipContent={copyTooltipContent}
      onCopyButtonClicked={onCopyButtonClicked}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
