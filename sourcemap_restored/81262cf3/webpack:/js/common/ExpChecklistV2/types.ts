export enum ChecklistV2DisplayContext {
  Full = 'full',
  Compact = 'compact',
  Collapsed = 'collapsed',
}
export interface ChecklistV2ControllerProps {
  inSidebar?: boolean;
  isCollapsed?: boolean;
}
