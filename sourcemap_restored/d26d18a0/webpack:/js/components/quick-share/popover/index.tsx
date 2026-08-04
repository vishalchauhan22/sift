import {
  SHARE_MODAL_ACL_ADD,
  SHARE_MODAL_OPENED,
  SHARE_SUGGESTION_ACCEPTED,
  SHARE_SUGGESTION_SHOWN,
  VIDEO_SPACE_VISIBILITY_UPDATED,
} from '@js/constants/events';

// eslint-disable-next-line no-restricted-imports
import { useMutation } from '@apollo/client';
import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { SHARE_UI_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ShareModalSource } from '@js/common/share-video/share-modal/enums';
import { VideoCardSpace } from '@js/components/video-card/types';
import _isEqual from 'lodash/isEqual';
import React, { useEffect, useMemo, useState } from 'react';
import * as logger from '@js/utilities/loggerx';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Container, Split, SplitSection, TextButton } from '@loomhq/lens';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import BatchShareVideosToSpaces from '@js/components/spaces/graphql/BatchShareVideosToSpaces.graphql';
import * as analytics from '@js/utilities/analytics';

import { QuickShareBody } from '../QuickShareBody';
import { ShareSpacesButton } from '../ShareSpacesButton';
import useSuggestedSpaces, { SuggestedSpace } from '../useSuggestedSpaces';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

export const QUICK_SHARE_MODAL_VARIANT = 'quick_share';

function makeToastMessage(
  newSpacesAdded: SuggestedSpace[],
  oldSpacesRemoved: SuggestedSpace[],
  success: boolean
) {
  let postMessage;

  let postMessageText;
  let unpostMessageText;

  if (success) {
    postMessageText = 'A video was shared';
    unpostMessageText = 'A video was unshared';
  } else {
    postMessageText = 'Oops! Unable to share a video';
    unpostMessageText = 'Oops! Unable to unshare a video';
  }

  const newSpaceAddedLength = newSpacesAdded.length;

  // TODO: make space name a link
  if (newSpaceAddedLength > 1) {
    postMessage = `${postMessageText} with ${newSpaceAddedLength} Spaces`;
  } else if (newSpaceAddedLength) {
    postMessage = `${postMessageText} to ${newSpacesAdded[0]?.name}`;
  }

  let unpostMessage;

  const oldSpacesRemovedLength = oldSpacesRemoved.length;

  if (oldSpacesRemovedLength > 1) {
    unpostMessage = `${unpostMessageText} with ${oldSpacesRemovedLength} Spaces`;
  } else if (oldSpacesRemovedLength) {
    unpostMessage = `${unpostMessageText} from ${oldSpacesRemoved[0]?.name}`;
  }

  return postMessage && unpostMessage
    ? `${postMessage}\n${unpostMessage}`
    : postMessage || unpostMessage;
}

type QuickSharePopoverProps = {
  videoId: string;
  spaces?: VideoCardSpace[];
  isOpen: boolean;
  setIsOpen: (boolean) => void;
  setVideo?: (updatedVideo) => void;
  source: string;
};

export const QuickSharePopover = (
  props: QuickSharePopoverProps
): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.ShareToSpaceButton}
      errorType={ErrorBoundaryTypes.SILENT}
    >
      <QuickSharePopoverWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};

