import React from 'react';

import { Icon } from '@loomhq/lens';
import { SvgCheckCircle } from '@loomhq/lens/icons/check-circle';
import { SvgCheckCircleFill } from '@loomhq/lens/icons/check-circle-fill';

export const CheckIcon = ({
  isSuggested,
}: {
  isSuggested: boolean;
}): JSX.Element => {
  return isSuggested ? (
    <Icon icon={<SvgCheckCircleFill />} color="grey3" size={3} />
  ) : (
    <Icon icon={<SvgCheckCircle />} color="primary" size={3} />
  );
};
