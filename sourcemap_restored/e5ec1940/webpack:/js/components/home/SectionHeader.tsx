import React, { useState, useEffect } from 'react';

import { Arrange, Split, SplitSection, Text, TextButton } from '@loomhq/lens';

// eslint-disable-next-line import/no-default-export
export default function SectionHeader({
  title,
  children,
  numVideosRemaining,
  onShowMoreToggle,
  tooltip,
  isShowMoreButtonVisible,
  isShowLessButtonVisible,
}: {
  title: string;
  children: JSX.Element;
  numVideosRemaining: number;
  onShowMoreToggle: () => void;
  tooltip: JSX.Element | null;
  isShowMoreButtonVisible: boolean;
  isShowLessButtonVisible: boolean;
}): JSX.Element {
  const [hasToolTip, setHasTooltip] = useState(false);

  useEffect(() => {
    setHasTooltip(Boolean(tooltip));
  }, [tooltip, setHasTooltip]);

  const headerId = `${title}-header`;
  const textButtonId = `show-more-${headerId}-button`;
  return (
    <Split>
      <SplitSection grow={1} shrink={0}>
        <Arrange justifyContent="start" gap="xsmall">
          <HeaderText id={headerId}>{children}</HeaderText>
          {hasToolTip && tooltip}
        </Arrange>
      </SplitSection>
      {isShowMoreButtonVisible && (
        <SplitSection>
          <TextButton
            id={textButtonId}
            aria-labelledby={`${headerId} ${textButtonId}`}
            onClick={onShowMoreToggle}
          >
            Show more ({numVideosRemaining})
          </TextButton>
        </SplitSection>
      )}
      {isShowLessButtonVisible && (
        <SplitSection>
          <TextButton onClick={onShowMoreToggle}>Show fewer</TextButton>
        </SplitSection>
      )}
    </Split>
  );
}

export function HeaderText({
  id,
  children,
}: {
  id?: string;
  children: JSX.Element;
}): JSX.Element {
  return (
    <Text id={id} size="body-lg" fontWeight="bold" htmlTag="h2">
      {children}
    </Text>
  );
}
