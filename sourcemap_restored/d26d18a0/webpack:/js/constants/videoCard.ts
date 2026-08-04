export const HISTORY_CONTEXT = 'history-context';
export const HOME_CONTEXT = 'home-context';
export const LOOMS_CONTEXT = 'looms-context';
export const MY_LIBRARY_CONTEXT = 'my-library-context';
export const PROFILE_CONTEXT = 'profile-context';
export const SHARE_CONTEXT = 'share-context';
export const TAG_CONTEXT = 'tag-context';
export const SPACE_CONTEXT = 'space-context';
export const COMMUNITY_PROFILE_CONTEXT = 'community-profile-context';
export const WATCH_LATER_CONTEXT = 'watch-later-context';
export const PUBLIC_FOLDER_CONTEXT = 'public-folder-context';
export const EMBED_SPACE_CONTEXT = 'embed-space-context';
export const CHECKLIST_CONTEXT = 'checklist-context';

export const CARD_CAPABILITIES: Record<string, string[]> = {
  canDrag: [MY_LIBRARY_CONTEXT, LOOMS_CONTEXT, SPACE_CONTEXT],
  hasBulkActions: [
    MY_LIBRARY_CONTEXT,
    LOOMS_CONTEXT,
    TAG_CONTEXT,
    SPACE_CONTEXT,
  ],
  hasDropdownActions: [
    HISTORY_CONTEXT,
    LOOMS_CONTEXT,
    MY_LIBRARY_CONTEXT,
    PROFILE_CONTEXT,
    TAG_CONTEXT,
    SPACE_CONTEXT,
  ],
  // Does not include EMBED_SPACE_CONTEXT
  hasShareToSpaceIcon: [
    HISTORY_CONTEXT,
    HOME_CONTEXT,
    LOOMS_CONTEXT,
    MY_LIBRARY_CONTEXT,
    PROFILE_CONTEXT,
    TAG_CONTEXT,
    SPACE_CONTEXT,
    SHARE_CONTEXT,
    COMMUNITY_PROFILE_CONTEXT,
    WATCH_LATER_CONTEXT,
    PUBLIC_FOLDER_CONTEXT,
  ],
  hasPinIcon: [PROFILE_CONTEXT],
  promptOnUnpublish: [PROFILE_CONTEXT],
  hasRemoveFromWatchLater: [WATCH_LATER_CONTEXT],
  hasNoInteractivity: [CHECKLIST_CONTEXT],
  hasHiddenInsights: [CHECKLIST_CONTEXT],
};
