import FocusTrap from 'focus-trap-react';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import ResizeObserver from 'resize-observer-polyfill';

import {
  Arrange,
  Button,
  Container,
  IconButton,
  Spacer,
  Text,
} from '@loomhq/lens';
import { SvgClose } from '@loomhq/lens/icons/close';
import { LoggedInOnly, useCurrentUserSelector } from '@js/common/current-user';
import { FollowButton } from '@js/common/follow-button';
import UserAvatar from '@js/components/user-avatar';
import { PROFILE_CARD } from '@js/constants/destinationLogging';
import { PROFILE_CARD_SHOWN } from '@js/constants/events';
import { KEY_ESCAPE } from '@js/constants/keyCodes';
import { SectionTitleContext } from '@js/contexts/SectionTitleContext';
import useKeyDown from '@js/hooks/useKeyDown';
import useOnClickOutside from '@js/hooks/useOnClickOutside';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

import { track } from '@js/utilities/analytics';

import StreamCountHeader from '../profile-page/user-profile-stream/StreamCountHeader';
import { useGetUserByIdWithProfileQuery } from './GetUserByIdWithProfile.generated';

import styles from './styles.module.css';

import type { GetUserByIdWithProfileQuery } from './GetUserByIdWithProfile.generated';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

type ProfileCardProps = {
  avatarSrc?: string;
  children: JSX.Element;
  name: string;
  profileId?: number;
  placement?: PlacementType;
  avatarMode?: boolean;
};

type Profile = { role: string | null; location: string | null } | null;

const selectProfileData = (
  data: GetUserByIdWithProfileQuery | undefined
): {
  profile: Profile;
  profileUrl: string | null;
} => {
  let profile: Profile = null;
  let profileUrl: string | null = null;

  if (
    data?.user?.__typename === 'CommunityUserPayload' ||
    data?.user?.__typename === 'RegularUserPayload'
  ) {
    profile = data.user.user?.profile?.profileInfo ?? null;
    profileUrl = data.user.user?.profile?.profileUrl ?? null;
  }

  return {
    profile,
    profileUrl,
  };
};

export const ProfileCard = ({
  avatarSrc,
  name,
  profileId,
  children,
  placement = 'right-center',
  avatarMode = true,
}: ProfileCardProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen,
    ResizeObserver,
    placement,
    auto: true,
  });

  // Create a ref callback that handles both our ref and the layer ref
  const handleDialogRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Set our ref
      if (dialogRef) {
        (dialogRef as any).current = node;
      }

      // Handle the layer ref if it exists
      if (layerProps.ref) {
        if (typeof layerProps.ref === 'function') {
          layerProps.ref(node);
        } else {
          (layerProps.ref as any).current = node;
        }
      }
    },
    [layerProps]
  );

  const handleCloseModal = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useOnClickOutside(dialogRef, handleCloseModal);
  useKeyDown(KEY_ESCAPE, handleCloseModal);

  const currentUserId = useCurrentUserSelector(user => user.id, NaN);
  const selectedWorkspace = useGetSelectedWorkspace();
  const { loading: userInfoLoading, data: userProfileData } =
    useGetUserByIdWithProfileQuery({
      variables: {
        userId: String(profileId),
      },
      skip: !profileId,
    });

  const { profile, profileUrl } = selectProfileData(userProfileData);

  const currentUserIsOwner = profileId === currentUserId;

  // Focus first focusable element when dialog opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const firstFocusable = dialogRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);

  if (userInfoLoading || !profile) {
    return children;
  }

  if (isOpen) {
    track(PROFILE_CARD_SHOWN, {
      context_page_path: window.location.pathname,
      ...withIdentifiers(
        PROFILE_CARD_SHOWN,
        AnalyticsEntityId.user(currentUserId, 'user_id'),
        AnalyticsEntityId.workspace(
          selectedWorkspace.id,
          'string',
          'organization_id'
        )
      ),
    });
  }

  // Remove ref from layerProps to avoid conflicts
  const { ref: _layerRef, ...otherLayerProps } = layerProps;

  return (
    <>
      <div className={styles.profileCard} {...triggerProps}>
        <button
          ref={triggerRef}
          className={avatarMode ? styles.avatarLink : styles.textLink}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={`${name}'s profile`}
        >
          {children}
        </button>
      </div>
      {isOpen &&
        renderLayer(
          <FocusTrap>
            <div
              ref={handleDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              className={styles.profileCardHoverNewNav}
              {...otherLayerProps}
            >
              <Spacer all="xsmall">
                <Container
                  backgroundColor="background"
                  borderSide="all"
                  width="41"
                  padding="medium"
                  radius="large"
                  shadow="medium"
                >
                  <Container position="absolute" top={1} right={1}>
                    <IconButton
                      altText="Close profile card"
                      icon={<SvgClose />}
                      size="small"
                      onClick={() => {
                        setIsOpen(false);
                        triggerRef.current?.focus();
                      }}
                    />
                  </Container>
                  <Arrange alignItems="start" gap="medium">
                    <UserAvatar
                      avatarSrc={avatarSrc}
                      name={name}
                      avatarSize={8}
                    />
                    <Container minWidth={0}>
                      <Text
                        id="dialog-title"
                        fontWeight="bold"
                        size="body-lg"
                        hasEllipsis
                      >
                        {name ?? 'Anonymous'}
                      </Text>
                      <Spacer top={0.25} />
                      <div className={styles.breakWords}>
                        <Text htmlTag="p" color="bodyDimmed">
                          {profile?.role && <>{profile?.role}</>}
                          {profile?.role && profile?.location && ' · '}
                          {profile?.location && <>{profile?.location}</>}
                        </Text>
                      </div>

                      <Container marginTop="small" marginLeft="-10px">
                        <StreamCountHeader
                          firstName={name}
                          profileId={profileId}
                          loggedInUser={currentUserId}
                        />
                      </Container>
                    </Container>
                  </Arrange>
                  <LoggedInOnly>
                    <Spacer top="medium" />
                    <Arrange
                      gap="small"
                      columns={currentUserIsOwner ? '1fr' : '1fr 1fr'}
                    >
                      <SectionTitleContext.Provider value={PROFILE_CARD}>
                        {!currentUserIsOwner && profileId ? (
                          <FollowButton profileId={profileId} hasFullWidth />
                        ) : null}
                      </SectionTitleContext.Provider>
                      <Button
                        htmlTag="a"
                        variant="neutral"
                        href={`/profile/${profileUrl}`}
                      >
                        View profile
                      </Button>
                    </Arrange>
                  </LoggedInOnly>
                </Container>
              </Spacer>
            </div>
          </FocusTrap>
        )}
    </>
  );
};
