import { HELP_BUBBLE_EDU_LINK } from '@loomhq/shared-utilities/constants/scopes';
import {
  useCurrentUserCallback,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useHasScope } from '@js/hooks/useHasScopes';

import { cannyIdentifyUser } from './utils';
import {
  CAREERS_LINK,
  DESTINATION_HELP_LINK,
  EDUCATIONAL_RESOURCES_LINK,
  GIVE_FEEDBACK_CANNY_IO_BUTTON,
  TROUBLESHOOTING_LINK,
  WAYS_TO_USE_LOOM_LINK,
  WHATS_NEW_LINK,
} from '../help-menu/constants';

import type { MenuGroup } from './panel/menu';

/**
 * Returns the loom specific menu groups
 * to be displayed in the help widget panel
 */
export const useLoomMenuGroups = (): MenuGroup[] => {
  const updatesLinks = [WHATS_NEW_LINK, CAREERS_LINK];
  const infoLinks = [
    DESTINATION_HELP_LINK,
    WAYS_TO_USE_LOOM_LINK,
    TROUBLESHOOTING_LINK,
  ];

  const isLoggedIn = useIsCurrentUserLoggedIn();
  const handleCannyIoClick = useCurrentUserCallback(
    user => cannyIdentifyUser(user),
    () => {}
  );

  const hasEduLinkScope = useHasScope(HELP_BUBBLE_EDU_LINK);

  if (hasEduLinkScope) {
    infoLinks.splice(2, 0, EDUCATIONAL_RESOURCES_LINK);
  }

  const baseGroups = [
    {
      items: updatesLinks.map(link => ({
        title: link.label,
        href: link.url,
        emoji: link.emoji,
      })),
    },
    {
      items: infoLinks.map(link => ({
        title: link.label,
        href: link.url,
        emoji: link.emoji,
      })),
    },
  ];

  if (!isLoggedIn) {
    return baseGroups;
  }

  return [
    ...baseGroups,
    {
      items: [
        {
          title: GIVE_FEEDBACK_CANNY_IO_BUTTON,
          onClick: handleCannyIoClick,
          emoji: '💡',
        },
      ],
    },
  ];
};
