import { useCurrentUserSelector } from '@js/common/current-user';
import { useVideoContext } from '@js/common/video-player';
import {
  ArtifactType,
  GENERATED_IMAGE_DELETION_METHOD,
  IssuePlatformType,
  WorkflowType,
} from '@js/common/workflows/common/types';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';

import * as analytics from '@js/utilities/analytics';
import { GENERATION_SOURCE } from '@loomhq/shared-utilities/constants/workflows';
import { withIdentifiers } from '../../../utilities/analytics/attribute-transformer';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

type DocumentOrTicket = 'document' | 'ticket';

export const useWorkflowsAnalytics = (): {
  createModalOpened(source: AiCreateModalOpenedSource): void;
  workflowSelected(
    artifactType: ArtifactType,
    artifactCategory?: WorkflowType,
    source?: string
  ): void;
  artifactGenerated(
    artifactType: ArtifactType,
    numberOfGeneratedImages?: number,
    timestampsOfGeneratedImages?: string[],
    generationSource?: GENERATION_SOURCE | null
  ): void;
  artifactCopied(
    artifactType: ArtifactType | null,
    numberOfGeneratedImages?: number,
    timestampsOfGeneratedImages?: string[]
  ): void;
  integrationLinkClicked(integrationType: IssuePlatformType): void;
  integrationCreateClicked(integrationType: IssuePlatformType): void;
  jiraIssueFormPrepopulated(hasTitle: boolean, hasDescription: boolean): void;
  jiraIssueFormSubmitted(hasTitle: boolean, hasDescription: boolean): void;
  jiraIssuePageOpened(): void;
  jiraIssueCreated(): void;
  linearIssueFormPrepopulated(hasTitle: boolean, hasDescription: boolean): void;
  linearIssueFormSubmitted(hasTitle: boolean, hasDescription: boolean): void;
  linearIssuePageOpened(): void;
  linearIssueCreated(): void;

  // 🚩 EXP_AI_WORKFLOWS_FOR_VIEWERS
  openViewerWorkflowsModal(workflowType: DocumentOrTicket): void;
  createViewerWorkflowsDocumentButtonClicked(
    workflowType: DocumentOrTicket
  ): void;
  createADocumentOptionSelected(label: string): void;
  viewerWorkflowsCopyTextButtonClicked(artifactType: ArtifactType | null): void;

  // Picture in Scripture related events
  generatedImageCopied(
    artifactType: ArtifactType | null,
    timestampOfGeneratedImage: string
  ): void;
  generatedImageDeleted(
    artifactType: ArtifactType | null,
    timestampOfGeneratedImage: string,
    deletionMethod: GENERATED_IMAGE_DELETION_METHOD
  ): void;
  regenerateButtonClicked(artifactType: ArtifactType | null): void;
  workflowImageToggleClicked(
    artifactType: ArtifactType | null,
    toggle_to: string
  ): void;
  workflowEdited(artifactType: ArtifactType): void;
} => {
  const userId = useCurrentUserSelector(user => user.id, null);
  const viewerWorkspaceId = useCurrentUserSelector(
    user => user.defaultWorkspaceId,
    null
  );
  const workspace = useGetSelectedWorkspace();
  const {
    video: {
      id: videoId,
      owner: { id: ownerId },
      organizationId: videoOrganizationId,
    },
  } = useVideoContext();

  const baseAnalyticsPayload = withIdentifiers(
    'useWorkflowsAnalytics baseAnalyticsPayload',
    AnalyticsEntityId.video(videoId, 'video_id'),
    AnalyticsEntityId.user(userId, 'user_id'),
    AnalyticsEntityId.workspace(
      workspace.organization_id,
      'string',
      'organization_id'
    )
  );

  const baseAnalyticsPayloadForViewersExperiment = withIdentifiers(
    'useWorkflowsAnalytics baseAnalyticsPayloadForViewersExperiment',
    AnalyticsEntityId.video(videoId, 'video_id'),
    AnalyticsEntityId.user(ownerId, 'video_owner_id'),
    AnalyticsEntityId.workspace(
      videoOrganizationId,
      'number',
      'video_workspace_id'
    ),
    AnalyticsEntityId.user(userId, 'viewer_id'),
    AnalyticsEntityId.workspace(
      viewerWorkspaceId,
      'number',
      'viewer_workspace_id'
    )
  );

  return {
    artifactCopied: (
      artifactType: ArtifactType | null,
      numberOfGeneratedImages?: number,
      timestampsOfGeneratedImages?: string[]
    ) => {
      analytics.track(ARTIFACT_COPIED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType || ''),
        number_of_generated_images: numberOfGeneratedImages,
        timestamp_of_generated_images: timestampsOfGeneratedImages,
      });
    },
    artifactGenerated: (
      artifactType: ArtifactType,
      numberOfGeneratedImages?: number,
      timestampsOfGeneratedImages?: string[],
      generationSource?: GENERATION_SOURCE | null
    ) => {
      analytics.track(ARTIFACT_GENERATED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        number_of_generated_images: numberOfGeneratedImages,
        timestamp_of_generated_images: timestampsOfGeneratedImages,
        generation_source: generationSource,
      });
    },
    createModalOpened: (source: AiCreateModalOpenedSource) => {
      analytics.track(AI_CREATE_MODAL_OPENED, {
        ...baseAnalyticsPayload,
        plan_type: workspace.type,
        role: workspace.memberRole,
        source,
      });
    },
    integrationCreateClicked: (integrationType: IssuePlatformType) => {
      analytics.track(INTEGRATION_CREATE_CLICKED, {
        ...baseAnalyticsPayload,
        integration_type: hyphenCaseToLowerSnakeCase(integrationType || ''),
      });
    },
    integrationLinkClicked: (integrationType: IssuePlatformType) => {
      analytics.track(INTEGRATION_LINK_CLICKED, {
        ...baseAnalyticsPayload,
        integration_type: hyphenCaseToLowerSnakeCase(integrationType || ''),
      });
    },
    jiraIssueCreated: () => {
      analytics.track(JIRA_ISSUE_CREATED, {
        ...baseAnalyticsPayload,
      });
    },
    jiraIssueFormPrepopulated: (hasTitle: boolean, hasDescription: boolean) => {
      analytics.track(JIRA_ISSUE_FORM_PREPOPULATED, {
        ...baseAnalyticsPayload,
        hasTitle,
        hasDescription,
      });
    },
    jiraIssueFormSubmitted: (hasTitle: boolean, hasDescription: boolean) => {
      analytics.track(JIRA_ISSUE_FORM_SUBMITTED, {
        ...baseAnalyticsPayload,
        hasTitle,
        hasDescription,
      });
    },
    jiraIssuePageOpened: () => {
      analytics.track(JIRA_ISSUE_PAGE_OPENED, {
        ...baseAnalyticsPayload,
      });
    },

    linearIssueCreated: () => {
      analytics.track(LINEAR_ISSUE_CREATED, {
        ...baseAnalyticsPayload,
      });
    },
    linearIssueFormPrepopulated: (
      hasTitle: boolean,
      hasDescription: boolean
    ) => {
      analytics.track(LINEAR_ISSUE_FORM_PREPOPULATED, {
        ...baseAnalyticsPayload,
        hasTitle,
        hasDescription,
      });
    },
    linearIssueFormSubmitted: (hasTitle: boolean, hasDescription: boolean) => {
      analytics.track(LINEAR_ISSUE_FORM_SUBMITTED, {
        ...baseAnalyticsPayload,
        hasTitle,
        hasDescription,
      });
    },
    linearIssuePageOpened: () => {
      analytics.track(LINEAR_ISSUE_PAGE_OPENED, {
        ...baseAnalyticsPayload,
      });
    },
    regenerateButtonClicked: (artifactType: ArtifactType) => {
      analytics.track(REGENERATE_BUTTON_CLICKED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
      });
    },
    workflowSelected: (
      artifactType: ArtifactType,
      artifactCategory?: WorkflowType,
      source?: string
    ) => {
      analytics.track(WORKFLOW_SELECTED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        artifact_category: artifactCategory,
        source,
      });
    },

    // 🚩 Start: EXP_AI_WORKFLOWS_FOR_VIEWERS
    // eslint-disable-next-line sort-keys
    createADocumentOptionSelected: (label: string) => {
      analytics.track(AI_WORKLOWS_FOR_VIEWERS_CREATE_DOCUMENT_OPTION_SELECTED, {
        documentOption: label,
        ...baseAnalyticsPayloadForViewersExperiment,
      });
    },
    createViewerWorkflowsDocumentButtonClicked: (
      workflowType: DocumentOrTicket
    ) => {
      analytics.track(AI_WORKLOWS_FOR_VIEWERS_CREATE_DOCUMENT_BUTTON_CLICKED, {
        workflowType,
        ...baseAnalyticsPayloadForViewersExperiment,
      });
    },
    openViewerWorkflowsModal: (workflowType: DocumentOrTicket) => {
      analytics.track(AI_WORKLOWS_FOR_VIEWERS_MODAL_OPENED, {
        trigger: `${workflowType}_button`,
        ...baseAnalyticsPayloadForViewersExperiment,
      });
    },
    viewerWorkflowsCopyTextButtonClicked: (
      artifactType: ArtifactType | null
    ) => {
      analytics.track(AI_WORKLOWS_FOR_VIEWERS_COPY_TEXT_BUTTON_CLICKED, {
        documentType: artifactType ?? 'unknown',
        ...baseAnalyticsPayloadForViewersExperiment,
      });
    },
    // 🚩 Start: Picture in Scripture
    // eslint-disable-next-line sort-keys
    generatedImageCopied: (
      artifactType: ArtifactType,
      timestampOfGeneratedImage
    ) => {
      analytics.track(GENERATED_IMAGE_COPIED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        timestamp_of_generated_image: timestampOfGeneratedImage,
      });
    },
    generatedImageDeleted: (
      artifactType: ArtifactType,
      timestampOfGeneratedImage,
      deletionMethod
    ) => {
      analytics.track(GENERATED_IMAGE_DELETED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        timestamp_of_generated_image: timestampOfGeneratedImage,
        deletion_method: deletionMethod,
      });
    },
    workflowEdited: (artifactType: ArtifactType) => {
      analytics.track(ARTIFACT_EDITED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
      });
    },
    workflowImageToggleClicked: (artifactType: ArtifactType, toggle_to) => {
      analytics.track(IMAGE_TOGGLE_CLICKED, {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        toggle_to,
      });
    },
  };
};

