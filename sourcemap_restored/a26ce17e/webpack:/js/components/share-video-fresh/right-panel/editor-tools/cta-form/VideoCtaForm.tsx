import { SET_AS_DEFAULT_CTA_CLICKED } from '@js/constants/events';

import React from 'react';

import { Button } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';
import { useForm } from '@loomhq/loom-form';

import * as analytics from '@js/utilities/analytics';

import { ContentContainer } from '../../ContentContainer';
import { Footer } from '../Footer';
import './styles.less';
import { CtaFormSchema, CtaForm } from './CtaForm';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../../utilities/analytics/attribute-transformer';

function DefaultCtaFooterContainer({ goToDefaultPage, isDisabled }) {
  return (
    <Footer>
      <Button onClick={goToDefaultPage} hasFullWidth>
        Set default link
      </Button>

      <Button
        type="submit"
        form="cta-form"
        variant="primary"
        isDisabled={isDisabled}
        hasFullWidth
      >
        Save
      </Button>
    </Footer>
  );
}

function FooterContainer({ isDisabled, onDelete, ctaEnabled }) {
  return (
    <Footer>
      {ctaEnabled && (
        <Button
          icon={<SvgTrash />}
          variant="danger"
          isDisabled={isDisabled}
          onClick={onDelete}
          hasFullWidth
        >
          Delete link
        </Button>
      )}

      <Button
        type="submit"
        form="cta-form"
        variant="primary"
        isDisabled={isDisabled}
        hasFullWidth
      >
        Save
      </Button>
    </Footer>
  );
}

export function VideoCtaForm({
  onUrlChange,
  onTextChange,
  onLocationChange,
  onBackgroundColorChange,
  onColorChange,
  onButtonCornerStyleChange,
  onOnlyShowAtEndOfVideoChange,
  onSkipModalPopupChange,
  goBackToEditPage,
  videoId,
  currentValues,
  pageTitle,
  showDefaultCta,
  ctaEnabled,
  setIsOnDefaultTab,
  onSave,
  onDelete,
}: {
  onUrlChange: (url: string) => void;
  onTextChange: (text: string) => void;
  onLocationChange: (location: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onColorChange: (color: string) => void;
  onButtonCornerStyleChange: (corner: string) => void;
  onOnlyShowAtEndOfVideoChange: (onlyShowAtEndOfVideo: boolean) => void;
  onSkipModalPopupChange: (skipModalPopup: boolean) => void;
  onSave: () => void;
  onDelete: () => void;
  goBackToEditPage: () => void;
  videoId: string;
  currentValues: CtaFormSchema;
  pageTitle: string;
  showDefaultCta: boolean;
  ctaEnabled: boolean;
  setIsOnDefaultTab: (boolean) => void;
}): React.ReactElement {
  const formProps = useForm<CtaFormSchema>({
    mode: 'onBlur',
    values: currentValues,
  });

  const isDisabled =
    formProps.formState.isSubmitting || !formProps.formState.isValid;

  return (
    <ContentContainer
      title={pageTitle}
      settingsIsInEditTab={false}
      footer={
        showDefaultCta ? (
          <DefaultCtaFooterContainer
            goToDefaultPage={() => {
              analytics.track(
                SET_AS_DEFAULT_CTA_CLICKED,
                withIdentifiers(
                  SET_AS_DEFAULT_CTA_CLICKED,
                  AnalyticsEntityId.video(videoId, 'id')
                )
              );
              setIsOnDefaultTab(true);
            }}
            isDisabled={isDisabled}
          />
        ) : (
          <FooterContainer
            isDisabled={isDisabled}
            onDelete={onDelete}
            ctaEnabled={ctaEnabled}
          />
        )
      }
      goBackToEditPage={goBackToEditPage}
    >
      <>
        <CtaForm
          videoId={videoId}
          onUrlChange={onUrlChange}
          onTextChange={onTextChange}
          onLocationChange={onLocationChange}
          onBackgroundColorChange={onBackgroundColorChange}
          onColorChange={onColorChange}
          onButtonCornerStyleChange={onButtonCornerStyleChange}
          onOnlyShowAtEndOfVideoChange={onOnlyShowAtEndOfVideoChange}
          onSkipModalPopupChange={onSkipModalPopupChange}
          onSubmit={onSave}
          formProps={formProps}
        />
        {showDefaultCta && ctaEnabled && (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              marginTop: 'var(--lns-space-large)',
            }}
          >
            <Button
              icon={<SvgTrash />}
              variant="danger"
              isDisabled={isDisabled}
              onClick={onDelete}
            >
              Delete link
            </Button>
          </div>
        )}
      </>
    </ContentContainer>
  );
}
