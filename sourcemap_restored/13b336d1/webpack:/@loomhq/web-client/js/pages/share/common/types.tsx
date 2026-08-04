import { TAB_LIST } from './constants';
import { WorkflowTemplateType } from '@js/globalTypes.generated';

export type SharePageProps = {
  downloadable?: boolean;
  downloadUrl?: string;
  focusTitle: boolean;
  fromRecorderParam: boolean;
  fromTutorialParam: boolean;
  shouldOpenInsights: boolean;
  recordingLimitParam: boolean;
  mutedParam: boolean;
  timeParam?: string;
  workspacePersona?: string;
  openSharePermissionsParam: boolean;
  cascadingRecordersTabUuidParam?: string;
  isMeetingRecording: boolean;
  userCanEdit?: boolean;
  recordingDocumentationTypeParam?: WorkflowTemplateType | null;
};

export type TabTypes = `${TAB_LIST}`;

export enum EDIT_TOOLS_LIST {
  Link = 'Add a link',
  Thumbnail = 'Change thumbnail',
  Settings = 'Video settings',
  Default = 'Set default link',
}

export type EditToolsTypes = `${EDIT_TOOLS_LIST}`;
