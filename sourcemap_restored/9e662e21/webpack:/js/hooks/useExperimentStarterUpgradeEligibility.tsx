import { useBusinessTrialAdmin } from './eligibility/useBusinessTrialAdmin';
import { useStarterFreeAdmin } from './eligibility/useStarterFreeAdmin';

export const useExperimentStarterUpgradeEligibility = (): boolean => {
  const isStarterFreeAdmin = useStarterFreeAdmin();
  const isBusinessTrialAdmin = useBusinessTrialAdmin();

  return isStarterFreeAdmin || isBusinessTrialAdmin;
};
