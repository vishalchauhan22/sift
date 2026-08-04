import { Arrange, Container, Icon, Loader, Text } from '@loomhq/lens';
import { getActiveLanguageName } from '../hooks';
import { useViewportContext } from '../viewportContext';
import { zIndexes } from '../utils';

import React, { useMemo } from 'react';

import styles from './styles.module.css';
import { SvgSettings } from '@loomhq/lens/icons/settings';
import { useTranscript } from '@js/common/transcripts';

export const ClosedCaptionsHelpGuide = ({
  captionsLanguageSelection,
  isCaptionsTranslationInProgress,
  hasTranslationError,
  subTextIsVisible,
  showTheWaitingCaptionText,
}: {
  captionsLanguageSelection: string;
  isCaptionsTranslationInProgress: boolean | null;
  hasTranslationError: boolean;
  subTextIsVisible: boolean;
  showTheWaitingCaptionText: boolean;
}): JSX.Element => {
  const { language: defaultCaptionsLanguage } = useTranscript();
  const currentLanguage = useMemo(() => {
    if (defaultCaptionsLanguage && captionsLanguageSelection === '') {
      return getActiveLanguageName(defaultCaptionsLanguage);
    }
    return getActiveLanguageName(captionsLanguageSelection);
  }, [captionsLanguageSelection, defaultCaptionsLanguage]);

  const displayText = showTheWaitingCaptionText
    ? 'Your captions will continue generating in the background'
    : `CC: ${currentLanguage} (Auto-generated)`;

  const { width } = useViewportContext();
  const isSmallScreen = width < 600;

  const responsiveWidth = {
    default: 'max-content',
    xsmall: '100%',
    small: 'max-content',
  };

  const textSize = isSmallScreen ? 'body-md' : 'body-lg';

  if (hasTranslationError) {
    return (
      <>
        <Container
          radius="medium"
          width={responsiveWidth}
          zIndex={zIndexes.closedCaptions}
          className={styles.helperText}
        >
          <Arrange gap="small" autoFlow="row">
            <Text
              size={textSize}
              fontWeight="regular"
              color="white"
              className={styles.helperTextComponent}
            >
              CC: Failed to load selected language. Captions are defaulted to
              video&apos;s default language
            </Text>
          </Arrange>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container
        radius="medium"
        width={responsiveWidth}
        zIndex={zIndexes.closedCaptions}
        className={styles.helperText}
      >
        <Arrange gap="small" autoFlow="row">
          <div className={styles.helperTextComponent}>
            <Arrange autoFlow="column" gap="small">
              {isCaptionsTranslationInProgress && (
                <Loader size="small" color="white" />
              )}
              <Text size={textSize} fontWeight="regular" color="white">
                {displayText}
              </Text>
            </Arrange>
          </div>
          {subTextIsVisible && (
            <div className={styles.helperTextComponent}>
              <Arrange gap="small" autoFlow="column">
                <Icon
                  icon={<SvgSettings />}
                  color="currentColor"
                  size={'medium'}
                />
                <Text size={textSize} fontWeight="regular" color="white">
                  {'Click settings for languages and more options'}
                </Text>
              </Arrange>
            </div>
          )}
        </Arrange>
      </Container>
    </>
  );
};
