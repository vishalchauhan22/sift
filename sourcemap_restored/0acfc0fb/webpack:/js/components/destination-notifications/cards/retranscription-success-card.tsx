import React from 'react';

import { Align, Container, Text } from '@loomhq/lens';
import {
  Language,
  LANGUAGE_NAME,
} from '@loomhq/shared-utilities/types/transcription';

import { RetranscriptionSuccessCardProps } from '../types';
import { NotificationLink } from './common';

export const RetranscriptionSuccessCard = ({
  notification,
}: RetranscriptionSuccessCardProps): JSX.Element => {
  const language = notification.data.language as Language;
  const languageName = language ? LANGUAGE_NAME[language] : 'unknown language';

  return (
    <>
      <Container paddingBottom="medium">
        <Align alignment="topCenter">
          <Text hasEllipsis className="width:full">
            <Text color="bodyDimmed" isInline>
              Transcript was regenerated for video{` `}
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
