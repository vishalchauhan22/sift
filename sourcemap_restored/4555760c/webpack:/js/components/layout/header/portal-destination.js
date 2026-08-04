/* eslint-disable @loomhq/loom/no-js-extension */
import React from 'react';

import { HeaderPortalContext } from './portal-provider';

const HeaderPortalContainer = ({ headerPortalContext }) => {
  const { children } = headerPortalContext;

  return children && <>{children}</>;
};

// eslint-disable-next-line import/no-default-export
export default function HeaderPortalDestination() {
  return (
    <HeaderPortalContext.Consumer>
      {context =>
        context && (
          <HeaderPortalContainer
            headerPortalContext={context.headerPortalContext}
          />
        )
      }
    </HeaderPortalContext.Consumer>
  );
}
