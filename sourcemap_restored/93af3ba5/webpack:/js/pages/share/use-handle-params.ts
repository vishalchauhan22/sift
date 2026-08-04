import { isDev } from '@js/constants/environment';
import { LOOM_URI } from '@js/constants/routes';

import * as clipboard from '@js/common/clipboard';
import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import {
  SHARE_RECORD_REPLY_SIGNUP_MODAL,
  SHARE_UI_MODAL,
  ModalTypeEnum,
} from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ASGSource } from '@js/common/onboarding';
import { ShareModalSource } from '@js/common/share-video/share-modal/enums';
import { usePlayer, useVideoContext } from '@js/common/video-player';
import { useViewerInsight } from '@js/common/viewer-insights';
// eslint-disable-next-line @loomhq/loom/restrict-non-index-imports
import { InteractionType } from '@js/pages/share/anonymous-share-gate-modal/hard-gate-comment-emoji-modal/types';
import { Gates } from '@js/pages/share/common/constants/gates';
import React from 'react';
import {
  ASGTertiaryButtonIcon,
  getAnonShareGateModalType,
} from '@js/utilities/modals';
import { getParam, hasParam } from '@js/utilities/url';

const {
  SignedOutEndOfVideoNudges,
  SignedOutEndOfVideoNudgesEmojiReactions,
  AnonWebPlayerPauseModal,
} = ASGSource;

type UseHandleParamsProps = {
  shouldOpenInsights: boolean;
  fromRecorderParam: boolean;
  openSharePermissionsParam: boolean;
};

