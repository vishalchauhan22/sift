import { SLACK_USER_CONNECT_CLICKED } from '@js/constants/events';

import { useVideoContext } from '@js/common/video-player';
import React, { useCallback, useMemo } from 'react';

import * as analytics from '@js/utilities/analytics';

import { SvgSlack } from '@loomhq/lens/icons/slack';

import { BacklinkSourceType } from '@loomhq/shared-utilities/constants/backlinks';

import { BaseBacklinkPreview } from '../BaseBacklinkPreview';
import { Backlink } from '../types';
import {
  GetSlackBacklinkPreviewInfoQuery,
  useGetSlackBacklinkPreviewInfoQuery,
} from './GetSlackBacklinkPreviewInfo.generated';
import { useRemoveSlackBacklinkMutation } from './RemoveSlackBacklink.generated';

type Props = {
  videoId: string;
  backlinkId: Backlink['id'];
  sourceLink: Backlink['sourceLink'];
  openSlackConnectPopup: (connectUrl: string) => void;
};

const selectSlackBacklinkPreviewInfoData = (
  data: GetSlackBacklinkPreviewInfoQuery | undefined
) => {
  let shouldPromptUserToConnectToSlackTeam: boolean | null = null;
  let connectUrl: string | null = null;
  let isChannelMissingOrPrivate: boolean | null = null;
  let slackTeamId: string | null = null;
  let slackChannelName: string | null = null;

  if (
    data?.getSlackBacklinkPreviewInfo?.__typename ===
    'GetSlackBacklinkPreviewInfoPayload'
  ) {
    shouldPromptUserToConnectToSlackTeam =
      !data.getSlackBacklinkPreviewInfo.isUserConnectedToGivenSlackTeam;
    isChannelMissingOrPrivate =
      data.getSlackBacklinkPreviewInfo.isChannelMissingOrPrivate;
    slackTeamId = data.getSlackBacklinkPreviewInfo.slackTeamId;
    slackChannelName = data.getSlackBacklinkPreviewInfo.slackChannelName;
    connectUrl = data.getSlackBacklinkPreviewInfo.connectUrl;
  }

  return {
    shouldPromptUserToConnectToSlackTeam,
    isChannelMissingOrPrivate,
    slackTeamId,
    slackChannelName,
    connectUrl,
  };
};

export const SlackBacklinkPreview = ({
  videoId,
  backlinkId,
  sourceLink,
  openSlackConnectPopup,
}: Props): JSX.Element => {
  const {
    video: { currentUserCanEdit },
  } = useVideoContext();

  const { data, loading, error } = useGetSlackBacklinkPreviewInfoQuery({
    variables: {
      backlinkId,
    },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const [
    removeSlackBacklinkMutation,
    { loading: isLoadingRemoveSlackBacklink },
  ] = useRemoveSlackBacklinkMutation({
    variables: {
      backlinkId,
    },
    update: (cache, { data }) => {
      if (
        data?.deleteBacklink?.__typename === 'DeleteBacklinkPayload' &&
        data.deleteBacklink.success
      ) {
        const normalizedId = cache.identify({
          id: backlinkId,
          __typename: 'Backlink',
        });

        // Order Apollo to delete that value
        cache.evict({ id: normalizedId });

        // Order Apollo to do a garbage collection
        // Apollo will remove all the references to objects that have
        // been deleted
        cache.gc();
      }
    },
  });

  const { shouldPromptUserToConnectToSlackTeam, connectUrl, slackChannelName } =
    selectSlackBacklinkPreviewInfoData(data);

  const failedToLoadPreviewInfo =
    !loading && (error || shouldPromptUserToConnectToSlackTeam === null);

  const isUserDisconnected =
    !loading && shouldPromptUserToConnectToSlackTeam && connectUrl;

  const linkContent = useMemo(() => {
    if (failedToLoadPreviewInfo || isUserDisconnected) {
      return sourceLink;
    }

    return `#${slackChannelName}`;
  }, [
    failedToLoadPreviewInfo,
    isUserDisconnected,
    sourceLink,
    slackChannelName,
  ]);

  const handleConnectClick = useCallback(() => {
    if (!isUserDisconnected) {
      return;
    }

    analytics.track(SLACK_USER_CONNECT_CLICKED);

    openSlackConnectPopup(connectUrl);
  }, [isUserDisconnected, connectUrl, openSlackConnectPopup]);

  return (
    <BaseBacklinkPreview
      icon={<SvgSlack />}
      isLoading={loading}
      linkContent={linkContent}
      link={sourceLink}
      connectProps={
        isUserDisconnected
          ? {
              connectText: 'Connect Slack',
              handleConnectClick,
            }
          : undefined
      }
      removeProps={
        currentUserCanEdit
          ? {
              handleRemoveClick: removeSlackBacklinkMutation,
              isLoading: isLoadingRemoveSlackBacklink,
            }
          : undefined
      }
      analyticsProps={{
        video_id: videoId,
        link_destination: BacklinkSourceType.SLACK,
      }}
    />
  );
};
