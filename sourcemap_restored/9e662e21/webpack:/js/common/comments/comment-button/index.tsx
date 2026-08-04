import React from 'react';

import { FeatureWrapper } from '@js/utilities/rum/feature-wrapper';
import { ErrorBoundaryTypes } from '@js/utilities/rum/feature-wrapper/constants';
import { useFeatureWrapper } from '@js/utilities/rum/feature-wrapper/context';

import { Button, Tooltip, useMedia } from '@loomhq/lens';
import { SvgComment } from '@loomhq/lens/icons/comment';

import { Feature } from '@loomhq/shared-utilities/constants/product';

type CommentButtonProps = {
  buttonText?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  tabIndex?: number | undefined;
};

export const CommentButtonWithoutFeatureWrapper = ({
  buttonText = '',
  onClick = () => null,
  size,
  tabIndex = undefined,
}: CommentButtonProps): JSX.Element => {
  // NOTE(tatiana): Monitor usages like responsive prop to see if this is something we need to build directly into Lens.
  const responsize = useMedia(['(min-width: 560px)'], [true], false);
  const iconButtonSize: any = responsize ? 'medium' : 'small';

  const { featureLoadedRef } = useFeatureWrapper();

  return (
    <div ref={featureLoadedRef}>
      <Tooltip tabIndex={tabIndex} content="Comment" shortcut={['C']}>
        <Button
          data-testid="comment-reaction-button"
          id="comment-reaction-button"
          onClick={onClick}
          size={size ?? iconButtonSize}
          icon={<SvgComment />}
        >
          {buttonText ?? 'Comment'}
        </Button>
      </Tooltip>
    </div>
  );
};

export const CommentButton = (props: CommentButtonProps): JSX.Element => (
  <FeatureWrapper
    feature={Feature.VideoReactions}
    errorType={ErrorBoundaryTypes.SILENT}
    additionalLoggingValues={{ version: 'comment button' }}
  >
    <CommentButtonWithoutFeatureWrapper {...props} />
  </FeatureWrapper>
);
