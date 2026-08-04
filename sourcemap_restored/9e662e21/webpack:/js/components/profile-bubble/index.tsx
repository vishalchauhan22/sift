import {
  NAVIGATION_ITEM_CLICKED,
  INSIGHTS_HUB_RENDERED,
} from '@js/constants/events';

import classNames from 'classnames';

import { LoggedInOnly } from '@js/common/current-user';
import FtuxWrapper from '@js/components/ftux/ftux-wrapper';
import { eoyTakeoverDataType } from '@js/components/insights-hub/end-of-year-insights/EndOfYearInsightsHub';
import { useGetEoyInsightsForHubLazyQuery } from '@js/components/insights-hub/end-of-year-insights/getEoyInsightsForHub.generated';
import UserAvatar from '@js/components/user-avatar';
import { useOnDismissFtux, useFtuxIsVisible } from '@js/hooks/ftux';
import React, { useEffect, useState } from 'react';

import { getUserAvatarThumb } from '@js/utilities/avatar';

import { getParam } from '@js/utilities/url';

import {
  Arrange,
  Container,
  Spacer,
  Text,
  Tooltip,
  useOnClickOutside,
  Button,
} from '@loomhq/lens';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { isSharePageUrl } from '@loomhq/shared-utilities/utilities/validateUtils';

import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import * as analytics from '@js/utilities/analytics';

import { useProfileMenu } from '../../contexts/ProfileMenuContext';

import { BubbleMenuPortal } from './profile-menu-portal';
import styles from './styles.module.css';
const PROFILE_BUBBLE_LABEL = 'Profile and personal settings';

export const ProfileBubb = (): JSX.Element => {
  const onDismissFtux = useOnDismissFtux();
  const { setIsProfileMenuOpen, isProfileMenuOpen, applyInsightsStyle } =
    useProfileMenu();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isSharePage, setIsSharePage] = useState<boolean>(false);
  const isFtuxVisible = useFtuxIsVisible(UserPropertyEnum.EOY_2024_FTUX);

  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const openProfileMenu = (event, applyInsightsStyle) => {
    if (!isProfileMenuOpen && setIsProfileMenuOpen) {
      setIsProfileMenuOpen(
        true,
        event?.target?.className,
        applyInsightsStyle || false
      );
    }
  };
  const onClick = event => {
    analytics.track(NAVIGATION_ITEM_CLICKED, {
      primary_nav_item: 'avatar',
    });

    analytics.track(INSIGHTS_HUB_RENDERED);

    if (!isProfileMenuOpen && setIsProfileMenuOpen) {
      openProfileMenu(event, false);
    }

    setIsOpen(false);

    if (isFtuxVisible) {
      onDismissFtux(UserPropertyEnum.EOY_2024_FTUX);
    }
  };

  const className = applyInsightsStyle ? styles.insightsHubRing : '';
  const modalParam = getParam('modal');

  useEffect(() => {
    const url = window.location.href;
    if (isSharePageUrl(url)) {
      setIsSharePage(true);
    }

    if (modalParam === 'insightsHub') {
      openProfileMenu('', true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [getEoyDataforInsightsforHub, { data: eoyData }] =
    useGetEoyInsightsForHubLazyQuery();

  const eoyTakeoverData = eoyData?.getEoyInsightsForHub;

  const showEoyTakeover =
    eoyTakeoverData?.__typename === 'eoyTakeoverInsightsPayloadType' &&
    eoyTakeoverData?.personalityType
      ? eoyTakeoverData?.success
      : false;

  useEffect(() => {
    getEoyDataforInsightsforHub();
  }, [getEoyDataforInsightsforHub]);

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <Container
      id="intercom-destination-avatar"
      className={className}
      position="relative"
      radius="full"
    >
      <Tooltip
        tabIndex={-1}
        content={!isFtuxVisible ? PROFILE_BUBBLE_LABEL : null}
        placement="bottomRight"
      >
        <button
          onClick={onClick}
          className={classNames(
            styles.avatarLink,
            isFtuxVisible && showEoyTakeover && styles.hasConfetti
          )}
        >
          <LoggedInOnly
            orElse={<UserAvatar size={onLargeTabletOrDesktop ? '4.5' : '4'} />}
          >
            {loggedInUser => (
              <UserAvatar
                avatarSrc={getUserAvatarThumb(loggedInUser.avatars)}
                name={loggedInUser.firstName ?? undefined}
                size={onLargeTabletOrDesktop ? '4.5' : '4'}
              />
            )}
          </LoggedInOnly>

          {isFtuxVisible && showEoyTakeover && (
            <span className={styles.confetti}>
              <span className={styles.confettiLeft} />
              <span className={styles.confettiRight} />
            </span>
          )}
        </button>
        {showEoyTakeover && (
          <div ref={ref}>
            <FtuxWrapper
              hasTransition={false}
              name={UserPropertyEnum.EOY_2024_FTUX}
            >
              {isOpen && (
                <Container
                  backgroundColor="blurple"
                  data-lens-theme="dark"
                  position="absolute"
                  radius="large"
                  right="-8px"
                  shadow="large"
                  top={isSharePage ? '60px' : '-8px'}
                  width={{
                    default: 36,
                    xsmall: 54,
                  }}
                  overflow="hidden"
                  zIndex={2}
                  onClick={onClick}
                  style={{ cursor: 'pointer' }}
                >
                  <Container
                    backgroundColor="#2B1C50"
                    paddingX="xlarge"
                    paddingY="medium"
                  >
                    <Arrange alignItems="center">
                      <img
                        width="100"
                        src="https://cdn.loom.com/assets/marketing/end-of-year-campaign/rewind-2024.png"
                        alt="Rewind 2024 logo"
                      />
                    </Arrange>
                  </Container>
                  <Container paddingX="xlarge" paddingY="large">
                    <Text
                      htmlTag="h2"
                      color="white"
                      size="heading-md"
                      fontWeight="bold"
                    >
                      What’s your 2024 Loom personality?
                    </Text>
                    <Spacer bottom="medium" />
                    <Text color="blurpleLight" htmlTag="p">
                      See how you stack up against other Loom users and share
                      your async achievements. Click on your avatar to discover
                      what defines your Loom personality.
                    </Text>
                    <Spacer bottom="large" />
                    <Button
                      variant="neutral"
                      className={`${styles.eoyFtuxButton} bgc:blurpleLight c:blurpleStrong`}
                    >
                      Reveal your personality
                    </Button>
                  </Container>
                </Container>
              )}
            </FtuxWrapper>
          </div>
        )}
      </Tooltip>
      <BubbleMenuPortal
        eoyTakeoverData={
          showEoyTakeover ? (eoyTakeoverData as eoyTakeoverDataType) : null
        }
      />
    </Container>
  );
};
