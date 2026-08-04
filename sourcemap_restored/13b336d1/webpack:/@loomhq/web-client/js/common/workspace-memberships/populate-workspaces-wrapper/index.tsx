import { LoggedInOnly } from '@js/common/current-user';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
import React from 'react';

type PopulateWorkspacesWrapperProps = {
  children: React.ReactNode;
};

export const PopulateWorkspacesWrapper = ({
  children,
}: PopulateWorkspacesWrapperProps): JSX.Element => {
  return (
    <LoggedInOnly orElse={<>{children}</>}>
      <PopulateWorkspaces>{children}</PopulateWorkspaces>
    </LoggedInOnly>
  );
};

const PopulateWorkspaces = ({ children }: PopulateWorkspacesWrapperProps) => {
  useGetWorkspaceMemberships();

  return <>{children}</>;
};
