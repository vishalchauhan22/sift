import {
  EXT_TUTORIAL_GUIDED_CTA_CLICKED,
  EXT_TUTORIAL_UNGUIDED_CTA_CLICKED,
} from '@js/constants/events';

import { LOOM_PROD_URI } from '@js/constants/routes';

import classNames from 'classnames';
import { useCurrentUserSelector } from '@js/common/current-user';
import React from 'react';

import { Arrange, Align, Button, Container, Spacer, Text } from '@loomhq/lens';
import {
  DESIGN,
  ENGINEERING,
  SALES,
} from '@loomhq/shared-utilities/constants/employmentRoles';

import { RecordButton } from '@js/components/record-button';
import { CHROME_EXTENSION } from '@js/components/record-button/constants';

import styles from './styles.module.css';

export const ExtensionEmptyState = (): JSX.Element | null => {
  const persona = useCurrentUserSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user => (user.persona as any)?.persona_v1?.role,
    null
  ) as string;

  let personaVideo = '';

  switch (persona) {
    case DESIGN:
      personaVideo = '63db3d7546374b5dba0929a8701842e0';
      break;
    case ENGINEERING:
      personaVideo = 'be70a4ea100942fb88c6ad9ea355e651';
      break;
    case SALES:
      personaVideo = 'af6d3f5045d6484692e25bb1fef99bdc';
      break;
    default:
      personaVideo = 'b8424c2d163544f8a5135141caa788da';
  }

  const cardsContent = [
    {
      heading: 'I want to practice',
      cta: 'Start a 1 minute demo',
      source: EXT_TUTORIAL_GUIDED_CTA_CLICKED,
    },
    {
      heading: 'I’ll explore on my own',
      cta: 'Start recording',
      source: EXT_TUTORIAL_UNGUIDED_CTA_CLICKED,
    },
  ];

  return (
    <Align>
      <Spacer top={4} />
      <Text htmlTag="h1" alignment="center" fontWeight="bold" size="heading-lg">
        Hey there, ready to record?
      </Text>
      <Spacer top="xlarge" />
      <Arrange gap="large" autoFlow={{ default: 'row', small: 'column' }}>
        {cardsContent.map(card => (
          <RecordButton
            key={card.heading}
            source={card.source}
            priorityList={[CHROME_EXTENSION]}
            shouldLaunchExtensionTutorial={
              card.source === EXT_TUTORIAL_GUIDED_CTA_CLICKED ? true : false
            }
          >
            <div className={styles.emptyStateCard}>
              <Align>
                <div
                  className={classNames(
                    styles.emptyStateImg,
                    card.source.includes('unguided')
                      ? styles.unguided
                      : styles.guided
                  )}
                />

                <Spacer y="large">
                  <Text
                    alignment="center"
                    htmlTag="h2"
                    size="heading-sm"
                    fontWeight="bold"
                  >
                    {card.heading}
                  </Text>
                </Spacer>
                <Container backgroundColor="#f0f1ff" radius="full" width="100%">
                  <Button hasFullWidth>{card.cta}</Button>
                </Container>
              </Align>
            </div>
          </RecordButton>
        ))}
      </Arrange>
      <Spacer top={11} />
      <Text color="bodyDimmed" size="body-lg" fontWeight="bold">
        Inspiration to get you started
      </Text>
      <Spacer top="medium" />
      <iframe
        allowFullScreen
        style={{
          aspectRatio: '16/9',
          border: 'none',
          maxWidth: '28.5rem',
        }}
        className="width:full radius:large"
        src={`${LOOM_PROD_URI}/embed/${personaVideo}?hide_owner=true`}
        title="Loom"
      />
    </Align>
  );
};
