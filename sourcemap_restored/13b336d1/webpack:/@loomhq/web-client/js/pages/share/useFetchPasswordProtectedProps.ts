import { useCtaForm } from '@js/common/cta-form';
import { useVideoContext } from '@js/common/video-player';
import { useUpdateVideo } from '@js/common/video/useUpdateVideo';
import { parseVideo } from '@js/components/video-player-fresh/utils';
import { adaptApolloResponse } from '@js/pages/share/common/adaptApolloResponse';
import { useCallback } from 'react';

import * as logger from '@js/utilities/loggerx';
import { isFromPublicSharePage } from '@js/utilities/url';

import {
  GetVideoSsrQueryVariables,
  useGetVideoSsrLazyQuery,
} from '@loomhq/graphql-preload';
import { setDocumentTitle } from '@js/utilities/video';

type GetPasswordProtectedProps = (options: {
  variables: GetVideoSsrQueryVariables;
  onCompleted: () => void;
}) => void;

export const useFetchPasswordProtectedProps = (): {
  getPasswordProtectedProps: GetPasswordProtectedProps;
} => {
  const { setVideo } = useVideoContext();
  const { fromPublicSharePage } = isFromPublicSharePage();
  const { updateVideo } = useUpdateVideo();
  const { setCta } = useCtaForm();

  const [getLoomSsr] = useGetVideoSsrLazyQuery({
    fetchPolicy: 'no-cache',
    onError: err => {
      logger.warning(err, {
        message: 'error fetching video password protected props',
      });
    },
  });

  const getLoomSsrWithOnCompleted = useCallback(
    ({ variables, onCompleted }: any) => {
      getLoomSsr({
        variables,
        onCompleted: data => {
          if (data?.getVideo?.__typename === 'RegularUserVideo') {
            const { name } = data?.getVideo;

            const video = adaptApolloResponse(data);

            if (fromPublicSharePage) {
              updateVideo(video);
              setCta(video?.cta);
              setDocumentTitle(name);
            }

            setVideo(parseVideo(video));

            onCompleted();
          }
        },
      });
    },
    [getLoomSsr, fromPublicSharePage, setVideo, updateVideo, setCta]
  );

  return {
    getPasswordProtectedProps: getLoomSsrWithOnCompleted,
  };
};
