import { chapterLiteralToSeconds } from '@loomhq/shared-utilities/utilities/timeUtils';

const MINIMUM_CHAPTERS = 2;
const MAXIMUM_CHAPTERS = 15;
const MIN_CHAPTER_DURATION_SEC = 5;

export const CHAPTERS_NOT_IN_ORDER = 'Your chapters are out of order.';
export const CHAPTERS_NOT_START_AT_0_00 =
  'You are missing a chapter starting at 0:00.';
export const TOO_FEW_CHAPTERS = `You need at least two chapters.`;
export const TOO_MANY_CHAPTERS = `Please have at most ${MAXIMUM_CHAPTERS} chapters.`;
export const CHAPTERS_TOO_SHORT = `Chapters must be at least ${MIN_CHAPTER_DURATION_SEC} seconds long.`;
export const CHAPTERS_OUT_OF_BOUNDS =
  'Timestamps must be within the video duration.';

export type ChaptersValidationError =
  | typeof CHAPTERS_NOT_IN_ORDER
  | typeof CHAPTERS_NOT_START_AT_0_00
  | typeof TOO_FEW_CHAPTERS
  | typeof TOO_MANY_CHAPTERS
  | typeof CHAPTERS_TOO_SHORT
  | typeof CHAPTERS_OUT_OF_BOUNDS;

export interface TimestampToChapter {
  timestamp: string;
  chapter: string;
}

export type ChaptersValidation = {
  chapters: null | TimestampToChapter[];
  error: null | ChaptersValidationError;
};

// This regex is used to do the same as above, but allow for a trailing space
export const TIMESTAMP_REGEX_FOR_SENTENCES = new RegExp(
  /^(?:(?:[0-5]?\d):)?(?:[0-5]?\d):(?:[0-5]\d) /
);

const POSSIBLE_START_TIMES = ['0:00', '00:00', '0:00:00', '00:00:00'];

// Current Validation Rules on when to show chapters:
// 1. First chapter must start at 0:00
// 2. Must have at least 2 chapters, at most 15 chapters
// 3. All timestamps must be in ascending order
// 4. All timestamps must be less than the video length
// 5. All timestamps must be spaced at least 5 seconds apart
export const validateChapters = (
  chaptersText: string | null,
  videoDuration: number | null
): ChaptersValidation => {
  if (chaptersText === null || chaptersText.length === 0 || !videoDuration) {
    return { chapters: null, error: null };
  }

  const chaptersByLine = chaptersText.split('\n');

  const timestampToChapter: TimestampToChapter[] = [];

  for (let i = 0; i < chaptersByLine.length; i++) {
    const line = chaptersByLine[i];
    const previousSeenTimestamp =
      timestampToChapter[timestampToChapter.length - 1];

    // continue if the line does not begin with a timestamp
    if (!line.match(TIMESTAMP_REGEX_FOR_SENTENCES)) {
      continue;
    }

    const { timestamp = '', chapter = '' } =
      parseTimestampToChapter(line, videoDuration) ?? {};

    if (
      previousSeenTimestamp == undefined &&
      !POSSIBLE_START_TIMES.includes(timestamp)
    ) {
      return { chapters: null, error: CHAPTERS_NOT_START_AT_0_00 };
    }

    if (!timestamp || !chapter) {
      return { chapters: null, error: null };
    }

    if (previousSeenTimestamp) {
      // check that the previousSeenTimestamp is at least 5 seconds before the current timestamp
      const previousSeenTimestampSeconds = chapterLiteralToSeconds(
        previousSeenTimestamp.timestamp
      );
      const currentTimestampSeconds = chapterLiteralToSeconds(timestamp);

      if (
        currentTimestampSeconds === null ||
        previousSeenTimestampSeconds === null
      ) {
        return { chapters: null, error: null };
      }

      if (videoDuration && currentTimestampSeconds > videoDuration) {
        return { chapters: null, error: CHAPTERS_OUT_OF_BOUNDS };
      }

      if (currentTimestampSeconds < previousSeenTimestampSeconds) {
        return { chapters: null, error: CHAPTERS_NOT_IN_ORDER };
      }

      if (
        currentTimestampSeconds - previousSeenTimestampSeconds <
        MIN_CHAPTER_DURATION_SEC
      ) {
        return { chapters: null, error: CHAPTERS_TOO_SHORT };
      }

      const isLastChapter = i === chaptersByLine.length - 1;
      const lastChapterDuration = videoDuration - currentTimestampSeconds;

      if (isLastChapter && lastChapterDuration < MIN_CHAPTER_DURATION_SEC) {
        return { chapters: null, error: CHAPTERS_TOO_SHORT };
      }
    }

    timestampToChapter.push({
      timestamp,
      chapter,
    });
  }

  const timestampsLength = timestampToChapter.length;

  if (timestampsLength < MINIMUM_CHAPTERS) {
    return { chapters: null, error: TOO_FEW_CHAPTERS };
  } else if (timestampsLength > MAXIMUM_CHAPTERS) {
    return { chapters: null, error: TOO_MANY_CHAPTERS };
  }

  return { chapters: timestampToChapter, error: null };
};

export const formatTimestamp = (
  timestamp: string,
  videoDuration?: number | null
): string => {
  // first remove all colons and leading 0s
  let timestampWithoutColons = timestamp.replace(/:/g, '');

  timestampWithoutColons = timestampWithoutColons.replace(/^0+/, '');

  // default to 3 digits (0:00)
  let numOfDigits = 3;

  if (videoDuration && videoDuration >= 36000) {
    // if video duration >= 10 hours, changes to 00:00:00 format
    numOfDigits = 6;
  } else if (videoDuration && videoDuration >= 3600) {
    // if video duration >= 1 hour, changes to 0:00:00 format
    numOfDigits = 5;
  } else if (videoDuration && videoDuration >= 600) {
    // if video duration >= 10 minutes, changes to 00:00 format
    numOfDigits = 4;
  }

  timestampWithoutColons = timestampWithoutColons.padStart(numOfDigits, '0');

  // start from the end and add a colon every 2 digits
  const reversed = timestampWithoutColons.split('').reverse().join('');
  const reversedWithColons = reversed.replace(/(\d{2})(?=\d)/g, '$1:');
  const finalTimestamp = reversedWithColons.split('').reverse().join('');

  return finalTimestamp;
};

export const parseTimestampToChapter = (
  str: string,
  videoDuration?: number | null
): TimestampToChapter | null => {
  const match = str.match(TIMESTAMP_REGEX_FOR_SENTENCES);

  if (match) {
    const timestamp = match[0].trim();
    const formattedTimestamp = formatTimestamp(timestamp, videoDuration);

    const timestampLength = timestamp.length;
    const chapter = str.substring(timestampLength + 1);

    return {
      timestamp: formattedTimestamp,
      chapter,
    };
  }

  // Return null if the string doesn't match the timestamp format
  return null;
};
