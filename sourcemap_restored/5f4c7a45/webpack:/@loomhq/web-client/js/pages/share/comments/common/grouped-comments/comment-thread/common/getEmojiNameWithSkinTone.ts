type GetEmojiNameWithSkinToneProps = {
  type: string;
  skinTone: string;
};

export const getEmojiNameWithSkinTone = ({
  type,
  skinTone,
}: GetEmojiNameWithSkinToneProps): string => {
  const validSkinTonePattern = /(hand)(::skin-tone-[2-6])/;
  // get the suffix, eg. "::skin-tone-3", and concat it to the type name
  const suffix = skinTone?.match(validSkinTonePattern)?.[2];

  if (suffix) {
    type = type.concat(suffix);
  }

  return type;
};
