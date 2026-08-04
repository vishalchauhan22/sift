import { useFlagIsActivated } from '@js/hooks/featureFlag';
import { useVideoExpirationDate } from '@js/hooks/videoProperties/useVideoExpirationDate';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { format } from 'date-fns';

const COPY_LINK = 'Copy link';
const LINK_COPIED = 'Link copied!';

export function useVideoCopyLinkButtonTooltipContent({
  videoId,
  organizationId,
  isCopied,
}: {
  videoId: string;
  organizationId: string | undefined;
  isCopied: boolean;
}): string {
  const isLinkExpirationEnabled = useFlagIsActivated({
    flag: FEATURE_GATES.LINK_EXPIRATION_FOR_WORKSPACE,
    activationValues: [true],
    controlType: ControlType.STATSIG_FEATURE_GATE,
    extraProperties: { workspace_id: organizationId },
  });
  const { data: videoExpirationData } = useVideoExpirationDate({ videoId });

  if (!isLinkExpirationEnabled) {
    return isCopied ? LINK_COPIED : COPY_LINK;
  }

  if (isCopied) {
    return LINK_COPIED;
  }

  if (!videoExpirationData?.expirationDate) {
    return COPY_LINK;
  }

  return `Copy a link that expires on ${format(new Date(videoExpirationData.expirationDate), 'MMM do')}`;
}
