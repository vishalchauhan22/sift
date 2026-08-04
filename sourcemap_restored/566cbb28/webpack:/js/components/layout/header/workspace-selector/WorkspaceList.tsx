import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships/use-get-workspace-memberships';
import WorkspaceLogo from '@js/components/workspace-logo';
import React from 'react';

import { goToWorkspace } from '@js/utilities/workspace';

import { Layout, Text } from '@loomhq/lens';

import styles from './styles.module.less';

import type { FormattedWorkspaceMembership } from '@js/common/workspace-memberships/use-get-workspace-memberships';

interface WorkspaceListProps {
  selectedWorkspace: Pick<FormattedWorkspaceMembership, 'id'>;
  hideSections?: boolean;
  logoSize?: number;
}

export const WorkspaceList: React.FC<
  React.PropsWithChildren<WorkspaceListProps>
> = ({
  selectedWorkspace,
  hideSections = false,
  logoSize = 4,
}: WorkspaceListProps) => {
  const { data: workspaces } = useGetWorkspaceMemberships();
  const filteredWorkspaces = workspaces.filter(
    workspace => workspace.id !== selectedWorkspace.id
  );

  if (filteredWorkspaces.length === 0) {
    return null;
  }

  return (
    <div className={hideSections ? '' : styles.workspacesListSection}>
      {filteredWorkspaces.map(workspace => {
        const { id, name, members } = workspace;

        return (
          // TODO(next author): Either convert anchor into <button> if the onClick is an action or appropriately map a href and add text between the anchor tags if it's a link so that we are following semantic, accessible practices.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions,  jsx-a11y/anchor-is-valid
          <a
            className={styles.workspaceItem}
            key={id}
            onClick={() => {
              goToWorkspace(id);
            }}
          >
            <Layout gap={1} alignment="center">
              <Layout.Section width="auto">
                <WorkspaceLogo size={logoSize} workspace={workspace} />
              </Layout.Section>
              <Layout.Section className={styles.workspaceInfoSection}>
                <Text hasEllipsis fontWeight="bold">
                  {name}
                </Text>
                <Text hasEllipsis size="body-sm" color="bodyDimmed">
                  {members.toLocaleString('en-US')}
                  {members > 1 ? ' members' : ' member'}
                </Text>
              </Layout.Section>
            </Layout>
          </a>
        );
      })}
    </div>
  );
};
