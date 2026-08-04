import './index.css';

import {
  CALENDLY_PROFILE_PAGE_VIEWED,
  CALENDLY_DATE_AND_TIME_SELECTED,
  CALENDLY_EVENT_TYPE_VIEWED,
  CALENDLY_EVENT_SCHEDULED,
  CALENDLY_MODAL_RENDERED,
} from '@js/constants/events';

import { useGetCta } from '@js/common/cta-form';
import { useCurrentUserSelector } from '@js/common/current-user';
import { useAnonUserName } from '@js/common/useAnonUserName';
import { useVideoContext } from '@js/common/video-player';
import { usePlayingStatus } from '@js/common/video-player/hooks';
import { usePrevious } from '@js/hooks/usePrevious';
import React, { useState, useEffect } from 'react';
import { PopupModal, useCalendlyEventListener } from 'react-calendly';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';
import { withHttps } from '@js/utilities/url';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  CALENDLY_URL_REGEX,
  EMAIL_REGEX_CHECK,
} from '@loomhq/shared-utilities/utilities/validateUtils';

import * as analytics from '@js/utilities/analytics';

import { useCalendlySegment } from './useCalendlySegmentHook';
import { useDidRequestCalendlyModal } from './useDidRequestCalendlyModal';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

import { trackCtaEvent } from '@js/components/video-player-fresh/video-session/cta-event';
import { createVideoSessionData } from '@js/components/video-player-fresh/video-session/video-session';

const CalendlyModalInternals = ({ isOpen, onClose, url, videoId }) => {
  const { featureLoadedRef } = useFeatureWrapper();
  const currentUserEmail = useCurrentUserSelector(
    user => user.email,
    undefined
  );

  const { anonUserName } = useAnonUserName();

  const anonUserNameIsValidEmail =
    anonUserName && EMAIL_REGEX_CHECK.test(anonUserName);
  const anonUserNamePrefillValue = anonUserNameIsValidEmail ? anonUserName : '';

  useEffect(() => {
    analytics.track(
      CALENDLY_MODAL_RENDERED,
      withIdentifiers(
        CALENDLY_MODAL_RENDERED,
        AnalyticsEntityId.video(videoId, 'videoId')
      )
    );
  }, [videoId]);

  useCalendlyEventListener({
    onProfilePageViewed: () => {
      analytics.track(
        CALENDLY_PROFILE_PAGE_VIEWED,
        withIdentifiers(
          CALENDLY_PROFILE_PAGE_VIEWED,
          AnalyticsEntityId.video(videoId, 'videoId')
        )
      );
    },
    onDateAndTimeSelected: () => {
      analytics.track(
        CALENDLY_DATE_AND_TIME_SELECTED,
        withIdentifiers(
          CALENDLY_DATE_AND_TIME_SELECTED,
          AnalyticsEntityId.video(videoId, 'videoId')
        )
      );
    },
    onEventTypeViewed: () => {
      analytics.track(
        CALENDLY_EVENT_TYPE_VIEWED,
        withIdentifiers(
          CALENDLY_EVENT_TYPE_VIEWED,
          AnalyticsEntityId.video(videoId, 'videoId')
        )
      );
    },
    onEventScheduled: () => {
      analytics.track(
        CALENDLY_EVENT_SCHEDULED,
        withIdentifiers(
          CALENDLY_EVENT_SCHEDULED,
          AnalyticsEntityId.video(videoId, 'videoId')
        )
      );
    },
  });

  return (
    <div ref={featureLoadedRef}>
      <PopupModal
        url={url}
        open={isOpen}
        onModalClose={onClose}
        rootElement={document.body}
        prefill={{
          email: currentUserEmail || anonUserNamePrefillValue,
        }}
      />
    </div>
  );
};

// show modal modal automatically if the video has just ended
// or if didRequestCalendlyModal has flipped from false to true
export const CalendlyModal = (): JSX.Element | null => {
  const { video } = useVideoContext();
  const { status } = usePlayingStatus(video.id);
  const cta = useGetCta(video.id);
  const { didRequestCalendlyModal, setDidRequestCalendlyModal } =
    useDidRequestCalendlyModal();

  const ctaUrl = withHttps(String(cta?.ctaUrl));
  const isCalendlyCta = CALENDLY_URL_REGEX.test(ctaUrl);
  const hasEnded = status === 'ended';

  const prevHasEnded = usePrevious(hasEnded);
  const prevDidRequestCalendlyModal = usePrevious(didRequestCalendlyModal);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isOwnerInCalendlySegment, loading, error } = useCalendlySegment(
    video.id,
    isCalendlyCta
  );

  const skipCalendlyModal = ctaUrl.includes('skip_modal_popup=true');

  const sessionData = createVideoSessionData({
    videoId: video.modelId || '',
    trimId: video.processingInformation?.trimId,
  });

  const { anonUserName } = useAnonUserName();

  useEffect(() => {
    if (!isCalendlyCta || !isOwnerInCalendlySegment) {
      return;
    }

    if (skipCalendlyModal) {
      return;
    }

    if (
      (hasEnded && hasEnded !== prevHasEnded) ||
      (didRequestCalendlyModal &&
        didRequestCalendlyModal !== prevDidRequestCalendlyModal)
    ) {
      setIsModalVisible(true);

      if (!video.isOwner) {
        trackCtaEvent({
          videoId: video.modelId || '',
          sessionId: sessionData.id,
          isOwner: Boolean(video.isOwner),
          anonUserName,
        });
      }
    }
  }, [
    isCalendlyCta,
    isOwnerInCalendlySegment,
    hasEnded,
    didRequestCalendlyModal,
    prevHasEnded,
    prevDidRequestCalendlyModal,
    skipCalendlyModal,
    video.isOwner,
    video.modelId,
    sessionData.id,
    anonUserName,
  ]);

  const closeModal = () => {
    setIsModalVisible(false);
    setDidRequestCalendlyModal(false);
  };

  if (loading || error) {
    return null;
  }

  if (isModalVisible) {
    return (
      <FeatureWrapper
        feature={Feature.Calendly}
        errorType={ErrorBoundaryTypes.SILENT}
      >
        <CalendlyModalInternals
          isOpen={isModalVisible}
          onClose={closeModal}
          url={ctaUrl}
          videoId={video.id}
        />
      </FeatureWrapper>
    );
  }

  return null;
};
