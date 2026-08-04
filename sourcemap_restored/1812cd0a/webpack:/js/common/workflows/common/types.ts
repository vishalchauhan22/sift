import { WorkflowTemplateType } from '@js/globalTypes.generated';
import {
  PR_DESCRIPTION,
  SOP,
  QA_STEPS,
  CODE_DOCS,
  STEP_BY_STEP,
} from '@js/common/workflows/workflows-modal/create-document/types';

export type OptionsObject = {
  value: string;
  title: string;
  isDisabled?: boolean;
};

export enum ArtifactType {
  // 🚩 Start: EXP_AI_WORKFLOWS_FOR_VIEWERS
  Summary = 'summary',
  // 🚩 End: EXP_AI_WORKFLOWS_FOR_VIEWERS

  StepByStep = 'step_by_step',
  Sop = 'sop',
  PrDescription = 'pr_description',
  CodeDocs = 'code_docs',
  QaSteps = 'qa_steps',
  Chat = 'chat',
  Email = 'email',
  Jira = 'jira',
  Linear = 'linear',
}

export type Animation = 'show' | 'hide' | 'none';

export type WorkflowType = 'message' | 'ticket' | 'document';

export type LoomCategory =
  | 'bug report'
  | 'pull request description'
  | 'qa steps'
  | 'code documentation'
  | 'process walkthrough'
  | 'step by step'
  | 'other';

export type IssuePlatformType = 'jira' | 'linear';

export type TabType = {
  title: string;
  workflowType: WorkflowType;
  // 🚩 Start: EXP_AI_WORKFLOWS_FOR_VIEWERS
  options?: ReadonlyArray<{
    workflowTemplateType: WorkflowTemplateType;
    artifactType: ArtifactType;
    description: string;
    label: string;
  }>;
  // 🚩 End: EXP_AI_WORKFLOWS_FOR_VIEWERS
};

export const BUTTON_IDX_TO_ACTIVE_ARTIFACT_TYPE = {
  document: {
    0: ArtifactType.Sop,
    1: ArtifactType.StepByStep,
    2: ArtifactType.PrDescription,
    3: ArtifactType.QaSteps,
    4: ArtifactType.CodeDocs,
  },
  ticket: {
    0: ArtifactType.Jira,
    1: ArtifactType.Linear,
  },
  message: {
    0: ArtifactType.Chat,
    1: ArtifactType.Email,
  },
};

export type GENERATED_IMAGE_DELETION_METHOD = 'backspace' | 'button';

export type SneakPeekContent = {
  body: string | PR_DESCRIPTION | SOP | CODE_DOCS | QA_STEPS | STEP_BY_STEP;
};

export type SmartPromptConfig = {
  icon: React.ReactNode;
  text: string;
  sneakPeekSection: string;
};
