import { MARKETING_LOOM_IDS } from '@js/constants/ids';

import { u } from '@loomhq/lens';

import { ResolutionVariant } from './api';
import { ReactionType } from './context';

import { SlackQueryParam, SlackUnfurlType } from './context/types';
import { smallPlayerHeight } from './variables';

export const indices = [
  'emailGate',
  'permissionLayer',
  'controlsLayer',
  'videoInfo',
  'endLayer',
  'closedCaptions',
  'posterActionsLayer',
  'embedPill',
  'waitingScreen',
  'playerBackdrop',
  'replyActionsWrapper',
  'posterVideo',
];

type zIndices = Record<(typeof indices)[number], number>;

export const zIndexes = indices.reverse().reduce<zIndices>((acc, val, i) => {
  acc[val] = (i + 1) * 10;

  return acc;
}, {} as zIndices);

// Time helpers
export const getHours = (value: number): number =>
  Math.trunc((value / 60 / 60) % 60);
export const getMinutes = (value: number): number =>
  Math.trunc((value / 60) % 60);
export const getSeconds = (value: number): number =>
  value > 1 ? Math.trunc(value % 60) : Math.ceil(value);

// Format time to UI friendly string
export function formatTime(
  time = 0,
  displayHours = false,
  inverted = false
): string {
  // Bail if the value isn't a number
  if (!Number.isFinite(time)) {
    return formatTime(undefined, displayHours, inverted);
  }

  time = Math.round(time);

  // Format time component to add leading zero
  const format = (value: number) => `0${value}`.slice(-2);
  // Breakdown to hours, mins, secs
  const Hours = getHours(time);
  let mins = format(getMinutes(time));
  const secs = format(getSeconds(time));
  let hours = '';

  // Do we need to display hours?
  if (displayHours || Hours > 0) {
    hours = `${Hours}:`;
  }

  if (!hours && mins[0] === '0') {
    mins = mins.slice(-1);
  }

  // Render
  return `${inverted && time > 0 ? '-' : ''}${hours}${mins}:${secs}`;
}

export const pluralize = (item: string, itemsTotal: number): string =>
  itemsTotal === 1 ? item : `${item}s`;

export type SecondsToHumanReadableStringOptions = {
  showMinutesAndSeconds?: boolean;
  expandLabels?: boolean;
};

function appendHours(seconds: number) {
  const numHours = getHours(seconds);

  if (!numHours) {
    return '';
  }

  return `${numHours} ${pluralize('hour', numHours)} `;
}

function appendMinutes(
  seconds: number,
  options?: SecondsToHumanReadableStringOptions
) {
  let numMinutes = getMinutes(seconds);
  const numSeconds = getSeconds(seconds);

  if (!numMinutes) {
    return '';
  }

  // round up to nearest min if options specify
  if (!options?.showMinutesAndSeconds && numSeconds >= 30) {
    numMinutes += 1;
  }

  const minuteLabel = options?.expandLabels
    ? pluralize('minute', numMinutes)
    : 'min';

  return `${numMinutes} ${minuteLabel} `;
}

function appendSeconds(
  seconds: number,
  options?: SecondsToHumanReadableStringOptions
) {
  const numSeconds = getSeconds(seconds);

  if (!numSeconds || (!options?.showMinutesAndSeconds && seconds >= 60)) {
    return '';
  }

  const secondLabel = options?.expandLabels
    ? pluralize('second', numSeconds)
    : 'sec';

  return `${numSeconds} ${secondLabel}`;
}

export function secondsToHumanReadableString(
  seconds: number,
  options?: SecondsToHumanReadableStringOptions
): string {
  const numHours = getHours(seconds);
  const numMinutes = getMinutes(seconds);
  const updatedOptions = {
    ...options,
    // show min & sec for inputs less than 10 min if option is set to true
    showMinutesAndSeconds:
      options?.showMinutesAndSeconds && numMinutes < 10 && !numHours,
  };

  return `${appendHours(seconds)}${appendMinutes(
    seconds,
    updatedOptions
  )}${appendSeconds(seconds, updatedOptions)}`.trim();
}

const CountFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

export function viewCount(views: number): string {
  if (views === 1) {
    return '1 view';
  }

  if (views < 1000) {
    return `${views} views`;
  }

  const formatted = CountFormatter.format(views);

  return `${formatted} views`;
}

export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

