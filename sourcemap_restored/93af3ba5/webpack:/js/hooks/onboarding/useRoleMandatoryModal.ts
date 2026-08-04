import { ROLE_MANDATORY_MODAL_DISMISSED } from '@js/constants/localStorage';

import { ROLE_MANDATORY_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useEffect } from 'react';

import { getLocalStorageKey } from '@js/utilities/localStorage';

export const useRoleMandatoryModal = (
  isExpRoleQuestionMandatory: boolean,
  userIsLoggedIn: boolean,
  userHasRole: boolean
): void => {
  const { openModal } = useModals();
  const roleMandatoryModalHasBeenDismissed = getLocalStorageKey(
    ROLE_MANDATORY_MODAL_DISMISSED
  );
  const roleMandatoryModalHasNotBeenDismissed =
    roleMandatoryModalHasBeenDismissed === null ||
    roleMandatoryModalHasBeenDismissed === 'false';

  useEffect(() => {
    if (
      isExpRoleQuestionMandatory &&
      userIsLoggedIn &&
      !userHasRole &&
      roleMandatoryModalHasNotBeenDismissed
    ) {
      openModal({ modalType: ROLE_MANDATORY_MODAL });
    }
  }, [
    isExpRoleQuestionMandatory,
    openModal,
    roleMandatoryModalHasNotBeenDismissed,
    userHasRole,
    userIsLoggedIn,
  ]);
};
