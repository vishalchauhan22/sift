import { useVideoPasswordContext } from '@js/common/video-password';

import * as loggerx from '@js/utilities/loggerx';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useGetVideoExpirationDateQuery } from './getVideoExpirationDate.generated';

type GetVideoExpirationDateReturnType = {
  data?: {
    hasVideoExpired: boolean;
    expirationDate: string;
  };
  loading: boolean;
};

/**
 * Hook that fetches video expiration date
 * It return hasVideoExpired boolean and expirationDate if exists
 * @returns {GetVideoExpirationDateReturnType} An object containing the expiration date, loading state, and any error message.
 */
export const useVideoExpirationDate = ({
  videoId,
}: {
  videoId: string;
}): GetVideoExpirationDateReturnType => {
  const { password } = useVideoPasswordContext();
  const { data, loading } = useGetVideoExpirationDateQuery({
    variables: {
      videoId,
      password,
    },
    onError: error => {
      loggerx.error(
        error,
        {
          error: 'Failed to get video expiration date',
          videoId,
        },
        {
          feature: Feature.WorkspaceLinkExpiration,
        }
      );
    },
  });

  if (loading) {
    return { loading };
  }

  if (!data?.getVideo || data.getVideo.__typename !== 'RegularUserVideo') {
    return {
      loading: false,
      data: undefined,
    };
  }

  const videoExpirationDateIsoString = data.getVideo.expirationDate ?? '';

  const now = new Date();

  if (
    !videoExpirationDateIsoString ||
    videoExpirationDateIsoString > now.toISOString()
  ) {
    return {
      data: {
        hasVideoExpired: false,
        expirationDate: videoExpirationDateIsoString,
      },
      loading: false,
    };
  }

  return {
    data: {
      hasVideoExpired: true,
      expirationDate: videoExpirationDateIsoString,
    },
    loading: false,
  };
};
