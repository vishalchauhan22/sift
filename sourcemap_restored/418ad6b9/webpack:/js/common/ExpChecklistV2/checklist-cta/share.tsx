import { GET_STARTED_CHECKLIST_LEARN_HOW_TO_SHARE_CLICKED } from '@js/constants/events';

import {
  ChecklistV2DisplayContext,
  CopyLinkOrRecordButtons,
} from '@js/common/ExpChecklistV2';
import React from 'react';

import { Button, Spacer, Text } from '@loomhq/lens';

import * as analytics from '@js/utilities/analytics';

export const ShareCta = ({
  displayContext,
  hasRecordedFirstVideo = false,
}: {
  displayContext: ChecklistV2DisplayContext;
  hasRecordedFirstVideo: boolean;
}): JSX.Element => {
  return (
    <>
      <Text color="bodyDimmed">
        {hasRecordedFirstVideo
          ? 'Now it’s time to get some views. Try sharing your last video.'
          : 'Record a Loom first to start sharing it with your team.'}
      </Text>
      <Spacer top="medium" />
      <Button
        size={
          displayContext === ChecklistV2DisplayContext.Full ? 'medium' : 'small'
        }
        hasFullWidth={true}
        href="https://www.loom.com/share/29f210bc12484eaa81ca462381fb4415?t=0"
        target="_blank"
        htmlTag="a"
        onClick={() => {
          analytics.track(GET_STARTED_CHECKLIST_LEARN_HOW_TO_SHARE_CLICKED, {
            displayContext,
          });
        }}
      >
        Learn how to share
      </Button>
      {displayContext !== ChecklistV2DisplayContext.Full && (
        <>
          <Spacer top="small" />
          <CopyLinkOrRecordButtons
            includeUploadButton={false}
            includeShareButton={false}
            displayContext={displayContext}
          />
        </>
      )}
    </>
  );
};
