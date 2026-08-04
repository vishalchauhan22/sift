import {
  SHARE_VIDEO_SETTINGS_ROLE_UPGRADE_BUTTON_CLICKED,
  SHARE_VIDEO_SETTINGS_LOOM_BRANDED_PLAYER_UPGRADE_CLICKED,
} from '@js/constants/events';

// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { usePaywallRequest } from '@js/actions/request-upgrade';
import { StarterUpgradeModalButton } from '@js/components/StarterUpgradeModalButton';
import { useGetSelectedWorkspace } from '@js/hooks/workspace';
import React from 'react';

import { Arrange, Text, Link, Pill } from '@loomhq/lens';
import { ORG_ROLE_CREATOR_LITE } from '@loomhq/shared-utilities/constants/organizationRoles';

import * as analytics from '@js/utilities/analytics';

const VideoSettingWithIconWrapper = styled.div`
  display: flex;
  gap: var(--lns-space-medium);
`;

const VideoSettingWrapper = styled.div`
  padding: var(--lns-space-medium) 0;
  margin-right: var(--lns-space-xsmall);

  flex-grow: 1;
`;

const IconWrapper = styled.span`
  margin: auto 0;
`;

const TextAndBetaWrapper = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const UpgradeText = ({ text }: { text?: string }): JSX.Element => {
  const workspace = useGetSelectedWorkspace();
  const isCreatorLiteMember = workspace.memberRole === ORG_ROLE_CREATOR_LITE;
  const paywallRequest = usePaywallRequest();

  return (
    <StarterUpgradeModalButton>
      {({ showModal }) => (
        <Text size="body-sm" color="grey5">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            variant="neutral"
            onClick={() => {
              if (isCreatorLiteMember) {
                paywallRequest('business', {
                  analyticEvent:
                    SHARE_VIDEO_SETTINGS_ROLE_UPGRADE_BUTTON_CLICKED,
                });
              } else {
                if (text === 'customize player') {
                  analytics.track(
                    SHARE_VIDEO_SETTINGS_LOOM_BRANDED_PLAYER_UPGRADE_CLICKED
                  );
                }

                showModal();
              }
            }}
          >
            Upgrade
          </Link>
          <span>{` to ${text}`}</span>
        </Text>
      )}
    </StarterUpgradeModalButton>
  );
};

export const VideoSetting = ({
  children,
  settingName,
  subtext,
  useUpgradeLink,
  upgradeText,
  isBeta,
}: {
  children: React.ReactElement | null;
  settingName: string;
  subtext: string;
  useUpgradeLink?: boolean;
  upgradeText?: string;
  isBeta?: boolean;
}): JSX.Element => (
  <VideoSettingWrapper>
    <Arrange gap="medium" alignItems="start" columns={['1fr', 'auto']}>
      <TextAndBetaWrapper>
        <Text fontWeight="bold">{settingName}</Text>
        {isBeta ? <Pill backgroundColor="highlight">Beta</Pill> : null}
      </TextAndBetaWrapper>
      {children}
    </Arrange>
    {useUpgradeLink ? (
      <UpgradeText text={upgradeText} />
    ) : (
      <Text size="body-sm" color="grey5">
        {subtext}
      </Text>
    )}
  </VideoSettingWrapper>
);

export const VideoSettingWithIcon = ({
  Icon,
  children,
  settingName,
  subtext,
  useUpgradeLink,
  upgradeText,
  isBeta,
}: {
  Icon: React.ReactElement;
  children: React.ReactElement | null;
  settingName: string;
  subtext: string;
  useUpgradeLink?: boolean;
  upgradeText?: string;
  isBeta?: boolean;
}): JSX.Element => (
  <VideoSettingWithIconWrapper>
    <IconWrapper>{Icon}</IconWrapper>
    <VideoSetting
      settingName={settingName}
      subtext={subtext}
      useUpgradeLink={useUpgradeLink}
      upgradeText={upgradeText}
      isBeta={isBeta}
    >
      {children}
    </VideoSetting>
  </VideoSettingWithIconWrapper>
);
