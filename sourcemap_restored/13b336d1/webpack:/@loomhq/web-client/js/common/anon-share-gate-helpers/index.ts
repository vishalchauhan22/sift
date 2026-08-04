import {
  ONBOARDING_FLOW_COMPLETE,
  SIGNUP_MODAL_SIGNUP_METHOD_BUTTON_CLICKED,
  VIDEO_COMMENT_CREATED,
} from '@js/constants/events';
import { ONBOARDING_COMPLETE } from '@js/constants/metrics';

import {
  ANON_SHARE_GATE_MODAL,
  ANON_SHARE_GATE_MOBILE_MODAL,
} from '@js/common/onboarding';

import { usePlayer, VideoPlatform } from '@js/common/video-player';

import { useUpdateAnonUsername } from '@js/hooks/user/useUpdateAnonUsername';
import { Routes } from '@js/pages/share/anonymous-share-gate-modal/common/routes';
import { useCreateComment } from '@js/pages/share/common/comments/useCreateComment';

import { incrementMetric } from '@js/utilities/metrics';
import { datadogRum } from '@js/utilities/rum';

import * as analytics from '@js/utilities/analytics';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { AuthenticationProviders } from '@loomhq/shared-utilities/constants/authentication';
import {
  ASG_SOURCES,
  GATES,
} from '@loomhq/shared-utilities/constants/anonActivity';
import {
  ASGTertiaryButtonIcon,
  getAnonShareGateModalType,
} from '@js/utilities/modals';
import {
  ASGSource,
  Gates,
} from '@loomhq/shared-utilities/types/anonymousActivity';

const {
  SignedOutAiEndOfVideoNudges,
  SignedOutAiSidebarNudgeComments,
  SignedOutEndOfVideoNudges,
  SignedOutEndOfVideoNudgesEmojiReactions,
  SignedOutNoCommentsAiSidebarNudgeEmojiReactions,
  AnonWebPlayerPauseModal,
  AnonDownloadVideoOnSharePage,
} = ASG_SOURCES;

export function sendOnboardingFinishedEventsAndOpenLibrary(
  currentStep: Routes,
  isMobile: boolean
): void {
  datadogRum.addAction(ONBOARDING_FLOW_COMPLETE);
  const eventProperties = {
    isMobile,
    source: isMobile ? ANON_SHARE_GATE_MOBILE_MODAL : ANON_SHARE_GATE_MODAL,
    step: currentStep,
  };

  analytics.track(ONBOARDING_FLOW_COMPLETE, eventProperties);
  incrementMetric(ONBOARDING_COMPLETE, eventProperties);
  datadogRum.addAction(ONBOARDING_FLOW_COMPLETE);

  window.open(`/looms`, '_blank', 'noopener');
}

interface ModalOptions {
  anonName: string;
  signupParams?: {
    anonCommentTimestamp: number;
  };
  comment: string;
  parentPostId: string;
  commentVideoId: string;
  emojiReaction: string;
  creationMethod: string;
  selectedSuggestionText?: string;
}

