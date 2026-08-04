import { EmojiType } from './emoji-data';
import { GroupedEmojis } from './useEmojiData';

interface EmojiFilteredArgs {
  group: GroupedEmojis;
  filterValue?: string | null;
}

/**
 * Returns a filtered list of emojis
 *
 */
export function groupEmojisFiltered({
  group,
  filterValue,
}: EmojiFilteredArgs): GroupedEmojis {
  if (!filterValue) {
    return group;
  }

  const filteredEmojis = group.emojis.filter((emoji: EmojiType) => {
    // eslint-disable-next-line @loomhq/loom/no-consecutive-uppercase-letters-for-acronyms
    let isAMatch = false;

    const filterValueLower = filterValue.toLowerCase();

    emoji.short_names.forEach(name => {
      if (isAMatch) {
        return;
      }

      isAMatch = name.toLowerCase().includes(filterValueLower);

      return isAMatch;
    });

    return isAMatch || emoji.name.toLowerCase().includes(filterValueLower);
  });

  return {
    category: group.category,
    emojis: filteredEmojis,
  };
}
