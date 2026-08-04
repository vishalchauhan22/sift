import React from 'react';

import { Align, Container, Text } from '@loomhq/lens';
import {
  Language,
  LANGUAGE_NAME,
} from '@loomhq/shared-utilities/types/transcription';

import { RetranscriptionFailureCardProps } from '../types';
import { NotificationLink } from './common';

export const RetranscriptionFailureCard = ({
  notification,
}: RetranscriptionFailureCardProps): JSX.Element => {
  const language = notification.data.language as Language;
  let languageName = LANGUAGE_NAME[language];

  languageName = languageName ? languageName : 'unknown language';

  return (
    <>
      <Container paddingBottom="medium">
        <Align alignment="topCenter">
          <Text hasEllipsis className="width:full">
            <Text color="bodyDimmed" isInline>
              Failed to regenerate transcript for video{` `}
            </Text>
            <NotificationLink url={notification.url}>
              {notification.video?.name}
            </NotificationLink>
            <Text color="bodyDimmed" isInline>
              {` `}in {languageName}
            </Text>
          </Text>
        </Align>
      </Container>
    </>
  );
};
