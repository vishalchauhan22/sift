import * as runtimeConfig from '@js/constants/runtimeConfig';

export const LOGIN = '/api/auth/login';
export const LOGOUT = '/api/auth/logout';

export const ACCOUNT_SETTINGS = '/account-settings';
export const MANAGE_WORKSPACE = '/settings/workspace';
export const MANAGE_INTEGRATIONS = '/settings/workspace#integrations';
export const MANAGE_SPACES = '/settings/workspace#spaces';
export const SETTINGS = '/settings';
export const PROFILE = '/settings/account';
export const ACTIVITY_FEED = '/activity-feed';
export const ADMIN_MANAGEMENT_PAGE = '/admin-management';
export const COMPANY = '/about-us';
export const CAREERS = '/careers';
export const CONTACT_SALES = '/connect/enterprise';
export const CUSTOMERS_PAGE = '/customers';
export const DESKTOP = '/desktop';
export const DOWNLOAD_PAGE = '/download';
export const ADMIN_PAGE = '/admin';
export const EMBED_VIDEO = '/embed';
export const WATCH_LATER_PAGE = '/watch-later';
export const HUMAN_PRIVACY = '/privacy';
export const INTEGRATIONS_PAGE = '/integrations';
export const LOGOUT_PAGE = '/logout';
export const LOGIN_PAGE = '/login';
export const LOGIN_WITH_SSO_PAGE = '/login/sso';
export const SIGNUP_PAGE = '/signup';
export const MY_VIDEOS_PAGE = '/my-videos';
export const MEETINGS_PAGE = '/meetings';
export const PLAYGROUND_PAGE = '/playground';
export const MEETINGS_SETTINGS_PAGE = '/meetings/settings';
export const NOTIFICATIONS_PAGE = '/notifications';
export const PROFILE_PAGE = '/settings/account';
export const PRIVATE_SCREENSHOT_PAGE = '/private-screenshot';
export const TEAM_VIDEOS_PAGE = '/team-videos';
export const SEARCH_PAGE = '/search';
export const NOT_FOUND = '/404';
export const PRICING = '/pricing';
export const PRIVACY_POLICY = '/privacy-policy';
export const COOKIE_POLICY = '/cookie-policy';
export const ROOT_PAGE = '/';
export const SERVER_ERROR_PAGE = '/500';
export const TERMS = '/terms';
export const AI_SUPPLEMENTARY_TERMS = '/loom-ai-supplementary-terms';
export const TERMS_IFRAME = '/terms-iframe';
export const USE_CASES = '/use-case';
export const LEARN_TO_LOOM = '/learn';
export const HOW_TO_RECORD = '/screen-recorder';
export const ENTERPRISE = '/enterprise';
export const BLOG = '/blog';
export const UPGRADE = '/upgrade';
export const UPGRADE_PLAN = '/upgrade-plan';
export const WELCOME = '/welcome';
export const VERIFY_EMAIL = '/verify-email';
export const RESET_PASSWORD = '/reset-password';
export const PRESS = '/press';
export const SCIM = '/scim/v2';
export const RECORD = '/record';
export const SELECT_WORKSPACE_PAGE = '/select-workspace';
export const MANAGE_MEMBERS = `${MANAGE_WORKSPACE}#members`;
export const PLANS_AND_BILLING = `${MANAGE_WORKSPACE}#plans`;
export const PLANS_AND_BILLING_ALL_PLANS_SECTION = `${MANAGE_WORKSPACE}?scrollTo=allPlansSectionTitle#plans`;
export const LOOMS_PAGE = '/looms';
export const VIDEOS_LOOMS_PAGE = '/looms/videos';
export const SYNCED_MEETINGS_LOOMS_PAGE = '/looms/zoom-meetings';
export const ARCHIVED_LOOMS_PAGE = '/looms/archive';
export const SCREENSHOTS_PAGE = '/looms/screenshots';
export const HISTORY_PAGE = '/history';
export const INCENTIVES_PAGE = '/incentives';
export const ADMIN_USER_LOOKUP = `${ADMIN_PAGE}/users`;
export const ADMIN_WORKSPACE_LOOKUP = `${ADMIN_PAGE}/workspaces/workspace-lookup`;
export const SSO_LOGIN = '/login/sso';
export const HOME_PAGE = '/home';
export const SHARE_PAGE = '/share';
export const SPACES_PAGE = '/spaces';
export const SPACES_BROWSE_PAGE = '/spaces/browse';
export const EMBED_SPACES_PAGE = '/embed/spaces';
export const MERGE_ATLASSIAN_PROFILE_PAGE = '/merge-atlassian-profile';

