// Onboarding
export const ONBOARDING_STARTED = 'onboarding.started';
export const ONBOARDING_COMPLETE = 'onboarding.complete';
export const ONBOARDING_FLOW_FINALIZED = 'onboarding.onboarding_flow_finalized';
export const ONBOARDING_STEP_COMPLETE = 'onboarding.step.complete';
export const ONBOARDING_STEP_NO_SUGGESTION = 'onboarding.step.no_suggestions';
export const ONBOARDING_STEP_SKIPPED = 'onboarding.step.skipped';
export const ONBOARDING_DOWNLOAD_RECORDER_SCREEN_VIEWED =
  'onboarding.onboarding_download_recorder_screen_viewed';
export const ONBOARDING_SELECTED_USE_CASE = 'onboarding.selected_use_case';
export const ONBOARDING_USER_WORK_PERSONA_SELECTED =
  'onboarding.user_work_persona_selected';
export const WORKSPACE_CONSOLIDATION_AUTO_JOIN_SEEN =
  'onboarding.workspace_consolidation.auto_join_seen';
export const WORKSPACE_CONSOLIDATION_CREATE_WORKSPACE_SEEN =
  'onboarding.workspace_consolidation.create_workspace_seen';

// Workspace creation
export const ONBOARDING_INITIAL_WORKSPACE_CREATION =
  'loom.web.onboarding.workspace.initial_creation';

// Invite links
export const INVITE_LINK_CREATED = 'loom.web.invite.link.creation';

// Home page state
export const HOME_STATE_EMPTY = 'home.state.empty';
export const HOME_STATE_ALMOST_EMPTY = 'home.state.almost.empty';
export const HOME_STATE_NOT_EMPTY = 'home.state.not.empty';

// Billing
export const REQUEST_UPGRADE_MODAL_VIEWED =
  'billing.request_upgrade_modal_viewed';
export const MANUAL_PAYMENT_MODAL_PAYMENT_SUBMITTED =
  'billing.manual_payment_modal.payment_submitted';
export const MANUAL_PAYMENT_MODAL_PAYMENT_FAILURE =
  'billing.manual_payment_modal.payment_failure';
export const MANUAL_PAYMENT_MODAL_PAYMENT_SUCCEEDED =
  'billing.manual_payment_modal.payment_succeeded';
export const UPDATE_CUSTOMER_INFORMATION_FAILED =
  'billing.update_customer_information_failed';
export const UPDATE_CUSTOMER_INFORMATION_SUCCEEDED =
  'billing.update_customer_information_succeeded';
export const UPDATE_PAYMENT_SOURCE_SUCCEEDED =
  'billing.update_payment_source_succeeded';
export const UPDATE_PAYMENT_SOURCE_FAILED =
  'billing.update_payment_source_failed';
export const ADMIN_UPDATE_WORKSPACE_TIER_SUCCEEDED =
  'billing.admin_update_workspace_tier.succeeded';
export const ADMIN_UPDATE_WORKSPACE_TIER_FAILED =
  'billing.admin_update_workspace_tier.failed';
export const UPGRADE_PLAN_SUCCEEDED = 'billing.upgrade_plan_succeeded';
export const UPGRADE_PLAN_FAILED = 'billing.upgrade_plan_failed';
export const UPDATE_DEFAULT_PAYMENT_FAILED =
  'billing.update_default_payment.failed';
export const UPDATE_DEFAULT_PAYMENT_SUCCEEDED =
  'billing.update_default_payment.succeeded';
export const CONFIRM_PAYMENT_ELEMENT_FAILED = 'billing.confirm_payment.failed';
export const CREATE_SETUP_INTENT_SUCCEEDED =
  'billing.create_setup_intent.succeeded';
export const CREATE_SETUP_INTENT_FAILED = 'billing.create_setup_intent.failed';
export const EDIT_PAYMENT_MODAL_VIEWED = 'billing.edit_payment_modal_viewed';
export const UPDATE_PAYMENT_SUCCEEDED = 'billing.update_payment_succeeded';
export const PAYMENT_AUTHENTICATION_BANNER_SEEN =
  'billing.payment_authentication_banner_seen';

export const UPGRADE_PLAN_PAYMENT_SETUP_REDIRECT =
  'billing.upgrade_plan_payment_setup_redirect';

// Pause subscription
export const PAUSE_SUBSCRIPTION_BUTTON_VIEWED =
  'billing.pause_subscription_button.viewed';
