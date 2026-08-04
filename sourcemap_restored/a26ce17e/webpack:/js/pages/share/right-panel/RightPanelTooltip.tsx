// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { Arrange, Icon, Text, Align, Container, Tooltip } from '@loomhq/lens';

import { SvgEditions } from '@loomhq/lens/icons/editions';

const GradientContainer = styled.div`
  width: 224px;
  height: 138px;
  background: linear-gradient(to right, #4355fb, #f187fb);
`;

type RightPanelTooltipContentProps = {
  text: string;
  altText: string;
  img: string;
  imgWidth: string;
  imgAlignment?: string;
  trial?: boolean;
  noAccess?: boolean;
};

export const RightPanelTooltipContent = ({
  text,
  altText,
  img,
  imgWidth,
  imgAlignment = 'center',
  trial = false,
  noAccess = false,
}: RightPanelTooltipContentProps): React.ReactElement => {
  return (
    <Container
      radius="150"
      width="224px"
      overflow="hidden"
      margin="-7px -12px" // offsets padding of tooltip
    >
      <Arrange autoFlow="row">
        <GradientContainer>
          <Align alignment={imgAlignment as any}>
            <img src={img} alt={altText} width={imgWidth} height="auto" />
          </Align>
        </GradientContainer>
        <Container padding="small">
          {noAccess ? (
            <Arrange gap="xsmall" autoFlow="row">
              <Text size="body-sm" fontWeight="bold">
                Upgrade to unlock links
              </Text>
            </Arrange>
          ) : (
            <Arrange gap="xsmall" autoFlow="row">
              {trial && (
                <Arrange gap="xsmall">
                  <Icon icon={<SvgEditions />} size={2} color="upgradeHover" />
                  <Text size="body-sm" fontWeight="bold" color="upgradeHover">
                    Available with your trial
                  </Text>
                </Arrange>
              )}
              <Text size="body-sm" fontWeight="bold">
                {text}
              </Text>
            </Arrange>
          )}
        </Container>
      </Arrange>
    </Container>
  );
};

export const RightPanelTooltip = ({
  children,
  tooltipContent,
  notAvailable,
  maxWidth = '224px',
  placement = 'leftCenter',
}: {
  children: React.ReactElement;
  tooltipContent?: JSX.Element;
  notAvailable?: boolean;
  maxWidth?: string;
  placement: 'leftCenter' | 'bottomCenter' | 'bottomRight';
}): JSX.Element => {
  return (
    // TODO for Manda: double check this with new colors
    <Tooltip
      tabIndex={-1}
      isInline={false}
      content={tooltipContent}
      placement={placement}
      triggerOffset={8}
      maxWidth={maxWidth}
      isDisabled={notAvailable}
      keepOpen
    >
      {children}
    </Tooltip>
  );
};
