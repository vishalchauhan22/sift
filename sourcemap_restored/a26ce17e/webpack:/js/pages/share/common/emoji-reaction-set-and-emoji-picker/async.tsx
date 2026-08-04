import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { EmojiReactionSetAndEmojiPickerProps } from './types';

// YOU WERE ADDING PROPS
const EmojiReactionSetAndEmojiPicker = reactLazyRetry(() =>
  import(
    /* webpackChunkName: "EmojiReactionSetAndEmojiPicker" */ '@js/pages/share/common/emoji-reaction-set-and-emoji-picker'
  ).then(module => ({ default: module.EmojiReactionSetAndEmojiPicker }))
);

export const EmojiReactionSetAndEmojiPickerAsync: React.FC<
  React.PropsWithChildren<EmojiReactionSetAndEmojiPickerProps>
> = (props): JSX.Element => (
  <Suspense fallback={null}>
    <EmojiReactionSetAndEmojiPicker {...props} />
  </Suspense>
);
