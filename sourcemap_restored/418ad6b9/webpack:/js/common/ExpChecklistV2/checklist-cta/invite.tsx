import { GET_STARTED_CHECKLIST_INVITE_TEAMMATE_CLICKED } from '@js/constants/events';

import { TEAM_INVITE_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import React from 'react';

import { Button, Spacer, Text } from '@loomhq/lens';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';
import * as analytics from '@js/utilities/analytics';
import { CHECKLIST_INVITE_SOURCE } from '@loomhq/shared-utilities/constants/organizationRoles';

import { ChecklistV2DisplayContext } from '../types';

export const InviteCta = ({
  displayContext,
  buttonSize = 'medium',
}: {
  displayContext: ChecklistV2DisplayContext | null;
  buttonSize?: 'medium' | 'small';
}): JSX.Element | null => {
  const { openModal } = useModals();
  const { showInviteButton } = useInvitationCapabilities();

  if (!showInviteButton) {
    return null;
  }
  return (
    <>
      <Text color={'bodyDimmed'}>
        Loom is better when you know who you’re working with. Invite your team
        for free!
      </Text>
      <Spacer bottom="small" />
      <Button
        hasFullWidth={true}
        size={buttonSize}
        icon={<SvgUsersAdd />}
        onClick={() => {
          analytics.track(GET_STARTED_CHECKLIST_INVITE_TEAMMATE_CLICKED, {
            displayContext,
          });
          openModal({
            modalType: TEAM_INVITE_MODAL,
            options: {
              inviteSource: CHECKLIST_INVITE_SOURCE,
            },
          });
        }}
      >
        Invite teammates
      </Button>
    </>
  );
};
