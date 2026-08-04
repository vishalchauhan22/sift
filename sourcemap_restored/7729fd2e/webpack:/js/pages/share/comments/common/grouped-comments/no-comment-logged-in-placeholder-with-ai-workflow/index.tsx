//  🚩 Start: EXP_AI_WORKFLOWS_FOR_VIEWERS
import React from 'react';

import { Spacer, Text } from '@loomhq/lens';

export const NoCommentsPlaceholderWithAiWorkflow = (): JSX.Element => {
  return (
    <div className="text:center">
      <Spacer top={8} />
      <Text fontWeight="bold" size="body-lg">
        No comments … yet
      </Text>

      <Spacer top={1} bottom={2}>
        <Text color="bodyDimmed">Be the first to chime in</Text>
      </Spacer>
    </div>
  );
};

//  🚩 End: EXP_AI_WORKFLOWS_FOR_VIEWERS