const assetsUrl = 'https://cdn.loom.com/assets/img/video-player/';

export const emojiVariants: Record<ReactionType, string> = {
  joy: `${assetsUrl}joy@3x-6865e7d725c9c41f78310747512ddc3b.png`,
  love: `${assetsUrl}love@3x-9da0405e3fe646251b4fc9dba44ebdc1.png`,
  wow: `${assetsUrl}wow@3x-304d2229b0e4e0393097a6fde1f79590.png`,
  yay: `${assetsUrl}yay@3x-61e5ce8364a09c36e7a38c93cd9da442.png`,
  up: `${assetsUrl}up@3x-a693395a37b90cb6b0441285f8f92584.png`,
  down: `${assetsUrl}down@3x-eb787bf4efb9c58f603268fa3a816d95.png`,
};

export const loomToExtendedMap: Record<ReactionType, string> = {
  joy: 'joy',
  love: 'heart_eyes',
  wow: 'open_mouth',
  yay: `raised_hands`,
  up: `+1`,
  down: `-1`,
};

// invert key <> vals from object above
export const extendedMapToLoom: Record<string, ReactionType> = Object.entries(
  loomToExtendedMap
).reduce(
  (obj, [key, value]) => {
    obj[value] = key as ReactionType;

    return obj;
  },
  {} as Record<string, ReactionType>
);

export const getEmojiVariant = (variant: ReactionType): ReactionType =>
  emojiVariants[variant] ? variant : extendedMapToLoom[variant];

// Raw HTML text sanitization for initial use case of rendering URLs in comment bubbles
// Config ported over from main repo: https://github.com/loomhq/loom/blob/main/src/client/js/utilities/comments.js
const ALLOWED_TAGS = ['a', 'b', 'br', 'p', 'div', 'u', 'i', 'span'];
const ALLOWED_ATTRIBUTES = ['href', 'data-seconds', 'class', 'target'];
const URL_PATTERN = /^((http|https|ftp):\/\/)/;

// Specifically checks for properly formatted URLs in the href attribute
const cleanAttribute = (name: string, content: string): string => {
  if (name !== 'href') {
    return content;
  }

  if (!URL_PATTERN.test(content)) {
    return '';
  }

  return content;
};

// Returns copy of originalNode with only allowed attributes
const cleanNode = (
  originalNode: HTMLElement,
  allowedAttrs: string[]
): HTMLElement => {
  const nodeName = originalNode.nodeName.toLowerCase();
  const nodeCopy = document.createElement(nodeName);

  for (let i = 0; i < originalNode.attributes.length; i++) {
    const attr = originalNode.attributes[i];

    if (allowedAttrs.indexOf(attr.name) > -1 && attr.specified) {
      const cleanAttr = cleanAttribute(attr.name, attr.value);

      nodeCopy.setAttribute(attr.name, cleanAttr);
    }
  }

  return nodeCopy;
};

// Creates sanitized copy of DOM node and children by recursively calling filter on child nodes
export const filter = (
  node: HTMLElement,
  allowedTags: string[],
  allowedAttrs: string[]
): HTMLElement | Text => {
  const nodeName = node.nodeName.toLowerCase();

  if (
    allowedTags.length === 0 ||
    (allowedTags.length && allowedTags[allowedTags.length - 1] !== 'body')
  ) {
    allowedTags.push('body');
  }

  if (nodeName === '#text') {
    return node;
  }

  if (nodeName === '#comment') {
    return document.createTextNode('');
  }

  if (node instanceof HTMLUnknownElement) {
    return document.createTextNode(`<${nodeName}>`);
  }

  if (allowedTags.indexOf(nodeName) < 0) {
    return document.createTextNode('');
  }

  const nodeCopy = cleanNode(node, allowedAttrs);

  while (node.childNodes.length > 0) {
    const child = node.removeChild(node.childNodes[0]);

    nodeCopy.appendChild(filter(<HTMLElement>child, allowedTags, allowedAttrs));
  }

  return nodeCopy;
};

export const sanitizeContent = (
  htmlString: string,
  allowedTags: string[] = ALLOWED_TAGS,
  allowedAttrs: string[] = ALLOWED_ATTRIBUTES
): string => {
  if (htmlString == null) {
    return '';
  }

  const parser = new window.DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const filteredNode = <HTMLElement>filter(doc.body, allowedTags, allowedAttrs);

  return filteredNode.innerHTML;
};

