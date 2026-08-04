import React, { useCallback, useState, useMemo } from 'react';
import {
  Container,
  Spacer,
  TextButton,
  IconButton,
  Dropdown,
  Arrange,
  Icon,
  Text,
  Select,
} from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';
import { SvgMoreHoriz } from '@loomhq/lens/icons/more-horiz';
import { SvgCopy } from '@loomhq/lens/icons/copy';
import { SvgImageStrikethrough } from '@loomhq/lens/icons/image-strikethrough';
import { SvgImage1 as SvgImageNonStrikethrough } from '@loomhq/lens/icons/image1';
import { SvgRefresh } from '@loomhq/lens/icons/refresh';

import {
  WorkflowTemplateType,
  VideoAccessLevel,
} from '@js/globalTypes.generated';
import { ArtifactType, WorkflowType } from '@js/common/workflows/common/types';
import { useWorkflowsAnalytics } from '@js/common/workflows/common/useWorkflowsAnalytics';
import { useGetPeopleAccessQuery } from '@js/components/looms/calendar/GetPeopleAccess.generated';

import { AiContentInnerText } from '@js/pages/share/common/loom-ai-panel';
import { WORKFLOW_TEMPLATE_OPTIONS } from './constants';
import { useVideoContext } from '@js/common/video-player/context';

enum VisibilityOption {
  VISIBLE_TO_VIEWERS = 'Visible to viewers',
  ONLY_YOU_CAN_VIEW = 'Only you can view',
  ONLY_EDITORS = 'Only editors can view',
}

interface CreateTabBodyHeaderProps {
  selectedWorkflowTemplate: WorkflowTemplateType;
  selectedArtifactType: ArtifactType;
  messageWorkflowOptions: (
    messageType: WorkflowTemplateType.Email | WorkflowTemplateType.Chat,
    artifactType: ArtifactType
  ) => void;
  bugReportWorkflowOptions: () => void;
  documentWorkflowOptions: (
    documentType: WorkflowTemplateType,
    artifactType: ArtifactType
  ) => void;
}

const WorkflowTemplateDropdown = ({
  selectedWorkflowTemplate,
  handleWorkflowTemplateChange,
}: {
  selectedWorkflowTemplate: WorkflowTemplateType;
  handleWorkflowTemplateChange: (option: {
    value: string;
    title: React.ReactNode;
    icon?: React.ReactNode;
  }) => void;
}) => {
  return (
    <Select
      trigger={(triggerContent, buttonProps) => (
        <Container radius="full" backgroundColor="offWhite">
          <TextButton
            {...buttonProps}
            icon={<Icon size="16px" icon={<SvgChevronDown />} />}
            iconPosition="right"
            style={{ borderRadius: 'var(--lns-radius-full)' }}
          >
            <Arrange gap="small">
              <Icon icon={triggerContent.icon} size="16px" />
              <Text size="body-sm" fontWeight="bold">
                {triggerContent.title}
              </Text>
            </Arrange>
          </TextButton>
        </Container>
      )}
      selectedOptionValue={selectedWorkflowTemplate}
      options={WORKFLOW_TEMPLATE_OPTIONS}
      menuMinWidth={20}
      menuMaxWidth={28}
      onChange={handleWorkflowTemplateChange}
    />
  );
};

const ImageVisibilityToggle = ({
  displayGeneratedImages,
  handleToggleImages,
}: {
  displayGeneratedImages: boolean;
  handleToggleImages: () => void;
}) => {
  return (
    <Container radius="full" backgroundColor="offWhite">
      {displayGeneratedImages ? (
        <TextButton
          icon={<Icon size="16px" icon={<SvgImageStrikethrough />} />}
          onClick={handleToggleImages}
          style={{ borderRadius: 'var(--lns-radius-full)' }}
        >
          <Text size="body-sm" fontWeight="bold">
            Hide images
          </Text>
        </TextButton>
      ) : (
        <TextButton
          icon={<Icon size="16px" icon={<SvgImageNonStrikethrough />} />}
          onClick={handleToggleImages}
          style={{ borderRadius: 'var(--lns-radius-full)' }}
        >
          <Text size="body-sm" fontWeight="bold">
            Show images
          </Text>
        </TextButton>
      )}
    </Container>
  );
};

