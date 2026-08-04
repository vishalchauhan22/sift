import { LARGE_TABLET_MIN_WIDTH } from '@js/constants/breakpoints';

import { MediaQuery } from '@js/common/layout';
import { useVideoPasswordContext } from '@js/common/video-password';
import { useAnonCreatorMode } from '@js/hooks/useAnonCreatorMode';
import { useUserInSameWorkspaceAsItem } from '@js/hooks/workspace';
import pluralize from 'pluralize';

import React, { useMemo, useRef, useState } from 'react';
import { useLayer } from 'react-laag';

import * as loggerx from '@js/utilities/loggerx';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import {
  Align,
  Arrange,
  Button,
  Container,
  Text,
  TextButton,
} from '@loomhq/lens';
import { Feature } from '@loomhq/shared-utilities/constants/product';

import { Avatars, SimpleAvatarType } from './Avatars';
import { useGetViewerInsightsQuery } from './GetViewersInsights.generated';
import { trackModal } from './analytics';

import { ViewerInsightsModal } from './modal';
import { selectViewersInsightsData } from './selectViewersInsightsData';

type ViewerInsightsProps = {
  buttonHasBorder?: boolean;
  videoId: string;
};
type InnerViewerInsightsProps = {
  viewerInfoForAvatars: SimpleAvatarType[];
  totalViews: number;
};

function ViewerInsightsWithoutFeatureWrapper({
  buttonHasBorder,
  videoId,
}: ViewerInsightsProps): JSX.Element | null {
  const { featureLoadedRef } = useFeatureWrapper();

  const { password } = useVideoPasswordContext();

  const { data, loading } = useGetViewerInsightsQuery({
    variables: { videoId, password },
    onError: error => {
      // handled by the feature wrapper
      throw error;
    },
    onCompleted: data => {
      if (data?.getVideo?.__typename !== 'RegularUserVideo') {
        loggerx.warning(
          'Invalid viewer insights data',
          {
            videoId,
          },
          {
            feature: Feature.EngagementInsights,
          }
        );
        throw new Error('Invalid viewer insights data');
      }
    },
  });

  const {
    totalViews,
    viewerInfoForAvatars,
    organizationId,
    currentUserIsOwner,
    showAnalyticsToViewer,
  } = useMemo(() => selectViewersInsightsData(data), [data]);

  const isViewerInSameWorkspaceAsVideo =
    useUserInSameWorkspaceAsItem(organizationId);
  const anonCreatorMode = useAnonCreatorMode(videoId);
  const isCreator = anonCreatorMode || currentUserIsOwner;

  const canDisplayInsights = showAnalyticsToViewer || isCreator;
  const canUserViewFullInsights =
    (isViewerInSameWorkspaceAsVideo && showAnalyticsToViewer) || isCreator;

  const modalFirstOpenTracked = useRef(false);

  const [modalShown, setModalShown] = useState(false);

  const closeModal = () => toggleModal(false);

  const toggleModal = setShown => {
    if (setShown && !modalFirstOpenTracked.current) {
      trackModal(videoId);
      modalFirstOpenTracked.current = true;
    }

    setModalShown(setShown);
  };

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: modalShown,
    triggerOffset: 4,
    onOutsideClick: closeModal,
    auto: true,
    possiblePlacements: ['bottom-center', 'top-center'],
  });

  const modalLayerProps = {
    ...layerProps,
    style: {
      ...layerProps.style,
      zIndex: 1000,
    },
  };

  if (loading || !canDisplayInsights) {
    return null;
  }

  if (!canUserViewFullInsights) {
    return (
      <div ref={featureLoadedRef}>
        <MediaQuery query={`(min-width: ${LARGE_TABLET_MIN_WIDTH}px)`}>
          <TotalViewLabel totalViews={totalViews} />
        </MediaQuery>
      </div>
    );
  }

  return (
    <div ref={featureLoadedRef}>
      <MediaQuery query={`(min-width: ${LARGE_TABLET_MIN_WIDTH}px)`}>
        <div ref={triggerProps.ref}>
          {buttonHasBorder ? (
            <Button
              onKeyDown={e => {
                if (e.key === 'Enter' || e.code === 'Space') {
                  e.preventDefault();
                  toggleModal(!modalShown);
                }
              }}
              onClick={() => toggleModal(!modalShown)}
              // TODO for Manda: remove custom styles after viz cohesion experiment runs
              style={{
                padding: 'var(--lns-space-xsmall)',
                height: 'fit-content',
              }}
            >
              <SmallViewerInsights
                viewerInfoForAvatars={viewerInfoForAvatars}
                totalViews={totalViews}
              />
            </Button>
          ) : (
            <TextButton
              onKeyDown={e => {
                if (e.key === 'Enter' || e.code === 'Space') {
                  e.preventDefault();
                  toggleModal(!modalShown);
                }
              }}
              onClick={() => toggleModal(!modalShown)}
              // TODO for Manda: remove custom styles after viz cohesion experiment runs
              style={{
                padding: 'var(--lns-space-xsmall)',
                height: 'fit-content',
              }}
            >
              <SmallViewerInsights
                viewerInfoForAvatars={viewerInfoForAvatars}
                totalViews={totalViews}
              />
            </TextButton>
          )}
        </div>
      </MediaQuery>
      {renderLayer(
        <div className={modalShown ? 'block' : 'none'} {...modalLayerProps}>
          <ViewerInsightsModal closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}

const SmallViewerInsights = ({
  viewerInfoForAvatars,
  totalViews,
}: InnerViewerInsightsProps) => {
  const displayAvatars = viewerInfoForAvatars.length > 0;

  return (
    <Container
      height={3.5}
      paddingRight={displayAvatars ? 'xsmall' : 'small'}
      paddingLeft={displayAvatars ? '0' : 'small'}
    >
      <Align alignment="center">
        <Arrange>
          {displayAvatars ? <Avatars avatars={viewerInfoForAvatars} /> : null}
          {totalViews} {pluralize('view', Number(totalViews))}
        </Arrange>
      </Align>
    </Container>
  );
};

const TotalViewLabel = ({ totalViews }: { totalViews: number }) => {
  return (
    <Container paddingX="small">
      <Text fontWeight="bold">
        {totalViews} {pluralize('view', Number(totalViews))}
      </Text>
    </Container>
  );
};

export const ViewerInsights = (props: ViewerInsightsProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.EngagementInsights}
      errorType={ErrorBoundaryTypes.SILENT}
      additionalLoggingValues={{ version: 'views button' }}
    >
      <ViewerInsightsWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};
