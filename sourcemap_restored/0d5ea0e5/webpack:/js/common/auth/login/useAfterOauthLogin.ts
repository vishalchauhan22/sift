import { ErrorSeverities } from '@js/constants/error-severities';
import { OAUTH_BUTTON_CLICKED } from '@js/constants/events';
import { LOOM_URI, WELCOME } from '@js/constants/routes';

import { usePostComment } from '@js/common/comments/comment-creation/usePostComment';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useModals } from '@js/common/modal-container/useModals';
import {
  ANON_RECORD_A_REPLY,
  ANON_SHARE_GATE_MODAL,
  ASGSource,
} from '@js/common/onboarding';

import { useCreateEmojiReaction } from '@js/common/reactions';
import { VideoPlatform } from '@js/common/video-player';
import {
  COMMENT_POSTED_TOAST,
  EMOJI_REACTED_TOAST,
} from '@js/components/welcome-webapp-simplified/hooks';

import * as logger from '@js/utilities/loggerx';
import { incrementMetric } from '@js/utilities/metrics';

import { getUserChecklist } from '@js/utilities/user';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import * as analytics from '@js/utilities/analytics';
import { setLocalStorageKey } from '@js/utilities/localStorage';
import {
  createAnonRecordingCache,
  updateAnonRecordingOwnership,
} from '@js/utilities/shareVideo';
import { OAuthPopupKeys } from '@loomhq/shared-utilities/constants/authentication';

const {
  SignedOutEndOfVideoNudges,
  SignedOutAiEndOfVideoNudges,
  SignedOutEndOfVideoNudgesEmojiReactions,
  AnonDownloadVideoOnSharePage,
} = ASGSource;

type AnonShareGateAfterOauthParams = {
  provider: OAuthPopupKeys;
  videoId?: string;
};

type AfterOauthLoginParams = {
  videoId?: string;
  addReplyId?: string;
  password: string | null;
  videoCurrentTime?: string;
  repliedToVideoId?: string;
  provider: OAuthPopupKeys;
};

