import React, { useCallback } from 'react';

// eslint-disable-next-line no-restricted-imports
import { getGraphQLClient } from '@js/utilities/graphql';

import { SlackBacklinkPreview } from './SlackBacklinkPreview';
import { Backlink } from '../types';
import { GetSlackBacklinkPreviewInfoDocument } from './GetSlackBacklinkPreviewInfo.generated';
import { useOpenSlackConnectPopup } from './useOpenSlackConnectPopup';

export const SlackBacklinks = ({
  backlinks,
  videoId,
}: {
  backlinks: Backlink[];
  videoId: string;
}): JSX.Element => {
  const onAuthComplete = useCallback(() => {
    const gqlClient = getGraphQLClient();

    gqlClient.refetchQueries({
      include: [GetSlackBacklinkPreviewInfoDocument],
    });
  }, []);

  const openSlackConnectPopup = useOpenSlackConnectPopup({
    onAuthComplete,
  });

  return (
    <>
      {backlinks.map(backlink => (
        <SlackBacklinkPreview
          videoId={videoId}
          backlinkId={backlink.id}
          sourceLink={backlink.sourceLink}
          key={backlink.id}
          openSlackConnectPopup={openSlackConnectPopup}
        />
      ))}
    </>
  );
};
