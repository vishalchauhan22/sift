import {
  COPY_TRANSCRIPT_TEXT,
  COPIED_TO_CLIPBOARD_TEXT,
} from '@js/common/transcripts';
import { TRANSCRIPTION_COPIED } from '@js/constants/events';
import * as analytics from '@js/utilities/analytics';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';
import { Transcript } from '@loomhq/shared-utilities';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import React, { useState } from 'react';
import { CopyButtonComponent } from './component';
import { useCopyTranscript } from './useCopyTranscript';
import { useCurrentUserIsOwner } from '@js/hooks/useCurrentUserIsOwner';

type CopyButtonControllerProps = {
  transcript: Transcript;
  videoId: string;
};

export const CopyButtonController = ({
  transcript,
  videoId,
}: CopyButtonControllerProps): JSX.Element => {
  const [copyTooltipContent, setCopyTooltipContent] =
    useState<string>(COPY_TRANSCRIPT_TEXT);
  const currentUserIsOwner = useCurrentUserIsOwner({ videoId });

  const copyTranscript = useCopyTranscript({
    transcript,
  });

  const handleCopyClick = () => {
    setCopyTooltipContent(COPIED_TO_CLIPBOARD_TEXT);
    copyTranscript();

    analytics.track(TRANSCRIPTION_COPIED, {
      ...withIdentifiers(
        TRANSCRIPTION_COPIED,
        AnalyticsEntityId.video(videoId, 'video_id')
      ),
      currentUserIsOwner,
    });
  };

  return (
    <CopyButtonComponent
      onCopyClick={handleCopyClick}
      tooltipContent={copyTooltipContent}
    />
  );
};
