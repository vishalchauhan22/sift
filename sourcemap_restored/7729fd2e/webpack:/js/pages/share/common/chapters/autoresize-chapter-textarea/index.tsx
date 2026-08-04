import cx from 'classnames';
import { AutoresizeTextarea } from '@js/pages/share/common/autoresize-textarea';
import React, { RefObject } from 'react';

import { IconButton, Tooltip, Arrange, Button, TextButton } from '@loomhq/lens';
import { SvgTrash } from '@loomhq/lens/icons/trash';

import styles from './styles.module.css';

const REMOVE_CHAPTERS_TEXT = 'Remove chapters';

interface AutoresizeChapterTextAreaProps {
  id: string;
  placeholder: string;
  className: any;
  value: any;
  onChange: (e) => void;
  shouldHighlight: boolean;
  size?: string;
  textRef: RefObject<HTMLTextAreaElement>;
  onCancel: () => void;
  onSave: () => void;
  onClear: () => void;
  hasError: boolean;
}

export const AutoresizeChapterTextArea = (
  props: AutoresizeChapterTextAreaProps
): JSX.Element => {
  const {
    id,
    shouldHighlight,
    textRef,
    onCancel,
    onSave,
    onClear,
    hasError,
    ...rest
  } = props;
  const newProps = { ...rest };
  const chapterProps = { ...rest };
  const isSmallInput = rest.size === 'small';

  const commonStyles = cx(rest.className, {
    [styles.sizeSmall]: isSmallInput,
    [styles.sizeMedium]: !isSmallInput,
    [styles.empty]: !shouldHighlight,
    [styles.hasError]: hasError,
  });

  newProps.className = cx(styles.textArea, commonStyles);

  chapterProps.className = cx(styles.textAreaAutoChapters, commonStyles);

  return (
    <div className={newProps.className}>
      <Arrange alignItems="start" gap="xsmall" columns={['11fr', '1fr']}>
        <AutoresizeTextarea id={id} textRef={textRef} {...chapterProps} />
        <div className={styles.showDeleteChapters}>
          <Tooltip tabIndex={-1} content={REMOVE_CHAPTERS_TEXT}>
            <IconButton
              data-testid="remove-chapters"
              altText={REMOVE_CHAPTERS_TEXT}
              icon={<SvgTrash />}
              isDisabled={props.value.length === 0}
              onClick={onClear}
            />
          </Tooltip>
        </div>
      </Arrange>
      <Arrange gap="small" justifyContent="end">
        <TextButton onClick={onCancel} data-testid="cancel-chapters">
          Cancel
        </TextButton>
        <Button onClick={onSave} variant="primary" data-testid="save-chapters">
          Save
        </Button>
      </Arrange>
    </div>
  );
};
