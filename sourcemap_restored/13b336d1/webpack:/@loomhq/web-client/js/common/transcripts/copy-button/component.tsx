import React from 'react';
import { Button, Tooltip } from '@loomhq/lens';
import { SvgCopy } from '@loomhq/lens/icons/copy';
import { COPY_BUTTON_TEXT } from '@js/common/transcripts';

type CopyButtonComponentProps = {
  onCopyClick: () => void;
  tooltipContent: string;
};

export const CopyButtonComponent = ({
  onCopyClick,
  tooltipContent,
}: CopyButtonComponentProps): JSX.Element => {
  return (
    <Tooltip tabIndex={-1} content={tooltipContent}>
      <Button
        size="small"
        variant="neutralSecondary"
        icon={<SvgCopy />}
        onClick={onCopyClick}
      >
        {COPY_BUTTON_TEXT}
      </Button>
    </Tooltip>
  );
};
