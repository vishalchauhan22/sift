import React from 'react';
import { PostOfficeProvider } from '@atlassian/post-office-context';

// Note: the only functional part of <PostOfficeBaseProvider> is the env
// setting, which determines which path nested <Placement> components make
// requests to (see comment below).
// Typically in Atlassian products, the Post Office components would make
// direct requests to the Post Office API. However, the Loom webapp uses
// a proxy in the Loom server, so all we need to do here is ensure that
// the requests are made to the correct path.

// As long as Placement components are nested within <PostOfficeBaseProvider>,
// they will have access to the Post Office context, i.e. be directed to the
// correct Post Office API proxy.
export const PostOfficeBaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <PostOfficeProvider
      context={{
        current: {
          // These are no-op values; they end up set as params for the requests to
          // /gateway/api/post-office/api/v1/placements/:placementId made by
          // Placement components. But since we are using a proxy in the Loom server,
          // we are setting these params in the dedicated route handler.
          locale: 'UNKNOWN',
          product: 'loom',
          workspaceAri: 'no-workspace-ari-available',
        },
      }}
      // The env value determines the path to the Post Office API endpoint;
      // however, since we are using a proxy in the Loom server, this should
      // be static so that requests from Placements are always made to
      // /gateway/api/post-office/api/v1/placements/:placementId.
      environment={{ env: 'staging' }}
    >
      {children}
    </PostOfficeProvider>
  );
};
