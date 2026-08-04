// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';
import React from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { getSizingCssVarsDeclarations, getTextSize } from '@loomhq/lens';

import { Feature } from '@loomhq/shared-utilities/constants/product';

import { useLvpUnit } from '..';
import {
  progressHeight,
  reactionsBarHeight,
  videoGlobalContainerClassName,
} from '../variables';
import { ViewportContextProvider } from '../viewportContext';

const fullscreenStyles = `
  &:fullscreen [data-hide-if-fullscreen] { display: none }
  &:-webkit-full-screen [data-hide-if-fullscreen] { display: none }
  &:not(:fullscreen) [data-hide-ifnot-fullscreen] { display: none }
  &:not(:-webkit-full-screen) [data-hide-ifnot-fullscreen] { display: none }
`;

const theaterStyles = `
  .theaterMode & [data-hide-if-theater] { display: none }
  [data-hide-ifnot-theater] { display: none }
  .theaterMode & [data-hide-ifnot-theater] { display: block }
`;

const Wrapper = styled.div`
  --lvp-reactionsBar-height: ${reactionsBarHeight};
  --lvp-progress-height: ${progressHeight};
  position: relative;

  ${getSizingCssVarsDeclarations()};
  width: 100%;
  height: 100%;
  isolation: isolate;
  --lns-unit: var(--lvp-unit);
  color-scheme: dark;
  ${getTextSize('medium')};
  ${fullscreenStyles};
  ${theaterStyles};
`;

const ChildrenWrapper = React.forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode; className: string }
>(({ children, className }, ref) => {
  const lvpUnit = useLvpUnit();
  const { featureLoadedRef } = useFeatureWrapper(ref);

  return (
    <Wrapper
      ref={featureLoadedRef}
      className={className}
      style={{ '--lvp-unit': lvpUnit } as React.CSSProperties}
    >
      {children}
    </Wrapper>
  );
});

ChildrenWrapper.displayName = 'ChildrenWrapper';

const VideoGlobalContainerWithoutFeatureWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <ViewportContextProvider ref={ref}>
      <ChildrenWrapper ref={ref} className={videoGlobalContainerClassName}>
        {children}
      </ChildrenWrapper>
    </ViewportContextProvider>
  );
};

export const VideoGlobalContainer: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }): JSX.Element => (
  <FeatureWrapper
    feature={Feature.VideoPlayer}
    errorType={ErrorBoundaryTypes.DEFAULT}
  >
    <VideoGlobalContainerWithoutFeatureWrapper>
      {children}
    </VideoGlobalContainerWithoutFeatureWrapper>
  </FeatureWrapper>
);
