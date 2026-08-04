import { LoomCategory } from '@js/common/workflows/common/types';

import {
  WORKFLOW_TEMPLATE,
  SMART_PROMPT_CATEGORIES,
} from '@loomhq/shared-utilities/constants/intelligence';

import { WorkflowTemplateType } from '@js/globalTypes.generated';

export type SOP = {
  type: WORKFLOW_TEMPLATE.SOP;
  title: string;
  objective: string;
  images: Array<{
    heading: string;
    timestamp: string;
    content: string;
    image_url?: string;
  }>;
  cautionary_notes: string;
  tips_for_efficiency: string;
};

export type STEP_BY_STEP = {
  type: WORKFLOW_TEMPLATE.STEP_BY_STEP;
  title: string;
  images: Array<{
    heading: string;
    timestamp: string;
    content: string;
    image_url?: string;
  }>;
};

export type PR_DESCRIPTION = {
  type: WORKFLOW_TEMPLATE.PR_DESCRIPTION;
  title: string;
  images: Array<{
    timestamp: string;
    image_url?: string;
  }>;
  overview: string;
  assumptions: string;
  testing_strategy: string;
};

export type CODE_DOCS = {
  type: WORKFLOW_TEMPLATE.CODE_DOCS;
  title: string;
  overview: string;
  images: Array<{
    heading: string;
    timestamp: string;
    content: string;
    image_url?: string;
  }>;
};

export type QA_STEPS = {
  type: WORKFLOW_TEMPLATE.QA_STEPS;
  title: string;
  images: Array<{
    heading: string;
    timestamp: string;
    content: string;
    image_url?: string;
  }>;
};

export type EMAIL = {
  type: WORKFLOW_TEMPLATE.EMAIL;
  subject: string;
  body: string;
  signature: string;
};

export type CHAT = {
  type: WORKFLOW_TEMPLATE.CHAT;
  content: string;
};

export type WorklowsTypeMapper = {
  type: WorkflowTemplateType;
  tabIndex: number;
};

export const workflowsTypeMapper = (
  category: LoomCategory
): WorklowsTypeMapper => {
  switch (category) {
    case SMART_PROMPT_CATEGORIES.CODE_DOCS:
      return {
        type: WorkflowTemplateType.CodeDocs,
        tabIndex: workflowTemplateTabIndex(WorkflowTemplateType.CodeDocs),
      };
    case SMART_PROMPT_CATEGORIES.PR_DESCRIPTION:
      return {
        type: WorkflowTemplateType.PrDescription,
        tabIndex: workflowTemplateTabIndex(WorkflowTemplateType.PrDescription),
      };
    case SMART_PROMPT_CATEGORIES.QA_STEPS:
      return {
        type: WorkflowTemplateType.QaSteps,
        tabIndex: workflowTemplateTabIndex(WorkflowTemplateType.QaSteps),
      };

    default:
      return {
        type: WorkflowTemplateType.Sop,
        tabIndex: workflowTemplateTabIndex(WorkflowTemplateType.Sop),
      };
  }
};

export const workflowTemplateTabIndex = (
  type: WorkflowTemplateType
): number => {
  return TEMPLATE_TO_INCIDES_MAP[type];
};

const TEMPLATE_TO_INCIDES_MAP = {
  [WorkflowTemplateType.Sop]: 0,
  [WorkflowTemplateType.StepByStep]: 1,
  [WorkflowTemplateType.PrDescription]: 2,
  [WorkflowTemplateType.QaSteps]: 3,
  [WorkflowTemplateType.CodeDocs]: 4,
  [WorkflowTemplateType.Summary]: 0,
};
