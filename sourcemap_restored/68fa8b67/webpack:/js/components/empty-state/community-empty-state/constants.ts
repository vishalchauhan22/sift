import {
  HISTORY_PAGE,
  HOME_PAGE,
  LOOMS_PAGE,
  NOTIFICATIONS_PAGE,
  PROFILE_PAGE,
  VIDEOS_LOOMS_PAGE,
} from '@js/constants/routes';

import { TEAM_INVITE_MODAL } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';

import { isMac } from '@js/utilities/device';

import { LibraryType } from '@loomhq/shared-utilities/constants/loomsPage';

import {
  AnalyticsButtonCtaName,
  AnalyticsEmptyStateName,
  CustomButtonType,
  DescriptionProps,
  EmptyStateConfig,
  EmptyStateType,
  EmptyStateVideoIds,
  ExperienceType,
  MobileLibraryEmptyState,
} from '../constants';
import spacesEmptyStateImg from '../destination-empty-state/assets/spaces-empty-state.png';

export enum SectionFilterType {
  NO_FILTER,
  CREATED_FILTER,
  CREATED_BY_OTHERS_FILTER,
  POSTED_FILTER,
  CREATED_AND_POSTED_FILTER,
  IN_FOLDER_FILTER,
  DEFAULT,
  MEETING_RECORDING_FILTER,
}

export const COMMUNITY_EMPTY_STATE_CONTENT: Record<
  EmptyStateType,
  EmptyStateConfig
> = {
  [EmptyStateType.HOME]: {
    title: 'Work’s always better together',
    subtitle:
      'Add teammates and you’ll be able to collaborate and quickly get a sense of what’s happening at work.',
    buttonText: 'Send an invite',
    buttonAction: () => {
      const { openModal } = useModals.getState();
      openModal({ modalType: TEAM_INVITE_MODAL });
    },
    source: HOME_PAGE,
    carouselVideos: [
      EmptyStateVideoIds.LOOM_FOR_INTRODUCTIONS,
      EmptyStateVideoIds.REPLACING_MEETINGS_WITH_LOOM,
      EmptyStateVideoIds.GIVE_FEEDBACK_WITH_LOOM,
      EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM,
    ],

    analyticsEmptyStateName: AnalyticsEmptyStateName.HOME_INVITE,
    isViewerVariant: false,
    analyticsButtonCtaName: AnalyticsButtonCtaName.INVITE,
  },
  [EmptyStateType.LIBRARY]: {
    title: 'Record your first Loom',
    subtitle:
      'People who use Loom complete projects 2x faster \nbecause who has time for another meeting.',
    buttonText: 'Record a Loom',
    customButton: CustomButtonType.RECORD_AND_UPLOAD_LOOM,
    source: LOOMS_PAGE,
    carouselVideos: [
      EmptyStateVideoIds.HOW_THE_CEO_USES_LOOM,
      EmptyStateVideoIds.OPERATIONS_USE_CASE_LOOM,
      EmptyStateVideoIds.GETTING_STARTED_WITH_LOOM,
      EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM,
    ],

    analyticsEmptyStateName: AnalyticsEmptyStateName.LIBRARY_RECORD,
    isViewerVariant: false,
    analyticsButtonCtaName: AnalyticsButtonCtaName.RECORD,
    showConfigVideos: true,
  },
  [EmptyStateType.NOTIFICATIONS]: {
    title: 'Comments and reactions live here',
    subtitle:
      'This is where the fun begins. See when \nteammates react with transcript snippets.',
    buttonText: 'Record a Loom',
    customButton: CustomButtonType.RECORD_AND_UPLOAD_LOOM,
    source: NOTIFICATIONS_PAGE,
    carouselVideos: [
      EmptyStateVideoIds.RECORDING_YOUR_FIRST_LOOM,
      EmptyStateVideoIds.GIVE_FEEDBACK_WITH_LOOM,
      EmptyStateVideoIds.RECORDING_CLEAR_VIDEOS,
      EmptyStateVideoIds.REPLACING_MEETINGS_WITH_LOOM,
    ],

    analyticsEmptyStateName: AnalyticsEmptyStateName.NOTIFICATIONS_RECORD,
    isViewerVariant: false,
    analyticsButtonCtaName: AnalyticsButtonCtaName.RECORD,
  },
  [EmptyStateType.HISTORY]: {
    title: 'No videos have been watched yet',
    subtitle:
      'This is where the fun begins. See when teammates react with transcript snippets. It’s like instant replay, for your work.',
    buttonText: 'Record a Loom',
    customButton: CustomButtonType.RECORD_AND_UPLOAD_LOOM,
    source: HISTORY_PAGE,
    carouselVideos: [
      EmptyStateVideoIds.DESIGN_USE_CASES_LOOM,
      EmptyStateVideoIds.PRODUCT_USE_CASES_LOOM,
      EmptyStateVideoIds.ENGINEERS_USE_CASES_LOOM,
      EmptyStateVideoIds.CUSTOMER_SUCCESS_USE_CASES_LOOM,
      EmptyStateVideoIds.SUPPORT_USE_CASES_LOOM,
      EmptyStateVideoIds.MARKETING_USE_CASES_LOOM,
      EmptyStateVideoIds.SALES_USE_CASES_LOOM,
      EmptyStateVideoIds.OPERATIONS_USE_CASE_LOOM,
    ],

    analyticsEmptyStateName: AnalyticsEmptyStateName.HISTORY_GET_INSPIRED,
    isViewerVariant: false,
    analyticsButtonCtaName: AnalyticsButtonCtaName.GET_INSPIRED,
  },
  [EmptyStateType.PROFILE]: {
    title: 'Keep everyone in the loop',
    subtitle:
      'Post your videos so your team can find them. We will surface your posted videos here on your profile.',
    buttonText: 'Post a video',
    buttonAction: () => {
      window.location.href = VIDEOS_LOOMS_PAGE;
    },
    source: PROFILE_PAGE,
    carouselVideos: [
      EmptyStateVideoIds.HOW_THE_CEO_USES_LOOM,
      EmptyStateVideoIds.GETTING_STARTED_WITH_LOOM,
      EmptyStateVideoIds.REPLACING_MEETINGS_WITH_LOOM,
      EmptyStateVideoIds.RECORDING_PRESENTATIONS_WITH_LOOM,
    ],

    analyticsEmptyStateName: AnalyticsEmptyStateName.MY_PROFILE_POST,
    isViewerVariant: false,
    analyticsButtonCtaName: AnalyticsButtonCtaName.POST_A_VIDEO,
  },
  [EmptyStateType.LIBRARY_ATLASSIAN]: {
    title: 'Record your first Loom',
    subtitle:
      'People who use Loom complete projects 2x faster \nbecause who has time for another meeting.',
    buttonText: 'Record a Loom',
    customButton: CustomButtonType.RECORD_AND_UPLOAD_LOOM,
    source: LOOMS_PAGE,
    carouselVideos: [
      EmptyStateVideoIds.USING_LOOM_IN_CONFLUECE,
      EmptyStateVideoIds.USING_LOOM_IN_JIRA,
    ],
    analyticsEmptyStateName: AnalyticsEmptyStateName.LIBRARY_RECORD,
    isViewerVariant: false,
    analyticsButtonCtaName: AnalyticsButtonCtaName.RECORD,
    showConfigVideos: false,
  },
  [EmptyStateType.LIBRARY_MOBILE]: MobileLibraryEmptyState,
};

