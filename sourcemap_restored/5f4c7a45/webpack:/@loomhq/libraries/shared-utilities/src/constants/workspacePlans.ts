export const WORKSPACE_PLAN_STARTER_FREE = 'starter_free';
export const WORKSPACE_PLAN_BUSINESS = 'business';
export const WORKSPACE_PLAN_ENTERPRISE = 'enterprise';
export const WORKSPACE_PLAN_EDUCATION = 'education';
export const WORKSPACE_PLAN_BUSINESS_PLUS_AI = 'business_plus_ai';

export const ATLASSIAN_WORKSPACE_PLAN_STARTER_FREE = 'starter_free';
export const ATLASSIAN_WORKSPACE_PLAN_BUSINESS = 'business';
export const ATLASSIAN_WORKSPACE_PLAN_BUSINESS_AI = 'professional';
export const ATLASSIAN_WORKSPACE_PLAN_ENTERPRISE = 'enterprise';

export const WORKSPACE_ADD_ON_PLAN_AI = 'AI';

export const WORKSPACE_PLAN_DISPLAY_NAME_MAP = {
  [WORKSPACE_PLAN_STARTER_FREE]: 'Starter Free',
  [WORKSPACE_PLAN_BUSINESS]: 'Business',
  [WORKSPACE_PLAN_BUSINESS_PLUS_AI]: 'Business + AI',
  [WORKSPACE_PLAN_ENTERPRISE]: 'Enterprise',
  [WORKSPACE_PLAN_EDUCATION]: 'Education',
} as const;

export const WORKSPACE_PLAN_INDEFINITE_ARTICLE_MAP = {
  [WORKSPACE_PLAN_STARTER_FREE]: 'a',
  [WORKSPACE_PLAN_BUSINESS]: 'a',
  [WORKSPACE_PLAN_ENTERPRISE]: 'an',
  [WORKSPACE_PLAN_EDUCATION]: 'an',
} as const;

// from least pri to highest pri
export const ALL_WORKSPACE_PLANS = [
  WORKSPACE_PLAN_STARTER_FREE,
  WORKSPACE_PLAN_EDUCATION,
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_ENTERPRISE,
] as const;

export const ALL_WORKSPACE_ADD_ON_PLANS = [WORKSPACE_ADD_ON_PLAN_AI] as const;

export const ALL_WORKSPACE_ADD_ON_TYPES = {
  WORKSPACE_ADD_ON_PLAN_AI,
} as const;

export type AddOnType =
  (typeof ALL_WORKSPACE_ADD_ON_TYPES)[keyof typeof ALL_WORKSPACE_ADD_ON_TYPES];

export const FREE_WORKSPACE_PLANS = [
  WORKSPACE_PLAN_EDUCATION,
  WORKSPACE_PLAN_STARTER_FREE,
] as const;
export type FreeWorkspacePlan = (typeof FREE_WORKSPACE_PLANS)[number];
export function isFreeWorkspacePlan(s: string): s is FreeWorkspacePlan {
  return FREE_WORKSPACE_PLANS.some(p => p === s);
}

export const TEAM_WORKSPACE_PLANS = [
  WORKSPACE_PLAN_BUSINESS,
  WORKSPACE_PLAN_ENTERPRISE,
] as const;

export const WORKSPACE_PLAN_HIERARCHY = {
  [WORKSPACE_PLAN_STARTER_FREE]: 1,
  [WORKSPACE_PLAN_EDUCATION]: 1,
  [WORKSPACE_PLAN_BUSINESS]: 4,
  [WORKSPACE_PLAN_ENTERPRISE]: 5,
} as const;

export type WorkspacePlan = (typeof ALL_WORKSPACE_PLANS)[number];
