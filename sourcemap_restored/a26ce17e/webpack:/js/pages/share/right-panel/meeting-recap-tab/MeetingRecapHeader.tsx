import React from 'react';

import { Button, Container, Dropdown, Spacer, Text } from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';

import { SUPPORTED_REGENERATION_TYPES } from '@loomhq/shared-utilities/constants/meetingRecordings';
import {
  ControlType,
  FEATURE_GATES,
} from '@loomhq/shared-utilities/constants/statsig';
import { MeetingTypeEnum } from '@loomhq/shared-utilities/constants/videoProperties';

import { MEETING_RECAP } from '@js/constants/sharePage';

import { useAnalytics } from '@js/common/analytics/atlassian-analytics/useAnalytics';

import { useFeatureFlagValue } from '@js/hooks/featureFlag';

import { GeneratedByLoom } from '@js/pages/share/common/generated-by-loom';

import styles from './styles.module.css';

interface MeetingRecapHeaderProps {
  videoId: string;
  workspaceId?: string;
  hasRegenerationAccess: boolean;
  meetingSummaryType: MeetingTypeEnum | undefined;
  meetingSummaryOptions: {
    title: string;
    onClick: () => void;
    selected: boolean;
  }[];
  isLoading: boolean;
  hasErrored: boolean;
}

export const MeetingRecapHeader = ({
  videoId,
  workspaceId,
  hasRegenerationAccess,
  meetingSummaryType,
  meetingSummaryOptions,
  isLoading = false,
  hasErrored = false,
}: MeetingRecapHeaderProps): JSX.Element => {
  const isMeetingRecordingRegenerationEnabled = useFeatureFlagValue(
    FEATURE_GATES.MEETING_RECORDING_REGENERATION,
    ControlType.STATSIG_FEATURE_GATE
  );

  const { sendUiEvent } = useAnalytics();

  const disableRegeneration = isLoading || hasErrored;

  return (
    <Container className={styles.meetingRecapHeader}>
      <Container marginBottom="large">
        <Text size="heading-sm" htmlTag="h2" style={{ width: 'fit-content' }}>
          {MEETING_RECAP}
        </Text>
        <Spacer bottom="xsmall" />
        <GeneratedByLoom />
      </Container>
      {isMeetingRecordingRegenerationEnabled && hasRegenerationAccess ? (
        // As the dropdown component does not respect the disabled state of the trigger button,
        // the disable button must be rendered separately
        disableRegeneration ? (
          <Button
            icon={<SvgChevronDown />}
            iconPosition="right"
            isDisabled={disableRegeneration}
            hasLoader={isLoading}
          >
            {meetingSummaryType
              ? SUPPORTED_REGENERATION_TYPES.get(meetingSummaryType)
              : 'Auto template'}
          </Button>
        ) : (
          <Dropdown
            trigger={
              <Button icon={<SvgChevronDown />} iconPosition="right">
                {meetingSummaryType
                  ? SUPPORTED_REGENERATION_TYPES.get(meetingSummaryType)
                  : 'Auto template'}
              </Button>
            }
            triggerOffset={5}
            menuPosition="right"
            options={meetingSummaryOptions}
            onOpenChange={isOpen => {
              if (isOpen) {
                sendUiEvent({
                  action: 'opened',
                  actionSubject: 'meetingRecordingsTemplateDropdownMenu',
                  attributes: {
                    videoId,
                    organizationId: workspaceId,
                  },
                  source: 'meetingRecapTab',
                });
              }
            }}
          />
        )
      ) : (
        <></>
      )}
    </Container>
  );
};