export const JIRA_AUTH_LOGIN = '/api/auth/jira/login';
export const LINEAR_AUTH_LOGIN = '/api/auth/linear/login';
export const MOBILE_PAGE_URI = 'https://www.loom.com/mobile';
export const BLOG_URI = 'https://www.loom.com/blog';

export const CLOUDFRONT_URI = `https://${runtimeConfig.CLOUDFRONT_URI}`;
export const AVSERVER_CLOUDFRONT_URI = `https://${runtimeConfig.AVSERVER_CLOUDFRONT_URI}`;
export const CHROME_EXT_WEBSTORE_URL = `https://chrome.google.com/webstore/detail/${runtimeConfig.CHROME_EXTENSION_ID}`;
export const CHROME_EXT_WEBSTORE_URL_DIRECT = `https://chrome.google.com/webstore/detail/loom-–-screen-recorder-sc/${runtimeConfig.CHROME_EXTENSION_ID}`;
export const LOOM_ANON_COOKIE_DOMAIN = runtimeConfig.ANON_COOKIE_DOMAIN;
export const LOOM_BARE_URI = runtimeConfig.LOOM_BARE_URI;
export const LOOM_PROD_URI = 'https://www.loom.com';
export const LOOM_STAGE_URI = 'https://stage.loom.com';
export const LOOM_DEV_URI = 'https://loomlocal.com';
export const LOOM_URI = `https://${runtimeConfig.LOOM_URI}`;
export const LOOM_WS_URI = `wss://${runtimeConfig.LOOM_URI}`;
export const LOOM_RECORD_WS_URI = `wss://${runtimeConfig.LOOM_RECORD_WS_URI}`;
export const SUPPORT_URI = 'https://support.loom.com';
export const NEW_LOOM_URI = 'https://new.loom.com';
export const STATUS_URI = 'https://www.loomstatus.com';
export const COMMUNITY_LOOMS_URI = 'https://www.loom.com/community';
export const COMMUNITY_LOOMS_SUPPORT_DOC_URI =
  'https://support.loom.com/hc/en-us/articles/6877843041053';
export const CANNY_IO_REDIRECT = 'https://loom.canny.io';
export const CANNY_URI = CANNY_IO_REDIRECT;
export const CANNY_FEEDBACK_URI = `${CANNY_URI}/feature-requests-and-feedback`;
export const AI_FEEDBACK_URI = `${CANNY_FEEDBACK_URI}?selectedCategory=ai-feedback`;
export const ADMIN_HUB_URI = `https://${runtimeConfig.ADMIN_HUB_URI}`;
export const ATLASSIAN_PROFILE_MANAGEMENT_URI = `${runtimeConfig.ATLASSIAN_PROFILE_MANAGEMENT_URI}`;
export const ATLASSIAN_CLOUD_OPERATIONAL_URI = `${runtimeConfig.ATLASSIAN_CLOUD_OPERATIONAL_URI}`;
export const ATLASSIAN_SNOOPR_URI = `${runtimeConfig.ATLASSIAN_SNOOPR_URI}`;
export const ATLASSIAN_GOVERNATOR_URI = `${runtimeConfig.ATLASSIAN_GOVERNATOR_URI}`;

