import {
  ADD_TEAMMATE,
  DOWNLOAD_RECORDER,
  FIRST_VIDEO_RECORDING,
  MEETING_RECORDING,
  SHARE_VIDEO,
} from '@loomhq/shared-utilities/constants/checklist';

export type AllChecklistTasks =
  | typeof DOWNLOAD_RECORDER
  | typeof FIRST_VIDEO_RECORDING
  | typeof SHARE_VIDEO
  | typeof ADD_TEAMMATE
  | typeof MEETING_RECORDING;

export interface Task {
  id: AllChecklistTasks;
  title: string;
  cta?: (buttonSize: 'small' | 'medium') => JSX.Element;
  isComplete: boolean;
  tooltipLabel: string;
  shouldShowNewPill?: boolean;
}
export enum ChecklistLocationToRender {
  EmptyState = 'emptyState',
  Sidebar = 'sidebar',
  EmbeddedInLibrary = 'embeddedInLibrary',
  TriggerLibraryInviteBanner = 'triggerLibraryInviteBanner',
}
