import { EMAIL_LOGIN_FAILED } from '@js/constants/events';
import * as routes from '@js/constants/routes';

import { usePostComment } from '@js/common/comments/comment-creation/usePostComment';
import { useModals } from '@js/common/modal-container/useModals';
import { useCreateEmojiReaction } from '@js/common/reactions';
import { usePlayer, VideoPlatform } from '@js/common/video-player';
import * as analytics from '@js/utilities/analytics';
import * as auth from '@js/utilities/auth';
import * as extension from '@js/utilities/extension';
import isUnsafeRedirectUrl from '@js/utilities/isUnsafeRedirectUrl';
import { jsonParseOrDefault } from '@js/utilities/json/safe-json-parse';
import * as logger from '@js/utilities/loggerx';
import {
  createAnonRecordingCache,
  updateAnonRecordingOwnership,
} from '@js/utilities/shareVideo';
import { getParam } from '@js/utilities/url';
import { requestAcceptWorkspaceInvite } from '@js/utilities/workspace';

import {
  STATUS_FORBIDDEN,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_MODIFIED,
} from '@loomhq/shared-utilities/constants/http';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { AppSource } from '@loomhq/shared-utilities/types/analytics';
import { useLoginStore } from '@js/common/auth/use-login-store';

const ACCOUNT_IS_SSO =
  'This email belongs to a Company account. Speak with your administrator about provisioning a Loom account for this email.';

const LOGIN_INCORRECT_ERROR =
  'Your login information was incorrect. Please ' + 'check and try again.';
const SERVER_ERROR =
  'Oops! Something went wrong on our end. ' + 'Please try that again.';

type logInUserParams = {
  email: string;
  password: string;
  redirectURL: string;
  appSource: AppSource;
  orgToken?: string;
  videoId?: string;
};

export const useLogInUser = (
  videoId?: string
): {
  logInUser: (params: logInUserParams) => Promise<void>;
} => {
  const { options } = useModals();
  const { postComment, postRecordReplyComment } = usePostComment(videoId);
  const { createEmojiReaction } = useCreateEmojiReaction();
  const { updateLoginIsFetching, updateLoginPlainError } = useLoginStore();
  // This hook might be invoked in a context where a videoId is not available
  // We default to an empty string which will return an undefined player object
  const player = usePlayer(videoId ?? '');

  const logInUser = async ({
    email,
    password,
    redirectURL,
    orgToken,
    videoId,
    appSource,
  }: logInUserParams): Promise<void> => {
    updateLoginIsFetching(true);

    const response = await auth.login(email, password, appSource);

    // if login server response is ok, proceed with login

    if (response.ok || response.status === STATUS_NOT_MODIFIED) {
      const responseText = await response.text();
      const { forIos } = jsonParseOrDefault<{
        forIos?: boolean;
      }>(responseText, {});

      const {
        recordedReplyVideoId,
        addReplyId,
        comment: anonComment,
        parentPostId,
        currentVideoTime,
        emojiReaction: anonEmojiReaction,
        emojiReactVideoId,
      } = options;

      const videoCurrentTime = player?.currentTime;
      const repliedToVideoId = videoId;

      if (recordedReplyVideoId && repliedToVideoId) {
        await createAnonRecordingCache({
          replyVideoId: recordedReplyVideoId,
          repliedToVideoId,
          videoCurrentTime,
          addReplyId,
        });

        postRecordReplyComment({
          recordedReplyVideoId,
          parentPostId: addReplyId,
          password,
          videoId,
        });

        await updateAnonRecordingOwnership();
      }

      if (anonComment && videoId) {
        postComment({
          comment: anonComment,
          ...(parentPostId && { parentPostId }),
          anonUserName: null,
          videoId,
        });
      }

      if (anonEmojiReaction) {
        createEmojiReaction({
          type: anonEmojiReaction,
          time: currentVideoTime * 1000,
          videoId: emojiReactVideoId,
          placeUsed: VideoPlatform.sharePagePlayer,
        });
      }

      // If users are coming from an invite link, accept the invite
      if (orgToken) {
        try {
          await requestAcceptWorkspaceInvite(orgToken);
        } catch (err) {
          logger.error(
            err,
            {
              message: 'TeamInvite: Unable to accept invite after login',
              orgToken,
            },
            {
              feature: Feature.Invites,
            }
          );
        }
      }

      updateLoginIsFetching(false);
      extension.signalExtensionLogin(() => {
        if (forIos) {
          window.location.href = '/deeplink-mobile';

          return;
        }

        let cameFrom = getParam('redirect_after') || redirectURL;

        if (cameFrom) {
          if (isUnsafeRedirectUrl(cameFrom)) {
            cameFrom = '/';
          }

          // if they came from somewhere, send them back there
          window.location.href = cameFrom;
        } else {
          window.location.href = routes.ROOT_PAGE;
        }
      });

      return;
    }

    // if login server response is not ok, show error on login form

    updateLoginIsFetching(false);

    const responseStatus = response.status;
    let responseText = '';

    if (!response.bodyUsed) {
      responseText = await response.text();
    }

    if (responseStatus === STATUS_UNAUTHORIZED) {
      analytics.track(EMAIL_LOGIN_FAILED, {
        reason: 'incorrect_login',
      });

      updateLoginPlainError(responseText || LOGIN_INCORRECT_ERROR);
    } else if (responseStatus === STATUS_FORBIDDEN) {
      analytics.track(EMAIL_LOGIN_FAILED, {
        reason: 'account_must_sso',
      });

      updateLoginPlainError(responseText || ACCOUNT_IS_SSO);
    } else {
      analytics.track(EMAIL_LOGIN_FAILED, {
        reason: 'unknown',
      });
      updateLoginPlainError(SERVER_ERROR);
    }
  };

  return {
    logInUser,
  };
};