// Extracts href link from anchor tag html text (used in embedding looms in comment overlay)
export const getAnchorHrefFromText = (
  htmlString: string | null
): string | null => {
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(<string>htmlString, 'text/html');

  const { children } = doc.body;

  if (children.length === 0) {
    return null;
  }

  const child = children[0];

  if (child.nodeName !== 'A') {
    return null;
  }

  return child.getAttribute('href');
};

const getLeadingSpaceChars = (originalString: string): string => {
  const numberOfSpacesTrimmed =
    originalString.length - originalString.trimStart().length;

  return Array(numberOfSpacesTrimmed).fill(' ').join('');
};

// splits html text by element nodes (used in embedding looms in comment overlay)
export const splitTextByElementNodes = (
  htmlString: string
): (string | null)[] => {
  const parser = new window.DOMParser();

  // Replace linebreaks (\n) by HTML linebreaks to ensure they are kept.
  const htmlStringWithLineBreaks =
    typeof htmlString === 'string'
      ? htmlString.replace(/\n/g, '<br />')
      : htmlString;

  const doc = parser.parseFromString(htmlStringWithLineBreaks, 'text/html');

  const sanitizedChildNodes = [...doc.body.childNodes].map(child => {
    const childNodeContent =
      (child as HTMLElement).outerHTML || child.textContent || '';
    const sanitizedChildNode = sanitizeContent(childNodeContent);

    // The filter function in sanitizeContent removes any leading spaces, so they must be
    // added back to any sanitized content to avoid data loss when displayed to users
    return getLeadingSpaceChars(childNodeContent) + sanitizedChildNode;
  });

  return sanitizedChildNodes;
};

export const getContrast = (hexcolor: string): boolean => {
  const hexNumber = hexcolor.replace('#', '');
  const r = parseInt(hexNumber.substring(0, 2), 16);
  const g = parseInt(hexNumber.substring(2, 4), 16);
  const b = parseInt(hexNumber.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  const isLight = yiq >= 128;

  return isLight;
};

export const getPlayButtonSize = (width: number, height: number): string => {
  const minSize = u(10); // 80px
  const maxSize = u(15); // 120px

  if (height <= smallPlayerHeight) {
    return minSize;
  }

  return `clamp(${minSize}, ${width / 7}px, ${maxSize})`;
};

export const getLargestValue = (arr: number[]): number =>
  arr.reduce((acc, curr) => Math.max(acc, curr));

// Philosophy is to round down qualities
export const parseResolutionToQuality = (
  resolution: number
): '480p' | '720p HD' | '1080p HD' | '1440p HD' | '4K HD' | null => {
  if (resolution < 480) {
    return null;
  }

  if (resolution < 720) {
    return '480p';
  }

  if (resolution < 1080) {
    return '720p HD';
  }

  if (resolution < 1440) {
    return '1080p HD';
  }

  if (resolution < 2160) {
    return '1440p HD';
  }

  return '4K HD';
};

// Quality string should match what the user sees to minimize confusion.
// Whether it's auto or not is checked elsewhere via resolutionVariant.id === -1
export const qualityStringForLogging = (
  resolutionVariant: ResolutionVariant
):
  | '480p'
  | '720p HD'
  | '1080p HD'
  | '1440p HD'
  | '4K HD'
  | 'small'
  | 'auto' => {
  if (resolutionVariant.height > 0) {
    if (resolutionVariant.width >= resolutionVariant.height) {
      return parseResolutionToQuality(resolutionVariant.height) ?? 'small';
    }

    return parseResolutionToQuality(resolutionVariant.width) ?? 'small';
  }

  return 'auto';
};

export const isInSlackVideoBlock = (): boolean => {
  return (
    new URL(window.location.href).searchParams.get(SlackQueryParam.Unfurl) ===
    SlackUnfurlType.Blocks
  );
};

export const hasCommentsWithinLastTwoSeconds = (
  commentTimes: number[],
  videoDuration: number
): boolean => {
  const twoSecondsBeforeEnd = videoDuration - 2;
  for (const commentTime of commentTimes) {
    if (commentTime >= twoSecondsBeforeEnd) {
      return true;
    }
  }
  return false;
};

export const isMarketingLoom = (videoId: string): boolean =>
  MARKETING_LOOM_IDS.has(videoId);
