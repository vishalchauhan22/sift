import {
  MeetingPageKeys,
  MeetingPageRoutes,
} from '@js/common/meeting-recordings';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import {
  MeetingRecordingsSetupFinishedFtux,
  MeetingRecordingsSetupFinishedFtuxSource,
} from '@js/pages/my-meetings/common';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, SkeletonContainer, Split, Tab, Tabs } from '@loomhq/lens';

import {
  FEATURE_GATES,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';

const DEFAULT_PAGE_COUNT = 4;

export const MeetingPageNavigation = (): JSX.Element | null => {
  const location = useLocation();
  const areRulesEnabled = useFeatureFlagValue<boolean>(
    FEATURE_GATES.MEETING_RECORDING_RULES,
    ControlType.STATSIG_FEATURE_GATE
  );

  if (areRulesEnabled === undefined) {
    return <NavSkeleton />;
  }

  const meetingPageTabs = Object.entries(MeetingPageRoutes)
    // Filter out tabs that have no parent
    .filter(([, { parent }]) => parent === null)
    // If rules are not enabled, filter out the rules tab
    .filter(([, { key }]) => {
      if (key === MeetingPageKeys.Rules) {
        return areRulesEnabled;
      }
      return true;
    })
    .map(([, route]) => route);

  const activeRoute = Object.entries(MeetingPageRoutes).find(
    ([, { path }]) => path === location.pathname
  )?.[1];
  const activeTab = activeRoute ? activeRoute.parent || activeRoute.key : null;

  if (!activeTab) {
    return null;
  }

  return (
    <Container width="100%" marginTop={4}>
      <Tabs>
        {meetingPageTabs.map(({ path, name, key }) => (
          <Tab key={key} isActive={key === activeTab}>
            <>
              <NavLink to={path}>{name}</NavLink>
              {key === MeetingPageKeys.Settings ? (
                <FtuxWrapper
                  hasTransition={false}
                  ignoreOnDismissProp={true}
                  name={UserPropertyEnum.MEETING_RECORDINGS_SETUP_FINISHED_FTUX}
                >
                  <MeetingRecordingsSetupFinishedFtux
                    source={
                      MeetingRecordingsSetupFinishedFtuxSource.LoomMeetings
                    }
                  />
                </FtuxWrapper>
              ) : null}
            </>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

const NavSkeleton = (): JSX.Element => {
  return (
    <Container width="100%" marginTop={4}>
      <Split gap={2}>
        {Array.from({ length: DEFAULT_PAGE_COUNT }).map((_, i) => (
          <SkeletonContainer width="140px" height="24px" key={i} lines={1} />
        ))}
      </Split>
    </Container>
  );
};
