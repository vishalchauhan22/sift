import React from 'react';

import { Feature } from '@loomhq/shared-utilities/constants/product';
import { useCtaForm } from '@js/common/cta-form';
import { useVideoContext } from '@js/common/video-player';
import { ADD_CUSTOM_VIDEO_CTA_CLICKED } from '@js/constants/events';
import { EDIT_TOOLS_LIST, EditToolsTypes } from '@js/pages/share/common';
import * as analytics from '@js/utilities/analytics';
import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { EditTabController } from './EditTabController';
import { AddLinkSubtab } from './add-link-subtab';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '@js/utilities/analytics/attribute-transformer';

type EditTabProps = {
  editSubtab: EditToolsTypes | null;
  setEditSubtab: (subpage: EditToolsTypes | null) => void;
};

const EditTabWrapperWithoutFeatureWrapper = ({
  editSubtab,
  setEditSubtab,
}: EditTabProps) => {
  const {
    video: { modelId },
  } = useVideoContext();
  const { setIsEditingCta } = useCtaForm();
  const { featureLoadedRef } = useFeatureWrapper();
  const isAddLinkSubtabOpen = editSubtab === EDIT_TOOLS_LIST.Link;
  const handleAddLinkClick = () => {
    setIsEditingCta(true);
    setEditSubtab(EDIT_TOOLS_LIST.Link);

    analytics.track(
      ADD_CUSTOM_VIDEO_CTA_CLICKED,
      withIdentifiers(
        ADD_CUSTOM_VIDEO_CTA_CLICKED,
        AnalyticsEntityId.video(modelId, 'id')
      )
    );
  };

  if (isAddLinkSubtabOpen) {
    return (
      <div ref={featureLoadedRef}>
        <AddLinkSubtab onClose={() => setEditSubtab(null)} />
      </div>
    );
  }

  return (
    <div ref={featureLoadedRef}>
      <EditTabController onAddLinkClick={handleAddLinkClick} />
    </div>
  );
};

export const EditTabWrapper = (props: EditTabProps): JSX.Element => {
  return (
    <FeatureWrapper
      feature={Feature.EditTab}
      errorType={ErrorBoundaryTypes.DEFAULT}
    >
      <EditTabWrapperWithoutFeatureWrapper {...props} />
    </FeatureWrapper>
  );
};
