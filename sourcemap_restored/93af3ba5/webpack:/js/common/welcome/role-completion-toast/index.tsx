import { useRoleMandatoryModalHasBeenClosed } from '@js/common/onboarding/UseRoleMandatoryModalHasBeenClosed';
import React from 'react';

import { Toast } from '@loomhq/lens';

export const RoleCompletionToast = (): JSX.Element => {
  const {
    setRoleMandatoryModalHasBeenClosed,
    roleMandatoryModalHasBeenClosed,
  } = useRoleMandatoryModalHasBeenClosed();

  return (
    <Toast
      isOpen={roleMandatoryModalHasBeenClosed}
      onCloseClick={() => setRoleMandatoryModalHasBeenClosed(false)}
    >
      Your role has been updated!
    </Toast>
  );
};