const QuickSharePopoverWithoutFeatureWrapper = ({
  videoId,
  spaces,
  isOpen,
  setIsOpen,
  setVideo,
  source,
}: QuickSharePopoverProps): JSX.Element | null => {
  const { openModal } = useModals();

  const { featureLoadedRef } = useFeatureWrapper();
  const { setShowConfirmationToast } = useConfirmationToast();

  const refHandler = newRef => {
    featureLoadedRef(newRef);
  };

  const [selectedSpaces, setSelectedSpaces] = useState<SuggestedSpace[]>(
    spaces || []
  );

  useEffect(() => {
    spaces && setSelectedSpaces(spaces);
  }, [spaces]);

  const spaceIdSet = new Set(spaces?.map(space => space.id));
  const selectedSpaceIdSet = new Set(
    selectedSpaces.map(selectedSpace => selectedSpace.id)
  );

  const newSpacesAdded = selectedSpaces.filter(
    selectedSpace => !spaceIdSet.has(selectedSpace.id)
  );
  const oldSpacesRemoved =
    spaces?.filter(space => !selectedSpaceIdSet.has(space.id)) || [];
  // TODO(next author): Move oldSpacesRemovedIds const into useMemo. Because it is defined outside, it causes dependencies of the useMemo where it's called to change on every render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const oldSpacesRemovedIds = new Set(
    oldSpacesRemoved.map(oldSpaceRemoved => oldSpaceRemoved.id)
  );

  const recommendedSpaces = useSuggestedSpaces();

  const recommendedSpaceIds = new Set(
    recommendedSpaces?.map(recommendedSpace => recommendedSpace.id)
  );

  const defaultSpaceIds = new Set(spaces?.map(space => space.id));

  const netNewRecommendedSpaces = recommendedSpaces?.filter(
    recommendedSpace => !defaultSpaceIds.has(recommendedSpace.id)
  );

  useEffect(() => {
    if (isOpen) {
      analytics.track(SHARE_MODAL_OPENED, {
        source,
        contextPagePath: window.location.href,
        modal_variant: QUICK_SHARE_MODAL_VARIANT,
        has_toggle: true,
        ...withIdentifiers(
          SHARE_MODAL_OPENED,
          AnalyticsEntityId.video(videoId, 'video_id')
        ),
      });
    }
  }, [videoId, source, isOpen]);

  const allSpaces = useMemo(() => {
    if (netNewRecommendedSpaces) {
      netNewRecommendedSpaces.forEach(netNewRecommendedSpace => {
        if (!oldSpacesRemovedIds.has(netNewRecommendedSpace.id) && isOpen) {
          analytics.track(SHARE_SUGGESTION_SHOWN, {
            suggestion_type: 'space',
            source: 'share_modal',
            modal_variant: QUICK_SHARE_MODAL_VARIANT,
            ...withIdentifiers(
              SHARE_SUGGESTION_SHOWN,
              AnalyticsEntityId.video(videoId, 'video_id'),
              AnalyticsEntityId.space(
                netNewRecommendedSpace.id,
                'string',
                'suggested_space_id'
              )
            ),
          });
        }
      });
      const spacesVideoIsSharedTo = spaces;

      // show the spaces the video is a part of first,
      // then recommended spaces,
      return [...(spacesVideoIsSharedTo || []), ...netNewRecommendedSpaces];
    }
  }, [spaces, netNewRecommendedSpaces, isOpen, oldSpacesRemovedIds, videoId]);

  // TODO: Replace with autogenerated hook
  const [batchShareVideosToSpaces] = useMutation(BatchShareVideosToSpaces, {
    refetchQueries: [
      'GetLooms',
      'GetSpaceNameAndMembers',
      'GetLoomsForFeedQuery',
    ],
  });
  const sortedSelectedSpaceIds = selectedSpaces
    .map(selectedSpace => selectedSpace.id)
    .sort();
  const sortedDefaultSpaceIds = spaces?.map(space => space.id).sort();

  if (!allSpaces) {
    return null;
  }

  const trackAnalyticsAfterShare = (
    newSpacesToShareTo,
    previousSpacesSharedTo
  ) => {
    newSpacesToShareTo.forEach(space => {
      analytics.track(SHARE_MODAL_ACL_ADD, {
        modal_variant: QUICK_SHARE_MODAL_VARIANT,
        ...withIdentifiers(
          SHARE_MODAL_ACL_ADD,
          AnalyticsEntityId.video(videoId, 'video_id'),
          AnalyticsEntityId.space(space.id || null, 'string', 'space_id')
        ),
      });

      if (recommendedSpaceIds.has(space.id)) {
        analytics.track(SHARE_SUGGESTION_ACCEPTED, {
          suggestion_type: 'space',
          source: 'share_modal',
          modal_variant: QUICK_SHARE_MODAL_VARIANT,
          ...withIdentifiers(
            SHARE_SUGGESTION_ACCEPTED,
            AnalyticsEntityId.video(videoId, 'video_id'),
            AnalyticsEntityId.space(space.id, 'string', 'suggested_space_id')
          ),
        });
      }

      analytics.track(VIDEO_SPACE_VISIBILITY_UPDATED, {
        source,
        modal_variant: QUICK_SHARE_MODAL_VARIANT,
        is_shared: true,
        ...withIdentifiers(
          VIDEO_SPACE_VISIBILITY_UPDATED,
          AnalyticsEntityId.video(videoId, 'video_id'),
          AnalyticsEntityId.space(space.id || null, 'string', 'space_id')
        ),
      });
    });

    previousSpacesSharedTo.forEach(space => {
      analytics.track(VIDEO_SPACE_VISIBILITY_UPDATED, {
        source,
        modal_variant: QUICK_SHARE_MODAL_VARIANT,
        is_shared: false,
        ...withIdentifiers(
          VIDEO_SPACE_VISIBILITY_UPDATED,
          AnalyticsEntityId.video(videoId, 'video_id'),
          AnalyticsEntityId.space(space.id || null, 'string', 'space_id')
        ),
      });
    });
  };

  const onShare = (
    newSpacesToShareTo,
    previousSpacesSharedTo,
    toastMessage
  ) => {
    try {
      batchShareVideosToSpaces({
        variables: {
          videoIds: [videoId],
          spaceIds: newSpacesToShareTo.map(space => space.id),
        },
      });

      if (setVideo) {
        setVideo({
          spaces: newSpacesToShareTo,
        });
      }

      setShowConfirmationToast(toastMessage);
      trackAnalyticsAfterShare(newSpacesToShareTo, previousSpacesSharedTo);
    } catch (e) {
      logger.error(
        e,
        {
          message: 'Error sharing video to spaces',
          newSpacesToShareTo,
          videoId,
        },
        { feature: Feature.Spaces }
      );
    }
  };

  const handleOnShare = () => {
    const toastMessage = makeToastMessage(
      newSpacesAdded,
      oldSpacesRemoved,
      true
    );

    onShare(selectedSpaces, spaces, toastMessage);

    setIsOpen(false);
  };

  return (
    <Container
      backgroundColor="background"
      width="23em"
      borderSide="all"
      radius="large"
      shadow="medium"
      refHandler={refHandler}
    >
      <QuickShareBody
        allSpaces={allSpaces}
        spaces={spaces}
        selectedSpaceIdSet={selectedSpaceIdSet}
        setSelectedSpaces={setSelectedSpaces}
        title="Share video to Spaces"
        onShare={onShare}
      />

      <div className="p:medium borderTop">
        <Split alignItems="flex-end" justifyContent="space-between">
          <SplitSection>
            <Container paddingBottom=".1rem">
              <TextButton
                onClick={() => {
                  openModal({
                    modalType: SHARE_UI_MODAL,
                    options: {
                      source: ShareModalSource.QuickShare,
                      videoId,
                      setVideo,
                    },
                  });
                  setIsOpen(false);
                }}
                className="p:medium c:primary"
                size="small"
                icon={<SvgUsersAdd />}
              >
                More options
              </TextButton>
            </Container>
          </SplitSection>
          <SplitSection>
            <ShareSpacesButton
              areSpacesRemoved={oldSpacesRemoved.length > 0}
              disabled={_isEqual(sortedSelectedSpaceIds, sortedDefaultSpaceIds)}
              onClick={handleOnShare}
            />
          </SplitSection>
        </Split>
      </div>
    </Container>
  );
};
