import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { ADD_MOBILE_DOWNLOAD_INVITATION } from '@loomhq/shared-utilities/constants/featureFlag';

import { ControlType } from '@loomhq/shared-utilities/constants/statsig';

export function useExpMobileDownloadInvitation(): {
  isExpMobileDownloadInvitation: boolean;
  expMobileDownloadInvitationVariant: string;
  isExpMobileDownloadInvitationVariant1: boolean;
} {
  const [isExpMobileDownloadInvitation, expMobileDownloadInvitationVariant] =
    useFlagIsActivated({
      flag: ADD_MOBILE_DOWNLOAD_INVITATION,
      activationValues: ['variant-1'],
      returnAssignmentName: true,
      controlType: ControlType.STATSIG_EXPERIMENT,
    });

  const isExpMobileDownloadInvitationVariant1 =
    expMobileDownloadInvitationVariant === 'variant-1';

  return {
    isExpMobileDownloadInvitation,
    expMobileDownloadInvitationVariant,
    isExpMobileDownloadInvitationVariant1,
  };
}
