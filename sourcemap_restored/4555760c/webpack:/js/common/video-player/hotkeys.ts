export const EmojiReactionHotkeysList = ['1', '2', '3', '4', '5', '6'];
export const hotKeys = {
  closeCaptions: { key: 'a', label: 'A' },
  decrementBackward: { key: ',', label: ',' },
  fullscreen: { key: 'f', label: 'F' },
  incrementForward: { key: '.', label: '.' },
  mute: { key: 'm', label: 'M' },
  pip: { key: 'p', label: 'P' },
  play: { key: 'k', label: 'K' },
  selectReactionInGroup: EmojiReactionHotkeysList.map(key => {
    return { key, label: key };
  }),
  speed: { key: 's', label: 'S' },
  stepBackward: { key: 'j', label: 'J' },
  stepForward: { key: 'l', label: 'L' },
  theater: { key: 't', label: 'T' },
  toggleComments: { key: 'c', label: 'C' },
  toggleReactionPicker: { key: '7', label: '7' },
  toggleWatchLater: { key: 'w', label: 'W' },
};