export const ATLASSIAN_CONTACT_SALES =
  'https://www.atlassian.com/enterprise/contact?formType=product-features&utm_source=loom&utm_medium=loom-inproduct&utm_campaign=P:loom*O:clm*F:awareness*H:fy25q2*I:loom-inproduct*Y:loom*E:cloud*';
export const ATLASSIAN_PRICING_QUOTES =
  'https://www.atlassian.com/enterprise/contact?formType=pricing-quotes&utm_source=loom&utm_medium=loom-inproduct&utm_campaign=P:loom*O:clm*F:awareness*H:fy25q2*I:loom-inproduct*Y:loom*E:cloud*';
export const ATLASSIAN_TERMS =
  'https://www.atlassian.com/legal/atlassian-customer-agreement';
export const ATLASSIAN_PRODUCT_SPECIFIC_TERMS =
  'https://www.atlassian.com/legal/product-specific-terms';
export const ATLASSIAN_PRIVACY_POLICY =
  'https://www.atlassian.com/legal/privacy-policy';

export const ATLASSIAN_WEBSITE = 'https://www.atlassian.com';
export const ATLASSIAN_PARTNERS = 'https://www.atlassian.com/partners';

export const LOOM_AI_URI = `${LOOM_PROD_URI}/ai`;

export const MOBILE_IOS_APP =
  'https://apps.apple.com/us/app/loom-screen-recordings-more/id1474480829';
export const MOBILE_ANDROID_APP =
  'https://play.google.com/store/apps/details?id=com.loom.android';
export const MOBILE_WEB = 'https://www.loom.com/mobile';

export const SUPPORT_MEMBER_ROLES = `${SUPPORT_URI}/hc/en-us/articles/360010394657-Understanding-Workspaces-and-Member-Roles`;

export const EXTENSION_RECORDING_SUPPORT_ARTICLE =
  'https://support.loom.com/hc/en-us/articles/360002187698-Getting-started-with-the-Chrome-Extension';
export const DESKTOP_RECORDING_SUPPORT_ARTICLE =
  'https://support.loom.com/hc/en-us/articles/360002207917-Getting-started-with-the-Desktop-App';

export const ATLASSIAN_OIDC_INITIATION_ROUTE =
  runtimeConfig.ATLASSIAN_OIDC_INITIATION_ROUTE;

export const WHATSNEW = 'https://new.loom.com/';

export const APP_STORE =
  'https://apps.apple.com/us/app/loom-screen-recordings-more/id1474480829';

export const EI_HOW_WE_CALCULATE =
  'https://support.loom.com/hc/en-us/articles/360007980598-How-we-calculate-engagement-insights';

export const SLACK_INTEGRATION_URI =
  'https://support.loom.com/hc/en-us/articles/360002231278-Slack-Send-Loom-Videos-to-my-team-on-Slack';

export const CONTENT_TRANSFER_ARTICLE =
  'https://support.loom.com/hc/en-us/articles/360017747698';

export const EMBED_SUPPORT_ARTICLE =
  'https://support.loom.com/hc/en-us/articles/360002208317-How-to-embed-your-video-into-a-webpage-';

export const TRUE_UP_SUPPORT_LINK =
  'https://support.loom.com/hc/en-us/articles/7310782877469';

export const SOLUTION_FOR_UNWEAVABLE_LOOMS_ARTICLE =
  ' https://support.loom.com/hc/en-us/articles/10349311266845';

export const SUPPORTED_BROWSER_SUPPORT_ARTICLE =
  'https://support.loom.com/hc/en-us/articles/360002228418-Can-I-use-Loom-with-Firefox-Safari';

export const VARIABLES_SUPPORT_ARTICLE =
  'https://support.loom.com/hc/en-us/articles/14974723544733';

export const CLOUD_OPERATIONAL_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cloud-operational.prod.atl-paas.net'
    : 'https://cloud-operational.staging.atl-paas.net';

export const CLOUD_OPERATIONAL_SOFT_DELETE_ITEM = (token: string): string =>
  `${CLOUD_OPERATIONAL_BASE_URL}/cloud-provisioner/soft-delete-item?token=${token}`;
