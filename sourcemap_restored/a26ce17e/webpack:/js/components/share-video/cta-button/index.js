/* eslint-disable @loomhq/loom/no-js-extension */
import './styles.less';

import {
  SMALL_DESKTOP_MIN_WIDTH,
  TABLET_MAX_WIDTH,
} from '@js/constants/breakpoints';

import { VIDEO_CTA_CLICKED } from '@js/constants/events';

import {
  CTA_BACKGROUND_COLOR,
  CTA_BUTTON_LOCATION,
  CTA_ONLY_SHOW_END_OF_VIDEO,
  CTA_RADIUS,
  CTA_TEXT_COLOR,
} from '@js/constants/localStorage';

import { sanitizeUrl } from '@braintree/sanitize-url';
import classNames from 'classnames';
import { useCurrentUserSelector } from '@js/common/current-user';
import { MediaQuery } from '@js/common/layout';
import { useVideoContext } from '@js/common/video-player';
import { getAnalyticsProps } from '@js/components/video-player-fresh/utils/analytics';
import React from 'react';

import { Button, getColorValue } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';
import { getLocalStorageKey } from '@js/utilities/localStorage';
import { useCtaForm } from '@js/common/cta-form';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';

export const DEFAULT_CTA_SETTINGS = {
  color: 'white',
  background_color: 'orange',
  location: 'Top right',
  border_radius: 24,
  only_show_at_end_of_video: false,
};

const LOCATION_CLASSNAME_MAP = {
  'Top left': 'top-left',
  'Top right': 'top-right',
  'Bottom left': 'bottom-left',
  'Bottom right': 'bottom-right',
};

const LINK_CTA_TEXT = 'Link text';

// Turns the location val to a corresponding classname
// eg. 'Top left' => 'top-left'
function getLocationClassname(location) {
  return location ? LOCATION_CLASSNAME_MAP[location] : 'top-right';
}

// priority: ctaMods > localStorage > default
export function getBorderRadius(ctaMods) {
  // can't use `!value` in this fn since the value could be 0,
  // which is a valid option here
  if (ctaMods?.border_radius !== undefined && ctaMods?.border_radius !== null) {
    return ctaMods.border_radius;
  }

  let radiusInLocalStorage = getLocalStorageKey(CTA_RADIUS);

  if (radiusInLocalStorage !== undefined && radiusInLocalStorage !== null) {
    radiusInLocalStorage = Number(radiusInLocalStorage);

    // if it's a number, return it; otherwise, return the default
    if (typeof radiusInLocalStorage === 'number') {
      return radiusInLocalStorage;
    }
  }

  return DEFAULT_CTA_SETTINGS.border_radius;
}

export function getOnlyShowAtEndOfVideo(ctaMods) {
  if (
    ctaMods?.only_show_at_end_of_video !== undefined &&
    ctaMods?.only_show_at_end_of_video !== null
  ) {
    return ctaMods.only_show_at_end_of_video;
  }

  const localStorageValue = getLocalStorageKey(CTA_ONLY_SHOW_END_OF_VIDEO);
  if (localStorageValue !== undefined && localStorageValue !== null) {
    const storedValue = Boolean(localStorageValue);

    if (typeof storedValue === 'boolean') {
      return storedValue;
    }
  }

  return DEFAULT_CTA_SETTINGS.only_show_at_end_of_video;
}

// return the CTA button styles. If a style is not set, return the default val
function getCTABtnStyles(ctaMods) {
  // let the attributes to be default values
  const color =
    ctaMods?.color ||
    getLocalStorageKey(CTA_TEXT_COLOR) ||
    getColorValue(DEFAULT_CTA_SETTINGS.color);
  const background_color =
    ctaMods?.background_color ||
    getLocalStorageKey(CTA_BACKGROUND_COLOR) ||
    getColorValue(DEFAULT_CTA_SETTINGS.background_color);
  const border_radius = getBorderRadius(ctaMods);
  const location =
    ctaMods?.location ||
    getLocalStorageKey(CTA_BUTTON_LOCATION) ||
    DEFAULT_CTA_SETTINGS.location;

  const styles = {
    color,
    background_color,
    border_radius,
    location,
  };

  return styles;
}