const hyphenCaseToLowerSnakeCase = (str: string) => {
  return str.replace(/-/g, '_').toLowerCase();
};

export const AI_CREATE_MODAL_OPENED =
  'ai_loom_artifact_type_selection_modal_opened';
export const WORKFLOW_SELECTED = 'ai_loom_artifact_type_selection_clicked';
export const ARTIFACT_GENERATED = 'ai_loom_artifact_generated';
export const ARTIFACT_COPIED = 'ai_loom_artifact_copy_action_invoked';
export const INTEGRATION_CREATE_CLICKED =
  'ai_loom_artifact_integration_create_cta_clicked';
export const INTEGRATION_LINK_CLICKED =
  'ai_loom_artifact_integration_link_cta_clicked';
export const JIRA_ISSUE_FORM_PREPOPULATED =
  'ai_loom_artifact_jira_issue_form_prepopulated';
export const JIRA_ISSUE_FORM_SUBMITTED =
  'ai_loom_artifact_jira_issue_form_submitted';
export const JIRA_ISSUE_PAGE_OPENED =
  'ai_loom_artifact_jira_issue_opened_in_jira';
export const JIRA_ISSUE_CREATED = 'ai_loom_artifact_jira_issue_created';
export const LINEAR_ISSUE_FORM_PREPOPULATED =
  'ai_loom_artifact_linear_issue_form_prepopulated';
