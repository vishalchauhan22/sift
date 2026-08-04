import React from 'react';

// Workflow template icons
import { SvgActionItem } from '@loomhq/lens/icons/actionItem';
import { SvgCode } from '@loomhq/lens/icons/code';
import { SvgCreateTicket } from '@loomhq/lens/icons/create-ticket';
import { SvgMail } from '@loomhq/lens/icons/mail';
import { SvgNumberedList } from '@loomhq/lens/icons/numbered-list';
import { SvgPullRequest } from '@loomhq/lens/icons/pull-request';
import { SvgSend } from '@loomhq/lens/icons/send';
import { SvgWriteDocument } from '@loomhq/lens/icons/write-document';

import { WorkflowTemplateType } from '@js/globalTypes.generated';
import { ArtifactType } from '@js/common/workflows/common/types';

export const WORKFLOW_TEMPLATE_OPTIONS = [
  {
    value: WorkflowTemplateType.Sop as string,
    title: 'SOP',
    icon: <SvgWriteDocument />,
    artifactType: ArtifactType.Sop,
    workflowType: 'document' as const,
  },
  {
    value: WorkflowTemplateType.StepByStep as string,
    title: 'How-to guide',
    icon: <SvgNumberedList />,
    artifactType: ArtifactType.StepByStep,
    workflowType: 'document' as const,
  },
  {
    value: WorkflowTemplateType.BugReport as string,
    title: 'Bug report',
    icon: <SvgCreateTicket />,
    artifactType: ArtifactType.Jira,
    workflowType: 'ticket' as const,
    hasDivider: true,
  },
  {
    value: WorkflowTemplateType.PrDescription as string,
    title: 'PR description',
    icon: <SvgPullRequest />,
    artifactType: ArtifactType.PrDescription,
    workflowType: 'document' as const,
  },
  {
    value: WorkflowTemplateType.QaSteps as string,
    title: 'QA steps',
    icon: <SvgActionItem />,
    artifactType: ArtifactType.QaSteps,
    workflowType: 'document' as const,
  },
  {
    value: WorkflowTemplateType.CodeDocs as string,
    title: 'Code doc',
    icon: <SvgCode />,
    artifactType: ArtifactType.CodeDocs,
    workflowType: 'document' as const,
  },
  {
    value: WorkflowTemplateType.Chat as string,
    title: 'Message',
    icon: <SvgSend />,
    artifactType: ArtifactType.Chat,
    workflowType: 'message' as const,
    hasDivider: true,
  },
  {
    value: WorkflowTemplateType.Email as string,
    title: 'Email',
    icon: <SvgMail />,
    artifactType: ArtifactType.Email,
    workflowType: 'message' as const,
  },
];
