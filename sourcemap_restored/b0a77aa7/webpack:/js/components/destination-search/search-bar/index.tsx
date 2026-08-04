import { SMALL_TABLET_MAX_WIDTH } from '@js/constants/breakpoints';

import React from 'react';
import { isFromPublicSharePage } from '@js/utilities/url';

import { useMedia } from '@loomhq/lens';

import { reactLazyRetry } from '../../../utilities/reactLazyRetry';

const SearchBarMobileShare = reactLazyRetry(
  () =>
    import(/* webpackChunkName: "SearchBarMobileShare" */ './search-bar-mobile')
);

const SearchBarWeb = reactLazyRetry(
  () => import(/* webpackChunkName: "SearchBarWeb" */ './search-bar-web')
);

const SearchBarFallback = <div style={{ height: '2.5rem' }}></div>;

const LazySearchBarWrapper = (): JSX.Element | null => {
  return (
    <React.Suspense fallback={SearchBarFallback}>
      <SearchBarWrapper />
    </React.Suspense>
  );
};
const SearchBarWrapper = () => {
  const isSharePage = isFromPublicSharePage().fromPublicSharePage;
  const isMobile = useMedia(
    [`(max-width: ${SMALL_TABLET_MAX_WIDTH}px)`],
    [true],
    false
  );

  if (isSharePage && isMobile) {
    return <SearchBarMobileShare />;
  }

  return <SearchBarWeb />;
};

// eslint-disable-next-line import/no-default-export
export default LazySearchBarWrapper;
