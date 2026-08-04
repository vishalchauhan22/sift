import {
  deleteFromLocalStorage,
  readSavedArray,
  writeToLocalStorage,
} from './local-storage';

const MAX_TRACKED_REACTIONS = 100;
const FREQUENT_REACTION_COUNT = 18;

const RECENT_REACTIONS_KEY = 'recent-reactions';
const FREQUENT_REACTIONS_KEY = 'frequent-reactions';

export type FrequentReaction = {
  name: string;
  suggested: boolean;
};

export const SUGGESTED_REACTION_NAMES = [
  '100',
  'tada',
  'white_check_mark',
  'x',
  'eyes',
  'sparkles',
  'rocket',
  'heavy_plus_sign',
  'pray',
  'fire',
  'laughing',
  'thinking_face',
  'scream',
  'wave',
  'rainbow',
  'heart',
  'clap',
  'ladybug',
];

export const SUGGESTED_REACTIONS: FrequentReaction[] =
  SUGGESTED_REACTION_NAMES.map(name => ({
    name,
    suggested: true,
  }));

const readRecentReactions = () => readSavedArray<string>(RECENT_REACTIONS_KEY);

const readFrequentReactions = () =>
  readSavedArray<FrequentReaction>(FREQUENT_REACTIONS_KEY);

const matchSkinToneSuffixes = /([^:]+)::skin-tone-\d/;

const getNeutralEmojiName = (name: string): string =>
  name.match(matchSkinToneSuffixes)?.[1] ?? name;

export const recordReaction = (emojiName: string): void => {
  const recentReactions = readRecentReactions();

  // put the most recent to the front
  recentReactions.unshift(emojiName);

  // ensure only the most recent ones are kept
  recentReactions.splice(
    MAX_TRACKED_REACTIONS,
    recentReactions.length - MAX_TRACKED_REACTIONS
  );

  writeToLocalStorage(RECENT_REACTIONS_KEY, recentReactions);
  // force re-computation of the frequent reactions
  deleteFromLocalStorage(FREQUENT_REACTIONS_KEY);
};

const padWithSuggestedReactions = (
  reactions: FrequentReaction[]
): FrequentReaction[] => {
  // only append if we have spots to fill
  const missingCount = FREQUENT_REACTION_COUNT - reactions.length;

  if (missingCount > 0) {
    // we don't want to append suggested reaction that are one of
    // the non-suggested, so let's also filter those out.
    const freqReactionNamesLookup = reactions
      .map(reaction => reaction.name)
      .reduce(
        (lookup, name) => {
          lookup[name] = true;

          return lookup;
        },
        {} as Record<string, boolean>
      );

    const nonRepeatedSuggestions = SUGGESTED_REACTIONS.filter(
      reaction => !freqReactionNamesLookup[reaction.name]
    );

    reactions.push(...nonRepeatedSuggestions.slice(0, missingCount));
  }

  return reactions;
};

export const getFrequentReactions = (): FrequentReaction[] => {
  let frequentReactions = readFrequentReactions();

  if (frequentReactions.length > 0) {
    // already computed
    return frequentReactions;
  }

  // not computed yet.
  // read the recent reactions but strip out the skin tone modifiers
  const recentReactions = readRecentReactions().map(getNeutralEmojiName);

  const emojiCounts = recentReactions.reduce(
    (counts, item) => {
      counts[item] = (counts[item] ?? 0) + 1;

      return counts;
    },
    {} as Record<string, number>
  );

  // each item in `pairs` will be [emojiName, usageCount]
  const pairs = Object.entries(emojiCounts);

  // sort the pairs/counts from highest to lowest
  pairs.sort((a, b) => b[1] - a[1]);

  frequentReactions = pairs
    // only consider the highest count items
    .slice(0, FREQUENT_REACTION_COUNT)
    // produce the reactions (note these are the non-suggested ones)
    .map(pair => ({ name: pair[0], suggested: false }));

  frequentReactions = padWithSuggestedReactions(frequentReactions);

  // save it
  writeToLocalStorage(FREQUENT_REACTIONS_KEY, frequentReactions);

  return frequentReactions;
};
