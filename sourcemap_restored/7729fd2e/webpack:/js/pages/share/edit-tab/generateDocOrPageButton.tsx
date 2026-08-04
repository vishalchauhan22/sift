import React from 'react';

import { Icon } from '@loomhq/lens';

import { SvgChevronRight } from '@loomhq/lens/icons/chevron-right';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';

import { EditItem } from './edit-item';

export const GenerateDocOrPageButton = ({
  onClick,
  title,
  icon,
}: {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
}): JSX.Element => {
  return (
    <EditItem
      icon={icon ?? <SvgWriteDocument />}
      title={title ?? 'Generate a document'}
      onClick={onClick}
      rightOption={<Icon icon={<SvgChevronRight />} />}
    />
  );
};
