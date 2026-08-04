import {
  DOWNLOAD_OPTIONS_STEP,
  INVITE_TEAMMATES_STEP,
  PERSONA_USE_CASE_STEP,
  WORKSPACE_MEMBERSHIP_STEP,
} from '@js/components/welcome-webapp-simplified/constants';

export const ONBOARDING_STEP_PARAM = 'onboarding-step';
export const SIDEBAR_CALLOUT_PARAM = 'sidebar-callout';

export type ONBOARDING_STEPS =
  | typeof DOWNLOAD_OPTIONS_STEP
  | typeof INVITE_TEAMMATES_STEP
  | typeof PERSONA_USE_CASE_STEP
  | typeof WORKSPACE_MEMBERSHIP_STEP;

export const AUTO_JOIN_CALLOUT = 'AUTO_JOIN_CALLOUT' as const;
export const GET_STARTED_CHECKLIST_CALLOUT =
  'GET_STARTED_CHECKLIST_CALLOUT' as const;
export const INVITE_CALLOUT = 'INVITE_CALLOUT' as const;
export const JOIN_TEAM_CALLOUT = 'JOIN_TEAM_CALLOUT' as const;

type SIDEBAR_CALLOUT =
  | typeof AUTO_JOIN_CALLOUT
  | typeof GET_STARTED_CHECKLIST_CALLOUT
  | typeof INVITE_CALLOUT
  | typeof JOIN_TEAM_CALLOUT;

export interface DevToolSearchParams {
  [ONBOARDING_STEP_PARAM]?: ONBOARDING_STEPS;
  [SIDEBAR_CALLOUT_PARAM]?: SIDEBAR_CALLOUT;
  modal?: string;
}
