import { MemberPropertyEnum } from '@loomhq/shared-utilities/constants/memberProperties';

import { useMemberProperty } from '@js/hooks/memberProperties';

import { useIsRewatchZoomConsolidationEnabled } from './useIsRewatchZoomConsolidationEnabled';

type ReturnProps = {
  shouldDisableLegacyZoomIntegration: boolean;
  shouldDisableLegacyZoomIntegrationLoading: boolean;
};

export const useShouldDisableLegacyZoomIntegration = (): ReturnProps => {
  const { loading: zoomUserSettingLoading, value: zoomUserSetting } =
    useMemberProperty(MemberPropertyEnum.ZOOM_ALL_INGESTION);

  const isZoomIntegrationEnabledForUser = Boolean(
    !zoomUserSettingLoading && zoomUserSetting
  );

  const {
    isRewatchZoomConsolidationEnabled,
    isRewatchZoomConsolidationLoading,
  } = useIsRewatchZoomConsolidationEnabled();

  const shouldDisableLegacyZoomIntegrationLoading =
    zoomUserSettingLoading || isRewatchZoomConsolidationLoading;

  const shouldDisableLegacyZoomIntegration =
    isZoomIntegrationEnabledForUser && isRewatchZoomConsolidationEnabled;

  return {
    shouldDisableLegacyZoomIntegration,
    shouldDisableLegacyZoomIntegrationLoading,
  };
};
