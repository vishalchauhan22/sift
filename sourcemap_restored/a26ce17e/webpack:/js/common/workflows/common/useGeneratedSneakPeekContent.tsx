import { NetworkStatus } from '@apollo/client';

import { SMART_PROMPT_CATEGORIES } from '@loomhq/shared-utilities/constants/intelligence';

import { WorkflowTemplateType } from '@js/globalTypes.generated';

import { useGeneratedIssueQuery } from '../workflows-modal/create-issue/common/useGetGeneratedIssue/GeneratedIssue.generated';
import { SneakPeekContent } from './types';
import { useGeneratedWorkflowContentQuery } from '../workflows-modal/create-document-and-message/GeneratedWorkflowContent.generated';

type GeneratedSneakPeekContent = {
  content: SneakPeekContent | null;
  loading: boolean;
  hasReachedDailyLimit: boolean;
  refetch?: () => Promise<unknown>;
};

const getWorkflowTemplateFromCategory = (
  category: string | null
): WorkflowTemplateType | null => {
  switch (category) {
    case SMART_PROMPT_CATEGORIES.CODE_DOCS:
      return WorkflowTemplateType.CodeDocs;
    case SMART_PROMPT_CATEGORIES.PR_DESCRIPTION:
      return WorkflowTemplateType.PrDescription;
    case SMART_PROMPT_CATEGORIES.QA_STEPS:
      return WorkflowTemplateType.QaSteps;
    case SMART_PROMPT_CATEGORIES.PROCESS_WALKTHROUGH:
      return WorkflowTemplateType.Sop;
    case SMART_PROMPT_CATEGORIES.STEP_BY_STEP:
      return WorkflowTemplateType.StepByStep;
    default:
      return null;
  }
};

export const useGeneratedSneakPeekContent = (
  category: string | null,
  videoId: string,
  isSneakPeekAvailableToGenerate: boolean
): GeneratedSneakPeekContent => {
  const shouldGenerateIssue =
    !isSneakPeekAvailableToGenerate ||
    category !== SMART_PROMPT_CATEGORIES.BUG_REPORT ||
    !category;

  const { loading: loadingIssue, data: issueData } = useGeneratedIssueQuery({
    variables: { videoId },
    skip: shouldGenerateIssue,
    notifyOnNetworkStatusChange: true,
  });

  const workflowTemplate = getWorkflowTemplateFromCategory(category);
  const shouldGenerateDoc =
    (isSneakPeekAvailableToGenerate &&
      workflowTemplate !== null &&
      category !== SMART_PROMPT_CATEGORIES.BUG_REPORT) ||
    !category;

  const {
    loading: loadingDoc,
    data: docData,
    refetch,
    networkStatus,
  } = useGeneratedWorkflowContentQuery({
    variables: {
      videoId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workflowTemplate: workflowTemplate!,
    },
    skip: !shouldGenerateDoc || !workflowTemplate,
    notifyOnNetworkStatusChange: true,
  });

  let content: SneakPeekContent | null = null;

  if (category === SMART_PROMPT_CATEGORIES.BUG_REPORT) {
    if (issueData?.generatedIssue?.__typename === 'GeneratedIssuePayload') {
      content = {
        body: issueData.generatedIssue.body as string,
      };
    }
  } else if (
    docData?.generatedWorkflowContent &&
    'markdownContent' in docData.generatedWorkflowContent
  ) {
    content = {
      body: docData.generatedWorkflowContent.markdownContent as string,
    };
  }

  const loading =
    category === SMART_PROMPT_CATEGORIES.BUG_REPORT
      ? loadingIssue
      : loadingDoc || networkStatus === NetworkStatus.refetch;

  const hasReachedDailyLimit =
    (category === SMART_PROMPT_CATEGORIES.BUG_REPORT &&
      issueData?.generatedIssue?.__typename === 'RateLimitReachedError') ||
    (category !== SMART_PROMPT_CATEGORIES.BUG_REPORT &&
      docData?.generatedWorkflowContent?.__typename ===
        'RateLimitReachedError');

  return {
    content,
    loading,
    hasReachedDailyLimit,
    refetch,
  };
};
