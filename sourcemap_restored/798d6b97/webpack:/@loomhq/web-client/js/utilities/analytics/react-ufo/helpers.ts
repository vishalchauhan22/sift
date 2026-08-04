import { useInteractionContext } from '@atlaskit/react-ufo/interaction-context';
import {
  addError,
  getActiveInteraction,
} from '@atlaskit/react-ufo/interaction-metrics';
import { useCallback } from 'react';

// Define patterns for routes with dynamic segments
const dynamicPatterns = [
  // Special cases first
  { pattern: /^\/share\/folder\/.*$/, normalized: 'share-folderId' },

  // Video routes with 32 char IDs
  {
    pattern: /^\/edit\/([^\/]+-)?[a-zA-Z0-9]{32}$/,
    normalized: 'edit-videoId',
  },
  {
    pattern: /^\/share\/([^\/]+-)?[a-zA-Z0-9]{32}$/,
    normalized: 'share-videoId',
  },
  { pattern: /^\/a\/([^\/]+-)?[a-zA-Z0-9]{32}$/, normalized: 'a-videoId' },
  {
    pattern: /^\/embed\/([^\/]+-)?[a-zA-Z0-9]{32}$/,
    normalized: 'embed-videoId',
  },

  // General share routes (for non-32-char IDs)
  { pattern: /^\/share\/[^\/]+$/, normalized: 'share-videoId' },

  // Embed spaces
  { pattern: /^\/embed\/spaces\/.*$/, normalized: 'embed-spaces-spaceId' },

  // My videos and folders
  { pattern: /^\/my-videos$/, normalized: 'my-videos' },
  { pattern: /^\/my-videos\/.*$/, normalized: 'my-videos-folderId' },

  // Archive
  { pattern: /^\/archive\/folders\/.*$/, normalized: 'archive-folderId' },
  { pattern: /^\/archive$/, normalized: 'archive' },

  // Screenshots
  { pattern: /^\/i\/.*$/, normalized: 'i-screenshotId' },

  // Spaces
  { pattern: /^\/spaces\/[^\/]+$/, normalized: 'spaces-spaceId' },
  {
    pattern: /^\/spaces\/.*\/folders\/.*$/,
    normalized: 'spaces-folders-folderId',
  },

  // Profile
  { pattern: /^\/profile\/.*$/, normalized: 'profile-userId' },

  // Tags
  { pattern: /^\/tag\/.*$/, normalized: 'tag-tagId' },

  // About
  { pattern: /^\/about$/, normalized: 'about' },

  // 404
  { pattern: /^\/404$/, normalized: '404' },

  // Signup
  { pattern: /^\/signup$/, normalized: 'signup' },

  // Login
  { pattern: /^\/login$/, normalized: 'login' },
  { pattern: /^\/client\/login$/, normalized: 'client-login' },
  { pattern: /^\/slack\/login$/, normalized: 'slack-login' },
  { pattern: /^\/login\/sso$/, normalized: 'login-sso' },

  // TODO: add missing paths from src/server/routes/static/index.ts

  // Verify Email
  { pattern: /^\/verify-email$/, normalized: 'verify-email' },

  // Welcome
  { pattern: /^\/welcome$/, normalized: 'welcome' },

  // History
  { pattern: /^\/history$/, normalized: 'history' },

  // Watch Later
  { pattern: /^\/watch-later$/, normalized: 'watch-later' },

  // Home
  { pattern: /^\/home$/, normalized: 'home' },

  // Library '/looms/videos'
  { pattern: /^\/looms\/videos$/, normalized: 'looms-videos' },

  // Meetings '/meetings'
  { pattern: /^\/meetings$/, normalized: 'meetings' },
];

export const normalizePageName = (pageName: string): string => {
  const normalizedName = `root-${pageName[0].toLowerCase()}${
    pageName
      .slice(1) // ignore the first letter
      .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`) // replace all other capital letters with a dash and lowercase letter
      .replace(/[\ ]/g, _letter => `-`) // replace spaces with dashes
      .replace(/\-+/g, _letter => `-`) // we might accidentally get double dashes, so remove them
  }`;
  return normalizedName;
};

export const normalizePathname = (pathname: string): string => {
  // First remove query params and hashes
  const withoutQueryAndHash = pathname.split(/[?#]/)[0];

  // Special case for root path
  if (withoutQueryAndHash === '/') {
    return 'root';
  }

  // Check if the path matches any dynamic pattern
  for (const { pattern, normalized } of dynamicPatterns) {
    if (pattern.test(withoutQueryAndHash)) {
      return normalized;
    }
  }

  // Return 'unknown-path' for unmatched routes to prevent
  // accidentally tracking sensitive routes
  // If your logs are showing 'unknown-path' for a route that you think
  // should be tracked, you can add it to the dynamicPatterns array.
  return 'unknown-path';
};

/**
 * Will use the provided error object to set an error in UFO. It is essentially [this method](https://atlaskit.atlassian.com/packages/react-ufo/react-ufo/docs/set-interaction-error) but without the interaction name validator.
 * @param error - The error object to be used when setting the error in UFO
 */
export function setUfoInteractionError(error: Error): void {
  const activeInteraction = getActiveInteraction();

  if (!activeInteraction) {
    return;
  }

  addError(
    activeInteraction.id,
    error.name,
    activeInteraction.labelStack,
    'Manual interaction error',
    error.message,
    error.stack,
    true
  );
}

// Modify to add more hold state names
type UfoHoldNames =
  | 'invite-button-clicked'
  | 'use-welcome-invite-users-to-organization-mutation-loading';

type UfoContext = ReturnType<typeof useInteractionContext>;
type UfoHold = NonNullable<UfoContext>['hold'];
type UfoHoldReturn = ReturnType<UfoHold>;

/**
 * This hook wraps around the UFO hold function to enforce using predefined hold names.
 * To add more names, edit the {@link UfoHoldNames} type.
 */
export function useUfoHold(): (
  name: UfoHoldNames
) => UfoHoldReturn | undefined {
  const ufoContext = useInteractionContext();
  return useCallback(
    (name: UfoHoldNames) => {
      return ufoContext?.hold(name);
    },
    [ufoContext]
  );
}
