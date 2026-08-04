import * as localEvents from '@js/constants/events';

import * as sharedEvents from '@loomhq/shared-utilities/constants/events';

// Define common action types used in analytics events
export enum ActionType {
  HIGHLIGHTED = 'highlighted',
  DRAGGED = 'dragged',
  VERIFIED = 'verified',
  DOWNLOADED = 'downloaded',
  ADDED = 'added',
  SELECTED = 'selected',
  SORTED = 'sorted',
  SUCCEEDED = 'succeeded',
  PAUSED = 'paused',
  CLICKED = 'clicked',
  TOGGLED = 'toggled',
  VIEWED = 'viewed',
  RENDERED = 'rendered',
  DISMISSED = 'dismissed',
  CLOSED = 'closed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DELETED = 'deleted',
  SET = 'set',
  HOVERED = 'hovered',
  EXITED = 'exited',
  COPIED = 'copied',
  CHANGED = 'changed',
  QUERIED = 'queried',
  ACTIVATED = 'activated',
  CREATED = 'created',
  FAILED = 'failed',
  OPENED = 'opened',
  SUBMITTED = 'submitted',
  TYPED = 'typed',
  SCROLLED = 'scrolled',
  INITIATED = 'initiated',
  SAVED = 'saved',
  EVALUATED = 'evaluated',
  REMOVED = 'removed',
}

type TrackOperationalUiEvent = {
  eventType: 'track' | 'operational' | 'ui';
  action: ActionType;
  actionSubject: string;
  actionSubjectId?: string;
  source?: string;
};

export type ScreenEvent = {
  name: string;
  eventType: 'screen';
};

/**
 * https://stash.atlassian.com/projects/ATLASSIAN/repos/atlassian-frontend-monorepo/browse/platform/packages/atlassian-analytics-pipeline/analytics-web-client/src/types.ts#19
 */
type EventOverrides = {
  anonymousId?: string;
};

export type GasEventEntry = TrackOperationalUiEvent | ScreenEvent;

type ValueOf<T> = T[keyof T];
export type AnalyticsEvent =
  | Extract<
      ValueOf<typeof localEvents> | ValueOf<typeof sharedEvents>,
      string // excludes non string values, ie. INCLUDED_EVENTS_FROM_INTERCOM is an array
    >
  | string;

/**
 * Define the type for analytics event properties
 * Properties should be camelCase, and should not be UGC (go/ugc) or PII (go/pii)
 * Domains need to be hashed using generateMd5Hash
 */
export interface AnalyticsEventProps extends EventOverrides {
  anonymous_id?: never;
  filter?: never;
  query?: never;
  surface?: never;
  newTitle?: never;
  title?: never;
  data?: never;
  groupSelected?: never;
  searchText?: never;
  [key: string]: any;
}

// Define the type for analytics event options
export interface AnalyticsEventOptions {
  integrations?: {
    Intercom?: boolean;
    'Google Analytics'?: boolean;
    Zendesk?: boolean;
    [key: string]: boolean | undefined;
  };
}
