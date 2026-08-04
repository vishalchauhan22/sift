import { getCtaText } from './common';
import { GetEditTabVideoDetailsQuery } from './getEditTabVideoDetails.generated';

export const selectVideoData = (
  data: GetEditTabVideoDetailsQuery | undefined
): {
  videoIsComplete: boolean;
  isAutoLinkDetected: boolean;
  autoLinkTitle: string | undefined;
} => {
  if (data?.getVideo?.__typename !== 'RegularUserVideo') {
    return {
      videoIsComplete: false,
      isAutoLinkDetected: false,
      autoLinkTitle: undefined,
    };
  }

  const videoIsComplete = data.getVideo.complete;

  const { is_auto: linkIsAuto, url: autoLink } = data.getVideo.cta;

  const isAutoLinkDetected = Boolean(linkIsAuto && autoLink);
  const autoLinkTitle = getCtaText(autoLink);

  return {
    videoIsComplete,
    isAutoLinkDetected,
    autoLinkTitle,
  };
};
