import { TOUR_STEPS, TourStepType } from '../types';

const WORKFLOWS_OVERVIEW_STEP: TourStepType = {
  step: TOUR_STEPS.WORKFLOWS_OVERVIEW,
  title: 'You record it, Loom writes it',
  description:
    'Write a document, create a bug report, or send a message. Choose what you want to create and let Loom AI get to work.',
};

const WRITE_A_DOC_STEP: TourStepType = {
  step: TOUR_STEPS.WRITE_A_DOC,
  title: 'Ready-to-share documents in one click',
  description:
    'Choose from templates like SOPs, PR descriptions, and more to get work done fast.',
  workflowType: 'document',
};

const CREATE_AN_ISSUE_STEP: TourStepType = {
  step: TOUR_STEPS.CREATE_AN_ISSUE,
  title: 'Connect to Jira or Linear',
  description:
    'Loom AI instantly fills out the fields, so you can log your issue in no time.',
  workflowType: 'ticket',
};

const WRITE_A_MESSAGE_STEP: TourStepType = {
  step: TOUR_STEPS.WRITE_A_MESSAGE,
  title: 'Share your Loom with helpful context',
  description:
    'Loom AI writes you a message to share along with your video link. Copy, paste, and share!',
  workflowType: 'message',
};

export const tourSteps = [
  WORKFLOWS_OVERVIEW_STEP,
  WRITE_A_DOC_STEP,
  CREATE_AN_ISSUE_STEP,
  WRITE_A_MESSAGE_STEP,
];
