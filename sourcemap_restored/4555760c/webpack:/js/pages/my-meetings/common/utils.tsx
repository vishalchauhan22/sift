import {
  MeetingRecordingSummaryNotificationType,
  MeetingRecordingAccessType,
  MeetingRecordingLinkSharingType,
  LinkSharing,
  Access,
  SummaryNotification,
} from '@js/globalTypes.generated';

export const SHARE_RECORDING_CONTENT = {
  [MeetingRecordingSummaryNotificationType.Everyone]: {
    title: 'All meeting invitees',
  },
  [MeetingRecordingSummaryNotificationType.InternalOnly]: {
    title: 'Only internal invitees',
  },
  [MeetingRecordingSummaryNotificationType.RecorderOnly]: {
    title: 'Just me',
  },
};
export const SHARE_RECORDING_CONTENT_POTHOS = {
  [SummaryNotification.Everyone]: {
    title: 'All meeting invitees',
    value: SummaryNotification.Everyone,
  },
  [SummaryNotification.InternalOnly]: {
    title: 'Only internal invitees',
    value: SummaryNotification.InternalOnly,
  },
  [SummaryNotification.RecorderOnly]: {
    title: 'Just me',
    value: SummaryNotification.RecorderOnly,
  },
};

export const setMeetingRecordingAccess = (
  optionType: MeetingRecordingSummaryNotificationType
): {
  workspaceMemberAccess: MeetingRecordingAccessType;
  externalInviteeAccess: MeetingRecordingAccessType;
  summaryNotification: MeetingRecordingSummaryNotificationType;
} => {
  switch (optionType) {
    case MeetingRecordingSummaryNotificationType.Everyone:
      return {
        workspaceMemberAccess: MeetingRecordingAccessType.CanView,
        externalInviteeAccess: MeetingRecordingAccessType.CanView,
        summaryNotification: MeetingRecordingSummaryNotificationType.Everyone,
      };
    case MeetingRecordingSummaryNotificationType.InternalOnly:
      return {
        workspaceMemberAccess: MeetingRecordingAccessType.CanView,
        externalInviteeAccess: MeetingRecordingAccessType.Disabled,
        summaryNotification:
          MeetingRecordingSummaryNotificationType.InternalOnly,
      };
    case MeetingRecordingSummaryNotificationType.RecorderOnly:
      return {
        workspaceMemberAccess: MeetingRecordingAccessType.Disabled,
        externalInviteeAccess: MeetingRecordingAccessType.Disabled,
        summaryNotification:
          MeetingRecordingSummaryNotificationType.RecorderOnly,
      };
    case MeetingRecordingSummaryNotificationType.Disabled:
      return {
        workspaceMemberAccess: MeetingRecordingAccessType.Disabled,
        externalInviteeAccess: MeetingRecordingAccessType.Disabled,
        summaryNotification:
          MeetingRecordingSummaryNotificationType.RecorderOnly,
      };
    default:
      throw new Error('Invalid MeetingRecordingSummaryNotificationType');
  }
};

export const SUMMARY_NOTIFICATON_APOLLO_TO_POTHOS_MAP: Record<
  MeetingRecordingSummaryNotificationType,
  SummaryNotification
> = {
  [MeetingRecordingSummaryNotificationType.Everyone]:
    SummaryNotification.Everyone,
  [MeetingRecordingSummaryNotificationType.InternalOnly]:
    SummaryNotification.InternalOnly,
  [MeetingRecordingSummaryNotificationType.RecorderOnly]:
    SummaryNotification.RecorderOnly,
  [MeetingRecordingSummaryNotificationType.ExternalOnly]:
    SummaryNotification.ExternalOnly,
  [MeetingRecordingSummaryNotificationType.Disabled]:
    SummaryNotification.Disabled,
} as const;

const SUMMARY_NOTIFICATON_POTHOS_TO_APOLLO_MAP: Record<
  SummaryNotification,
  MeetingRecordingSummaryNotificationType
> = {
  [SummaryNotification.Everyone]:
    MeetingRecordingSummaryNotificationType.Everyone,
  [SummaryNotification.InternalOnly]:
    MeetingRecordingSummaryNotificationType.InternalOnly,
  [SummaryNotification.RecorderOnly]:
    MeetingRecordingSummaryNotificationType.RecorderOnly,
  [SummaryNotification.ExternalOnly]:
    MeetingRecordingSummaryNotificationType.ExternalOnly,
  [SummaryNotification.Disabled]:
    MeetingRecordingSummaryNotificationType.Disabled,
} as const;

const ACCESS_APOLLO_TO_POTHOS_MAP: Record<MeetingRecordingAccessType, Access> =
  {
    [MeetingRecordingAccessType.CanView]: Access.CanView,
    [MeetingRecordingAccessType.Disabled]: Access.Disabled,
    [MeetingRecordingAccessType.CanEdit]: Access.CanEdit,
  } as const;

export const LINK_SHARING_APOLLO_TO_POTHOS_MAP: Record<
  MeetingRecordingLinkSharingType,
  LinkSharing
> = {
  [MeetingRecordingLinkSharingType.Anyone]: LinkSharing.Anyone,
  [MeetingRecordingLinkSharingType.Workspace]: LinkSharing.Workspace,
  [MeetingRecordingLinkSharingType.OnlyPeopleAdded]:
    LinkSharing.OnlyPeopleAdded,
} as const;

// Because we're transitioning from Apollo to Pothos, we need to map the access types
export const setMeetingRecordingAccessForPothos = (
  optionType: SummaryNotification
): {
  workspaceMemberAccess: Access;
  externalInviteeAccess: Access;
  summaryNotification: SummaryNotification;
} => {
  const access = setMeetingRecordingAccess(
    SUMMARY_NOTIFICATON_POTHOS_TO_APOLLO_MAP[optionType]
  );

  return {
    workspaceMemberAccess:
      ACCESS_APOLLO_TO_POTHOS_MAP[access.workspaceMemberAccess],
    externalInviteeAccess:
      ACCESS_APOLLO_TO_POTHOS_MAP[access.externalInviteeAccess],
    summaryNotification:
      SUMMARY_NOTIFICATON_APOLLO_TO_POTHOS_MAP[access.summaryNotification],
  };
};
