import cx from 'classnames';
import React from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

import styles from './styles.module.css';

interface AutoresizeTextareaProps {
  shouldHighlight?: boolean;
  hasError?: boolean;
  size?: string;
  spacing?: 'medium' | 'small' | 'none';
  textRef?: React.ForwardedRef<HTMLTextAreaElement>;
  className?: string;
}

// TODO(sam) find a way to make typescript accept a different type for newProps
// that doesn't restrict the prop assignment for textRef -> ref
interface PassedTextAreaProps {
  ref?: React.ForwardedRef<HTMLTextAreaElement>;
}

export const AutoresizeTextarea = (
  props: AutoresizeTextareaProps & TextareaAutosizeProps & PassedTextAreaProps
): JSX.Element => {
  const newProps = {
    ...props,
  };
  const isSmallInput = props.size === 'small';
  const { shouldHighlight = false, hasError = false } = props;

  const spacing = props.spacing || 'none';
  const hasSmallSpacing = spacing === 'small';
  const hasMediumSpacing = spacing === 'medium';

  newProps.className = cx(styles.textArea, props.className, {
    [styles.sizeSmall]: isSmallInput,
    [styles.sizeMedium]: !isSmallInput,
    [styles.paddingSmall]: hasSmallSpacing,
    [styles.paddingMedium]: hasMediumSpacing,
    [styles.empty]: !shouldHighlight,
    [styles.error]: hasError,
  });

  newProps.ref = props.textRef;
  delete newProps.textRef;
  delete newProps.shouldHighlight;
  delete newProps.hasError;
  delete newProps.spacing;

  return <TextareaAutosize {...newProps}></TextareaAutosize>;
};
