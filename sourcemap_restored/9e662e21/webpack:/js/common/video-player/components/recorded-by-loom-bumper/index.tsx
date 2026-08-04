// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import {
  Arrange,
  Button,
  Container,
  Link,
  Logo,
  LogoLoader,
  Spacer,
  Text,
  TextButton,
} from '@loomhq/lens';
import { SvgReplay } from '@loomhq/lens/icons/replay';

const SIGNUP_TO_LOOM_PAGE = 'https://www.loom.com/signup?embed_cta=true';
const COMMUNITY_LOOMS_PAGE = 'https://www.loom.com/community';

const RecordedByLoom = styled.div`
  align-items: center;
  display: flex;

  & > *:nth-child(1) {
    animation: show 0.25s forwards;
    transform: translateY(4px);
    opacity: 0;
  }

  & > *:nth-child(2) {
    animation: show 0.25s forwards 0.25s;
    transform: translateY(4px);
    opacity: 0;
  }

  & > *:nth-child(3) {
    animation: logo 0.25s forwards 0.5s;
    transform: scale(0.5);
    opacity: 0;
  }

  & > *:nth-child(4) {
    animation: show 0.25s forwards 0.75s;
    transform: translateY(4px);
    opacity: 0;
  }

  @keyframes show {
    65% {
      transform: translateY(-1px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes logo {
    65% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
const BumperCTAWrapper = styled.div`
  margin-top: -10px;
  align-items: center;
  display: flex;

  & > *:nth-child(1) {
    animation: show 0.25s forwards 2.75s;
    transform: translateY(4px);
    opacity: 0;
  }

  & > *:nth-child(3) {
    animation: show 0.25s forwards 2.75s;
    transform: translateY(4px);
    opacity: 0;
  }

  @keyframes show {
    65% {
      transform: translateY(-1px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const RecordedByLoomBumper = ({
  isLoggedUser,
  onPlay,
  gap,
}: {
  isLoggedUser?: boolean;
  onPlay: () => void;
  gap: string;
}): JSX.Element => {
  return (
    <Arrange autoFlow="row" gap={gap} justifyItems="center">
      <div style={{ height: '100%' }}>
        <RecordedByLoom>
          <Text fontWeight="bold" size="heading-sm" color="black">
            Recorded&nbsp;
          </Text>
          <Text fontWeight="bold" size="heading-sm" color="black">
            with
          </Text>
          <Container marginLeft="-6px" marginRight="-4px">
            <LogoLoader animation="spin 2s 1 steps(49) forwards .5s" />
          </Container>
          <Logo variant="wordmark" maxWidth={12.25} wordmarkColor="black" />
        </RecordedByLoom>
      </div>
      {isLoggedUser ? (
        <BumperCTAWrapper>
          <div data-lens-theme="light">
            <TextButton onClick={onPlay} icon={<SvgReplay />}>
              Watch again
            </TextButton>
          </div>
        </BumperCTAWrapper>
      ) : (
        <BumperCTAWrapper>
          <Button
            target="_blank"
            htmlTag="a"
            href={SIGNUP_TO_LOOM_PAGE}
            variant="primary"
          >
            Get Loom for Free
          </Button>
          <Spacer left="medium" />
          <Text fontWeight="bold">
            <Link target="_blank" href={COMMUNITY_LOOMS_PAGE}>
              Watch how others Loom
            </Link>
          </Text>
        </BumperCTAWrapper>
      )}
    </Arrange>
  );
};