export type SectionEmptyStateConfig = {
  title: string | ((input: DescriptionProps) => string);
  description: string | ((input: DescriptionProps) => string);
  button?: CustomButtonType;
  buttonText?: string;
  illustration?: string;
  imgWidth?: string;
  imgPadding?: string;
};

export const SECTION_EMPTY_STATE_CONTENT: Record<
  LibraryType,
  Partial<
    Record<
      ExperienceType,
      Partial<Record<SectionFilterType, SectionEmptyStateConfig>>
    >
  >
> = {
  [LibraryType.VIDEOS]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Record your first Loom',
        description:
          'Try making a test video and share it.\nNo pressure, we’re all friends here.',
      },
      [SectionFilterType.CREATED_FILTER]: {
        title: 'Record your first Loom',
        description:
          'Try making a test video and share it.\nNo pressure, we’re all friends here.',
      },
      [SectionFilterType.CREATED_BY_OTHERS_FILTER]: {
        title: 'There are no videos created by others',
        description:
          'Deselect the "Created by others" filter to find your videos in your library.',
      },
      [SectionFilterType.POSTED_FILTER]: {
        title: 'No one has posted a Loom yet',
        description:
          'Be the first. Post a previously created Loom, then pat yourself on the back.',
      },
      [SectionFilterType.CREATED_AND_POSTED_FILTER]: {
        title: 'Looking for videos posted by others?',
        description: 'Deselect the “Created by me” filter.',
      },
      [SectionFilterType.IN_FOLDER_FILTER]: {
        title: 'No videos have been organized into folders yet.',
        description:
          'Create a folder and move a video into it to start organizing.',
      },
      [SectionFilterType.MEETING_RECORDING_FILTER]: {
        title: 'No meeting recordings',
        description: 'Deselect the meeting recording filter',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no videos that match these filters.',
        description: 'Clear the filters to see all content.',
      },
    },
    [ExperienceType.VIEWER]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'There aren’t any videos',
        description: 'Request access from your admin to record a video.',
      },
      [SectionFilterType.CREATED_FILTER]: {
        title: 'There aren’t any videos',
        description: 'Request access from your admin to record a video.',
      },
      [SectionFilterType.CREATED_BY_OTHERS_FILTER]: {
        title: 'There are no videos created by others',
        description:
          'Deselect the "Created by others" filter to find your videos in your library.',
      },
      [SectionFilterType.POSTED_FILTER]: {
        title: 'No one has posted a Loom yet',
        description:
          'Be the first. Post a previously created Loom, then pat yourself on the back.',
      },
      [SectionFilterType.CREATED_AND_POSTED_FILTER]: {
        title: 'Looking for videos posted by others?',
        description: 'Deselect the “Created by me” filter.',
      },
      [SectionFilterType.IN_FOLDER_FILTER]: {
        title: 'No videos have been organized into folders yet.',
        description:
          'Create a folder and move a video into it to start organizing.',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no videos that match these filters.',
        description: 'Clear the filters to see all content.',
      },
    },
  },
  [LibraryType.FOLDER_IN_MY_LIBRARY]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Add a video to this folder',
        description:
          'Get projects done in half the time by sending a loom instead of scheduling a “quick sync”.',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no videos in this folder that match these filters.',
        description: 'Clear the filters to see all content.',
      },
    },
  },
  [LibraryType.FOLDERS]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'There aren’t any folders',
        description: 'Create a folder.',
      },
      [SectionFilterType.CREATED_FILTER]: {
        title: 'Looking for someone else’s folder?',
        description: 'Deselect the “Created by me” filter.',
      },
      [SectionFilterType.CREATED_BY_OTHERS_FILTER]: {
        title: 'There are no videos created by others in this folder',
        description:
          'Deselect the "Created by others" filter to find your videos in your folder.',
      },
      [SectionFilterType.POSTED_FILTER]: {
        title: 'Looking for your folders?',
        description: 'Deselect the “Posted” filter.',
      },
      [SectionFilterType.CREATED_AND_POSTED_FILTER]: {
        title: 'Looking for someone else’s folder?',
        description: 'Deselect the “Created by me” filter.',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no folders that match these filters.',
        description: 'Clear the filters to see all folders.',
      },
    },
    [ExperienceType.NON_OWNER]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Hmm, not finding any content',
        description: 'Get started by adding a video to this folder.',
      },
      [SectionFilterType.CREATED_FILTER]: {
        title: 'Looking for someone else’s folder?',
        description: 'Deselect the “Created by me” filter.',
      },
      [SectionFilterType.POSTED_FILTER]: {
        title: 'Looking for your folders?',
        description: 'Deselect the “Posted” filter.',
      },
      [SectionFilterType.CREATED_BY_OTHERS_FILTER]: {
        title: 'There are no videos created by others in this folder',
        description:
          'Deselect the "Created by others" filter to find your videos in your folder.',
      },
      [SectionFilterType.CREATED_AND_POSTED_FILTER]: {
        title: 'Looking for someone else’s folder?',
        description: 'Deselect the “Created by me” filter.',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no folders that match these filters.',
        description: 'Clear the filters to see all folders.',
      },
    },
  },
  [LibraryType.SYNCED_MEETINGS]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Looks like you don’t have any upcoming meetings',
        description: 'In the meantime, import previously recorded ones.',
      },
    },
  },
  [LibraryType.ARCHIVE]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Nothing to see here',
        description: 'Archived content will appear here.',
      },
    },
  },
  [LibraryType.SCREENSHOTS]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'There aren’t any screenshots',
        description: `Use the shortcut ${
          isMac ? 'Cmd' : 'Alt'
        }-Shift-2 in the desktop app to take a screenshot.`,
      },
    },
  },
  [LibraryType.NOTIFICATIONS_ALL]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No new notifications available',
        description: 'Videos that are shared with you will appear here.',
      },
    },
  },
  [LibraryType.NOTIFICATIONS_SHARED]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No new notifications available',
        description: 'Videos that are shared with you will appear here.',
      },
    },
  },
  [LibraryType.NOTIFICATIONS_COMMENT]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No comments',
        description: 'Comments or mentions will appear here.',
      },
    },
  },
  [LibraryType.TAGS]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Hmm, not finding any videos',
        description: ({ tagName }) => {
          if (tagName) {
            return `Follow this tag to know when a video is tagged\n with #${tagName}.`;
          }

          return 'Try deselecting filters or go to the Library page.';
        },
      },
    },
  },
  [LibraryType.PROFILE]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: ({ profileName }) => {
          if (profileName) {
            return `${profileName} hasn’t posted any videos yet.`;
          }

          return 'Hmm, not finding any videos';
        },
        description: ({ profileName }) => {
          if (profileName) {
            return `Follow ${profileName} to know when they post a video.`;
          }

          return 'Try deselecting filters or go to the Library page.';
        },
      },
    },
  },
  [LibraryType.SPACES]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        illustration: spacesEmptyStateImg,
        imgWidth: '330px',
        imgPadding: '30px',
        title: 'Start sharing videos to this Space',
        description:
          'Add videos directly here in this Space, or add videos from the My Library page.',
        button: CustomButtonType.ADD_VIDEO_TO_SPACE_SEARCH,
        buttonText: 'Add video',
      },
      [SectionFilterType.CREATED_FILTER]: {
        illustration: spacesEmptyStateImg,
        imgWidth: '330px',
        imgPadding: '30px',
        title: 'Start sharing videos to this Space',
        description:
          'Add videos directly here in this Space, or add videos from the My Library page.',
        button: CustomButtonType.ADD_VIDEO_TO_SPACE_SEARCH,
        buttonText: 'Add video',
      },
      [SectionFilterType.CREATED_BY_OTHERS_FILTER]: {
        title: 'There are no videos created by others in this Space',
        description:
          'Deselect the Created by others filter to find your videos in this Space.',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no videos in this Space that match these filters.',
        description: 'Clear the filters to see all content.',
      },
    },
    [ExperienceType.NONMEMBER]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Hmm, not finding any videos',
        description: 'Join this Space and be the first to post a video',
      },
    },
    [ExperienceType.ARCHIVED]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No videos in this Space',
        description: 'Unarchive this Space to start sharing videos to it.',
      },
    },
  },
  [LibraryType.FOLDER_IN_SPACES]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Add a video to this folder',
        description:
          'Add a video directly to this folder, and everyone in the Space will have access to it.',
        // button: CustomButtonType.ADD_VIDEO_TO_SPACE_SEARCH, todo: COL-2971
        // buttonText: 'Add video',
      },
      [SectionFilterType.CREATED_FILTER]: {
        title: 'Share a video to this folder',
        description:
          'Add a video directly to this folder, and everyone in the Space will have access to it.',
        // button: CustomButtonType.ADD_VIDEO_TO_SPACE_SEARCH, todo: COL-2971
        // buttonText: 'Add video',
      },
      [SectionFilterType.CREATED_BY_OTHERS_FILTER]: {
        title: 'There are no videos created by others in this folder',
        description:
          'Deselect the Created by others to find your videos in this folder.',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no videos in this folder that match these filters.',
        description: 'Clear the filters to see all content.',
      },
    },
    [ExperienceType.NONMEMBER]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'Hmm, not finding any videos in this folder',
        description: 'Join this Space and be the first to share a video here',
      },
      [SectionFilterType.DEFAULT]: {
        title: 'There are no videos in this folder that match these filters.',
        description: 'Clear the filters to see all content.',
      },
    },
    [ExperienceType.ARCHIVED]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No videos in this Space folder',
        description: 'Unarchive this Space to start sharing videos to it.',
      },
    },
  },
  [LibraryType.BROWSE_SPACES_CLOSED]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No closed Spaces',
        description: 'Closed Spaces will appear here.',
      },
    },
  },
  [LibraryType.BROWSE_SPACES_ARCHIVED]: {
    [ExperienceType.DEFAULT]: {
      [SectionFilterType.NO_FILTER]: {
        title: 'No archived Spaces',
        description: 'Spaces that are archived will appear here.',
      },
    },
  },
};

export const EMPTY_SECTION_DEFAULT_OPTION = {
  title: 'Nothing to see here',
  description: 'Deselect a filter to find more content',
};

export const EMPTY_STATE_CAROUSEL_SPACER_ID = 'es-carousel-spacer';
