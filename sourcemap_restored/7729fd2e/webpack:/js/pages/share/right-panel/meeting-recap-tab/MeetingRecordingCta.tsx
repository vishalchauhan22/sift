import React from 'react';

import { Arrange, Container, Split, Text } from '@loomhq/lens';
import { useHasAIFeatureAccess } from '@js/hooks/useHasAIFeatureAccess';
import { useIsTrialingAIAddOn } from '@js/hooks/useIsTrialingAIAddOn';
import { useNeedsToUpgradeToAi } from '@js/hooks/useNeedsToUpgradeToAi';
import { useWorkspaceAllowsAi } from '@js/hooks/useWorkspaceAllowsAi';

import { LoomAiPanel } from '@js/pages/share/common/loom-ai-panel';

export const MeetingRecordingCta = ({
  showCta,
}: {
  showCta: boolean;
}): JSX.Element | null => {
  const workspaceHasAiAccess = useHasAIFeatureAccess();
  const workspaceIsTrialingAi = useIsTrialingAIAddOn();
  const workspaceAiAllowed = useWorkspaceAllowsAi();
  const needsToUpgradeToAi = useNeedsToUpgradeToAi();

  if (needsToUpgradeToAi) {
    return <LoomAiPanel aiStatus="success" />;
  }

  // Else show this if the workspace has AI (via plan or trial) but no summary on the meeting recording
  if (showCta) {
    return (
      <Container
        borderSide="all"
        backgroundColor="background"
        borderColor="border"
        marginBottom="large"
        paddingX="medium"
        paddingY="medium"
        radius="large"
      >
        <Split justifyContent="space-between" gap="medium">
          <Arrange gap="xsmall" autoFlow="row">
            <Arrange gap="xsmall">
              <Text size="body-lg" fontWeight="bold">
                The Loom AI recap is unavailable
              </Text>
            </Arrange>
            <Text>
              Unfortunately the Loom AI recap is unavailable for this meeting.
              {workspaceHasAiAccess &&
              workspaceAiAllowed &&
              !workspaceIsTrialingAi
                ? ' If you recently upgraded, any new meetings will be summarized with Loom AI.'
                : ' If you think this is an error, please contact support.'}
            </Text>
          </Arrange>
        </Split>
      </Container>
    );
  }

  return null;
};