const CustomCtaButtonMobile = props => {
  const {
    ctaMods,
    ctaUrl,
    ctaText,
    onClickHandler,
    forceTopRight = false,
  } = props;

  const { color, background_color, border_radius, location } =
    getCTABtnStyles(ctaMods);

  const locationClassname = forceTopRight
    ? 'top-right'
    : getLocationClassname(location);

  const hasText = ctaText && ctaText.length > 0;
  const hasUrl = ctaUrl && ctaUrl.length > 0;

  // Link cannot be clicked until text & url are at least partially entered
  const linkProperties =
    hasText && hasUrl
      ? {
          href:
            ctaUrl && (ctaUrl.indexOf('http') > -1 ? ctaUrl : `//${ctaUrl}`),
        }
      : {};

  return (
    <Button
      className={classNames('cta-button cta-button-in-form', locationClassname)}
      target={ctaUrl && '_blank'}
      href={linkProperties?.href}
      onClick={onClickHandler}
      style={{
        color,
        backgroundColor: background_color,
        borderRadius: `${border_radius}px`,
      }}
      hasFullWidth={true}
      htmlTag="a"
    >
      {hasText ? (
        ctaText
      ) : (
        <span className="call-to-action-placeholder">{LINK_CTA_TEXT}</span>
      )}
    </Button>
  );
};

const CustomCtaButton = props => {
  const {
    ctaMods,
    ctaUrl,
    ctaText,
    onClickHandler,
    forceTopRight = false,
  } = props;

  const { color, background_color, border_radius, location } =
    getCTABtnStyles(ctaMods);

  const locationClassname = forceTopRight
    ? 'top-right'
    : getLocationClassname(location);

  const hasText = ctaText && ctaText.length > 0;
  const hasUrl = ctaUrl && ctaUrl.length > 0;

  // Link cannot be clicked until text & url are at least partially entered
  const linkProperties =
    hasText && hasUrl
      ? {
          href:
            ctaUrl && (ctaUrl.indexOf('http') > -1 ? ctaUrl : `//${ctaUrl}`),
        }
      : {};

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <a
      className={classNames('cta-button cta-button-in-form', locationClassname)}
      target={ctaUrl && '_blank'}
      rel="noopener noreferrer"
      onClick={onClickHandler}
      style={{
        color,
        backgroundColor: background_color,
        borderRadius: `${border_radius}px`,
      }}
      size={ctaText ? ctaText.length : 0}
      {...linkProperties}
    >
      {hasText ? (
        ctaText
      ) : (
        <span className="call-to-action-placeholder">{LINK_CTA_TEXT}</span>
      )}
    </a>
  );
};

export const CustomEmbedCtaButton = props => {
  const { ctaUrl, ctaText, color, backgroundColor } = props;

  const locationClassname = 'top-right';

  const hasText = ctaText && ctaText.length > 0;
  const hasUrl = ctaUrl && ctaUrl.length > 0;

  // Link cannot be clicked until text & url are at least partially entered
  const linkProperties =
    hasText && hasUrl
      ? {
          href:
            ctaUrl && (ctaUrl.indexOf('http') > -1 ? ctaUrl : `//${ctaUrl}`),
        }
      : {};

  return (
    <a
      className={classNames('cta-button', locationClassname)}
      target={ctaUrl && '_blank'}
      rel="noopener"
      style={{
        color,
        backgroundColor,
        borderRadius: 'var(--lns-radius-xlarge)',
      }}
      size={ctaText ? ctaText.length : 0}
      {...linkProperties}
    >
      {hasText ? (
        ctaText
      ) : (
        <span className="call-to-action-placeholder">{LINK_CTA_TEXT}</span>
      )}
    </a>
  );
};

const CustomCtaButtonWrapper = ({ onClick = () => {} }) => {
  const viewerId = useCurrentUserSelector(user => user.id, undefined);
  const {
    video: {
      id: videoId,
      owner: { id: ownerId },
    },
  } = useVideoContext();
  const { ctaMods, ctaText, ctaUrl: url } = useCtaForm(); // CTA edit mode is on already
  const ctaUrl = sanitizeUrl(url);
  const { parentLocation, fromPublicSharePage } = getAnalyticsProps();

  const onClickHandler = () => {
    onClick();

    analytics.track(VIDEO_CTA_CLICKED, {
      ...withIdentifiers(
        VIDEO_CTA_CLICKED,
        AnalyticsEntityId.video(videoId, 'video_id'),
        AnalyticsEntityId.user(ownerId, 'owner_id')
      ),
      from_public_share_page: fromPublicSharePage,
      is_inline_embed_on_loom: false,
      parent_location: parentLocation || '',
      owner_click: ownerId === viewerId,
    });
  };

  const props = {
    ctaMods,
    ctaText,
    ctaUrl,
    onClickHandler,
  };

  return (
    <>
      <MediaQuery query={`(max-width: ${TABLET_MAX_WIDTH}px)`}>
        <CustomCtaButtonMobile {...props} />
      </MediaQuery>
      <MediaQuery query={`(min-width: ${SMALL_DESKTOP_MIN_WIDTH}px)`}>
        <CustomCtaButton {...props} />
      </MediaQuery>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default CustomCtaButtonWrapper;
