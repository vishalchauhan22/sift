import React from 'react';

import {
  Arrange,
  Container,
  Logo,
  Spacer,
  Text,
  TextButton,
} from '@loomhq/lens';

import { useBrandColor } from '@js/hooks/experiments/useBrandColor';

interface Props {
  onClick: () => void;
}

// eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
export const PurchaseLoomAI = ({ onClick }: Props): JSX.Element => {
  const useNewAiBranding = useBrandColor();
  return (
    <Spacer x="small">
      <TextButton type="button" onClick={onClick} offsetSide="left">
        <Arrange gap="xsmall">
          <Text color="blurple" fontWeight="bold">
            Get Loom AI
          </Text>
          <Container position="relative" top="-5px" left="-3px">
            <Logo
              brand="ai"
              maxWidth={1.5}
              variant="symbol"
              {...(useNewAiBranding && { symbolColor: 'body' })}
            />
          </Container>
        </Arrange>
      </TextButton>
      <Text color="bodyDimmed">
        Create better video messages without lifting a finger
      </Text>
    </Spacer>
  );
};
