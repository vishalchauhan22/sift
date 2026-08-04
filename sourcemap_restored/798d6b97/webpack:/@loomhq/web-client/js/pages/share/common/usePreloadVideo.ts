import { adaptApolloResponse } from '@js/pages/share/common/adaptApolloResponse';
import { useEffect, useMemo } from 'react';

import * as logger from '@js/utilities/loggerx';

import { useGetVideoSsrQuery } from '@loomhq/graphql-preload';
import { Feature } from '@loomhq/shared-utilities/constants/product';

export const usePreloadVideo = ({
  videoId,
}: {
  videoId: string | null;
}): ReturnType<typeof useGetVideoSsrQuery> & {
  videoModel: ReturnType<typeof adaptApolloResponse> | undefined;
} => {
  const {
    data: responseData,
    loading,
    error,
    ...rest
  } = useGetVideoSsrQuery({
    variables: {
      id: videoId as string,
    },
    skip: !videoId,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (error) {
      logger.error(error, {}, { feature: Feature.VideoPreload });
    }
  }, [error]);

  const adaptedVideoQueryResponseData = useMemo(() => {
    if (loading || !responseData) {
      return undefined;
    }

    return adaptApolloResponse(responseData);
  }, [loading, responseData]);

  return {
    loading,
    error,
    data: responseData,
    videoModel: adaptedVideoQueryResponseData,
    ...rest,
  };
};
