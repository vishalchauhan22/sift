import React from 'react';

import { Arrange, Container, IconButton, Text } from '@loomhq/lens';
import { SvgChevronLeft } from '@loomhq/lens/icons/chevron-left';

import { SIDEBAR_HEIGHT } from '@js/pages/share/right-panel/common';

import { getTabsHeight } from './heights';

const ContentContainer = ({
  children,
  footer,
  title,
  goBackToEditPage,
  backupTitleComponent,
  settingsIsInEditTab = false,
}: {
  children: JSX.Element;
  footer: JSX.Element;
  title?: JSX.Element | string;
  goBackToEditPage: () => void;
  backupTitleComponent?: JSX.Element;
  settingsIsInEditTab?: boolean;
}): JSX.Element => {
  const tabsHeight = getTabsHeight();

  const height = settingsIsInEditTab
    ? `calc(${SIDEBAR_HEIGHT} - ${tabsHeight}px`
    : SIDEBAR_HEIGHT;

  return (
    <Arrange
      autoFlow={'row'}
      rows={['auto', '1fr', 'auto']}
      justifyContent="stretch"
      height={height}
    >
      {title ? (
        <Container
          paddingLeft="medium"
          paddingTop="medium"
          paddingBottom="small"
        >
          <Arrange gap="small">
            <IconButton
              icon={<SvgChevronLeft />}
              onClick={goBackToEditPage}
              altText="Go Back To Edit Page"
            />
            <Text fontWeight="bold" size="body-lg">
              {title}
            </Text>
          </Arrange>
        </Container>
      ) : (
        <>{backupTitleComponent}</>
      )}
      <Container
        paddingX="large"
        paddingY="small"
        height="100%"
        overflow="auto"
      >
        {children}
      </Container>
      {footer}
    </Arrange>
  );
};

export { ContentContainer };
