import { ErrorSeverities } from '@js/constants/error-severities';
import { ADD_CUSTOM_VIDEO_CTA_ENABLED } from '@js/constants/events';
import {
  CTA_BACKGROUND_COLOR,
  CTA_BUTTON_LOCATION,
  CTA_ONLY_SHOW_END_OF_VIDEO,
  CTA_RADIUS,
  CTA_TEXT_COLOR,
} from '@js/constants/localStorage';
import { useCtaForm, type Cta, useGetCta } from '@js/common/cta-form';
import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import { useVideoPasswordContext } from '@js/common/video-password';
import { usePlayer, useVideoContext } from '@js/common/video-player';
import { getCtaText } from '@js/pages/share/edit-tab/common';
import React, { useCallback, useEffect, useState } from 'react';
import { useUpdateVideoCtaMutation } from '@js/utilities/UpdateVideoCta.generated';
import * as logger from '@js/utilities/loggerx';
import { incrementMetric } from '@js/utilities/metrics';

import { AUTO_CTA_METRICS_FEATURE_NAME } from '@loomhq/shared-utilities/constants/intelligence';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import { CALENDLY_URL_REGEX } from '@loomhq/shared-utilities/utilities/validateUtils';

import { useTheaterMode } from '@js/common/theater-mode';

import * as analytics from '@js/utilities/analytics';

import {
  getLocalStorageKey,
  setLocalStorageKey,
} from '@js/utilities/localStorage';

import {
  DEFAULT_CTA_SETTINGS,
  getBorderRadius,
  getOnlyShowAtEndOfVideo,
} from '@js/components/share-video/cta-button';

import { useApproveAutoCtaMutation } from './ApproveAutoCta.generated';

import { MemberPropertyDefaultCtaForm } from './MemberPropertyDefaultCtaForm';

import { VideoCtaForm } from './VideoCtaForm';

import {
  CORNER_STYLES,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_TEXT_COLOR,
} from './constants';

import { getBorderRadiusLabel } from './helpers';

import './styles.less';

const EMPTY_CTA = {
  ctaEnabled: false,
  ctaText: '',
  ctaUrl: '',
  ctaMods: null,
};

