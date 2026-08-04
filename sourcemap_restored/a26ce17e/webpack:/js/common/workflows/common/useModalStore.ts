import { Editor } from '@tiptap/react';
import {
  ArtifactType,
  IssuePlatformType,
  LoomCategory,
  WorkflowType,
} from '@js/common/workflows/common/types';
import create from 'zustand';

import { JiraErrorCode, WorkflowTemplateType } from '@js/globalTypes.generated';

import {
  setLocalStorageKey,
  getLocalStorageKey,
} from '@js/utilities/localStorage';

const WORKFLOWS_LS_KEY = 'pde_workflows';

type ModalState = {
  editorRef: React.MutableRefObject<Editor | null>;
  activeWorkflowType: WorkflowType;
  categorizationConfidence: number | null;
  setActiveWorkflowType: (workflowType: WorkflowType) => void;
  setCategorizationConfidence: (score: number) => void;
  modalContent: string | null;
  setModalContent: (modalContent: string) => void;
  modalHasContent: boolean;
  setModalHasContent: (hasContent: boolean) => void;
  activeArtifactType: ArtifactType | null;
  setActiveArtifactType: (activeArtifactType: ArtifactType) => void;
  cachedIssuePlatform: IssuePlatformType | undefined;
  activeIssuePlatform: IssuePlatformType;
  setActiveIssuePlatform: (activeIssuePlatform: IssuePlatformType) => void;
  error: { message: string; errorCode?: JiraErrorCode } | null;
  setError: (
    error: { message: string; errorCode?: JiraErrorCode } | null
  ) => void;
  loomCategory: LoomCategory | null;
  setLoomCategory: (category: LoomCategory) => void;
  isLoomCategorizationInProgress: boolean;
  setIsLoomCategorizationInProgress: (loading: boolean) => void;
  enteredWorkflowModalFromSneakpeekCTA: boolean;
  setEnteredWorkflowModalFromSneakpeekCTA: (
    enteredWorkflowModalFromSneakpeekCTA: boolean
  ) => void;
  displayGeneratedImages: boolean;
  setDisplayGeneratedImages: (displayGeneratedImages: boolean) => void;
  jiraNeedsAuth: null | boolean;
  setJiraNeedsAuth: (needsAuth: boolean) => void;
  linearNeedsAuth: null | boolean;
  setLinearNeedsAuth: (needsAuth: boolean) => void;
  isRegenerating: boolean;
  regeneratingVideoId: string | null;
  regeneratingWorkflowTemplate: WorkflowTemplateType | null;
  setIsRegenerating: (isRegenerating: boolean) => void;
  setRegeneratingVideoId: (videoId: string | null) => void;
  setRegeneratingWorkflowTemplate: (
    template: WorkflowTemplateType | null
  ) => void;
  bugReportContainsGeneratedImages: boolean;
  setBugReportContainsGeneratedImages: (
    bugReportContainsGeneratedImages: boolean
  ) => void;
};

export const useModalStore = create<ModalState>(set => ({
  activeArtifactType: null,
  activeIssuePlatform: getInitialActivePlatform(),
  activeWorkflowType: 'document',
  bugReportContainsGeneratedImages: false,
  cachedIssuePlatform: getCachedIssuePlatform(),
  categorizationConfidence: null,
  displayGeneratedImages: true,
  editorRef: { current: null },
  enteredWorkflowModalFromSneakpeekCTA: false,
  error: null,
  isLoomCategorizationInProgress: false,
  isRegenerating: false,
  jiraNeedsAuth: null,
  linearNeedsAuth: null,
  loomCategory: null,
  modalContent: null,
  modalHasContent: false,
  regeneratingVideoId: null,
  regeneratingWorkflowTemplate: null,
  setActiveArtifactType: (activeArtifactType: ArtifactType) =>
    set({ activeArtifactType, error: null }),
  setActiveIssuePlatform: (activeIssuePlatform: IssuePlatformType) => {
    cacheActivePlatform(activeIssuePlatform);
    set({ activeIssuePlatform, error: null });
  },
  setActiveWorkflowType: activeWorkflowType => set({ activeWorkflowType }),
  setBugReportContainsGeneratedImages: bugReportContainsGeneratedImages =>
    set({ bugReportContainsGeneratedImages }),
  setCategorizationConfidence: categorizationConfidence =>
    set({ categorizationConfidence }),
  setDisplayGeneratedImages: (displayGeneratedImages: boolean) =>
    set({ displayGeneratedImages }),
  setEnteredWorkflowModalFromSneakpeekCTA: (
    enteredWorkflowModalFromSneakpeekCTA: boolean
  ) => set({ enteredWorkflowModalFromSneakpeekCTA }),
  setError: error => set({ error }),
  setIsLoomCategorizationInProgress: isLoomCategorizationInProgress =>
    set({ isLoomCategorizationInProgress }),
  setIsRegenerating: (isRegenerating: boolean) => set({ isRegenerating }),
  setJiraNeedsAuth: (needsAuth: boolean) => set({ jiraNeedsAuth: needsAuth }),
  setLinearNeedsAuth: (needsAuth: boolean) =>
    set({ linearNeedsAuth: needsAuth }),
  setLoomCategory: (loomCategory: LoomCategory) => set({ loomCategory }),
  setModalContent: modalContent => set({ modalContent }),
  setModalHasContent: (modalHasContent: boolean) => set({ modalHasContent }),
  setRegeneratingVideoId: (videoId: string | null) =>
    set({ regeneratingVideoId: videoId }),
  setRegeneratingWorkflowTemplate: (template: WorkflowTemplateType | null) =>
    set({ regeneratingWorkflowTemplate: template }),
}));

function getInitialActivePlatform(): IssuePlatformType {
  const cachedIssuePlatform = getCachedIssuePlatform();

  return cachedIssuePlatform || 'jira';
}

function getCachedIssuePlatform(): IssuePlatformType | undefined {
  return getLocalStorageKey(WORKFLOWS_LS_KEY);
}

function cacheActivePlatform(platform: IssuePlatformType): void {
  setLocalStorageKey(WORKFLOWS_LS_KEY, platform);
}
