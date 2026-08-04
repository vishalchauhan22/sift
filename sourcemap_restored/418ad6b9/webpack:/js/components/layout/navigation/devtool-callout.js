/* eslint-disable @loomhq/loom/no-js-extension */
import React from 'react';

import { Arrange, Icon } from '@loomhq/lens';
import { SvgAlertTriangle } from '@loomhq/lens/icons/alert-triangle';

import { FadeCallout } from './fade-callout';
import SidebarCtaContainer from './sidebar-cta-container';

export function DevToolCallout({ displayMode, children }) {
  return (
    <>
      <FadeCallout
        className="absolute bottom:small"
        visible={displayMode === 'COLLAPSED'}
        width="collapsed"
      >
        <SidebarCtaContainer
          className="bottom:small"
          color="var(--lns-color-background)"
          backgroundColor="var(--lns-color-body)"
          width="var(--navSidebarInnerWidthCollapsed)"
        >
          <Arrange alignItems="start" gap="small">
            <Icon color="background" icon={<SvgAlertTriangle />} />
          </Arrange>
        </SidebarCtaContainer>
      </FadeCallout>
      <FadeCallout
        className="absolute bottom:small"
        visible={displayMode !== 'COLLAPSED'}
        width="expanded"
      >
        <SidebarCtaContainer
          className="bottom:small"
          color="var(--lns-color-background)"
          backgroundColor="var(--lns-color-body)"
          width="var(--navSidebarInnerWidthExpanded)"
        >
          <Arrange alignItems="start" gap="small">
            <Icon color="background" icon={<SvgAlertTriangle />} />
            {children}
          </Arrange>
        </SidebarCtaContainer>
      </FadeCallout>
    </>
  );
}
