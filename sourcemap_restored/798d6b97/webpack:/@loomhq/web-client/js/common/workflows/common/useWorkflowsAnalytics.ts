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
  createTabOpened(source: AiCreateTabOpenedSource): void;
  createTabScreenViewed(
    accessType: 'editor' | 'viewer' | 'none',
    properties: {
      experimentVariant: boolean;
      workspaceAiEnabled: boolean;
      userAiAccess: boolean;
      videoHasPublicContent: boolean;
      userCanEdit: boolean;
      videoNoAccess: boolean;
      isOwner?: boolean;
      isEmptyState?: boolean;
      recommendedDocument?: string | null;
    }
  ): void;
  createTabOpenedWorkflowTypeSelectionDropdown(
    isLoggedIn: boolean,
    isOwner: boolean
  ): void;
  createTabOpenedVisibilitySelectionDropdown(
    isLoggedIn: boolean,
    isOwner: boolean,
    artifactType: ArtifactType | null,
    viewSetting: 'private' | 'all'
  ): void;
  createTabSelectedVisibilityFromDropdown(
    isLoggedIn: boolean,
    isOwner: boolean,
    recommendation: boolean,
    artifactType: ArtifactType | null,
    viewSetting: 'private' | 'all',
    visibility: boolean,
    workflowTemplate: string,
    isViewerExperience?: boolean,
    isCreateTab?: boolean
  ): void;
  workflowSelected(
    artifactType: ArtifactType,
    artifactCategory?: WorkflowType,
    source?: string,
    isRecommended?: boolean,
    isCreateTab?: boolean,
    isLoggedIn?: boolean,
    isOwner?: boolean
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
    timestampsOfGeneratedImages?: string[],
    isViewerExperience?: boolean,
    isCreateTab?: boolean,
    isLoggedIn?: boolean,
    isOwner?: boolean,
    isRecommended?: boolean,
    source?: string
  ): void;
  integrationLinkClicked(
    integrationType: IssuePlatformType,
    isCreateTab?: boolean
  ): void;
  integrationCreateClicked(
    integrationType: IssuePlatformType,
    isCreateTab?: boolean
  ): void;
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
  regenerateButtonClicked(
    artifactType: ArtifactType | null,
    isCreateTab?: boolean
  ): void;
  workflowImageToggleClicked(
    artifactType: ArtifactType | null,
    toggle_to: string,
    isViewerExperience?: boolean,
    isCreateTab?: boolean
  ): void;
  changePublishedDocumentTypeModalCanceled(): void;
  changePublishedDocumentTypeModalConfirmed(): void;
  workflowEdited(artifactType: ArtifactType): void;
  createTabBackButtonClicked(source: string, isCreateTab?: boolean): void;
  platformButtonShown(platformType: string, source: string): void;
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
      timestampsOfGeneratedImages?: string[],
      isViewerExperience?: boolean,
      isCreateTab?: boolean,
      isLoggedIn?: boolean,
      isOwner?: boolean,
      isRecommended?: boolean,
      source?: string
    ) => {
      const payload: {
        artifact_type: string;
        number_of_generated_images: number | undefined;
        timestamp_of_generated_images: string[] | undefined;
        is_viewer_experience?: boolean;
        is_create_tab?: boolean;
        is_logged_in?: boolean;
        is_owner?: boolean;
        is_recommended?: boolean;
        source?: string;
      } = {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType || ''),
        number_of_generated_images: numberOfGeneratedImages,
        timestamp_of_generated_images: timestampsOfGeneratedImages,
        is_logged_in: isLoggedIn,
        is_owner: isOwner,
        is_recommended: isRecommended,
        source,
      };

      // Only include is_viewer_experience if it's true to not interfere with existing metrics
      if (isViewerExperience) {
        payload.is_viewer_experience = true;
      }

      // Only include is_create_tab if it's true to not interfere with existing metrics
      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(ARTIFACT_COPIED, payload);
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
    changePublishedDocumentTypeModalCanceled: () => {
      analytics.track(CHANGE_PUBLISHED_DOCUMENT_TYPE_MODAL_CANCELED, {
        ...baseAnalyticsPayload,
      });
    },
    changePublishedDocumentTypeModalConfirmed: () => {
      analytics.track(CHANGE_PUBLISHED_DOCUMENT_TYPE_MODAL_CONFIRMED, {
        ...baseAnalyticsPayload,
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
    createTabBackButtonClicked: (source: string, isCreateTab?: boolean) => {
      const payload: {
        source: string;
        is_create_tab?: boolean;
      } = {
        ...baseAnalyticsPayload,
        source,
      };

      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(CREATE_TAB_BACK_BUTTON_CLICKED, payload);
    },
    createTabOpened: (source: AiCreateTabOpenedSource) => {
      analytics.track(AI_CREATE_TAB_OPENED, {
        ...baseAnalyticsPayload,
        plan_type: workspace.type,
        role: workspace.memberRole,
        source,
      });
    },
    createTabOpenedVisibilitySelectionDropdown: (
      isLoggedIn: boolean,
      isOwner: boolean,
      artifactType: ArtifactType | null,
      viewSetting: 'private' | 'all'
    ) => {
      analytics.track(CREATE_TAB_OPENED_VISIBILITY_SELECTION_DROPDOWN, {
        ...baseAnalyticsPayload,
        plan_type: workspace.type,
        role: workspace.memberRole,
        source: 'createTabDocumentScreen',
        is_logged_in: isLoggedIn,
        is_owner: isOwner,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType || ''),
        view_setting: viewSetting,
      });
    },
    createTabOpenedWorkflowTypeSelectionDropdown: (
      isLoggedIn: boolean,
      isOwner: boolean
    ) => {
      analytics.track(CREATE_TAB_OPENED_WORKFLOW_TYPE_SELECTION_DROPDOWN, {
        ...baseAnalyticsPayload,
        plan_type: workspace.type,
        role: workspace.memberRole,
        source: 'createTabDocumentScreen',
        is_logged_in: isLoggedIn,
        is_owner: isOwner,
      });
    },
    createTabScreenViewed: (
      accessType: 'editor' | 'viewer' | 'none',
      properties: {
        experimentVariant: boolean;
        workspaceAiEnabled: boolean;
        userAiAccess: boolean;
        videoHasPublicContent: boolean;
        userCanEdit: boolean;
        videoNoAccess: boolean;
        isOwner?: boolean;
        isEmptyState?: boolean;
        recommendedDocument?: string | null;
      }
    ) => {
      const payload: {
        plan_type: string;
        role: string;
        access_type: string;
        experiment_variant: boolean;
        workspace_ai_enabled: boolean;
        user_ai_access: boolean;
        video_has_public_content: boolean;
        user_can_edit: boolean;
        video_no_access: boolean;
        is_owner?: boolean;
        is_empty_state?: boolean;
        recommended_document?: string | null;
      } = {
        ...baseAnalyticsPayload,
        plan_type: workspace.type,
        role: workspace.memberRole,
        access_type: accessType,
        experiment_variant: properties.experimentVariant,
        workspace_ai_enabled: properties.workspaceAiEnabled,
        user_ai_access: properties.userAiAccess,
        video_has_public_content: properties.videoHasPublicContent,
        user_can_edit: properties.userCanEdit,
        video_no_access: properties.videoNoAccess,
      };

      // Only include optional properties if they are provided
      if (properties.isOwner !== undefined) {
        payload.is_owner = properties.isOwner;
      }
      if (properties.isEmptyState !== undefined) {
        payload.is_empty_state = properties.isEmptyState;
      }
      if (
        properties.recommendedDocument !== undefined &&
        properties.recommendedDocument !== null
      ) {
        payload.recommended_document = properties.recommendedDocument;
      }

      analytics.track(CREATE_TAB_SCREEN_VIEWED, payload);
    },
    createTabSelectedVisibilityFromDropdown: (
      isLoggedIn: boolean,
      isOwner: boolean,
      recommendation: boolean,
      artifactType: ArtifactType | null,
      viewSetting: 'private' | 'all',
      visibility: boolean,
      workflowTemplate: string,
      isViewerExperience?: boolean,
      isCreateTab?: boolean
    ) => {
      const payload: any = {
        ...baseAnalyticsPayload,
        plan_type: workspace.type,
        role: workspace.memberRole,
        source: 'documentViewSettingsDropdownMenu',
        is_logged_in: isLoggedIn,
        is_owner: isOwner,
        recommendation,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType || ''),
        view_setting: viewSetting,
        visibility,
        workflow_template: hyphenCaseToLowerSnakeCase(workflowTemplate),
      };

      // Only include is_viewer_experience if it's true to not interfere with existing metrics
      if (isViewerExperience) {
        payload.is_viewer_experience = true;
      }

      // Only include is_create_tab if it's true to not interfere with existing metrics
      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(CREATE_TAB_SELECTED_VISIBILITY_FROM_DROPDOWN, payload);
    },
    integrationCreateClicked: (
      integrationType: IssuePlatformType,
      isCreateTab?: boolean
    ) => {
      const payload: {
        integration_type: string;
        is_create_tab?: boolean;
      } = {
        ...baseAnalyticsPayload,
        integration_type: hyphenCaseToLowerSnakeCase(integrationType || ''),
      };

      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(INTEGRATION_CREATE_CLICKED, payload);
    },
    integrationLinkClicked: (
      integrationType: IssuePlatformType,
      isCreateTab?: boolean
    ) => {
      const payload: {
        integration_type: string;
        is_create_tab?: boolean;
      } = {
        ...baseAnalyticsPayload,
        integration_type: hyphenCaseToLowerSnakeCase(integrationType || ''),
      };

      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(INTEGRATION_LINK_CLICKED, payload);
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
    platformButtonShown: (platformType: string, source: string) => {
      analytics.track(PLATFORM_BUTTON_SHOWN, {
        ...baseAnalyticsPayload,
        platform_type: platformType,
        source,
      });
    },
    regenerateButtonClicked: (
      artifactType: ArtifactType,
      isCreateTab?: boolean
    ) => {
      const payload: {
        artifact_type: string;
        is_create_tab?: boolean;
      } = {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
      };

      // Only include is_create_tab if it's true to not interfere with existing metrics
      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(REGENERATE_BUTTON_CLICKED, payload);
    },
    workflowSelected: (
      artifactType: ArtifactType,
      artifactCategory?: WorkflowType,
      source?: string,
      isRecommended?: boolean,
      isCreateTab?: boolean,
      isLoggedIn?: boolean,
      isOwner?: boolean
    ) => {
      const payload: {
        artifact_type: string;
        artifact_category?: WorkflowType;
        source?: string;
        is_recommended?: boolean;
        is_create_tab?: boolean;
        is_logged_in?: boolean;
        is_owner?: boolean;
      } = {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        artifact_category: artifactCategory,
        source,
        is_recommended: isRecommended,
        is_logged_in: isLoggedIn,
        is_owner: isOwner,
      };

      // Only include is_create_tab if it's true to not interfere with existing metrics
      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(WORKFLOW_SELECTED, payload);
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
    workflowImageToggleClicked: (
      artifactType: ArtifactType,
      toggle_to,
      isViewerExperience,
      isCreateTab
    ) => {
      const payload: {
        artifact_type: string;
        toggle_to: string;
        is_viewer_experience?: boolean;
        is_create_tab?: boolean;
      } = {
        ...baseAnalyticsPayload,
        artifact_type: hyphenCaseToLowerSnakeCase(artifactType),
        toggle_to,
      };

      // Only include is_viewer_experience if it's true to not interfere with existing metrics
      if (isViewerExperience) {
        payload.is_viewer_experience = true;
      }

      // Only include is_create_tab if it's true to not interfere with existing metrics
      if (isCreateTab) {
        payload.is_create_tab = true;
      }

      analytics.track(IMAGE_TOGGLE_CLICKED, payload);
    },
  };
};

const hyphenCaseToLowerSnakeCase = (str: string) => {
  return str.replace(/-/g, '_').toLowerCase();
};

export const AI_CREATE_TAB_OPENED =
  'ai_loom_artifact_type_selection_tab_opened';
export const AI_CREATE_MODAL_OPENED =
  'ai_loom_artifact_type_selection_modal_opened';

export const CREATE_TAB_SCREEN_VIEWED = 'create_tab_screen_viewed';
export const CREATE_TAB_OPENED_WORKFLOW_TYPE_SELECTION_DROPDOWN =
  'ai_loom_artifact_type_selection_dropdown_opened';
export const CREATE_TAB_OPENED_VISIBILITY_SELECTION_DROPDOWN =
  'ai_loom_artifact_visibility_selection_dropdown_opened';
export const CREATE_TAB_SELECTED_VISIBILITY_FROM_DROPDOWN =
  'ai_loom_artifact_visibility_selected_from_dropdown';

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
export const CHANGE_PUBLISHED_DOCUMENT_TYPE_MODAL_CANCELED =
  'ai_loom_change_published_document_type_modal_canceled';
export const CHANGE_PUBLISHED_DOCUMENT_TYPE_MODAL_CONFIRMED =
  'ai_loom_change_published_document_type_modal_confirmed';
export const CREATE_TAB_BACK_BUTTON_CLICKED =
  'ai_loom_create_tab_back_button_clicked';
export const PLATFORM_BUTTON_SHOWN = 'ai_loom_artifact_platform_button_shown';

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

export enum AiCreateTabOpenedSource {
  CREATE_CTA = 'create_cta',
  NEW_ENTRY_POINT = 'new_entry_point',
}
