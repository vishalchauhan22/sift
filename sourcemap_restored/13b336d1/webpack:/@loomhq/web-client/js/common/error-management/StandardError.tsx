import React from 'react';

import {
  Text,
  Button,
  Icon,
  Container,
  Arrange,
  Link,
  Spacer,
} from '@loomhq/lens';
import { SvgAlertTriangle } from '@loomhq/lens/icons/alert-triangle';
import { SvgRefresh } from '@loomhq/lens/icons/refresh';
import { SUPPORT_URI } from '@js/constants/routes';

type StandardErrorProps = {
  text: string;
  CTAText: string;
  handleCTAClick?: () => void;
  showWarningIcon?: boolean;
  isInternalError?: boolean;
  customMessage?: string;
};

export const StandardError = ({
  text,
  CTAText = 'Refresh',
  handleCTAClick,
  showWarningIcon = false,
  isInternalError = false,
  customMessage = '',
}: StandardErrorProps): JSX.Element => (
  <Arrange
    height="fit-content"
    autoFlow="row"
    justifyContent="center"
    justifyItems="center"
    gap="small"
  >
    {showWarningIcon ? (
      <Container
        radius="full"
        backgroundColor="yellowLight"
        width="fit-content"
        padding={3}
      >
        <Icon size={9} color="warning" icon={<SvgAlertTriangle />} />
      </Container>
    ) : null}

    <Text size="body-lg" fontWeight="bold" color="body">
      {text}
    </Text>

    {!isInternalError ? (
      <Text fontWeight="book" color="bodyDimmed">
        if this error persists please{' '}
        <Link href={SUPPORT_URI} target="_blank" rel="noopener">
          contact customer support
        </Link>
      </Text>
    ) : (
      (customMessage ?? null)
    )}

    {handleCTAClick ? (
      <Spacer top={2}>
        <Button
          variant="primary"
          onClick={handleCTAClick}
          icon={<SvgRefresh />}
        >
          {CTAText}
        </Button>
      </Spacer>
    ) : null}
  </Arrange>
);
