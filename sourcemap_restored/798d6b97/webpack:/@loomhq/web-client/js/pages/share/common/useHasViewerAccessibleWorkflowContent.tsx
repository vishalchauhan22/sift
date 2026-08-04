import {
  useViewerAccessibleWorkflowContentQuery,
  ViewerAccessibleWorkflowContentQuery,
} from '@js/pages/share/common/ViewerAccessibleWorkflowContent.generated';
import { useVideoContext } from '@js/common/video-player';
import { WorkflowTemplateType } from '@js/globalTypes.generated';
import { ArtifactType } from '@js/common/workflows/common/types';

type ViewerWorkflowConfig = {
  workflowType: 'ticket' | 'message' | 'document';
  workflowTemplate: WorkflowTemplateType;
  artifactType: ArtifactType;
};

// Extract the payload type from the generated GraphQL types
type WorkflowContentPayload = Extract<
  ViewerAccessibleWorkflowContentQuery['viewerAccessibleWorkflowContent'],
  { __typename: 'ViewerAccessibleWorkflowContentPayload' }
>;

type ViewerAccessibleWorkflowContentReturn = {
  hasPublicContent: boolean;
  loading: boolean;
  viewerWorkflowConfig: ViewerWorkflowConfig | null;
  workflowData: WorkflowContentPayload | null;
};

export const useHasViewerAccessibleWorkflowContent = (
  skipCondition?: boolean
): ViewerAccessibleWorkflowContentReturn => {
  const { video } = useVideoContext();

  const { data: workflowData, loading: workflowLoading } =
    useViewerAccessibleWorkflowContentQuery({
      variables: { videoId: video?.id as string },
      skip: !video?.id || Boolean(skipCondition),
    });

  const workflowContentPayload =
    workflowData?.viewerAccessibleWorkflowContent?.__typename ===
    'ViewerAccessibleWorkflowContentPayload'
      ? workflowData.viewerAccessibleWorkflowContent
      : null;

  const hasDocumentContent = Boolean(
    workflowContentPayload?.viewerAccessibleDocument
  );
  const hasIssueContent = Boolean(
    workflowContentPayload?.viewerAccessibleIssue
  );

  // Determine the workflow configuration based on available content
  const getViewerWorkflowConfig = () => {
    if (hasIssueContent) {
      return {
        workflowType: 'ticket' as const,
        workflowTemplate: WorkflowTemplateType.BugReport,
        artifactType: ArtifactType.Jira,
      };
    } else if (hasDocumentContent) {
      const documentType = workflowContentPayload?.viewerAccessibleDocument
        ?.documentType as WorkflowTemplateType;

      // Map the documentType to the appropriate workflow template and artifact type
      return determineWorkflowConfigFromDocumentType(documentType);
    }
    return null;
  };

  // Helper function to determine workflow config from document type
  const determineWorkflowConfigFromDocumentType = (
    documentType: WorkflowTemplateType | null
  ) => {
    if (!documentType) {
      return {
        workflowType: 'document' as const,
        workflowTemplate: WorkflowTemplateType.Sop,
        artifactType: ArtifactType.Sop,
      };
    }

    if (
      documentType === WorkflowTemplateType.Email ||
      documentType === WorkflowTemplateType.Chat
    ) {
      return {
        workflowType: 'message' as const,
        workflowTemplate: documentType,
        artifactType:
          documentType === WorkflowTemplateType.Email
            ? ArtifactType.Email
            : ArtifactType.Chat,
      };
    }

    return {
      workflowType: 'document' as const,
      workflowTemplate: documentType,
      artifactType: documentType as unknown as ArtifactType, // They should match 1:1
    };
  };

  const hasPublicContent = Boolean(hasDocumentContent || hasIssueContent);
  const loading = workflowLoading;
  const viewerWorkflowConfig = getViewerWorkflowConfig();

  return {
    hasPublicContent,
    loading,
    viewerWorkflowConfig,
    workflowData: workflowContentPayload,
  };
};
