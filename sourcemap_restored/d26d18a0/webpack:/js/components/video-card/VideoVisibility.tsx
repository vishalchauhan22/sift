import cn from 'classnames';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
import { QuickSharePopover } from '@js/components/quick-share/popover';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { useHasScope } from '@js/hooks/useHasScopes';

import React, { useEffect, useState } from 'react';
import { useLayer } from 'react-laag';
import ResizeObserver from 'resize-observer-polyfill';

import { isFromPublicSharePage } from '@js/utilities/url';

import { Arrange, Icon, Text } from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';

import {
  ROLLOUT_COMMUNITY_LOOMS,
  ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
} from '@loomhq/shared-utilities/constants/featureFlag';
import { VIDEO_PUBLISH_ACCESS } from '@loomhq/shared-utilities/constants/scopes';
import { VideoVisibility as VideoVisibilityEnum } from '@loomhq/shared-utilities/constants/visibility';

import styles from './styles.module.css';
import { VideoVisibilityVideo } from './types';

const VisibilityMetaData = ({
  text,
  isShared,
  textSize,
  position = 'left',
  color,
  shouldShowDropdownIcon = true,
}: {
  text: string | null;
  isShared: boolean;
  textSize: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
  position?: 'left' | 'right';
  color?: string;
  shouldShowDropdownIcon?: boolean;
}) => {
  if (!text) {
    return null;
  }

  if (!color) {
    color = isShared ? 'bodyDimmed' : 'primary';
  }

  return (
    <>
      {position === 'left' && (
        <Icon icon={<SvgUsersAdd />} size="2.25" color={color} />
      )}

      <Text color={color} size={textSize} hasEllipsis>
        {text}
      </Text>
      {position === 'right' && shouldShowDropdownIcon && (
        <Icon icon={<SvgChevronDown />} size="1.5" />
      )}
    </>
  );
};

type VideoVisibilityProps = {
  video: VideoVisibilityVideo;
  textSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
  // onVisibilityUpdate is a callback to execute once the video visibility has updated
  onVisibilityUpdate?: (visibility: VideoVisibilityEnum) => void;
  context?: string;
  setHasActiveHoverState?: (hasActiveHoverState: boolean) => void;
  setVideo?: (updatedVideo) => void;
};

export const VideoVisibility = ({
  video,
  textSize = 'medium',
  setHasActiveHoverState,
  setVideo,
}: VideoVisibilityProps): React.ReactElement | null => {
  const [isVisibilityPopoverOpen, setIsVisibilityPopoverOpen] = useState(false);
  const {
    id,
    currentUserCanEdit,
    spaces = [],
    organization_id,
    isCommunityLoom = false,
  } = video;
  const { selectedWorkspace: currentWorkspace } = useGetWorkspaceMemberships();

  const isSharePage = isFromPublicSharePage().fromPublicSharePage;
  const numPublishedSpaces = Number(spaces.length);
  const userIsInSameWorkspace = currentWorkspace?.id == organization_id;

  const communityLoomsEnabled = useFlagIsActivated({
    flag: ROLLOUT_COMMUNITY_LOOMS,
    activationValues: ROLLOUT_COMMUNITY_LOOMS_VARIANTS,
    eligibilityPreCheckFunction: () => {
      if (isCommunityLoom) {
        return { pass: true };
      }

      return {
        pass: false,
        failReason: 'Ineligible: video is not a community loom.',
      };
    },
  });

  let position;
  let color;

  // We only want to show community looms related copy if the video is posted
  // to the community AND the community flag is on
  const isCommunityLoomEnabled = isCommunityLoom && communityLoomsEnabled;

  const isPublishedSomewhere =
    Boolean(numPublishedSpaces) || isCommunityLoomEnabled;

  useEffect(() => {
    setHasActiveHoverState && setHasActiveHoverState(isVisibilityPopoverOpen);
  }, [setHasActiveHoverState, isVisibilityPopoverOpen]);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen: isVisibilityPopoverOpen,
    ResizeObserver,
    placement: 'bottom-start',
    auto: true,
    onOutsideClick: () => setIsVisibilityPopoverOpen(false),
  });

  const hasPublishAccess = useHasScope(VIDEO_PUBLISH_ACCESS);

  const showDropDownIcon = currentUserCanEdit && hasPublishAccess;

  // wait for the community feature flag value to be resolved
  if (communityLoomsEnabled === undefined) {
    return null;
  }

  // On the share page there should be no visibility metadata or cta if the video is not
  // published anywhere and the user does not have edit access
  if (isSharePage && !isPublishedSomewhere && !currentUserCanEdit) {
    return null;
  }

  let visibilityText;
  let isShared = true;

  if (!userIsInSameWorkspace) {
    // Users not in the same workspace as the video should never see any visibility metadata other
    // than community-related information
    if (!isCommunityLoomEnabled) {
      return null;
    }

    visibilityText = (
      <VisibilityMetaData
        text="Loom's Community"
        isShared={true}
        textSize={textSize}
        shouldShowDropdownIcon={showDropDownIcon}
      />
    );
  } else {
    let metaText: string | null;

    switch (numPublishedSpaces) {
      case 0:
        if (isCommunityLoomEnabled) {
          metaText = "Loom's Community";
        } else if (currentUserCanEdit) {
          metaText = 'Not shared';
          isShared = false;
          position = 'right';
          color = 'bodyDimmed';
        } else {
          // return null so that the user name and time created can be centered on the parent component
          return null;
        }

        break;
      case 1:
        metaText = isCommunityLoomEnabled
          ? '1 Space and the Community'
          : `${spaces[0].name ?? '1 Space'}`;

        break;
      default:
        metaText = isCommunityLoomEnabled
          ? `${numPublishedSpaces} Spaces and the Community`
          : `${numPublishedSpaces} Spaces`;
    }

    visibilityText = (
      <VisibilityMetaData
        text={metaText}
        isShared={isShared}
        textSize={textSize}
        position={position}
        color={color}
        shouldShowDropdownIcon={showDropDownIcon}
      />
    );
  }

  return (
    <>
      <button
        className={cn(styles.visibilityButton)}
        {...triggerProps}
        disabled={!showDropDownIcon}
        onClick={() =>
          showDropDownIcon &&
          setIsVisibilityPopoverOpen(!isVisibilityPopoverOpen)
        }
      >
        <Arrange gap="xsmall">{visibilityText}</Arrange>
      </button>

      {isVisibilityPopoverOpen &&
        renderLayer(
          <span className={styles.visibilityCardNewNav} {...layerProps}>
            <QuickSharePopover
              videoId={id}
              spaces={spaces}
              isOpen={isVisibilityPopoverOpen}
              setIsOpen={setIsVisibilityPopoverOpen}
              source="shared_with"
              setVideo={setVideo}
            />
          </span>
        )}
    </>
  );
};
