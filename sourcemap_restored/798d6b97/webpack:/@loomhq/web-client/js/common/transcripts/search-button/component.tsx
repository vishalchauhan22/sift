import React from 'react';
import { Button, Tooltip } from '@loomhq/lens';
import { SvgSearch } from '@loomhq/lens/icons/search';
import { SEARCH_BUTTON_TEXT } from '@js/common/transcripts';

type SearchButtonComponentProps = {
  onClick: () => void;
  tooltipContent: string;
};

export const SearchButtonComponent = ({
  onClick,
  tooltipContent,
}: SearchButtonComponentProps): JSX.Element => {
  return (
    <Tooltip tabIndex={-1} content={tooltipContent}>
      <Button
        size="small"
        variant="neutralSecondary"
        icon={<SvgSearch />}
        onClick={onClick}
      >
        {SEARCH_BUTTON_TEXT}
      </Button>
    </Tooltip>
  );
};
