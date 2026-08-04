import { LOOM_PROD_URI, LOOMS_PAGE } from '@js/constants/routes';

import libraryEmptyStateImg from './destination-empty-state/assets/library-empty-state.png';

export const LOOM_AVATAR =
  'avatars/9967276_55cb867c26b6ee3b738f80597bc605c5_192.jpg';

export enum EmptyStateVideoIds {
  HOW_THE_CEO_USES_LOOM = '5bbdeb480ba84e65b1b3de8c190e2003',
  GETTING_STARTED_WITH_LOOM = 'd97180be7d674f4fbf57744365457162',
  REPLACING_MEETINGS_WITH_LOOM = '2a742981490b4c649ce429d75f70fd73',
  RECORDING_PRESENTATIONS_WITH_LOOM = 'e00c8856f48049519ca6bece165b449a',
  RECORDING_CLEAR_VIDEOS = 'a2967d00f6ce43d3a75f7a8093b3cae0',
  LOOM_FOR_INTRODUCTIONS = '679eefb452f640c3af83e25ce36a695a',
  GIVE_FEEDBACK_WITH_LOOM = '6e596ba6ca144b83ad0118757fc4cdc7',
  RECORDING_YOUR_FIRST_LOOM = '62d6df1312854aeea3b4735a4a1e6284',
  OPERATIONS_USE_CASE_LOOM = 'c91e61c526884a57af4bd2d608a358e5',
  SALES_USE_CASES_LOOM = '73dd3ce225a04e5288358cbf4b3d6249',
  MARKETING_USE_CASES_LOOM = 'facf2b0b7833414d90462d9cb58e32c9',
  SUPPORT_USE_CASES_LOOM = '3ee9ce1f7da749b9897adcb9a27cffb4',
  CUSTOMER_SUCCESS_USE_CASES_LOOM = 'd681a609c3024e2f8f064565f068bc24',
  ENGINEERS_USE_CASES_LOOM = '5030ea900d2b4cc98d90800f3566d3f6',
  PRODUCT_USE_CASES_LOOM = '25edf01ae5ef4b17bfef9d562833e2f9',
  DESIGN_USE_CASES_LOOM = 'ade904b68ca642c58061fa3773886f4b',
  USING_LOOM_IN_CONFLUECE = '80dbc6f9f18f47beade09f5db2707582',
  USING_LOOM_IN_JIRA = '7b9f68e00f6e46faa922094251e64784',
}

export enum EmptyStateType {
  HOME,
  LIBRARY,
  NOTIFICATIONS,
  HISTORY,
  PROFILE,
  LIBRARY_ATLASSIAN,
  LIBRARY_MOBILE,
}

export enum ExperienceType {
  DEFAULT,
  VIEWER,
  NON_OWNER,
  NONMEMBER,
  ARCHIVED,
}

export type DescriptionProps = {
  tagName?: string;
  profileName?: string;
};

export enum AnalyticsButtonCtaName {
  INVITE = 'invite',
  RECORD = 'record',
  UPLOAD_VIDEO = 'upload_video',
  GET_INSPIRED = 'get_inspired',
  POST_A_VIDEO = 'post_a_video',
  REQUEST_CREATOR_ACCESS = 'request_creator_access',
}

export enum AnalyticsEmptyStateName {
  HOME_INVITE = 'home_invite',
  HOME_RECORD = 'home_record',
  LIBRARY_RECORD = 'library_record',
  NOTIFICATIONS_RECORD = 'notifications_record',
  HISTORY_GET_INSPIRED = 'history_get_inspired',
  MY_PROFILE_POST = 'my_profile_post',
}

export enum CustomButtonType {
  RECORD_AND_UPLOAD_LOOM,
  REQUEST_ACCESS,
  ADD_VIDEO_TO_SPACE_SEARCH,
}

export type EmptyStateConfig = {
  title: string;
  subtitle: string;
  buttonText?: string;
  source: string;
  buttonAction?: () => void;
  analyticsButtonCtaName?: AnalyticsButtonCtaName;
  customButton?: CustomButtonType;
  carouselVideos: string[];
  analyticsEmptyStateName: AnalyticsEmptyStateName;
  isViewerVariant: boolean;
  showConfigVideos?: boolean;
};

