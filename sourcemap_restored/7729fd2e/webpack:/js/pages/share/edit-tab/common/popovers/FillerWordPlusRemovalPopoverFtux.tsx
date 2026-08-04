import React from 'react';

import FillerWordsPlusFtuxImg from '@assets/img/filler-words-plus-ftux.png';

import { EditSidebarTooltip } from './EditSidebarTooltip';

export const FillerWordPlusRemovalPopoverFtux = (): JSX.Element => {
  return (
    <EditSidebarTooltip
      isClosable={false}
      betaPillVariant="default-beta"
      img={FillerWordsPlusFtuxImg}
      altText="Add clarity with filler word removal"
      title="Add clarity with filler word removal"
      text="Automatically trim out your rambles, repeats, and unrelated thoughts in addition to your um’s and ah’s."
    />
  );
};
