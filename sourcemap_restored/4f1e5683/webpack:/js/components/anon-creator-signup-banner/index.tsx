import { ModalTypeEnum } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import React, { FC } from 'react';

import { Arrange, Button, Container, Text } from '@loomhq/lens';

export const AnonCreatorSignupBanner: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { openModal } = useModals();
  const openAnonCreatorAuthModal = () => {
    openModal({ modalType: ModalTypeEnum.ANON_CREATOR_SIGNUP_MODAL });
  };

  return (
    <Container width="100%" backgroundColor="primary" padding="small">
      <Arrange gap={4} justifyContent="center">
        <Text alignment="center" color="white" fontWeight="bold">
          Sign up to save this video as your own. You can only do this for the
          next 24hrs.
        </Text>
        <Container backgroundColor="white" radius="medium">
          <Button size="small" onClick={openAnonCreatorAuthModal}>
            <Text fontWeight="bold" color="primary">
              Get Loom for Free
            </Text>
          </Button>
        </Container>
      </Arrange>
    </Container>
  );
};
