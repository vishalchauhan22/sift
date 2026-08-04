import { ColorPickerPopup } from '@js/common/color-picker-popup';
import { useCustomBranding } from '@js/common/custom-branding/useCustomBranding';
import { useMount } from '@js/hooks/useMount';
import { getCtaText } from '@js/pages/share/edit-tab/common';
import React, { ChangeEvent } from 'react';

import * as urlRegexSafe from 'url-regex-safe';

import { Spacer } from '@loomhq/lens';
import {
  FieldLabel,
  Field,
  FieldInput,
  FieldInlineError,
  Form,
  useForm,
  FieldSelect,
  FieldCheckbox,
} from '@loomhq/loom-form';
import { ctaUtils } from '@loomhq/shared-utilities';
import { BTN_LOCATION_OPTIONS } from '@loomhq/shared-utilities/constants/cta';
import {
  CALENDLY_URL_REGEX,
  isHexColor,
} from '@loomhq/shared-utilities/utilities/validateUtils';
import { DEFAULT_CTA_SETTINGS } from '@js/components/share-video/cta-button';
import rainbowSrc from '@assets/img/rainbow-oval.png';

import './styles.less';
import { CalendlyNotice } from './CalendlyNotice';
import {
  COLOR_ERROR,
  CORNER_STYLES,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_COLOR_FOR_CALENDLY,
  DEFAULT_TEXT_COLOR,
  PRESET_COLORS_HEX_CODE,
  URL_ERROR,
} from './constants';
import { getBorderRadiusLabel } from './helpers';

const { isValidCtaUrl } = ctaUtils;

export interface CtaFormSchema {
  url: string;
  text: string;
  location: string;
  background_color: string;
  color: string;
  button_corner_style: string;
  only_show_at_end_of_video: boolean;
  skip_modal_popup: boolean;
}

export type FormProps = ReturnType<typeof useForm<CtaFormSchema>>;

export const BLANK_SLATE_DISPLAY: CtaFormSchema = {
  url: '',
  text: '',
  location: DEFAULT_CTA_SETTINGS.location,
  button_corner_style: getBorderRadiusLabel(DEFAULT_CTA_SETTINGS.border_radius),
  only_show_at_end_of_video: DEFAULT_CTA_SETTINGS.only_show_at_end_of_video,
  color: DEFAULT_TEXT_COLOR,
  background_color: DEFAULT_BUTTON_COLOR,
  skip_modal_popup: false,
};

