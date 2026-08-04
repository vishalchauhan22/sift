import { ENTER } from '@js/constants/keyCodes';
import { EMBED_VIDEO_CORRECT_PASS } from '@js/constants/messages';
import { LOOM_URI } from '@js/constants/routes';

import { useVideoPasswordContext } from '@js/common/video-password';
import { LayersContainer, useModelId } from '@js/common/video-player/';
import { useFetchPasswordProtectedProps } from '@js/pages/share/useFetchPasswordProtectedProps';
import React, { useEffect, useState } from 'react';

import { isFromPublicSharePage } from '@js/utilities/url';

import {
  Align,
  Arrange,
  Button,
  Container,
  FormField,
  Icon,
  Spacer,
  Text,
  TextInput,
  u,
} from '@loomhq/lens';
import { SvgLock } from '@loomhq/lens/icons/lock';

import { useCheckPassword } from '../hooks';

const ERROR_MESSAGE = 'Password incorrect';

export const PasswordLayer = (): React.ReactElement => {
  const videoId = useModelId();
  const { setPassword } = useVideoPasswordContext();
  const [checkPassword] = useCheckPassword();
  const [hasError, setHasError] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const submitIsDisabled = !passwordValue || hasError;
  const { fromPublicSharePage } = isFromPublicSharePage();
  const { getPasswordProtectedProps } = useFetchPasswordProtectedProps();

  const onSubmit = e => {
    e.preventDefault();
    checkPassword({
      variables: { videoId, password: passwordValue },
      onCompleted: data => {
        if (!data.isValid) {
          setHasError(true);

          return;
        }

        // send a message to the public share page so it can render the comments
        // and description view
        if (fromPublicSharePage) {
          window.top?.postMessage(
            {
              type: EMBED_VIDEO_CORRECT_PASS,
              password: passwordValue,
            },
            `${LOOM_URI}/share`
          );
        }

        if (videoId) {
          getPasswordProtectedProps({
            variables: { id: videoId, password: passwordValue },
            onCompleted: () => {
              setPassword(passwordValue);
            },
          });
        }
      },
    });
  };

  const onKeyDown = e => {
    if (e.keyCode === ENTER && !e.shiftKey && !submitIsDisabled) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  useEffect(() => {
    setHasError(false);
  }, [passwordValue]);

  return (
    <LayersContainer>
      <Container
        contentColor="body"
        backgroundColor="background"
        padding="medium"
        borderSide="all"
      >
        <Align>
          <Container width={`min(100%, ${u(40)})`}>
            <Spacer bottom="medium">
              <Arrange gap="small">
                <Icon icon={<SvgLock />} />
                <Text fontWeight="bold" size="body-lg">
                  This video is password protected
                </Text>
              </Arrange>
            </Spacer>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onKeyDown={onKeyDown}>
              <FormField
                direction="column"
                label="Password"
                labelFor="videoPassword"
                errorMessage={(hasError && ERROR_MESSAGE) || undefined}
              >
                <TextInput
                  type="password"
                  value={passwordValue}
                  hasError={hasError}
                  autoComplete="off"
                  onChange={e => setPasswordValue(e.target.value)}
                />
              </FormField>
              <Spacer top="medium">
                <Button
                  hasFullWidth
                  variant="primary"
                  isDisabled={submitIsDisabled}
                  onClick={onSubmit}
                >
                  Enter
                </Button>
              </Spacer>
            </div>
          </Container>
        </Align>
      </Container>
    </LayersContainer>
  );
};
