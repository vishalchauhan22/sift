type UserAction = 'clicked' | 'viewed';

type UserActionAnalyticEvent = `${string}.${UserAction}`;

export const Analytic: Record<string, UserActionAnalyticEvent> = {
  SEE_MORE_FEATURES_CLICKED: 'see_more_features.clicked',
  KEEP_MY_PLAN_CLICKED: 'keep_my_plan.clicked',
  EXPLORE_COMMUNITY_LOOMS_CLICKED: 'explore_community_looms.clicked',
  GO_BACK_HOME_CLICKED: 'go_back_home.clicked',
  CANCEL_PLAN_STEP_COMPLETE: 'cancel_plan_step_complete.clicked',
  DOWNGRADE_PLAN_OFFER_STEP_COMPLETE:
    'downgrade_plan_offer_step_complete.clicked',
  SEAT_DOWNSIZE_STEP_COMPLETE: 'seat_downsize_step_complete.clicked',
  SEAT_DOWNSIZE_MEMBER_TOGGLE: 'seat_downsize_member_toggle.clicked',
};
