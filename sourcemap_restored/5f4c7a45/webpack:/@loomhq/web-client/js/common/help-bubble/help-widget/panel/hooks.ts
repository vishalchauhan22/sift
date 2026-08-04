import { useMemo } from 'react';
import {
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_ENTERPRISE,
} from '../../../../../../../projects/libraries/shared-utilities/src/constants/workspacePlans';

import {
  SelectedWorkspaceType,
  useGetSelectedWorkspace,
} from '@js/hooks/workspace-basic';
import { MenuGroup } from './menu';

import { useFeatureFlagValue } from '@js/hooks/featureFlag';
import {
  FEATURE_GATES,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import { GIVE_FEEDBACK_CANNY_IO_BUTTON } from '../../help-menu/constants';

// Helper function to check if the workspace type is within the provided types
const isWorkspaceTypeIn = (
  selectedWorkspace: Partial<SelectedWorkspaceType> | null | undefined,
  types: string[]
): boolean => {
  return Boolean(
    selectedWorkspace &&
      typeof selectedWorkspace.type === 'string' &&
      types.includes(selectedWorkspace.type)
  );
};

// Function to determine if the view toggle should always be visible
const shouldAlwaysSeeViewToggle = (
  selectedWorkspace: Partial<SelectedWorkspaceType> | null | undefined
): boolean => {
  return isWorkspaceTypeIn(selectedWorkspace, [
    WORKSPACE_PLAN_BUSINESS,
    WORKSPACE_PLAN_ENTERPRISE,
  ]);
};

/**
 * Returns true if the user is in a paid workspace (business or enterprise)
 */
export const useShouldToggleAlwaysBeVisible = (): boolean => {
  const selectedWorkspace: Partial<SelectedWorkspaceType> =
    useGetSelectedWorkspace();
  return useMemo(
    () => shouldAlwaysSeeViewToggle(selectedWorkspace),
    [selectedWorkspace]
  );
};

// Function to determine if the user is an enterprise user
const isEnterpriseUser = (
  selectedWorkspace: Partial<SelectedWorkspaceType> | null | undefined
): boolean => {
  return isWorkspaceTypeIn(selectedWorkspace, [WORKSPACE_PLAN_ENTERPRISE]);
};

/**
 * Returns true if the user is in an enterprise workspace
 */
export const useIsEnterpriseUser = (): boolean => {
  const selectedWorkspace: Partial<SelectedWorkspaceType> =
    useGetSelectedWorkspace();
  return isEnterpriseUser(selectedWorkspace);
};

export const useCsmWidgetMenuGroups = (
  menuGroups: MenuGroup[],
  createNewChat: () => void,
  openSupportForm: () => void
): MenuGroup[] => {
  const isJacMigrationGiveFeedbackEnabled = useFeatureFlagValue(
    FEATURE_GATES.ROLLOUT_LOOM_JAC_MIGRATION_GIVE_FEEDBACK,
    ControlType.STATSIG_FEATURE_GATE
  );

  const baseMenuGroups = [
    {
      items: [
        {
          title: 'New Chat',
          onClick: createNewChat,
          emoji: '💬',
        },
      ],
    },
    ...menuGroups,
  ];

  if (isJacMigrationGiveFeedbackEnabled) {
    return [
      // remove old Give Feedback item
      ...baseMenuGroups.filter(
        group => group.items[0].title !== GIVE_FEEDBACK_CANNY_IO_BUTTON
      ),
      {
        items: [
          {
            title: 'Give feedback', // lowercase second string to match other menu items
            onClick: openSupportForm,
            emoji: '💡',
          },
        ],
      },
    ];
  }

  return baseMenuGroups;
};
