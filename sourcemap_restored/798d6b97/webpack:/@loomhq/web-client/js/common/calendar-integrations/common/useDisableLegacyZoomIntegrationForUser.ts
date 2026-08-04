import { useUpdateUserProperty } from '@js/hooks/user/useUpdateUserProperty';
import { useCallback } from 'react';

import { MemberPropertyEnum } from '@loomhq/shared-utilities/constants/memberProperties';
import { UserPropertyEnum } from '@loomhq/shared-utilities/constants/userProperties';
import { useUpdateMemberProperty } from '@js/hooks/memberProperties';

export const useDisableLegacyZoomIntegrationForUser = (): (() => void) => {
  const { updateMemberProperty: updateZoomAllIngestion } =
    useUpdateMemberProperty(MemberPropertyEnum.ZOOM_ALL_INGESTION);

  const { updateMemberProperty: updateZoomAutoIngestion } =
    useUpdateMemberProperty(MemberPropertyEnum.ZOOM_AUTO_INGESTION);

  const {
    updateUserProperty: updateShouldShowLegacyZoomIntegrationDisabledBanner,
  } = useUpdateUserProperty(
    UserPropertyEnum.MEETING_RECORDING_SHOULD_SHOW_LEGACY_ZOOM_INTEGRATION_DISABLED_BANNER
  );

  const disableLegacyZoomIntegrationForUser = useCallback(() => {
    updateZoomAllIngestion(false);
    updateZoomAutoIngestion({ enabled: false });
    updateShouldShowLegacyZoomIntegrationDisabledBanner(true);
  }, [
    updateZoomAllIngestion,
    updateZoomAutoIngestion,
    updateShouldShowLegacyZoomIntegrationDisabledBanner,
  ]);

  return disableLegacyZoomIntegrationForUser;
};