export const CtaForm = ({
  videoId,
  onUrlChange,
  onTextChange,
  onLocationChange,
  onBackgroundColorChange,
  onColorChange,
  onButtonCornerStyleChange,
  onOnlyShowAtEndOfVideoChange,
  onSkipModalPopupChange,
  formProps,
  onSubmit,
}: {
  videoId: string;
  onUrlChange: (url: string) => void;
  onTextChange: (text: string) => void;
  onLocationChange: (location: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onColorChange: (color: string) => void;
  onButtonCornerStyleChange: (corner: string) => void;
  onOnlyShowAtEndOfVideoChange: (onlyShowAtEndOfVideo: boolean) => void;
  onSkipModalPopupChange: (skipModalPopup: boolean) => void;
  formProps: FormProps;
  onSubmit: () => void;
}): React.ReactElement => {
  const onUrlChangeInternal = url => {
    formProps.setValue('url', url);
    onUrlChange(url);
  };

  const onTextChangeInternal = text => {
    formProps.setValue('text', text);
    onTextChange(text);
  };

  const onLocationChangeInternal = location => {
    formProps.setValue('location', location);
    onLocationChange(location);
  };

  const onBackgroundColorChangeInternal = color => {
    formProps.setValue('background_color', color);
    onBackgroundColorChange(color);
  };

  const onColorChangeInternal = color => {
    formProps.setValue('color', color);
    onColorChange(color);
  };

  const onButtonCornerStyleChangeInternal = corner => {
    formProps.setValue('button_corner_style', corner);
    onButtonCornerStyleChange(corner);
  };

  const onOnlyShowAtEndOfVideoChangeInternal = shouldShow => {
    formProps.setValue('only_show_at_end_of_video', shouldShow);
    onOnlyShowAtEndOfVideoChange(shouldShow);
  };

  const onSkipModalPopupChangeInternal = skipModalPopup => {
    formProps.setValue('skip_modal_popup', skipModalPopup);
    onSkipModalPopupChange(skipModalPopup);
  };

  const updateTextBasedOnUrl = () => {
    const url = formProps.getValues().url;
    const text = formProps.getValues().text;
    const autoPopulatedText = getCtaText(url);

    if (CALENDLY_URL_REGEX.test(url)) {
      // for calendly links, replace colors
      onBackgroundColorChangeInternal(DEFAULT_BUTTON_COLOR_FOR_CALENDLY);
      onColorChangeInternal(DEFAULT_TEXT_COLOR);
    }

    if (!text && autoPopulatedText) {
      // otherwise, only replace text if it's empty
      onTextChangeInternal(autoPopulatedText);
    }
  };

  const handleUrlBlur = () => {
    // If the url ends with a question mark, remove it (happens commonly for HEX links)
    const url = formProps.getValues().url;
    if (url.endsWith('?')) {
      onUrlChangeInternal(url.slice(0, -1));
    }

    updateTextBasedOnUrl();
  };

  const validateUrl = (link: string): string | boolean => {
    // Invalidates undesired schemas
    if (!isValidCtaUrl(link)) {
      return URL_ERROR;
    }
    const validate = urlRegexSafe({
      apostrophes: true,
      parens: true,
      exact: true,
      strict: false,
      re2: false,
    }).test(link)
      ? true
      : URL_ERROR;

    return validate;
  };

  // If we are showing the brand logo in the video player, it displays in the top left corner,
  // so we should not allow the top left location for CTA to avoid overlap
  const { brandLogoPath } = useCustomBranding({
    videoId,
  });
  const showingBrandLogoInVideoPlayer = Boolean(brandLogoPath);

  // For auto ctas, they come in with only a url. If we ever load this form and it has
  // a url but no text yet, attempt to auto-populate the text.
  useMount(updateTextBasedOnUrl);

  return (
    <div>
      <Form
        id="cta-form"
        control={formProps.control}
        onSubmit={formProps.handleSubmit(onSubmit)}
      >
        <Field>
          <FieldLabel htmlFor="url">Button link (URL)</FieldLabel>
          <FieldInput
            id="url"
            name="url"
            control={formProps.control}
            rules={{
              required: 'Required',
              validate: link => validateUrl(link as string),
            }}
            onChange={e => onUrlChangeInternal(e.target.value)}
            onBlur={handleUrlBlur}
          />
          <FieldInlineError name="url" control={formProps.control} />
        </Field>
        <CalendlyNotice ctaUrl={formProps.getValues().url} videoId={videoId} />
        <Spacer top="medium" />
        <Field>
          <FieldLabel htmlFor="text">Button text</FieldLabel>
          <FieldInput
            id="text"
            name="text"
            control={formProps.control}
            rules={{ required: 'Required' }}
            onChange={e => onTextChangeInternal(e.target.value)}
          />
          <FieldInlineError name="text" control={formProps.control} />
        </Field>
        <Spacer top="medium" />
        <Field>
          <FieldLabel htmlFor="location">Button location</FieldLabel>
          <FieldSelect
            id="location"
            name="location"
            control={formProps.control}
            rules={{ required: 'Required' }}
            onChange={onLocationChangeInternal}
            options={
              showingBrandLogoInVideoPlayer
                ? BTN_LOCATION_OPTIONS.filter(
                    option => option.value !== 'Top left'
                  )
                : BTN_LOCATION_OPTIONS
            }
            isDisabled={formProps.getValues().only_show_at_end_of_video}
          />
          <FieldInlineError name="location" control={formProps.control} />
        </Field>
        <Spacer top="medium" />
        <Field>
          <ColorPickerPopup
            defaultColor={DEFAULT_BUTTON_COLOR}
            colorSelected={onBackgroundColorChangeInternal}
            swatches={PRESET_COLORS_HEX_CODE}
            addButton={false}
            position="bottom-end"
          >
            <div className="picker-input">
              <FieldLabel htmlFor="background_color">Button color</FieldLabel>
              <FieldInput
                id="background_color"
                name="background_color"
                control={formProps.control}
                rules={{
                  required: 'Required',
                  validate: color =>
                    isHexColor(color as string) ? true : COLOR_ERROR,
                }}
                onChange={e => {
                  onBackgroundColorChangeInternal(e.target.value);
                }}
              />
              <img src={rainbowSrc} className="picker-icon" alt="picker icon" />
              <FieldInlineError
                name="background_color"
                control={formProps.control}
              />
            </div>
          </ColorPickerPopup>
        </Field>
        <Spacer top="medium" />
        <Field>
          <ColorPickerPopup
            defaultColor={DEFAULT_TEXT_COLOR}
            colorSelected={onColorChangeInternal}
            swatches={PRESET_COLORS_HEX_CODE}
            addButton={false}
            position="bottom-end"
          >
            <div className="picker-input">
              <FieldLabel htmlFor="color">Text color</FieldLabel>
              <FieldInput
                id="color"
                name="color"
                control={formProps.control}
                rules={{
                  required: 'Required',
                  validate: color =>
                    isHexColor(color as string) ? true : COLOR_ERROR,
                }}
                onChange={e => {
                  onColorChangeInternal(e.target.value);
                }}
              />
              <img src={rainbowSrc} className="picker-icon" alt="picker icon" />
              <FieldInlineError name="color" control={formProps.control} />
            </div>
          </ColorPickerPopup>
        </Field>
        <Spacer top="medium" />
        <Field>
          <FieldLabel htmlFor="button_corner_style">
            Button corner style
          </FieldLabel>
          <FieldSelect
            id="button_corner_style"
            name="button_corner_style"
            control={formProps.control}
            rules={{ required: 'Required' }}
            onChange={onButtonCornerStyleChangeInternal}
            options={Object.entries(CORNER_STYLES).map(([key, value]) => {
              return {
                value: key,
                title: key,
                icon: value?.icon,
              };
            })}
          />
          <FieldInlineError
            name="button_corner_style"
            control={formProps.control}
          />
        </Field>
        <Spacer top="large" />
        <Field variant="horizontal">
          <FieldCheckbox
            id="only_show_at_end_of_video"
            name="only_show_at_end_of_video"
            control={formProps.control}
            onChangeCapture={(e: ChangeEvent<HTMLInputElement>) => {
              onOnlyShowAtEndOfVideoChangeInternal(e.target.checked);
            }}
          />
          <FieldLabel htmlFor="only_show_at_end_of_video">
            Only show at end of video
          </FieldLabel>
        </Field>
        <Spacer top="medium" />
        <Field variant="horizontal">
          <FieldCheckbox
            id="skip_modal_popup"
            name="skip_modal_popup"
            control={formProps.control}
            onChangeCapture={(e: ChangeEvent<HTMLInputElement>) => {
              onSkipModalPopupChangeInternal(e.target.checked);
            }}
          />
          <FieldLabel htmlFor="skip_modal_popup">
            Disable end-of-video popup
          </FieldLabel>
        </Field>
      </Form>
    </div>
  );
};