export function useHandleClosingCreationActions(
  videoId: string
): (
  source: ASGSource,
  modalOptions: ModalOptions,
  hideFromEmailVerificationStep: boolean
) => void {
  const player = usePlayer(videoId);
  const updateAnonUsername = useUpdateAnonUsername();
  const { createComment } = useCreateComment();

  const handler = (
    source: ASGSource,
    modalOptions: ModalOptions,
    hideFromEmailVerificationStep: boolean
  ): void => {
    const { anonName, signupParams } = modalOptions;

    const anonCommentTimestamp = signupParams?.anonCommentTimestamp;

    switch (source) {
      case SignedOutAiEndOfVideoNudges:
      case SignedOutAiSidebarNudgeComments:
      case SignedOutEndOfVideoNudges: {
        const comment = modalOptions?.comment;
        const parentPostId = modalOptions?.parentPostId;

        if (hideFromEmailVerificationStep && comment) {
          analytics.track(VIDEO_COMMENT_CREATED, {
            ...withIdentifiers(
              VIDEO_COMMENT_CREATED,
              AnalyticsEntityId.video(modalOptions?.commentVideoId, 'video_id')
            ),
            comment_length: comment.length,
            timestamp: anonCommentTimestamp && Number(anonCommentTimestamp),
            creation_method: modalOptions?.creationMethod,
            exact_ai_suggestion_posted: modalOptions?.selectedSuggestionText
              ? comment.trim() === modalOptions?.selectedSuggestionText
              : undefined,
          });

          createComment({
            content: comment,
            anonName: anonName || 'Anonymous',
            parentPostId,
            timestamp: anonCommentTimestamp && Number(anonCommentTimestamp),
          });
        }

        break;
      }
      case SignedOutEndOfVideoNudgesEmojiReactions:
      case SignedOutNoCommentsAiSidebarNudgeEmojiReactions:
        {
          const emojiReaction = modalOptions?.emojiReaction;

          if (hideFromEmailVerificationStep && emojiReaction) {
            player?.submitNewReaction(
              emojiReaction,
              VideoPlatform.sharePagePlayer
            );
          }

          // set the user's anon name as "Anonymous" so they can react again w/o being asked to enter a name
          updateAnonUsername('Anonymous');
        }

        break;
      case AnonWebPlayerPauseModal:
      case AnonDownloadVideoOnSharePage:
        // For cases without closing creation actions, we ideally want to
        // explicitly handle them here, since default is required we'll
        // increment a metric we can use for tracking this
        break;
      default:
        incrementMetric('asg_closing_actions.unhandled_source_used', {
          source,
        });
        break;
    }
  };

  return handler;
}

export const trackSignupMethodButtonClick = (
  source: string | undefined,
  provider?: AuthenticationProviders
): void => {
  const { anonID: anonymousId } = analytics.getAnalyticsIds();
  analytics.track(SIGNUP_MODAL_SIGNUP_METHOD_BUTTON_CLICKED, {
    ...withIdentifiers(
      SIGNUP_MODAL_SIGNUP_METHOD_BUTTON_CLICKED,
      AnalyticsEntityId.anonymous(anonymousId, 'anonymousId')
    ),
    source,
    provider: provider ?? 'email',
  });
};

interface OpenEmojiReactionAnonModalParams {
  openModal: (options: any) => void;
  emojiReaction: string;
  videoId: string;
  currentTime: number;
  videoOwnerName?: string;
  gate?: Gates;
  onboardingType?: string;
}

/**
 * Opens the anonymous share gate modal for emoji reactions.
 * This centralizes the duplicated modal opening logic across the codebase.
 */
export function openEmojiReactionAnonModal({
  openModal,
  emojiReaction,
  videoId,
  currentTime,
  videoOwnerName = '',
  gate = GATES.REACTION,
  onboardingType = 'modal-onboarding',
}: OpenEmojiReactionAnonModalParams): void {
  const videoTimestamp = Math.round(currentTime);
  const ownerNameText = videoOwnerName ? `${videoOwnerName}` : 'They';

  openModal({
    modalType: getAnonShareGateModalType(),
    options: {
      gate,
      videoOwnerName: ownerNameText,
      emojiReaction,
      emojiReactVideoId: videoId,
      header: 'Add your name to this reaction',
      subheader: `${ownerNameText} sent this Loom instead of a meeting invite. Use async video to stay connected to your team while staying focused on what counts.`,
      tertiaryButtonText: 'Post reaction anonymously',
      tertiaryButtonIcon: ASGTertiaryButtonIcon.React,
      hideModeSwitcher: true,
      source: SignedOutEndOfVideoNudgesEmojiReactions,
      signupParams: {
        anonReaction: emojiReaction,
        anonReactionVideoId: videoId,
        anonReactionTimestamp: videoTimestamp,
        signup_source: SignedOutEndOfVideoNudgesEmojiReactions,
      },
      onboardingType,
      currentVideoTime: videoTimestamp,
    },
  });
}
