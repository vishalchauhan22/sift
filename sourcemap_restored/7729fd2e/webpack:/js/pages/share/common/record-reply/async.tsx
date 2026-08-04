import React, { Suspense } from 'react';

import { TextIconButton } from '@js/pages/share/common/record-reply/components/TextIconButton';
import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { RecordReplyButtonProps } from './types';

const RecordReplyButton = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "RecordReplyButton" */ '@js/pages/share/common/record-reply'
  ).then(module => ({ default: module.RecordReplyButton }))
);

export const RecordReplyButtonAsync = ({
  compact,
  iconColor = 'body',
  buttonText = 'Record a Reply',
  source,
}: RecordReplyButtonProps): JSX.Element => {
  return (
    <Suspense
      fallback={
        <TextIconButton
          isDisabled
          compact={compact}
          buttonText={buttonText}
          iconColor={iconColor}
        />
      }
    >
      <RecordReplyButton
        compact={compact}
        iconColor={iconColor}
        buttonText={buttonText}
        source={source}
      />
    </Suspense>
  );
};
