import React from 'react';

import { Arrange, Container, Text, Button } from '@loomhq/lens';

export type SuccessMessageProps = {
  /**
   * Callback to run when user clicks to close the widget after a successful ticket creation
   */
  onSuccessClose: () => void;
  /**
   * Callback to run when user clicks to return to the chat after a successful ticket creation
   */
  onSuccessReturnToChat: () => void;
};

export const SuccessMessage = ({
  onSuccessClose,
  onSuccessReturnToChat,
}: SuccessMessageProps): React.ReactNode => {
  return (
    <Arrange
      data-testid="widget-form-success-message"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Arrange rows={['auto', 'auto', 'auto']} gap={3}>
        <Container>
          <Text alignment="center" size="large" fontWeight="bold" as="h2">
            Your message was sent!
          </Text>
        </Container>
        <Container maxWidth="20rem">
          <Text alignment="center">
            The support team at Loom will respond to your inquiry as soon as
            possible. We aim to get back to you within a couple hours, but
            weekends and evenings may take us a little longer.
          </Text>
        </Container>
        <Container>
          <Arrange justifyContent="center" gap="small">
            <Button
              variant="neutral"
              onClick={() => {
                onSuccessReturnToChat();
              }}
            >
              Start new chat
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSuccessClose();
              }}
            >
              Close
            </Button>
          </Arrange>
        </Container>
      </Arrange>
    </Arrange>
  );
};