const CopyButton = ({ handleCopy }: { handleCopy: () => void }) => {
  return (
    <Container radius="full" backgroundColor="offWhite">
      <TextButton
        icon={<Icon size="16px" icon={<SvgCopy />} />}
        onClick={handleCopy}
        style={{ borderRadius: 'var(--lns-radius-full)' }}
      >
        <Text size="body-sm" fontWeight="bold">
          Copy
        </Text>
      </TextButton>
    </Container>
  );
};

const MoreActionsDropdown = ({
  handleRegenerate,
}: {
  handleRegenerate: () => void;
}) => {
  return (
    <Dropdown
      trigger={
        <IconButton
          size="small"
          altText="More actions"
          icon={<Icon size="16px" icon={<SvgMoreHoriz />} />}
          backgroundColor="offWhite"
          style={{
            width: '36px',
            height: '32px',
            borderRadius: 'var(--lns-radius-full)',
          }}
        />
      }
      options={[
        {
          title: 'Regenerate',
          icon: <SvgRefresh />,
          onClick: handleRegenerate,
        },
      ]}
    />
  );
};

const ToggleVisibilityDropdown = ({
  currentDisplayText,
  options,
}: {
  currentDisplayText: string;
  options: Array<{
    title: string;
    onClick: () => void;
  }>;
}) => {
  return (
    <Dropdown
      trigger={
        <TextButton
          icon={<Icon size="16px" icon={<SvgChevronDown />} />}
          iconPosition="right"
        >
          <Text size="body-sm" fontWeight="bold">
            {currentDisplayText}
          </Text>
        </TextButton>
      }
      options={options}
    />
  );
};