export const MobileLibraryEmptyState = {
  illustration: libraryEmptyStateImg,
  imgWidth: '330px',
  imgPadding: '10px',
  title: 'Start recording',
  subtitle:
    'People who use Loom complete projects 2x faster because who has time for another meeting.',
  buttonText: 'Download the App',
  customButton: CustomButtonType.RECORD_AND_UPLOAD_LOOM, // TODO: fix
  source: LOOMS_PAGE,
  carouselTitle: 'Inspiration from the Loom Community',
  carouselVideos: [
    EmptyStateVideoIds.HOW_THE_CEO_USES_LOOM,
    EmptyStateVideoIds.OPERATIONS_USE_CASE_LOOM,
    EmptyStateVideoIds.GETTING_STARTED_WITH_LOOM,
    EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM,
  ],

  analyticsEmptyStateName: AnalyticsEmptyStateName.LIBRARY_RECORD, // TODO: fix
  isViewerVariant: false,
  analyticsButtonCtaName: AnalyticsButtonCtaName.RECORD, // TODO: fix
  showConfigVideos: true,
};

export type MobileVideoCardInfo = {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  length: number;
};

export const EmptyStateVideos: Record<EmptyStateVideoIds, MobileVideoCardInfo> =
  {
    [EmptyStateVideoIds.HOW_THE_CEO_USES_LOOM]: {
      id: EmptyStateVideoIds.HOW_THE_CEO_USES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.HOW_THE_CEO_USES_LOOM}`,
      title: 'How the CEO of Loom uses Loomq',
      thumbnail:
        'sessions/thumbnails/5bbdeb480ba84e65b1b3de8c190e2003-00001.gif',
      length: 60,
    },
    [EmptyStateVideoIds.GETTING_STARTED_WITH_LOOM]: {
      id: EmptyStateVideoIds.GETTING_STARTED_WITH_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.GETTING_STARTED_WITH_LOOM}`,
      title: 'Getting started with Loom',
      thumbnail:
        'sessions/thumbnails/d97180be7d674f4fbf57744365457162-00001.gif',
      length: 300,
    },
    [EmptyStateVideoIds.REPLACING_MEETINGS_WITH_LOOM]: {
      id: EmptyStateVideoIds.REPLACING_MEETINGS_WITH_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.REPLACING_MEETINGS_WITH_LOOM}`,
      title: 'Replacing a meeting with Loom',
      thumbnail:
        'sessions/thumbnails/2a742981490b4c649ce429d75f70fd73-00001.gif',
      length: 240,
    },
    [EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM]: {
      id: EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM}`,
      title: 'Recording a presentation with Loom',
      thumbnail:
        'sessions/thumbnails/e00c8856f48049519ca6bece165b449a-00001.gif',
      length: 240,
    },
    [EmptyStateVideoIds.RECORDING_CLEAR_VIDEOS]: {
      id: EmptyStateVideoIds.RECORDING_CLEAR_VIDEOS,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.RECORDING_CLEAR_VIDEOS}`,
      title: '3 tips for recording a clear and engaging video',
      thumbnail:
        'sessions/thumbnails/a2967d00f6ce43d3a75f7a8093b3cae0-00001.gif',
      length: 120,
    },
    [EmptyStateVideoIds.LOOM_FOR_INTRODUCTIONS]: {
      id: EmptyStateVideoIds.LOOM_FOR_INTRODUCTIONS,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.LOOM_FOR_INTRODUCTIONS}`,
      title: 'Loom for introductions',
      thumbnail:
        'sessions/thumbnails/679eefb452f640c3af83e25ce36a695a-00001.gif',
      length: 120,
    },
    [EmptyStateVideoIds.GIVE_FEEDBACK_WITH_LOOM]: {
      id: EmptyStateVideoIds.GIVE_FEEDBACK_WITH_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.GIVE_FEEDBACK_WITH_LOOM}`,
      title: 'How to give feedback with Loom',
      thumbnail:
        'sessions/thumbnails/6e596ba6ca144b83ad0118757fc4cdc7-00001.gif',
      length: 240,
    },
    [EmptyStateVideoIds.RECORDING_YOUR_FIRST_LOOM]: {
      id: EmptyStateVideoIds.RECORDING_YOUR_FIRST_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.RECORDING_YOUR_FIRST_LOOM}`,
      title: 'Recording your first Loom',
      thumbnail:
        'sessions/thumbnails/62d6df1312854aeea3b4735a4a1e6284-00001.gif',
      length: 120,
    },
    [EmptyStateVideoIds.OPERATIONS_USE_CASE_LOOM]: {
      id: EmptyStateVideoIds.OPERATIONS_USE_CASE_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.OPERATIONS_USE_CASE_LOOM}`,
      title: 'Operations use cases at Loom',
      thumbnail:
        'sessions/thumbnails/c91e61c526884a57af4bd2d608a358e5-00001.gif',
      length: 120,
    },
    [EmptyStateVideoIds.SALES_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.SALES_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.SALES_USE_CASES_LOOM}`,
      title: 'Sales use cases at Loom',
      thumbnail:
        'sessions/thumbnails/73dd3ce225a04e5288358cbf4b3d6249-00001.gif',
      length: 300,
    },
    [EmptyStateVideoIds.MARKETING_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.MARKETING_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.MARKETING_USE_CASES_LOOM}`,
      title: 'Marketing use cases at Loom',
      thumbnail:
        'sessions/thumbnails/facf2b0b7833414d90462d9cb58e32c9-00001.gif',
      length: 240,
    },
    [EmptyStateVideoIds.SUPPORT_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.SUPPORT_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.SUPPORT_USE_CASES_LOOM}`,
      title: 'Support use cases at Loom',
      thumbnail:
        'sessions/thumbnails/3ee9ce1f7da749b9897adcb9a27cffb4-00001.gif',
      length: 180,
    },
    [EmptyStateVideoIds.CUSTOMER_SUCCESS_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.CUSTOMER_SUCCESS_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.CUSTOMER_SUCCESS_USE_CASES_LOOM}`,
      title: 'Customer Success use cases at Loom',
      thumbnail:
        'sessions/thumbnails/d681a609c3024e2f8f064565f068bc24-00001.gif',
      length: 180,
    },
    [EmptyStateVideoIds.ENGINEERS_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.ENGINEERS_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.ENGINEERS_USE_CASES_LOOM}`,
      title: 'Engineering use cases at Loom',
      thumbnail:
        'sessions/thumbnails/5030ea900d2b4cc98d90800f3566d3f6-00001.gif',
      length: 180,
    },
    [EmptyStateVideoIds.PRODUCT_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.PRODUCT_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.PRODUCT_USE_CASES_LOOM}`,
      title: 'Product use cases at Loom',
      thumbnail:
        'sessions/thumbnails/25edf01ae5ef4b17bfef9d562833e2f9-00001.gif',
      length: 240,
    },
    [EmptyStateVideoIds.DESIGN_USE_CASES_LOOM]: {
      id: EmptyStateVideoIds.DESIGN_USE_CASES_LOOM,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.DESIGN_USE_CASES_LOOM}`,
      title: 'Design use cases at Loom',
      thumbnail:
        'sessions/thumbnails/ade904b68ca642c58061fa3773886f4b-00001.gif',
      length: 240,
    },
    [EmptyStateVideoIds.USING_LOOM_IN_CONFLUECE]: {
      id: EmptyStateVideoIds.USING_LOOM_IN_CONFLUECE,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.USING_LOOM_IN_CONFLUECE}`,
      title: 'Using Loom in Confluence',
      thumbnail:
        'sessions/thumbnails/80dbc6f9f18f47beade09f5db2707582-424c7d05ccd73d2c.gif',
      length: 120,
    },
    [EmptyStateVideoIds.USING_LOOM_IN_JIRA]: {
      id: EmptyStateVideoIds.USING_LOOM_IN_JIRA,
      url: `${LOOM_PROD_URI}/share/${EmptyStateVideoIds.USING_LOOM_IN_JIRA}`,
      title: 'Using Loom in Jira',
      thumbnail:
        'sessions/thumbnails/7b9f68e00f6e46faa922094251e64784-bab977549963fa69.gif',
      length: 120,
    },
  };
