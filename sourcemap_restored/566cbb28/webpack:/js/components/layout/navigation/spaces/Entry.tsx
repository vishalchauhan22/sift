import cn from 'classnames';

import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { SvgInfo } from '@loomhq/lens/icons/info';
import { SvgLockFill } from '@loomhq/lens/icons/lock-fill';

import { spacesUtils } from '@loomhq/shared-utilities';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { SpacesAvatar } from '@js/common/spaces';
import { useBatchShareVideosToSpacesMutation } from '@js/components/spaces/graphql/BatchShareVideosToSpaces.generated';
import { useMarkSpaceContentAsReadMutation } from '@js/components/spaces/graphql/MarkSpaceContentAsRead.generated';
import { NAVIGATION_ITEM_CLICKED } from '@js/constants/events';
import { SPACES_PAGE } from '@js/constants/routes';
import { VIDEO } from '@js/constants/videosDashboard';

import * as analytics from '@js/utilities/analytics';
import { useVideoDashboard } from '@js/utilities/uppy/useVideoDashboard';

import * as logger from '../../../../utilities/loggerx';
import { trackVideoSpaceVisibilityUpdate } from '../../../../utilities/spaces';
import GetMySpaceMemberships from '../../../spaces/graphql/GetMySpaceMemberships.graphql';
import MenuLink from '../MenuLink';
import styles from '../styles.module.less';
import PrimarySpaceTooltip from './PrimarySpaceTooltip';
const { getSlug } = spacesUtils;

export type Membership = {
  id: string;
  unread: boolean;

  space: {
    id: string;
    name: string;
    privacy: null | string;
    is_primary: boolean;
  };
};

function Entry({
  membership,
  isCollapsed,
  isMobile,
  navBarIsOpenMobile,
}: {
  membership: Membership;
  isCollapsed;
  isMobile;
  navBarIsOpenMobile;
}): JSX.Element | null {
  const [selectedVideos, setSelectedVideos] = useState<{ id; name }[]>([]);
  const { checkedItems } = useVideoDashboard();

  const { setShowConfirmationToast } = useConfirmationToast();
  useEffect(() => {
    setSelectedVideos(checkedItems.filter(item => item.type === VIDEO));
  }, [checkedItems]);

  const [markContentAsRead] = useMarkSpaceContentAsReadMutation({
    refetchQueries: [GetMySpaceMemberships],
  });

  const markSpaceContentAsRead = (membership: Membership) => {
    if (membership.unread) {
      const spaceId = membership.space.id;

      try {
        markContentAsRead({ variables: { spaceId } });
      } catch (err) {
        logger.error(
          err,
          {
            message: 'Error reading content from space',
            spaceId,
          },
          { feature: Feature.Spaces }
        );
      }
    }
  };

  const [batchShareVideosToSpaces] = useBatchShareVideosToSpacesMutation({
    variables: {
      videoIds: selectedVideos.map(v => v.id),
      spaceIds: [membership.space.id],
    },
    onCompleted: data => {
      if (
        data?.batchShareVideosToSpaces?.__typename ===
          'BatchShareVideosToSpacesPayload' &&
        data.batchShareVideosToSpaces.success
      ) {
        let successText;

        if (selectedVideos.length > 1) {
          successText = `${selectedVideos.length} videos were added to ${membership.space.name}`;
        } else {
          successText = `${selectedVideos[0].name} was added to ${membership.space.name}`;
        }

        setShowConfirmationToast(successText);

        trackVideoSpaceVisibilityUpdate({
          videoIds: selectedVideos.map(v => v.id),
          currentSpaceIds: [membership.space.id],
          previousSpaceIds: [],
          source: 'drag-and-drop',
        });
      } else {
        setShowConfirmationToast(
          `Oops! Unable to add your videos to ${membership.space.name}`
        );
      }
    },
    onError: () => {
      setShowConfirmationToast(
        `Oops! Unable to add your videos to ${membership.space.name}`
      );
    },
    refetchQueries: ['GetLooms'],
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: [VIDEO],
    canDrop: (item: { id; type; currentUserCanEdit; name }) =>
      item.type === VIDEO && item.currentUserCanEdit,
    drop: item => {
      // If no items are checked, only a single video is being dragged, so set that as the selected item
      if (!checkedItems.length) {
        setSelectedVideos([item]);
      }

      batchShareVideosToSpaces();
    },
    collect: monitor => ({
      isOver: Boolean(monitor.isOver()),
      canDrop: Boolean(monitor.canDrop()),
    }),
  });

  const getRightIcon = () => {
    if (membership.space.is_primary) {
      return (
        <div className={styles.infoIcon}>
          <SvgInfo />
        </div>
      );
    }

    if (!membership.space.privacy) {
      return <SvgLockFill />;
    }

    return null;
  };

  const menuLinkUrl = `${SPACES_PAGE}/${getSlug(membership.space)}`;
  const isActiveEntry = (location.pathname + '/').startsWith(menuLinkUrl);

  const getMenuLinkBlock = (membership: Membership) => (
    <MenuLink
      key={membership.id}
      icon={<SpacesAvatar spaceName={membership.space.name} />}
      title={membership.space.name}
      url={menuLinkUrl}
      collapsed={isCollapsed}
      isMobileCollapsedNav={isMobile && !navBarIsOpenMobile}
      isReactRouterLink
      shouldDim={!membership.unread}
      rightIcon={getRightIcon()}
      onClick={() => {
        markSpaceContentAsRead(membership);
        analytics.track(NAVIGATION_ITEM_CLICKED, {
          primary_nav_item: 'space',
        });
      }}
    />
  );

  return (
    <article
      ref={dropRef}
      key={membership.id}
      className={cn({
        [styles.dragHovered]: isOver && canDrop,
      })}
    >
      {membership.space.is_primary ? (
        <PrimarySpaceTooltip isDisabled={isCollapsed}>
          {getMenuLinkBlock(membership)}
        </PrimarySpaceTooltip>
      ) : (
        getMenuLinkBlock(membership)
      )}
    </article>
  );
}

// eslint-disable-next-line import/no-default-export
export default Entry;