export const CreateTabBodyHeader: React.FC<CreateTabBodyHeaderProps> = ({
  selectedWorkflowTemplate,
  selectedArtifactType,
  messageWorkflowOptions,
  bugReportWorkflowOptions,
  documentWorkflowOptions,
}) => {
  const [displayGeneratedImages, setDisplayGeneratedImages] = useState(true);
  const [isVisibleToViewers, setIsVisibleToViewers] = useState(false);

  const analytics = useWorkflowsAnalytics();
  const { video } = useVideoContext();

  // Change option display text based on whether there are multiple editors
  const { data: aclData } = useGetPeopleAccessQuery({
    variables: { videoId: video?.id as string },
    skip: !video?.id,
  });

  const hasMultipleEditors = useMemo(() => {
    if (
      !aclData?.aclResult ||
      aclData.aclResult.__typename !== 'GetVideoAclEntriesPayload'
    ) {
      return false;
    }

    const peopleEntries = aclData.aclResult.entrySet?.peopleEntries ?? [];
    const editorsCount = peopleEntries.filter(
      entry => entry?.access === VideoAccessLevel.Readwrite
    ).length;

    return editorsCount >= 1;
  }, [aclData]);

  // Get and cache visibility dropdown display text & options
  // Show different text based on whether there are multiple editors
  const visibilityDropdownData = useMemo(() => {
    const restrictedText = hasMultipleEditors
      ? VisibilityOption.ONLY_EDITORS
      : VisibilityOption.ONLY_YOU_CAN_VIEW;

    const currentDisplayText = isVisibleToViewers
      ? VisibilityOption.VISIBLE_TO_VIEWERS
      : restrictedText;

    const options = [
      {
        title: VisibilityOption.VISIBLE_TO_VIEWERS,
        onClick: () => setIsVisibleToViewers(true),
      },
      {
        title: restrictedText,
        onClick: () => setIsVisibleToViewers(false),
      },
    ];

    return { currentDisplayText, options };
  }, [isVisibleToViewers, hasMultipleEditors]);

  const handleWorkflowTemplateChange = useCallback(
    (option: {
      value: string;
      title: React.ReactNode;
      icon?: React.ReactNode;
    }) => {
      const selectedOption = WORKFLOW_TEMPLATE_OPTIONS.find(
        opt => opt.value === option.value
      );
      if (!selectedOption) {
        return;
      }

      const workflowTemplateType = selectedOption.value;
      switch (workflowTemplateType) {
        case WorkflowTemplateType.Chat:
          messageWorkflowOptions(WorkflowTemplateType.Chat, ArtifactType.Chat);
          break;
        case WorkflowTemplateType.Email:
          messageWorkflowOptions(
            WorkflowTemplateType.Email,
            ArtifactType.Email
          );
          break;
        case WorkflowTemplateType.BugReport:
          bugReportWorkflowOptions();
          break;
        case WorkflowTemplateType.Sop:
          documentWorkflowOptions(WorkflowTemplateType.Sop, ArtifactType.Sop);
          break;
        case WorkflowTemplateType.StepByStep:
          documentWorkflowOptions(
            WorkflowTemplateType.StepByStep,
            ArtifactType.StepByStep
          );
          break;
        case WorkflowTemplateType.PrDescription:
          documentWorkflowOptions(
            WorkflowTemplateType.PrDescription,
            ArtifactType.PrDescription
          );
          break;
        case WorkflowTemplateType.QaSteps:
          documentWorkflowOptions(
            WorkflowTemplateType.QaSteps,
            ArtifactType.QaSteps
          );
          break;
        case WorkflowTemplateType.CodeDocs:
          documentWorkflowOptions(
            WorkflowTemplateType.CodeDocs,
            ArtifactType.CodeDocs
          );
          break;
        default:
          break;
      }

      analytics.workflowSelected(
        selectedOption.artifactType,
        selectedOption.value as WorkflowType,
        'create_tab_header_dropdown'
      );
    },
    [
      messageWorkflowOptions,
      bugReportWorkflowOptions,
      documentWorkflowOptions,
      analytics,
    ]
  );

  const handleToggleImages = useCallback(() => {
    // TODO IMPLEMENT TOGGLE IMAGES FUNCTIONALITY
    const newValue = !displayGeneratedImages;
    setDisplayGeneratedImages(newValue);

    analytics.workflowImageToggleClicked(
      selectedArtifactType,
      newValue ? 'show' : 'hide'
    );
  }, [displayGeneratedImages, analytics, selectedArtifactType]);

  const handleCopy = useCallback(() => {
    // TODO IMPLEMENT COPY FUNCTIONALITY
    analytics.artifactCopied(selectedArtifactType);
  }, [analytics, selectedArtifactType]);

  const handleRegenerate = useCallback(() => {
    // TODO IMPLEMENT REGENERATE FUNCTIONALITY
    analytics.regenerateButtonClicked(selectedArtifactType);
  }, [analytics, selectedArtifactType]);

  return (
    <Container paddingBottom="xsmall">
      <AiContentInnerText />

      <Spacer top="medium">
        <Arrange justifyContent="space-between" alignItems="center">
          <Arrange gap="small" alignItems="center">
            <WorkflowTemplateDropdown
              selectedWorkflowTemplate={selectedWorkflowTemplate}
              handleWorkflowTemplateChange={handleWorkflowTemplateChange}
            />
            <ImageVisibilityToggle
              displayGeneratedImages={displayGeneratedImages}
              handleToggleImages={handleToggleImages}
            />
            <CopyButton handleCopy={handleCopy} />
            <MoreActionsDropdown handleRegenerate={handleRegenerate} />
          </Arrange>

          <ToggleVisibilityDropdown
            currentDisplayText={visibilityDropdownData.currentDisplayText}
            options={visibilityDropdownData.options}
          />
        </Arrange>
      </Spacer>
    </Container>
  );
};
