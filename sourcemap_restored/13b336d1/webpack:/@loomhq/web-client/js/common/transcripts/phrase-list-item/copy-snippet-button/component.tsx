import React from 'react';
import { Tooltip, IconButton } from '@loomhq/lens';
import { SvgCopy } from '@loomhq/lens/icons/copy';

type TranscriptCopySnippetButtonComponentProps = {
  copyTooltipContent: string;
  onCopyButtonClicked: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave?: () => void;
};
export const TranscriptCopySnippetButtonComponent = ({
  copyTooltipContent,
  onCopyButtonClicked,
  onMouseEnter,
  onMouseLeave = () => {},
}: TranscriptCopySnippetButtonComponentProps): JSX.Element => (
  <Tooltip tabIndex={-1} content={copyTooltipContent}>
    <IconButton
      id="Copy snippet button"
      altText="Copy snippet"
      icon={<SvgCopy />}
      iconColor={'bodyDimmed'}
      size="small"
      onClick={onCopyButtonClicked}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  </Tooltip>
);
