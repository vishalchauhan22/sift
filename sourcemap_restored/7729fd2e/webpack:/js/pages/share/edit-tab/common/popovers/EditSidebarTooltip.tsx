// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import { BetaPill } from '@js/pages/common/BetaPill';
import React from 'react';

import { Arrange, Container, Icon, IconButton, Logo, Text } from '@loomhq/lens';

import { SvgClose } from '@loomhq/lens/icons/close';

// TODO(next author): Please convert styled component to native Lens and/or module css instead

type BetaPillVariant = 'limited-time' | 'default-beta' | null;

const LimitedTimeBetaPill = function (): JSX.Element {
  return (
    <Container
      backgroundColor="blurpleLight"
      paddingY={0.5}
      paddingX={1}
      radius="full"
      width="fit-content"
    >
      <Arrange gap={0.5}>
        <Icon icon={<Logo variant="symbol" maxWidth={2} />} color="blurple" />

        <Text fontWeight="bold" color="blurple">
          Limited-time beta
        </Text>
      </Arrange>
    </Container>
  );
};

export const EditSidebarTooltip = ({
  isClosable = true,
  onClose,
  betaPillVariant = null,
  img,
  altText,
  text,
  title,
}: {
  isClosable?: boolean;
  onClose?: () => void;
  betaPillVariant?: BetaPillVariant;
  img: string;
  altText: string;
  text: string;
  title: string;
}): JSX.Element => {
  return (
    <Container
      className="relative"
      radius="large"
      borderSide="all"
      backgroundColor="white"
      width="300px"
      shadow="medium"
    >
      {isClosable && (
        <CloseButtonWrapper>
          <IconButton
            altText="close"
            onClick={onClose}
            icon={<SvgClose />}
            iconColor="white"
          />
        </CloseButtonWrapper>
      )}

      <TooltipImgWrapper>
        <img src={img} alt={altText} />
      </TooltipImgWrapper>
      <DescriptionWrapper>
        {betaPillVariant === 'limited-time' ? (
          <Container paddingBottom="small">
            <LimitedTimeBetaPill />
          </Container>
        ) : betaPillVariant === 'default-beta' ? (
          <Container paddingBottom="xsmall">
            <BetaPill />
          </Container>
        ) : null}

        <Container paddingTop="small">
          <Arrange gap="small" autoFlow="row">
            <Text variant="title">{title}</Text>
            <Text variant="body" color="bodyDimmed">
              {text}
            </Text>
          </Arrange>
        </Container>
      </DescriptionWrapper>
    </Container>
  );
};

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 4px;
  z-index: 2; /* Needed to show the close button */
`;

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const boxShadowZIndex = 0;

const TooltipImgWrapper = styled.div`
  position: relative;
  z-index: ${boxShadowZIndex + 1};
  border-radius: var(--lns-radius-large) var(--lns-radius-large) 0 0;
  height: 150px;
  overflow: hidden;
`;

const boxShadowOffsetTop = 14;
const DescriptionWrapper = styled.div`
  position: relative;
  padding: var(--lns-space-medium);

  &:after {
    content: '';
    position: absolute;
    z-index: ${boxShadowZIndex};
    top: -${boxShadowOffsetTop}px;
    left: 0;
    right: 0;
    height: calc(100% + ${boxShadowOffsetTop}px);
    box-shadow: inset 0px 28px 20px -16px var(--lns-color-primary);
    border-radius: var(--lns-radius-large);
    background: transparent;
  }
`;
