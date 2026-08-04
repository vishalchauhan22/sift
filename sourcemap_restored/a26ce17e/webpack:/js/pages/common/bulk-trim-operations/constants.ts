export const REMOVE_FILLER_WORDS = 'remove-filler-words';
export const REMOVE_FILLER_WORDS_PLUS = 'remove-filler-words-plus';
export const REMOVE_FILLER_WORDS_TTS = 'remove-filler-words-tts';
export const REMOVE_DISFLUENCIES_PREFATORY = 'remove-disfluencies-prefatory';
export const UNDO_REMOVE_FILLER_WORDS = 'undo-remove-filler-words';
export const UNDO_REMOVE_FILLER_WORDS_TTS = 'undo-remove-filler-words-tts';
export const REMOVE_SILENCES = 'remove-silences';
export const UNDO_REMOVE_SILENCES = 'undo-remove-silences';

export type FillerWordOperationTypes =
  | typeof REMOVE_FILLER_WORDS
  | typeof REMOVE_FILLER_WORDS_PLUS
  | typeof REMOVE_FILLER_WORDS_TTS
  | typeof UNDO_REMOVE_FILLER_WORDS
  | typeof UNDO_REMOVE_FILLER_WORDS_TTS
  | typeof REMOVE_DISFLUENCIES_PREFATORY;

export type SilenceOperationTypes =
  | typeof REMOVE_SILENCES
  | typeof UNDO_REMOVE_SILENCES;

export type BulkTrimOperations =
  | FillerWordOperationTypes
  | SilenceOperationTypes;

export const FILLER_WORDS = 'filler-words';
export const FILLER_WORDS_PLUS = 'filler-words-plus';
export const OFF = 'OFF';

export type FillerWordAppliedTypes =
  | typeof FILLER_WORDS
  | typeof FILLER_WORDS_PLUS
  | typeof OFF;
