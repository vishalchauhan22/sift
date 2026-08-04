import { SPACE_EMPTY_STATE_SOURCE } from '@js/constants/spaces';

import { ADD_VIDEO_TO_SPACE_SEARCH_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import React from 'react';

import { Arrange, Button } from '@loomhq/lens';
import { SvgAdd } from '@loomhq/lens/icons/add';

type AddVideoToSpaceSearchButtonType = {
  spaceId?: number;
  spaceName?: string;
  buttonText?: string;
};

const AddVideoToSpaceSearchButton = ({
  spaceId,
  spaceName,
  buttonText,
}: AddVideoToSpaceSearchButtonType): JSX.Element => {
  const { openModal } = useModals();

  return (
    <Arrange width="100%" justifyContent="center">
      <Button
        variant="primary"
        icon={<SvgAdd />}
        onClick={() =>
          openModal({
            modalType: ADD_VIDEO_TO_SPACE_SEARCH_MODAL,
            options: {
              spaceId,
              spaceName,
              analyticsSource: SPACE_EMPTY_STATE_SOURCE,
            },
          })
        }
      >
        {buttonText || 'Add video'}
      </Button>
    </Arrange>
  );
};

// eslint-disable-next-line import/no-default-export
export default AddVideoToSpaceSearchButton;
