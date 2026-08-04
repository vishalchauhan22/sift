// Variant

type LabelType = {
  email: {
    title: string;
    description: string;
  };
  link: {
    title: string;
    description: string;
  };
  meetingRecaps: {
    title: string;
    description: string;
  };
};
export const getSettingLabels = (): LabelType => {
  return {
    email: {
      title: `Share with meeting invitees`,
      description: `Send a meeting recap via email and grant access to the recording.`,
    },
    link: {
      title: 'Link access',
      description: `Who can view meeting recap and recording from a shared link`,
    },
    meetingRecaps: {
      title: 'Save meeting notes to',
      description:
        'Manage where your meeting notes page will be stored within Confluence',
    },
  };
};

export enum MeetingPageKeys {
  Upcoming = 'upcoming',
  Past = 'past',
  Rules = 'rules',
  RulesCreate = 'rules-create',
  RulesEdit = 'rules-edit',
  Settings = 'settings',
}

export enum MeetingPageTrackingNames {
  Upcoming = 'meetingNotesPage', //  Inconsistent naming as it predated this enum, trying to change it
  Past = 'pastMeetings',
  Rules = 'recordingRules',
  RulesCreate = 'recordingRulesCreate',
  RulesEdit = 'recordingRulesEdit',
  Settings = 'meetingSettings',
}

export const MeetingPageRoutes = [
  {
    name: 'Upcoming meetings',
    path: '/meetings',
    key: MeetingPageKeys.Upcoming,
    parent: null,
    trackingName: MeetingPageTrackingNames.Upcoming,
  },
  {
    name: 'Past meetings',
    path: '/meetings/past',
    key: MeetingPageKeys.Past,
    parent: null,
    trackingName: MeetingPageTrackingNames.Past,
  },
  {
    name: 'Recording rules',
    path: '/meetings/rules',
    key: MeetingPageKeys.Rules,
    parent: null,
    trackingName: MeetingPageTrackingNames.Rules,
  },
  {
    path: '/meetings/rules/create',
    key: MeetingPageKeys.RulesCreate,
    parent: MeetingPageKeys.Rules,
    trackingName: MeetingPageTrackingNames.RulesCreate,
  },
  {
    path: '/meetings/rules/:ruleId',
    key: MeetingPageKeys.RulesEdit,
    parent: MeetingPageKeys.Rules,
    trackingName: MeetingPageTrackingNames.RulesEdit,
  },
  {
    name: 'Settings',
    path: '/meetings/settings',
    key: MeetingPageKeys.Settings,
    parent: null,
    trackingName: MeetingPageTrackingNames.Settings,
  },
].reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<
    MeetingPageKeys,
    {
      name?: string;
      path: string;
      key: MeetingPageKeys;
      parent: MeetingPageKeys | null;
      trackingName: MeetingPageTrackingNames;
    }
  >
);