export const useHandleParams = ({
  shouldOpenInsights,
  fromRecorderParam,
  openSharePermissionsParam,
}: UseHandleParamsProps): void => {
  const { openModal } = useModals();
  const { setVideo, video: { id: videoId = '', owner } = {} } =
    useVideoContext();
  const { toggleIsViewerSelected } = useViewerInsight();
  const { setShowConfirmationToast } = useConfirmationToast();
  const player = usePlayer(videoId);
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const welcomeComplete = useCurrentUserSelector(
    user => (user.persona as any)?.persona_v1?.complete,
    false
  );

  const hasReply = hasParam('replyVideoId');
  const startTime = getParam('t');
  const videoCurrentTime = getParam('videoCurrentTime');

  const [hasOpenedSharePermissionsModal, setHasOpenedSharePermissionsModal] =
    React.useState(false);

  React.useEffect(() => {
    if (!player) {
      return;
    }

    if (hasReply && videoCurrentTime) {
      const currentTime = Number(videoCurrentTime);

      // This comes from the url, so might not be a valid number
      if (!Number.isNaN(currentTime)) {
        // TODO: useSetPlayerTime instead of player.currentTime/play
        player.currentTime = Number(videoCurrentTime);
      }

      return;
    }

    if (startTime) {
      const currentTime = Number(startTime);

      // This comes from the url, so might not be a valid number
      if (!Number.isNaN(currentTime)) {
        // TODO: useSetPlayerTime instead of player.currentTime/play
        player.currentTime = Number(startTime);
      }
    }
  }, [hasReply, player, startTime, videoCurrentTime]);

  React.useEffect(() => {
    if (
      (hasReply && !welcomeComplete) ||
      (isDev && getParam('anon-reply-creator')) // enables  local testing
    ) {
      openModal({ modalType: SHARE_RECORD_REPLY_SIGNUP_MODAL });
    }

    if (hasParam('resume-signup')) {
      openModal({ modalType: ModalTypeEnum.ANON_CREATOR_SIGNUP_MODAL });
    }

    if (hasParam('resume-anon-signup')) {
      openModal({ modalType: getAnonShareGateModalType() });
    }

    if (isDev && hasParam('hardgate_comment')) {
      const comment = getParam('hardgate_comment');
      openModal({
        modalType: ModalTypeEnum.HARD_GATE_COMMENT_EMOJI_MODAL,
        options: {
          interactionType: InteractionType.Comment,
          comment,
        },
      });
    }

    if (isDev && hasParam('hardgate_view')) {
      openModal({
        modalType: ModalTypeEnum.HARD_GATE_VIEWS_MODAL,
        options: {
          videoOwnerName: ``,
          source: ASGSource.SignedOutHardGatingViews,
          signupParams: {
            signup_source: ASGSource.SignedOutHardGatingViews,
          },
          gate: Gates.HARD_GATE_VIEWS,
        },
      });
    }

    if (hasParam('start-embed-anon-signup') && !isLoggedIn) {
      const expHeader = `Sign up to tell ${
        owner?.displayName || 'your teammate'
      } you watched this!`;

      const expSubheader = 'Share ideas. Skip meetings.';

      openModal({
        modalType: getAnonShareGateModalType(),
        options: {
          header: expHeader,
          subheader: expSubheader,
          hideModeSwitcher: true,
          source: AnonWebPlayerPauseModal,
        },
      });
    }

    if (hasParam('asg_comment') && hasParam('comment') && !isLoggedIn) {
      const comment = getParam('comment');
      const videoTimeStamp = getParam('video_time_stamp');
      const anonName = getParam('anon_name');

      openModal({
        modalType: getAnonShareGateModalType(),
        options: {
          gate: Gates.REACTION,
          comment,
          commentVideoId: videoId,
          anonName,
          videoId,
          header: 'Add your name to this comment',
          subheader: 'Sign up and cut down on live meetings.',
          tertiaryButtonText: 'Post comment anonymously',
          tertiaryButtonIcon: ASGTertiaryButtonIcon.Comment,
          hideModeSwitcher: true,
          source: SignedOutEndOfVideoNudges,
          signupParams: {
            anonComment: comment,
            anonCommentVideoId: videoId,
            anonCommentTimestamp: videoTimeStamp,
            signup_source: SignedOutEndOfVideoNudges,
          },
        },
      });
    }

    if (hasParam('asg_reaction') && hasParam('reaction') && !isLoggedIn) {
      const reaction = getParam('reaction');
      const videoTimeStamp = getParam('video_time_stamp');

      openModal({
        modalType: getAnonShareGateModalType(),
        options: {
          gate: Gates.REACTION,
          emojiReaction: reaction,
          emojiReactVideoId: videoId,
          header: 'Add your name to this reaction',
          subheader: 'Sign up and cut down on live meetings.',
          tertiaryButtonText: 'Post reaction anonymously',
          tertiaryButtonIcon: ASGTertiaryButtonIcon.React,
          hideModeSwitcher: true,
          source: SignedOutEndOfVideoNudgesEmojiReactions,
          signupParams: {
            anonReaction: reaction,
            anonReactionVideoId: videoId,
            anonReactionTimestamp: videoTimeStamp,
            signup_source: SignedOutEndOfVideoNudgesEmojiReactions,
          },
        },
      });
    }

    if (shouldOpenInsights) {
      toggleIsViewerSelected();
    }
  }, [
    fromRecorderParam,
    hasReply,
    isLoggedIn,
    openModal,
    owner?.displayName,
    shouldOpenInsights,
    videoId,
    welcomeComplete,
    toggleIsViewerSelected,
  ]);

  React.useEffect(() => {
    if (openSharePermissionsParam && !hasOpenedSharePermissionsModal) {
      setHasOpenedSharePermissionsModal(true);
      openModal({
        modalType: SHARE_UI_MODAL,
        options: {
          source: ShareModalSource.ShareButton,
          videoId,
          setVideo,
        },
      });
    }
  }, [
    hasOpenedSharePermissionsModal,
    openModal,
    openSharePermissionsParam,
    setVideo,
    videoId,
  ]);

  React.useEffect(() => {
    if (fromRecorderParam) {
      const wasCopied = clipboard.copyText(`${LOOM_URI}/share/${videoId}`);

      if (wasCopied) {
        setShowConfirmationToast('Link copied to clipboard!');
      }
    }
  }, [fromRecorderParam, videoId, setShowConfirmationToast]);
};
