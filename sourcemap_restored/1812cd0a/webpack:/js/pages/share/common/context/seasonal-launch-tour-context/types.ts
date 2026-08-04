import { WorkflowType } from '@js/common/workflows/common/types';

export type SeasonalLaunchSharePageTourContextType = {
  isActive: boolean;
  tourStep: TourStepType;
  startSeasonalLaunchTour: () => void;
  shouldShowTour: boolean;
  setShouldShowTour: (shouldShowTour: boolean) => void;
  onUserOpenedWorkflow: (workflowType: WorkflowType) => void;
  handleCloseTour: () => void;
};

export enum TOUR_STEPS {
  WORKFLOWS_OVERVIEW = 'WORKFLOWS_OVERVIEW',
  WRITE_A_DOC = 'WRITE_A_DOC',
  CREATE_AN_ISSUE = 'CREATE_AN_ISSUE',
  WRITE_A_MESSAGE = 'WRITE_A_MESSAGE',
}

export type TourStepType = {
  step: TOUR_STEPS;
  // Special property only used for Spring Launch
  workflowType?: WorkflowType;
  title: string;
  description: string;
};
