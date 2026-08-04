import {
  UiEvents,
  usePlayer,
  usePlayerFromContext,
  useVideoContext,
} from '@js/common/video-player';
import { useViewerInsight } from '@js/common/viewer-insights';
import {
  getEngagementInsightUsersFromView,
  hasUsers,
  reactionCreatedByOneOf,
} from '@js/components/video-player-fresh/utils';
import React from 'react';

import fetch from '@js/utilities/fetch';

import { HEADER_CONTENT_TYPE } from '@loomhq/shared-utilities/constants/http';
import { JSON as JSON_MIME } from '@loomhq/shared-utilities/constants/mimes';

import { useCreateReaction, useFetchReactions } from './hooks/reactions';
import { useParseReaction } from './utils/model';

const useSendAnonName = () => {
  const player = usePlayerFromContext();

  React.useEffect(() => {
    const sendAnonName = async name => {
      await fetch('/v1/auth/anon_username', {
        credentials: 'include',
        headers: { [HEADER_CONTENT_TYPE]: JSON_MIME },
        method: 'PATCH',
        body: JSON.stringify({ user_name: name }),
      });
    };

    if (!player) {
      return;
    }

    player.on([UiEvents.anonNameSubmitted], sendAnonName);

    return () => {
      player.off([UiEvents.anonNameSubmitted], sendAnonName);
    };
  }, [player]);

  return null;
};

// Must be declared as any bc we are using the handler as a way to avoid
// rules of hooks: an "effect component"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReactionsHandler = (): any => {
  const { setReactions, video } = useVideoContext();
  const reactions = useFetchReactions();
  const player = usePlayer(video.id);
  const { selectedViewer: selectedEngagementInsightsView } = useViewerInsight();

  useSendAnonName();

  const createReaction = useCreateReaction();
  const parseReaction = useParseReaction();

  // register for new reaction event
  React.useEffect(() => {
    player?.on([UiEvents.newReaction], createReaction);

    return () => {
      player?.off([UiEvents.newReaction], createReaction);
    };
  }, [createReaction, player]);

  // When reactions change for any reasons, push update to video context
  React.useEffect(() => {
    if (reactions) {
      // if engagement insights panel is open with viewer selected,
      // filter reactions out by selected viewer
      const engagementInsightsUsers = getEngagementInsightUsersFromView(
        selectedEngagementInsightsView
      );

      if (hasUsers(engagementInsightsUsers)) {
        const filteredReactions = reactions.filter(
          reactionCreatedByOneOf(engagementInsightsUsers)
        );

        setReactions(filteredReactions.map(parseReaction));
      } else {
        setReactions(reactions.map(parseReaction));
      }
    }
  }, [setReactions, reactions, parseReaction, selectedEngagementInsightsView]);

  return null;
};
