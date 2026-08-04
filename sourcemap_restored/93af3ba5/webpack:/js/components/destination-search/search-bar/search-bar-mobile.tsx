import { DESTINATION_SEARCH_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import React, { useRef } from 'react';

import { IconButton } from '@loomhq/lens';
import { SvgSearch } from '@loomhq/lens/icons/search';

const SearchBarMobileShare = (): JSX.Element | null => {
  const { openModal } = useModals();
  const ref = useRef(null);

  function openSearch(isShortcut) {
    openModal({
      modalType: DESTINATION_SEARCH_MODAL,
      options: {
        isShortcut: Boolean(isShortcut),
        useResponsive: true,
      },
    });
  }

  return (
    <div id="intercom-destination-search-bar" ref={ref}>
      <IconButton
        altText={'Search'}
        icon={<SvgSearch />}
        size="medium"
        onClick={openSearch}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default SearchBarMobileShare;
