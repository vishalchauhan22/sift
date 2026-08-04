// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React, { useCallback } from 'react';

import { Select, Text, TextButton } from '@loomhq/lens';
import { SvgChevronDown } from '@loomhq/lens/icons/chevron-down';

import { EmailGatingSetting as EmailGatingSettingOptions } from '@loomhq/shared-utilities/constants/emailGating';

import { VideoSetting } from '../video-setting';

const EMAIL_GATE_SETTING_KEY = 'email_gate_video_type';

const ANIMATION_CSS = `
  @keyframes fade-in-out {
    0% {
      box-shadow: none;
    }
    25% {
      box-shadow: 0 2px 0 var(--lns-color-focusRing), 0 -2px 0 var(--lns-color-focusRing);

    }
    75% {
      box-shadow: 0 2px 0 var(--lns-color-focusRing), 0 -2px 0 var(--lns-color-focusRing);

    }
    100% {
      box-shadow: none;
    }
  }

  animation: fade-in-out 2000ms ease-in-out;
`;

const TextButtonWrapper = styled.div`
  & button {
    padding: 0 var(--lns-space-small);
    height: var(--lns-lineHeight-medium);
    border-radius: var(--lns-radius-100);
  }
`;

const AnimationWrapperDiv = styled.div<{ shouldAnimate: boolean }>`
  position: relative;

  ${props => (props.shouldAnimate ? ANIMATION_CSS : '')}
`;

const emailGatingOptions = [
  { value: EmailGatingSettingOptions.None, name: 'No' },
  { value: EmailGatingSettingOptions.Soft, name: 'Ask for email' },
  { value: EmailGatingSettingOptions.Hard, name: 'Require email' },
].map(({ value, name }) => {
  return {
    value,
    title: <Text fontWeight="bold">{name}</Text>,
  };
});

const AnimationWrapper = ({ children, shouldAnimate, setShouldAnimate }) => {
  const handleRef = useCallback(
    (node: any) => {
      if (!node) {
        return;
      }

      node.addEventListener('animationend', () => {
        setShouldAnimate(false);
      });
    },
    [setShouldAnimate]
  );

  return (
    <AnimationWrapperDiv shouldAnimate={shouldAnimate} ref={handleRef}>
      {children}
    </AnimationWrapperDiv>
  );
};

export const EmailGatingSetting = ({
  options,
  onOptionSelect,
  shouldAnimate,
  setShouldAnimate,
}: {
  options: Record<string, string>;
  onOptionSelect: (key: string, value: string) => void;
  shouldAnimate?: boolean;
  setShouldAnimate?: (shouldAnimate: boolean) => void;
}): JSX.Element | null => {
  return (
    <>
      <AnimationWrapper
        shouldAnimate={shouldAnimate}
        setShouldAnimate={setShouldAnimate}
      >
        <VideoSetting
          key={EMAIL_GATE_SETTING_KEY}
          settingName="Request email to view"
          subtext="Viewers that aren’t logged-in will need to provide an email to be able to access the video"
        >
          <Select
            trigger={(triggerContent, buttonProps) => (
              <TextButtonWrapper>
                <TextButton
                  size="medium"
                  iconPosition="right"
                  icon={<SvgChevronDown />}
                  {...buttonProps}
                >
                  <Text fontWeight="bold">{triggerContent.title}</Text>
                </TextButton>
              </TextButtonWrapper>
            )}
            selectedOptionValue={options[EMAIL_GATE_SETTING_KEY]}
            menuMaxHeight={44}
            menuMaxWidth={30}
            menuMinWidth={25}
            menuPosition="right"
            options={emailGatingOptions}
            onChange={option =>
              onOptionSelect(EMAIL_GATE_SETTING_KEY, option.value)
            }
          />
        </VideoSetting>
      </AnimationWrapper>
    </>
  );
};
