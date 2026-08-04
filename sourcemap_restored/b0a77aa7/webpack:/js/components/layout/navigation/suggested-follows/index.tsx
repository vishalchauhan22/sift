import { FollowsProfileUserFragmentFragment } from '@js/common/follows/FollowsProfileUserFragment.generated';
import React, { FC, useMemo } from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Spacer, Text } from '@loomhq/lens';
import { MemberPropertyEnum } from '@loomhq/shared-utilities/constants/memberProperties';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useSuggestedFollows } from '@js/common/follows/useSuggestedFollows';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';
import { useMemberProperty } from '@js/hooks/memberProperties';

import styles from '../styles.module.less';
import SuggestedProfileFollow from './SuggestedProfileFollow';
import SuggestedTagFollow from './SuggestedTagFollow';

const MAX_SUGGESTED_STREAMS = 5;

interface SuggestedFollowsProps {
  followedProfiles: Array<{ user: FollowsProfileUserFragmentFragment }>;
  followedTags: Array<{ name: string }>;
  ProfileLink;
  TagLink;
}

const SuggestedFollowsWithoutFeatureWrapper = ({
  followedProfiles,
  followedTags,
  ProfileLink,
  TagLink,
}: SuggestedFollowsProps): JSX.Element | null => {
  const { featureLoadedRef } = useFeatureWrapper();
  const { selectedWorkspace } = useGetWorkspaceMemberships();
  const currentWorkspaceId = selectedWorkspace?.id;

  const followedProfileIds = useMemo(
    () => new Set(followedProfiles.map(p => p.user.id)),
    [followedProfiles]
  );
  const followedTagNames = useMemo(
    () => new Set(followedTags.map(t => t.name)),
    [followedTags]
  );

  const { value: declinedStreams } = useMemberProperty(
    MemberPropertyEnum.DECLINED_SUGGESTED_FOLLOW_STREAMS
  );

  const { suggestedProfiles, suggestedTags } = useSuggestedFollows({
    followedProfileIds,
    followedTagNames,
    skip: !currentWorkspaceId,
  });

  if (!suggestedProfiles.length && !suggestedTags.length) {
    return null;
  }

  return (
    <div ref={featureLoadedRef}>
      <div className={styles.librariesHeading}>
        <Spacer bottom="small" left="xsmall">
          <Text fontWeight="bold" color="bodyDimmed">
            Suggested
          </Text>
        </Spacer>
      </div>

      {suggestedProfiles
        .slice(0, MAX_SUGGESTED_STREAMS - followedProfileIds.size)
        .map(profile => (
          <SuggestedProfileFollow
            key={profile.user.id}
            profile={profile}
            ProfileLink={ProfileLink}
            declinedStreams={declinedStreams}
          />
        ))}

      {suggestedTags
        .slice(0, MAX_SUGGESTED_STREAMS - followedTagNames.size)
        .map(tag => (
          <SuggestedTagFollow
            key={tag.name}
            tag={tag}
            TagLink={TagLink}
            declinedStreams={declinedStreams}
          />
        ))}
    </div>
  );
};

export const SuggestedFollows: FC<
  React.PropsWithChildren<SuggestedFollowsProps>
> = ({
  followedProfiles,
  followedTags,
  ProfileLink,
  TagLink,
}: SuggestedFollowsProps) => {
  return (
    <FeatureWrapper
      feature={Feature.NavigationSuggestedFollows}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <SuggestedFollowsWithoutFeatureWrapper
        followedProfiles={followedProfiles}
        followedTags={followedTags}
        ProfileLink={ProfileLink}
        TagLink={TagLink}
      />
    </FeatureWrapper>
  );
};
