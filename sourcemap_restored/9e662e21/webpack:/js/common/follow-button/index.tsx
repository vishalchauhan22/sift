import { PROFILE_FOLLOWED, PROFILE_UNFOLLOWED } from '@js/constants/events';

import { useCurrentUserSelector } from '@js/common/current-user';
import { SectionTitleContext } from '@js/contexts/SectionTitleContext';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React, { useContext } from 'react';

import { Button, Spacer, Text } from '@loomhq/lens';

import { track } from '@js/utilities/analytics';

import { useGetUserFollowsProfileQuery } from './GetUserFollowsProfile.generated';
import { useToggleFollowingProfileMutation } from './ToggleFollowingProfile.generated';
import { withIdentifiers } from '../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

type FollowButtonProps = {
  profileId: number;
  hasFullWidth: boolean;
  hideToggle?: boolean;
  showStatus?: boolean;
  size?: number;
};

export const FollowButton = ({
  profileId,
  hasFullWidth,
  hideToggle = false,
  showStatus = false,
  size = 2,
}: FollowButtonProps): JSX.Element | null => {
  const selectedWorkspace = useGetSelectedWorkspace();
  const userId = useCurrentUserSelector(user => user.id, undefined);
  const sectionTitle = useContext(SectionTitleContext);

  const { data: followData, loading } = useGetUserFollowsProfileQuery({
    variables: {
      profileId,
    },
    skip: !profileId,
  });

  const [toggleFollowingProfileMutation, { loading: toggleLoading }] =
    useToggleFollowingProfileMutation({
      variables: {
        profileId,
        follow:
          followData?.result?.__typename === 'UserFollowsStream'
            ? !followData.result.follow
            : false,
      },
      refetchQueries: [
        'GetUserFollowsProfile',
        'GetUserFollowedStreams',
        'GetUserFollowsCount',
      ],
      awaitRefetchQueries: true,
    });

  if (followData?.result?.__typename !== 'UserFollowsStream') {
    return null;
  }

  const followsProfile = followData?.result?.follow;

  const onToggleFollow = e => {
    e.preventDefault();
    const event = !followsProfile ? PROFILE_FOLLOWED : PROFILE_UNFOLLOWED;

    track(event, {
      context_page_path: window.location.pathname,
      ...withIdentifiers(
        event,
        AnalyticsEntityId.user(userId, 'user_id'),
        AnalyticsEntityId.user(profileId, 'profile_id'),
        AnalyticsEntityId.workspace(
          selectedWorkspace.id,
          'string',
          'organization_id'
        )
      ),
    });

    toggleFollowingProfileMutation();
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {!followsProfile && (
        <Button
          size={size === 1 ? 'small' : 'medium'}
          hasFullWidth={hasFullWidth}
          variant={followsProfile ? 'neutral' : 'primary'}
          onClick={onToggleFollow}
          hasLoader={toggleLoading}
          isDisabled={toggleLoading}
        >
          Follow
        </Button>
      )}
      {followsProfile && !hideToggle && (
        <Button
          size={size === 1 ? 'small' : 'medium'}
          hasFullWidth={hasFullWidth}
          variant="neutral"
          onClick={onToggleFollow}
          hasLoader={toggleLoading}
          isDisabled={toggleLoading}
        >
          Unfollow
        </Button>
      )}
      {/* For the 'following' modal that pops up when you click on followers */}
      {followsProfile && showStatus && (
        <>
          <Spacer top="medium" />
          <Text size={size === 1 ? 'small' : 'medium'} fontWeight="bold">
            Following
          </Text>
        </>
      )}
    </>
  );
};
