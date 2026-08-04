import React, { useState, useCallback } from 'react';
import { Container, Text } from '@loomhq/lens';

import { WorkflowTemplateType } from '@js/globalTypes.generated';
import { ArtifactType } from '@js/common/workflows/common/types';

import { CreateTabBodyHeader } from './CreateTabBodyHeader';

export const CreateTabController: React.FC = () => {
  const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] =
    useState<WorkflowTemplateType>(WorkflowTemplateType.Sop);
  const [selectedArtifactType, setSelectedArtifactType] =
    useState<ArtifactType>(ArtifactType.Sop);

  // TODO use activeWorkflowType to determine which footer buttons to show
  const [activeWorkflowType, setActiveWorkflowType] = useState<
    'document' | 'message' | 'ticket'
  >('document');
  activeWorkflowType;

  // Documents, bug reports, and messages all show different footer button options
  const messageWorkflowOptions = useCallback(
    (
      messageType: WorkflowTemplateType.Email | WorkflowTemplateType.Chat,
      artifactType: ArtifactType
    ) => {
      setSelectedWorkflowTemplate(messageType);
      setSelectedArtifactType(artifactType);
      setActiveWorkflowType('message');
    },
    []
  );

  const bugReportWorkflowOptions = useCallback(() => {
    setSelectedWorkflowTemplate(WorkflowTemplateType.BugReport);
    setSelectedArtifactType(ArtifactType.Jira);
    setActiveWorkflowType('ticket');
  }, []);

  const documentWorkflowOptions = useCallback(
    (documentType: WorkflowTemplateType, artifactType: ArtifactType) => {
      setSelectedWorkflowTemplate(documentType);
      setSelectedArtifactType(artifactType);
      setActiveWorkflowType('document');
    },
    []
  );

  return (
    <Container padding="large">
      <CreateTabBodyHeader
        selectedWorkflowTemplate={selectedWorkflowTemplate}
        selectedArtifactType={selectedArtifactType}
        messageWorkflowOptions={messageWorkflowOptions}
        bugReportWorkflowOptions={bugReportWorkflowOptions}
        documentWorkflowOptions={documentWorkflowOptions}
      />
      {/* TODO: Add Document Editor Component for generated workflow documents */}
      <Container paddingTop="medium">
        <Text variant="body">
          Selected: {selectedWorkflowTemplate} ({selectedArtifactType})
        </Text>
      </Container>
    </Container>
  );
};
