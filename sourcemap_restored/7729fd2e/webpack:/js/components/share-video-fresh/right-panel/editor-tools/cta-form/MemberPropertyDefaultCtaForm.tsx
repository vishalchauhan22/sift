import {
  ADD_CUSTOM_VIDEO_CTA_ENABLED,
  REMOVE_DEFAULT_LINK_CLICKED,
} from '@js/constants/events';

import { getDomainFromUrl } from '@js/pages/share/edit-tab/common';

import React from 'react';

import { Text, Spacer, Button, Loader } from '@loomhq/lens';
import { useForm } from '@loomhq/loom-form';
import { MemberPropertyEnum } from '@loomhq/shared-utilities/constants/memberProperties';

import { useCtaForm } from '@js/common/cta-form';
import {
  useMemberProperty,
  useUpdateMemberProperty,
} from '@js/hooks/memberProperties';
import * as analytics from '@js/utilities/analytics';

import { ContentContainer } from '../../ContentContainer';
import { Footer } from '../Footer';
import './styles.less';
import { CtaFormSchema, CtaForm, BLANK_SLATE_DISPLAY } from './CtaForm';
import { CORNER_STYLES } from './constants';
import { getBorderRadiusLabel } from './helpers';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../../utilities/analytics/attribute-transformer';

interface DefaultCtaMemberProperty {
  url: string;
  text: string;
  mods: {
    location: string;
    border_radius: number;
    only_show_at_end_of_video: boolean;
    color: string;
    background_color: string;
  };
}

const convertFormSchemaToMemberProperty = (
  formSchema: CtaFormSchema
): DefaultCtaMemberProperty => {
  const {
    url,
    text,
    location,
    button_corner_style,
    only_show_at_end_of_video,
    color,
    background_color,
  } = formSchema;

  return {
    url,
    text,
    mods: {
      location,
      border_radius: CORNER_STYLES[button_corner_style].value,
      only_show_at_end_of_video,
      color,
      background_color,
    },
  };
};

const convertMemberPropertyToFormSchema = (
  dbMemberProperty: DefaultCtaMemberProperty
): CtaFormSchema => {
  const { url, text, mods } = dbMemberProperty;
  const {
    location,
    border_radius,
    only_show_at_end_of_video,
    color,
    background_color,
  } = mods;

  return {
    url,
    text,
    location,
    background_color,
    color,
    button_corner_style: getBorderRadiusLabel(border_radius),
    only_show_at_end_of_video,
    skip_modal_popup: url ? url.includes('skip_modal_popup=true') : false,
  };
};

export function MemberPropertyDefaultCtaForm({
  onUrlChange,
  onTextChange,
  onLocationChange,
  onBackgroundColorChange,
  onColorChange,
  onButtonCornerStyleChange,
  onOnlyShowAtEndOfVideoChange,
  onSkipModalPopupChange,
  onSaveForVideo,
  goBackToEditPage,
  videoId,
  currentValues,
}: {
  onUrlChange: (url: string) => void;
  onTextChange: (text: string) => void;
  onLocationChange: (location: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onColorChange: (color: string) => void;
  onButtonCornerStyleChange: (corner: string) => void;
  onOnlyShowAtEndOfVideoChange: (onlyShowAtEndOfVideo: boolean) => void;
  onSkipModalPopupChange: (skipModalPopup: boolean) => void;
  onSaveForVideo: () => void;
  goBackToEditPage: () => void;
  videoId: string;
  currentValues: CtaFormSchema;
}): React.ReactElement {
  const { loading: userSetDefaultCtaLoading, value: userSetDefaultCtaValue } =
    useMemberProperty(MemberPropertyEnum.DEFAULT_CTA, {
      onCompleted: () => resetCtaDisplay(values),
    });

  const { setCtaMods } = useCtaForm();
  const { updateMemberProperty: updateDefaultCta } = useUpdateMemberProperty(
    MemberPropertyEnum.DEFAULT_CTA
  );

  const hasUserSetDefaultCtaValue =
    userSetDefaultCtaValue && Object.keys(userSetDefaultCtaValue).length > 0;

  const values = hasUserSetDefaultCtaValue
    ? convertMemberPropertyToFormSchema(userSetDefaultCtaValue)
    : currentValues;

  const formProps = useForm<CtaFormSchema>({
    mode: 'onBlur',
    values,
  });

  const resetCtaDisplay = (displayValues: CtaFormSchema) => {
    onUrlChange(displayValues.url);
    onTextChange(displayValues.text);

    const mods = convertFormSchemaToMemberProperty(displayValues).mods;
    setCtaMods(mods);
  };

  const onSave = () => {
    const {
      url,
      text,
      location,
      background_color,
      color,
      button_corner_style,
      only_show_at_end_of_video,
    } = formProps.getValues();

    analytics.track(ADD_CUSTOM_VIDEO_CTA_ENABLED, {
      default_link: url,
      default_title: text,
      default_link_domain: getDomainFromUrl(url),
    });

    updateDefaultCta({
      url,
      text,
      mods: {
        color,
        background_color,
        border_radius: CORNER_STYLES[button_corner_style].value,
        location,
        only_show_at_end_of_video,
      },
    });
    onSaveForVideo();
  };

  const handleDelete = () => {
    analytics.track(
      REMOVE_DEFAULT_LINK_CLICKED,
      withIdentifiers(
        REMOVE_DEFAULT_LINK_CLICKED,
        AnalyticsEntityId.video(videoId, 'videoId')
      )
    );
    updateDefaultCta({});
    resetCtaDisplay(BLANK_SLATE_DISPLAY);
    goBackToEditPage();
  };

  const disabled =
    formProps.formState.isSubmitting || !formProps.formState.isValid;

  if (userSetDefaultCtaLoading) {
    return (
      <ContentContainer
        title={
          <Text fontWeight="bold" size="body-lg">
            Set default link
          </Text>
        }
        footer={<></>}
        goBackToEditPage={goBackToEditPage}
        settingsIsInEditTab={false}
      >
        <Loader />
      </ContentContainer>
    );
  }

  return (
    <ContentContainer
      title={
        <Text fontWeight="bold" size="body-lg">
          Set default link
        </Text>
      }
      footer={
        <Footer>
          <Button
            type="submit"
            form="cta-form"
            variant="primary"
            isDisabled={disabled}
            hasFullWidth
          >
            Save
          </Button>
        </Footer>
      }
      goBackToEditPage={() => {
        resetCtaDisplay(BLANK_SLATE_DISPLAY);
        goBackToEditPage();
      }}
      settingsIsInEditTab={false}
    >
      <>
        <Text color="bodyDimmed">
          Setting a default link will make the link automatically appear on all
          future Loom videos.
        </Text>
        <Spacer top="large" />
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
        <Spacer top="small" />
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            marginTop: 'var(--lns-space-large)',
          }}
        >
          <Button
            variant="danger"
            isDisabled={!hasUserSetDefaultCtaValue}
            onClick={handleDelete}
          >
            Remove default link
          </Button>
        </div>
      </>
    </ContentContainer>
  );
}
