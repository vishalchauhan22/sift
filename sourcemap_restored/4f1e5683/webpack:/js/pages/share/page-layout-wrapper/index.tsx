import { LegacyErrorBoundary } from '@js/common/error-management';
import { Layout } from '@js/components/layout';
import React from 'react';

import { ErrorMarkers } from '@js/utilities/rum/constants';

import { Feature } from '@loomhq/shared-utilities/constants/product';

type LayoutWrapperProps = {
  children: React.ReactNode;
  useAnonymousNavigation: boolean;
  videoId: string;
};

export const LayoutWrapper = ({
  children,
  useAnonymousNavigation,
  videoId,
}: LayoutWrapperProps): JSX.Element => {
  return (
    <>
      {/* Div is necessary since the Layout component is a fragment */}
      <div>
        <Layout
          useAnonymousNavigation={useAnonymousNavigation}
          mainContentHasFullWidth
          isShareVideo
          videoId={videoId}
        >
          <LegacyErrorBoundary
            name={ErrorMarkers.ShareVideoIndexSharedErrorBoundary}
            feature={Feature.SharePage}
          >
            {children}
          </LegacyErrorBoundary>
        </Layout>
      </div>
    </>
  );
};