export const CtaFormWrapper = ({
  showDefaultCta,
  isOnDefaultTab,
  goBackToEditPage,
  pageTitle,
  setIsOnDefaultTab,
}: {
  showDefaultCta: boolean;
  isOnDefaultTab: boolean;
  goBackToEditPage: () => void;
  pageTitle: string;
  setIsOnDefaultTab: (isOnDefaultTab: boolean) => void;
}): JSX.Element => {
  const { password } = useVideoPasswordContext();
  const { isInTheaterMode, setIsInTheaterMode } = useTheaterMode();
  const {
    setCtaIsAuto,
    setCtaMods,
    setCtaText,
    setCtaEnabled,
    setCtaUrl,
    setCta,
    initializeCtaForm,
    ctaMods,
    ctaUrl,
    ctaText,
    ctaIsAuto,
    ctaApprovedAt,
    ctaEnabled,
    deleteCta,
    setIsEditingCta,
  } = useCtaForm();

  const [suggestedLink, setSuggestedLink] = useState('');
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [previousCta] = useState({
    ctaText,
    ctaUrl,
    ctaMods,
  });

  const { showErrorBar } = useErrorBar();
  const { setShowConfirmationToast } = useConfirmationToast();

  const {
    video: {
      id: videoId,
      videoProperties: { playableDuration },
    },
  } = useVideoContext();

  const cta = useGetCta(videoId);
  const player = usePlayer(videoId);

  const [originalPlayerTime, setOriginalPlayerTime] = useState<number>();

  useEffect(() => {
    if (
      player &&
      player?.currentTime !== undefined &&
      originalPlayerTime === undefined
    ) {
      setOriginalPlayerTime(player.currentTime);
    }
  }, [originalPlayerTime, player]);

  useEffect(() => {
    // let's make sure to initialize the form with the cta data
    if (cta) {
      initializeCtaForm(cta);
    }
  }, [cta, initializeCtaForm]);

  // Populate the zustand state if the mods are empty on load
  useEffect(() => {
    if (!cta?.ctaEnabled && ctaMods === null) {
      setCtaMods({
        background_color:
          getLocalStorageKey(CTA_BACKGROUND_COLOR) || DEFAULT_BUTTON_COLOR,
        color: getLocalStorageKey(CTA_TEXT_COLOR) || DEFAULT_TEXT_COLOR,
        border_radius: getBorderRadius(ctaMods),
        location:
          getLocalStorageKey(CTA_BUTTON_LOCATION) ||
          DEFAULT_CTA_SETTINGS.location,
        only_show_at_end_of_video:
          getLocalStorageKey(CTA_ONLY_SHOW_END_OF_VIDEO) ||
          DEFAULT_CTA_SETTINGS.only_show_at_end_of_video,
      });
    }

    if (cta?.ctaUrl && cta?.ctaIsAuto && !suggestedLink && !suggestedTitle) {
      const newSuggestedTitle = getCtaText(cta.ctaUrl) ?? '';

      setSuggestedLink(cta.ctaUrl);
      setSuggestedTitle(newSuggestedTitle);

      if (!ctaText) {
        setCtaText(newSuggestedTitle);
      }
    }
  }, [
    cta,
    ctaMods,
    ctaText,
    setCtaMods,
    setCtaText,
    suggestedLink,
    suggestedTitle,
  ]);

  const currentValues = {
    url: ctaUrl || '',
    text: ctaText || '',
    location:
      ctaMods?.location ||
      getLocalStorageKey(CTA_BUTTON_LOCATION) ||
      DEFAULT_CTA_SETTINGS.location,
    background_color:
      ctaMods?.background_color ||
      getLocalStorageKey(CTA_BACKGROUND_COLOR) ||
      DEFAULT_BUTTON_COLOR,
    color:
      ctaMods?.color ||
      getLocalStorageKey(CTA_TEXT_COLOR) ||
      DEFAULT_TEXT_COLOR,
    button_corner_style: getBorderRadiusLabel(getBorderRadius(ctaMods)),
    only_show_at_end_of_video: getOnlyShowAtEndOfVideo(ctaMods),
    skip_modal_popup: ctaUrl ? ctaUrl.includes('skip_modal_popup=true') : false,
  };

  const [approveAutoCta] = useApproveAutoCtaMutation({
    variables: { videoId },
    onCompleted: data => {
      if (data?.approveAutoCta?.__typename !== 'ApproveAutoCtaPayload') {
        logger.error(
          data?.approveAutoCta?.message ?? "Couldn't approve auto cta",
          { message: 'Unable to approve auto cta' },
          { feature: Feature.CtaLinks }
        );
      }
    },
    onError: err => {
      logger.error(
        err,
        { message: 'Unable to approve auto cta' },
        { feature: Feature.CtaLinks }
      );
    },
  });

  const setCtaState = useCallback(
    ({
      ctaEnabled,
      ctaText,
      ctaUrl,
      ctaMods,
    }: Pick<Cta, 'ctaEnabled' | 'ctaText' | 'ctaUrl' | 'ctaMods'>) => {
      setCta({
        ctaEnabled,
        ctaText,
        ctaUrl,
        ctaMods,
      });
    },
    [setCta]
  );

  const checkCtaAndGoBack = useCallback(() => {
    // Rewind to the state this component was mounted with
    setCtaState({
      ctaEnabled,
      ctaText: previousCta.ctaText,
      ctaUrl: previousCta.ctaUrl,
      ctaMods: previousCta.ctaMods,
    });
    setIsEditingCta(false);
    goBackToEditPage();
  }, [
    ctaEnabled,
    setIsEditingCta,
    goBackToEditPage,
    previousCta.ctaMods,
    previousCta.ctaText,
    previousCta.ctaUrl,
    setCtaState,
  ]);

  const [updateVideoCta] = useUpdateVideoCtaMutation({
    onError: () => {
      showErrorBar({
        message: 'Oops! Error updating video cta',
        severity: ErrorSeverities.ERROR,
      });
    },
    onCompleted: data => {
      const result = data?.updateVideoCta;
      if (!result || result.__typename !== 'UpdateVideoCtaPayload') {
        showErrorBar({
          message: result?.message,
          severity: ErrorSeverities.ERROR,
        });
      }
    },
  });

  const onSave = useCallback(
    (includeTracking: boolean) => {
      const hasUrlChanged = ctaUrl !== previousCta.ctaUrl;
      const hasTextChanged = ctaIsAuto
        ? ctaText !== suggestedTitle
        : ctaText !== previousCta.ctaText;
      const hasUrlOrTextChanged = hasUrlChanged || hasTextChanged;

      let ctaIsAutoToSave = ctaIsAuto;

      if (ctaIsAuto && hasUrlOrTextChanged) {
        incrementMetric(`${AUTO_CTA_METRICS_FEATURE_NAME}.modified`, {
          urlChanged: hasUrlChanged,
          textChanged: hasTextChanged,
        });
        setCtaIsAuto(false);
        ctaIsAutoToSave = false;
      } else if (ctaIsAuto) {
        incrementMetric(`${AUTO_CTA_METRICS_FEATURE_NAME}.approved`);
        approveAutoCta();
      }

      setCtaEnabled(true);

      updateVideoCta({
        variables: {
          videoId,
          cta: {
            enabled: true,
            text: ctaText,
            url: ctaUrl,
            mods: ctaMods,
            approved_at: ctaApprovedAt,
            is_auto: ctaIsAutoToSave,
          },
          password,
        },
      });
      // TODO: useSetPlayerTime instead of player.currentTime/play
      if (player && originalPlayerTime !== undefined) {
        player.currentTime = originalPlayerTime;
      }
      setIsEditingCta(false);

      if (includeTracking) {
        analytics.track(ADD_CUSTOM_VIDEO_CTA_ENABLED, {
          ctaMods,
          suggested_link: suggestedLink,
          suggested_title: suggestedTitle,
        });
      }

      const isCalendlyCta = CALENDLY_URL_REGEX.test(ctaUrl ?? '');
      const savedText = isCalendlyCta ? 'Calendly link saved!' : 'Link saved';

      setShowConfirmationToast(savedText);
      setIsInTheaterMode(isInTheaterMode);
      goBackToEditPage();
    },
    [
      approveAutoCta,
      ctaApprovedAt,
      ctaIsAuto,
      ctaMods,
      ctaText,
      ctaUrl,
      setIsEditingCta,
      goBackToEditPage,
      originalPlayerTime,
      player,
      previousCta.ctaText,
      previousCta.ctaUrl,
      setShowConfirmationToast,
      suggestedLink,
      suggestedTitle,
      isInTheaterMode,
      setIsInTheaterMode,
      videoId,
      updateVideoCta,
      password,
      setCtaEnabled,
      setCtaIsAuto,
    ]
  );

  const onDelete = useCallback(() => {
    deleteCta();

    updateVideoCta({
      variables: {
        videoId,
        cta: {
          enabled: EMPTY_CTA.ctaEnabled,
          text: EMPTY_CTA.ctaText,
          url: EMPTY_CTA.ctaUrl,
          mods: EMPTY_CTA.ctaMods,
        },
        password,
      },
    });

    // TODO: useSetPlayerTime instead of player.currentTime/play
    if (player && originalPlayerTime !== undefined) {
      player.currentTime = originalPlayerTime;
    }

    setIsEditingCta(false);
    setShowConfirmationToast('Call-to-action deleted');
    goBackToEditPage();
    setIsInTheaterMode(isInTheaterMode);
  }, [
    deleteCta,
    setIsEditingCta,
    goBackToEditPage,
    originalPlayerTime,
    player,
    setShowConfirmationToast,
    updateVideoCta,
    isInTheaterMode,
    setIsInTheaterMode,
    videoId,
    password,
  ]);

  const onUrlChanged = useCallback(
    (url: string) => setCtaUrl(url),
    [setCtaUrl]
  );

  const onTextChanged = useCallback(
    (text: string) => setCtaText(text),
    [setCtaText]
  );

  const onLocationChanged = useCallback(
    (location: string) => {
      setCtaMods({ ...ctaMods, location });
      setLocalStorageKey(CTA_BUTTON_LOCATION, location);
    },
    [ctaMods, setCtaMods]
  );

  const onBackgroundColorChanged = useCallback(
    (color: string) => {
      setCtaMods({ ...ctaMods, background_color: color });
      setLocalStorageKey(CTA_BACKGROUND_COLOR, color);
    },
    [ctaMods, setCtaMods]
  );

  const onColorChanged = useCallback(
    (color: string) => {
      setCtaMods({ ...ctaMods, color });
      setLocalStorageKey(CTA_TEXT_COLOR, color);
    },
    [ctaMods, setCtaMods]
  );

  const onButtonCornerStyleChanged = useCallback(
    (cornerStyleString: string) => {
      const borderStyleRadius = CORNER_STYLES[cornerStyleString].value;
      setCtaMods({
        ...ctaMods,
        border_radius: borderStyleRadius,
      });
      setLocalStorageKey(CTA_RADIUS, borderStyleRadius);
    },
    [ctaMods, setCtaMods]
  );

  const onOnlyShowAtEndOfVideoChanged = useCallback(
    (onlyShowAtEndOfVideo: boolean) => {
      setCtaMods({
        ...ctaMods,
        only_show_at_end_of_video: onlyShowAtEndOfVideo,
      });
      setLocalStorageKey(CTA_ONLY_SHOW_END_OF_VIDEO, onlyShowAtEndOfVideo);
      if (player) {
        if (onlyShowAtEndOfVideo && playableDuration) {
          player.currentTime = playableDuration;
        } else if (originalPlayerTime !== undefined) {
          player.currentTime = originalPlayerTime;
        }
      }
    },
    [ctaMods, originalPlayerTime, playableDuration, player, setCtaMods]
  );

  const onSkipModalPopupChanged = useCallback(
    (skipModalPopup: boolean) => {
      let updatedUrl = ctaUrl || '';

      if (!updatedUrl) {
        return;
      }

      if (skipModalPopup) {
        if (!updatedUrl.includes('skip_modal_popup=true')) {
          const separator = updatedUrl.includes('?') ? '&' : '?';
          updatedUrl = `${updatedUrl}${separator}skip_modal_popup=true`;
        }
      } else {
        updatedUrl = updatedUrl
          .replace(/[?&]skip_modal_popup=true(&|$)/, (match, nextChar) => {
            if (
              match.startsWith('?') &&
              (nextChar === '&' || nextChar === '')
            ) {
              return nextChar === '&' ? '?' : '';
            }
            return nextChar === '&' ? '&' : '';
          })
          .replace(/[?&]$/, ''); // Remove trailing ? or &
      }

      setCtaUrl(updatedUrl);
    },
    [ctaUrl, setCtaUrl]
  );

  if (showDefaultCta && isOnDefaultTab) {
    return (
      <MemberPropertyDefaultCtaForm
        goBackToEditPage={checkCtaAndGoBack}
        onSaveForVideo={() => onSave(false)}
        onUrlChange={onUrlChanged}
        onTextChange={onTextChanged}
        onLocationChange={onLocationChanged}
        onBackgroundColorChange={onBackgroundColorChanged}
        onColorChange={onColorChanged}
        onButtonCornerStyleChange={onButtonCornerStyleChanged}
        onOnlyShowAtEndOfVideoChange={onOnlyShowAtEndOfVideoChanged}
        onSkipModalPopupChange={onSkipModalPopupChanged}
        videoId={videoId}
        currentValues={currentValues}
      />
    );
  }

  return (
    <VideoCtaForm
      goBackToEditPage={checkCtaAndGoBack}
      onSave={() => onSave(true)}
      onUrlChange={onUrlChanged}
      onTextChange={onTextChanged}
      onLocationChange={onLocationChanged}
      onBackgroundColorChange={onBackgroundColorChanged}
      onColorChange={onColorChanged}
      onButtonCornerStyleChange={onButtonCornerStyleChanged}
      onOnlyShowAtEndOfVideoChange={onOnlyShowAtEndOfVideoChanged}
      onSkipModalPopupChange={onSkipModalPopupChanged}
      videoId={videoId}
      currentValues={currentValues}
      pageTitle={pageTitle}
      ctaEnabled={ctaEnabled}
      setIsOnDefaultTab={setIsOnDefaultTab}
      onDelete={onDelete}
      showDefaultCta={showDefaultCta}
    />
  );
};
