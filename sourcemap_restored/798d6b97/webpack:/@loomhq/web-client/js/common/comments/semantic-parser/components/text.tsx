import React from 'react';

export const Text = (props: {
  children: string;
  inPlayer?: boolean;
}): JSX.Element => {
  const { inPlayer, children } = props;

  return (
    <span
      style={{
        whiteSpace: inPlayer ? 'nowrap' : 'pre-wrap',
        fontFamily:
          'var(--lns-fontFamily-body, Circular, Twemoji Mozilla, Apple Color Emoji, Noto Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Segoe UI, EmojiOne Color, Android Emoji)',
      }}
    >
      {children}
    </span>
  );
};
