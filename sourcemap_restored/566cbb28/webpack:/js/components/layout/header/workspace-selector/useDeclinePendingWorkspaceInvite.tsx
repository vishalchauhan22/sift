import { ErrorSeverities } from '@js/constants/error-severities';

import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import * as logger from '@js/utilities/loggerx';

import { useDeclineWorkspaceInvitationMutation } from './declineWorkspaceInvitation.generated';

export const useDeclinePendingWorkspaceInvite = (): {
  declinePendingWorkspaceInvite: (params: { inviteId: number }) => void;
} => {
  const { showErrorBar } = useErrorBar();

  const [declineWorkspaceInvitationMutation] =
    useDeclineWorkspaceInvitationMutation({
      onError: err => {
        showErrorBar({
          message: 'Error declining workspace invite',
          severity: ErrorSeverities.ERROR,
        });
        logger.warning(err, { message: 'unable to decline workspace invite' });
      },
    });

  const declinePendingWorkspaceInvite = ({ inviteId }) => {
    declineWorkspaceInvitationMutation({
      variables: { inviteId },
      optimisticResponse: {
        __typename: 'Mutation',
        declineWorkspaceInvitation: {
          __typename: 'DeclineInvitationResult',
          success: true,
        },
      },
      update: (cache, { data }) => {
        if (data?.declineWorkspaceInvitation.success) {
          const normalizedId = cache.identify({
            id: inviteId,
            __typename: 'OrganizationInvitation',
          });

          cache.evict({ id: normalizedId });
          cache.gc();
        }
      },
    });
  };

  return { declinePendingWorkspaceInvite };
};
