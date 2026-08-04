import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoContext } from '@js/common/video-player';

import { EmailGatingSetting } from '@loomhq/shared-utilities/constants/emailGating';

import { useDidPassEmailGateModal } from './useDidPassEmailGateModal';

export const useIsEmailGatingIncomplete = (): boolean => {
  const {
    video: { emailGateVideoType },
  } = useVideoContext();

  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { anonUserName } = useAnonUserName();

  // We pull whether the user has passed the gate from zustand
  // This is necessary since user may have dismissed the soft gate without adding anonUserName
  const { didPassEmailGateModal } = useDidPassEmailGateModal();

  const doesVideoHaveEmailGate =
    emailGateVideoType === EmailGatingSetting.Hard ||
    emailGateVideoType === EmailGatingSetting.Soft;

  const isEmailGatingIncomplete =
    !isLoggedIn &&
    doesVideoHaveEmailGate &&
    anonUserName === '' &&
    !didPassEmailGateModal;

  return isEmailGatingIncomplete;
};
