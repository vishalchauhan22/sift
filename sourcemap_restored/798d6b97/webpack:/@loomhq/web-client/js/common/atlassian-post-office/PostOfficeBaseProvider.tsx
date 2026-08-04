import React from 'react';
import { PostOfficeProvider } from '@atlassian/post-office-context';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { LoomWorkspaceAri } from '@atlassian/ari/loom';

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
  const selectedWorkspace = useGetSelectedWorkspace();
  const workspaceSiteId = selectedWorkspace?.site_id;
  const workspaceActivationId = selectedWorkspace?.activation_id;
  const workspaceAri =
    workspaceSiteId && workspaceActivationId
      ? LoomWorkspaceAri.create({
          siteId: workspaceSiteId,
          activationId: workspaceActivationId,
        })
      : null;

  // WorkspaceAri is required for the Post Office Provider to work.
  if (!workspaceAri || !workspaceSiteId) {
    return <>{children}</>;
  }

  return (
    <PostOfficeProvider
      context={{
        current: {
          /**
           * locale and product are also set in the Post Office Proxy provider.
           * The values here are set to astisfy types, as well as set defaults to make migration to
           * Stargate easier in the future.
           *
           * workspaceAri and tenantId are passed through, and must be accurate here.
           */
          locale: 'en-US',
          product: 'loom',
          workspaceAri: workspaceAri.toString(),
          tenantId: workspaceSiteId,
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
