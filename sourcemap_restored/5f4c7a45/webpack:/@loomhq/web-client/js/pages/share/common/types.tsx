import { TAB_LIST } from './constants';
import slugify from 'slugify';
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

// Create a mapping of tab names to their slugified versions
export const TAB_SLUGS: Record<TAB_LIST, string> = {
  [TAB_LIST.Recap]: slugify(TAB_LIST.Recap, { strict: true, lower: true }),
  [TAB_LIST.Activity]: slugify(TAB_LIST.Activity, {
    strict: true,
    lower: true,
  }),
  [TAB_LIST.Transcript]: slugify(TAB_LIST.Transcript, {
    strict: true,
    lower: true,
  }),
  [TAB_LIST.Views]: slugify(TAB_LIST.Views, { strict: true, lower: true }),
  [TAB_LIST.Edit]: slugify(TAB_LIST.Edit, { strict: true, lower: true }),
  [TAB_LIST.Settings]: slugify(TAB_LIST.Settings, {
    strict: true,
    lower: true,
  }),
  [TAB_LIST.Overview]: slugify(TAB_LIST.Overview, {
    strict: true,
    lower: true,
  }),
};

// Helper function to get tab from slug
export const getTabFromSlug = (slug: string): TAB_LIST => {
  return Object.entries(TAB_SLUGS).find(
    ([_, value]) => value === slug
  )?.[0] as TAB_LIST;
};

// Helper function to get slug from tab
export const getSlugFromTab = (tab: TabTypes): string => {
  return TAB_SLUGS[tab];
};

export enum EDIT_TOOLS_LIST {
  Link = 'Add a link',
  Thumbnail = 'Change thumbnail',
  Settings = 'Video settings',
  Default = 'Set default link',
}

export type EditToolsTypes = `${EDIT_TOOLS_LIST}`;
