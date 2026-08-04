import { VIDEO_CTA_CLICKED } from '@js/constants/events';

import { trackCtaClick } from '@js/utilities/video-session/mediaAnalyticsEvent';

import { track } from '@js/utilities/analytics';

import { getAnalyticsProps } from '../utils/analytics';

interface CtaEventParams {
  videoId: string;
  sessionId: string;
  isOwner: boolean;
  anonUserName: string;
}

export function trackCtaEvent({
  videoId,
  sessionId,
  isOwner,
  anonUserName,
}: CtaEventParams): void {
  const { isInlineEmbedOnLoom, parentLocation, fromPublicSharePage } =
    getAnalyticsProps();

  trackCtaClick(videoId, sessionId, anonUserName);

  track(VIDEO_CTA_CLICKED, {
    // This need to be updated when we work on embedding the player for the share page
    is_inline_embed_on_loom: isInlineEmbedOnLoom,
    from_public_share_page: fromPublicSharePage,
    parent_location: parentLocation || '',
    video_id: videoId,
    owner_click: isOwner,
    anon_name: anonUserName,
  });
}
