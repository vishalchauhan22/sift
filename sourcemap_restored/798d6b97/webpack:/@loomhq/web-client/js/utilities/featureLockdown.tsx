export const FEATURE_LOCKDOWN_UPGRADE_PLAN = 'Upgrading plan';

export const getTooltipMessage = ({
  featureName,
}: {
  featureName: string;
}): string => {
  return `${featureName} is temporarily unavailable while we integrate your account with Atlassian. This should only take a few minutes`;
};
