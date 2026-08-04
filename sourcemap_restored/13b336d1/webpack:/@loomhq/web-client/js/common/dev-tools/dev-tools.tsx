import React, { useState } from 'react';

import {
  Arrange,
  Container,
  IconButton,
  Modal,
  Tab,
  Tabs,
  TextButton,
} from '@loomhq/lens';

import { SvgClose } from '@loomhq/lens/icons/close';
import { CONFIG_ENABLE_DEV_TOOLS } from '@loomhq/shared-utilities/constants/featureFlag';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { EDIT_PAGE_VARIABLES_MODE } from '@loomhq/shared-utilities/constants/urlParams';
import { LOOM_EMBED_PAGE_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';
import { SilentErrorBoundary } from '@js/common/error-management';
import { FtuxTable } from '@js/common/ftux';
import { FeatureFlaggedComponent } from '@js/components/feature-flag-wrapper';
import { getParam } from '@js/utilities/url';
import { isDev } from '@js/constants/environment';

import { ApolloCacheTabContent } from './tabs-content/apollo-cache-tab-content';
import { FeatureFlagTabContent } from './tabs-content/feature-flag-tab-content';
import { ModalContent } from './tabs-content/modal-content';
import { EnvVarsTabContent } from './tabs-content/env-vars-tab-content';

const getButtonPosition = () => {
  const isVariablesPage = Boolean(getParam(EDIT_PAGE_VARIABLES_MODE));
  const isEmbedPage = LOOM_EMBED_PAGE_REGEX.test(window.location.href);

  if (isVariablesPage) {
    return {
      bottom: 2,
      left: 2,
    };
  }

  if (isEmbedPage) {
    return {
      bottom: 10,
      right: 2,
    };
  }

  return {
    bottom: 2,
    right: 10,
  };
};

const tabs = [
  {
    title: 'Apollo Cache',
    content: <ApolloCacheTabContent />,
  },
  {
    title: 'Feature Flags',
    content: <FeatureFlagTabContent />,
  },
  {
    title: 'FTUX',
    content: <FtuxTable hasStickyHeader={true} />,
  },
  {
    title: 'Modals',
    content: <ModalContent />,
  },
  // Only show Environment Variables tab in development
  ...(isDev
    ? [
        {
          title: 'Environment Variables',
          content: <EnvVarsTabContent />,
        },
      ]
    : []),
];

const DevToolsWithoutGating = (): JSX.Element | null => {
  const [hideButton, setHideButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleOnClose = () => {
    setActiveTab(tabs[0]);
    setShowModal(false);
  };

  if (hideButton) {
    return null;
  }

  return (
    <>
      <Container
        borderSide="all"
        backgroundColor="background"
        position="fixed"
        padding="small"
        radius="175"
        zIndex={100000}
        {...getButtonPosition()}
      >
        <Arrange>
          <TextButton onClick={() => setShowModal(true)} size="small">
            Dev tools
          </TextButton>
          <IconButton
            onClick={() => setHideButton(true)}
            size="small"
            altText="Close dev tools"
            icon={<SvgClose />}
          />
        </Arrange>
      </Container>
      <Modal
        isOpen={showModal}
        title="Loom dev tools"
        onCloseClick={handleOnClose}
        maxHeight="80vh"
        maxWidth="80vw"
      >
        <Container marginTop={2}>
          <Tabs>
            {tabs.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  isActive={tab.title === activeTab.title}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.title}
                </Tab>
              );
            })}
          </Tabs>
        </Container>
        <Container
          borderSide="all"
          padding="medium"
          width="100%"
          overflow="auto"
        >
          {activeTab.content}
        </Container>
      </Modal>
    </>
  );
};

export const DevTools = (): JSX.Element => {
  return (
    // Note: we should consider opening this to all Atlassian employee
    // Maybe a FF is not the best option then?
    <FeatureFlaggedComponent
      flag={CONFIG_ENABLE_DEV_TOOLS}
      activationValues={[true]}
    >
      <SilentErrorBoundary feature={Feature.DevToolsApolloCache}>
        <DevToolsWithoutGating />
      </SilentErrorBoundary>
    </FeatureFlaggedComponent>
  );
};
