import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';

import {
  DEFAULT_EMPTY_STATE_CONTENT,
  NO_INVITE_EMPTY_STATE_CONTENT,
} from '../components/empty-state/destination-empty-state/constants';

export const useEmptyStateContent = (): typeof DEFAULT_EMPTY_STATE_CONTENT => {
  const { showInviteButton } = useInvitationCapabilities();
  if (!showInviteButton) {
    return NO_INVITE_EMPTY_STATE_CONTENT;
  }
  return DEFAULT_EMPTY_STATE_CONTENT;
};
