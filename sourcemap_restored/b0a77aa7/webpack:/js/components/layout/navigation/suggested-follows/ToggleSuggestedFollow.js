/* eslint-disable @loomhq/loom/no-js-extension */
import React from 'react';

import { IconButton } from '@loomhq/lens';
import { SvgPlusCircle } from '@loomhq/lens/icons/plus-circle';
import { SvgMinusCircle } from '@loomhq/lens/icons/minus-circle';

import styles from './styles.module.less';

const ADD = 'ADD';
const REMOVE = 'REMOVE';

const ToggleSuggestedFollow = ({ type, onClick }) => {
  return (
    <IconButton
      altText={type == ADD ? 'Add' : 'Remove'}
      className={styles.navIcon}
      icon={type == ADD ? <SvgPlusCircle /> : <SvgMinusCircle />}
      iconColor="bodyDimmed"
      size="small"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

export const AddSuggestedFollow = ({ onClick }) => (
  <ToggleSuggestedFollow type={ADD} onClick={onClick} />
);

export const RemoveSuggestedFollow = ({ onClick }) => (
  <ToggleSuggestedFollow type={REMOVE} onClick={onClick} />
);

// eslint-disable-next-line import/no-default-export
export default ToggleSuggestedFollow;
