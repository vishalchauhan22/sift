import { WORKFLOWS_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useModalStore as useWorkflowsModalStore } from '@js/common/workflows/common/useModalStore';

import { TourStepType } from './types';
import { useWorkflowHeaderFlagValue } from '@js/common/workflows/workflows-modal/hooks';

export const useSyncWorkflowsModalWithTour = (): ((
  tourStep: TourStepType,
  tourStepIndex: number
) => void) => {
  const { openModal } = useModals();
  const { setActiveWorkflowType } = useWorkflowsModalStore();
  const workflowHeaderFlagValue = useWorkflowHeaderFlagValue();

  const syncWorkflowsModalWithTour = (
    tourStep: TourStepType,
    tourStepIndex: number
  ) => {
    if (tourStepIndex === 1) {
      // Ensure workflows modal is open
      openModal({
        modalType: WORKFLOWS_MODAL,
        options: {
          workflowTypeOnOpen: 'document',
          workflowHeaderFlagValue,
        },
      });
    }

    if (tourStepIndex > 1) {
      if (tourStep.workflowType) {
        // Set workflows modal to the correct tab
        setActiveWorkflowType(tourStep.workflowType);
      }
    }
  };

  return syncWorkflowsModalWithTour;
};