export const PAUSE_SUBSCRIPTION_BUTTON_CLICKED =
  'billing.pause_subscription_button.clicked';
export const PAUSE_ACTION_SUCCESS = 'billing.pause_action.success';
export const PAUSE_ACTION_FAILURE = 'billing.pause_action.failure';

export const PAUSE_SCHEDULED_BANNER_VIEWED =
  'billing.pause_scheduled_banner.viewed';
export const CANCEL_PAUSE_BUTTON_CLICKED =
  'billing.cancel_pause_button.clicked';
export const CANCEL_PAUSE_ACTION_SUCCESS =
  'billing.cancel_pause_action.success';
export const CANCEL_PAUSE_ACTION_FAILURE =
  'billing.cancel_pause_action.failure';

export const PAUSE_BANNER_VIEWED = 'billing.pause_banner.viewed';
export const RESTART_SUBSCRIPTION_MODAL_VIEWED =
  'billing.restart_subscription_modal.viewed';
export const RESTART_SUBSCRIPTION_BUTTON_CLICKED =
  'billing.restart_subscription_button.clicked';
export const RESTART_SUBSCRIPTION_ACTION_SUCCESS =
  'billing.restart_subscription_action.success';
export const RESTART_SUBSCRIPTION_ACTION_FAILURE =
  'billing.restart_subscription_action.failure';

export const CANCEL_SUBSCRIPTION_FROM_PAUSE_VIEWED =
  'billing.cancel_subscription_from_pause.viewed';
export const CANCEL_SUBSCRIPTION_FROM_PAUSE_CLICKED =
  'billing.cancel_subscription_from_pause.clicked';
export const CANCEL_SUBSCRIPTION_FROM_PAUSE_ACTION_SUCCESS =
  'billing.cancel_subscription_from_pause_action.success';
export const CANCEL_SUBSCRIPTION_FROM_PAUSE_ACTION_FAILURE =
  'billing.cancel_subscription_from_pause_action.failure';

// RecordSDK
export const RECORD_SDK_IS_SDK_SUPPORTED = 'record_sdk.is_sdk_supported';

// Google Preview
export const GOOGLE_PREVIEW_LINK_CLICKED = 'google.preview.link.clicked';
export const GOOGLE_PREVIEW_CONSENT_ACCEPTED =
  'google.preview.consent.accepted';

// Workflows (jira/linear hero + loom scribe)
export const WORKFLOW_ARTIFACT_COPIED = 'workflows.artifact.copied';
export const LINK_JIRA_CLICKED = 'workflows.jira.link.clicked';
export const LINK_LINEAR_CLICKED = 'workflows.linear.link.clicked';

// Edit by Transcript
export const EBT_TIME_TO_RENDER_PHRASES_AFTER_SCROLL =
  'edit_by_transcript.time_to_render_phrases_after_scroll';
export const EBT_SELECTION_LATENCY_TO_TOKENS_SELECTED_RATIO =
  'edit_by_transcript.selection_latency_to_tokens_selected_ratio';

// Variables
export const VARIABLES_PREVIEW_REQUESTED = 'variables.preview_requested';
export const VARIABLES_PREVIEW_GENERATED = 'variables.preview_generated';

/**
 * Request to join metrics
 */
export const REQUEST_TO_JOIN_ATLASSIAN_MANAGED_WORKSPACE =
  'request.to.join.atlassian.managed.workspace';

// Login
export const LOGIN_HANDLER = 'login.handler';
export const ASG_LOGIN_BUTTON_CLICKED = 'asg.login.continue.button.clicked';
export const LOGIN_BUTTON_CLICKED = 'login.continue.button.clicked';
export const SET_SESSION_STORAGE_IN_OPEN_OAUTH_POPUP =
  'set.session.storage.in.open.oauth.popup';
export const READ_SESSION_STORAGE_IN_OPEN_OAUTH_POPUP =
  'get.session.storage.in.open.oauth.popup';

// Logout
export const FRONTEND_LOGOUT_HANDLER_INVOKED = 'logout.handler.invoked';

// URL
export const VALIDATE_URL_ORIGIN = 'validate.url.origin';

// Business Trial Welcome Card
export const BUSINESS_TRIAL_WELCOME_CARD_DISPLAYED =
  'loom.app.notifications.business_trial_welcome_card.displayed';

//library
export const GET_LOOMS_FOR_LIBRARY_QUERY_COMPLETED =
  'get.looms.for.library.query.completed';