export const LINEAR_ISSUE_FORM_SUBMITTED =
  'ai_loom_artifact_linear_issue_form_submitted';
export const LINEAR_ISSUE_PAGE_OPENED =
  'ai_loom_artifact_linear_issue_opened_in_linear';
export const LINEAR_ISSUE_CREATED = 'ai_loom_artifact_linear_issue_created';

// Picture in Scripture events
export const ARTIFACT_EDITED = 'ai_loom_artifact_edited';
export const GENERATED_IMAGE_DELETED =
  'ai_loom_artifact_generated_image_deleted';
export const IMAGE_TOGGLE_CLICKED = 'ai_loom_artifact_image_toggle_clicked';
export const GENERATED_IMAGE_COPIED = 'ai_loom_artifact_generated_image_copied';
export const REGENERATE_BUTTON_CLICKED =
  'ai_loom_artifact_regenerate_button_clicked';

// 🚩 Start: EXP_AI_WORKFLOWS_FOR_VIEWERS
export const AI_WORKLOWS_FOR_VIEWERS_MODAL_OPENED =
  'AI Workflows For Viewers Modal Opened';
export const AI_WORKLOWS_FOR_VIEWERS_CREATE_DOCUMENT_BUTTON_CLICKED =
  'AI Workflows For Viewers Create Document Button Clicked';
export const AI_WORKLOWS_FOR_VIEWERS_CREATE_DOCUMENT_OPTION_SELECTED =
  'AI Workflows For Viewers Create Document Option Selected';
export const AI_WORKLOWS_FOR_VIEWERS_COPY_TEXT_BUTTON_CLICKED =
  'AI Workflows For Viewers Copy Text Button Clicked';
// 🚩 End: EXP_AI_WORKFLOWS_FOR_VIEWERS

export enum AiCreateModalOpenedSource {
  CREATE_CTA = 'create_cta',
  NEW_ENTRY_POINT = 'new_entry_point',
}