export const useAfterOauthLogin = (
  videoId?: string
): {
  anonShareGateAfterOauthLogin: (
    params: AnonShareGateAfterOauthParams
  ) => Promise<void>;
  highlightValueOfLoomAfterOauthLogin: () => Promise<void>;
  afterOauthLogin: (params: AfterOauthLoginParams) => void;
} => {
  const { showErrorBar } = useErrorBar();
  const { createEmojiReaction } = useCreateEmojiReaction();
  const { options } = useModals();
  const { postComment, postRecordReplyComment } = usePostComment(videoId);

  const afterOauthLogin = async ({
    videoId: recordedReplyVideoId,
    addReplyId,
    password,
    videoCurrentTime,
    repliedToVideoId,
    provider,
  }: AfterOauthLoginParams): Promise<void> => {
    const { data } = await getUserChecklist();
    const redirectUrl = new URL(window.location.href);

    const cacheArgs = {
      replyVideoId: recordedReplyVideoId,
      repliedToVideoId,
      videoCurrentTime,
      addReplyId,
    };

    // create video and user link in redis\
    try {
      await createAnonRecordingCache(cacheArgs);
    } catch (err) {
      showErrorBar({
        message: `There was an error.`,
        severity: ErrorSeverities.ERROR,
      });
      logger.error(
        err,
        {
          message: 'Failed to create a Redis link for anonymous record a reply',
        },
        { feature: Feature.SDKRecorder }
      );
    }

    if (videoCurrentTime) {
      redirectUrl.searchParams.append('videoCurrentTime', videoCurrentTime);
    }

    if (
      data.me.checklist.complete_onboarding &&
      repliedToVideoId &&
      addReplyId
    ) {
      // logging in, post video
      postRecordReplyComment({
        recordedReplyVideoId,
        parentPostId: addReplyId,
        password,
        videoId: repliedToVideoId,
      });

      analytics.track(OAUTH_BUTTON_CLICKED, {
        provider,
        isSignUp: false,
        source: ANON_RECORD_A_REPLY,
      });

      incrementMetric('button.click', {
        context: OAUTH_BUTTON_CLICKED,
        provider,
        isSignUp: false,
        source: ANON_RECORD_A_REPLY,
      });

      try {
        await updateAnonRecordingOwnership();
      } catch (err) {
        showErrorBar({
          message: `There was an error.`,
          severity: ErrorSeverities.ERROR,
        });
        logger.error(
          err,
          {
            message:
              'Failed to transfer video ownership for anonymous record a reply',
          },
          { feature: Feature.SDKRecorder }
        );
      }
    } else {
      if (recordedReplyVideoId) {
        // signing up
        redirectUrl.searchParams.append('replyVideoId', recordedReplyVideoId);
      }

      if (addReplyId) {
        redirectUrl.searchParams.append('addReplyId', addReplyId);
      }

      analytics.track(OAUTH_BUTTON_CLICKED, {
        provider,
        isSignUp: true,
        source: ANON_RECORD_A_REPLY,
      });

      incrementMetric('button.click', {
        context: OAUTH_BUTTON_CLICKED,
        provider,
        isSignUp: true,
        source: ANON_RECORD_A_REPLY,
      });
    }

    window.location.href = redirectUrl.href;
  };

  const anonShareGateAfterOauthLogin = async ({
    provider,
    videoId: shareGateVideoId,
  }: AnonShareGateAfterOauthParams): Promise<void> => {
    const { data } = await getUserChecklist();
    const redirectUrl = new URL(window.location.href.split('?')[0]);
    const {
      comment,
      emojiReaction,
      videoOwnerName,
      source,
      parentPostId,
      onboardingType,
    } = options;

    const hasCompletedOnboarding = data.me.checklist.complete_onboarding;

    if (comment && shareGateVideoId) {
      postComment({
        comment,
        anonUserName: null,
        ...(parentPostId && { parentPostId }),
        videoId: shareGateVideoId,
      });
    }

    if (emojiReaction && shareGateVideoId) {
      const currentVideoTime = options?.currentVideoTime;

      createEmojiReaction({
        type: emojiReaction,
        time: currentVideoTime * 1000,
        videoId: shareGateVideoId,
        placeUsed: VideoPlatform.sharePagePlayer,
      });
    }

    if (!hasCompletedOnboarding) {
      if (onboardingType === 'modal-onboarding') {
        redirectUrl.searchParams.append('resume-anon-signup', 'true');
        window.location.href = redirectUrl.href;

        return;
      }

      switch (source) {
        case SignedOutAiEndOfVideoNudges:
        case SignedOutEndOfVideoNudges: {
          const toastMessageContent = {
            videoOwnerName,
            commentVideoId: shareGateVideoId,
          };

          setLocalStorageKey(
            COMMENT_POSTED_TOAST,
            JSON.stringify(toastMessageContent)
          );

          break;
        }

        case SignedOutEndOfVideoNudgesEmojiReactions:
          {
            const toastMessageContent = {
              videoOwnerName,
              emojiReactVideoId: shareGateVideoId,
            };

            setLocalStorageKey(
              EMOJI_REACTED_TOAST,
              JSON.stringify(toastMessageContent)
            );
          }

          break;

        default:
          break;
      }

      if (source === AnonDownloadVideoOnSharePage) {
        window.location.href = `${LOOM_URI}${WELCOME}?redirect_to_share=${shareGateVideoId}&start_download=true`;

        return;
      }

      window.location.href = `${LOOM_URI}${WELCOME}`;

      return;
    }

    if (hasCompletedOnboarding) {
      analytics.track(OAUTH_BUTTON_CLICKED, {
        provider,
        isSignUp: false,
        source: ANON_SHARE_GATE_MODAL,
      });

      incrementMetric('button.click', {
        context: OAUTH_BUTTON_CLICKED,
        provider,
        isSignUp: false,
        source: ANON_SHARE_GATE_MODAL,
      });

      if (source === AnonDownloadVideoOnSharePage) {
        redirectUrl.searchParams.append('start_download', 'true');
      }
    } else {
      redirectUrl.searchParams.append('resume-anon-signup', 'true');
      analytics.track(OAUTH_BUTTON_CLICKED, {
        provider,
        isSignUp: true,
        source: ANON_SHARE_GATE_MODAL,
      });

      incrementMetric('button.click', {
        context: OAUTH_BUTTON_CLICKED,
        provider,
        isSignUp: true,
        source: ANON_SHARE_GATE_MODAL,
      });
    }

    window.location.href = redirectUrl.href;
  };

  const highlightValueOfLoomAfterOauthLogin = (): Promise<void> => {
    return new Promise<void>(resolve => {
      const redirectUrl = new URL(window.location.href);

      // TODO(highlight-value-of-loom): Add analytics here.
      // analytics.track(OAUTH_BUTTON_CLICKED, {
      //   provider,
      //   isSignUp: true,
      //   source: SHARE_PAGE_RIGHT_PANEL_CTA,
      // });
      //
      // incrementMetric('button.click', {
      //   context: OAUTH_BUTTON_CLICKED,
      //   provider,
      //   isSignUp: true,
      //   source: SHARE_PAGE_RIGHT_PANEL_CTA,
      // });

      window.location.href = redirectUrl.href;
      resolve();
    });
  };

  return {
    anonShareGateAfterOauthLogin,
    highlightValueOfLoomAfterOauthLogin,
    afterOauthLogin,
  };
};
