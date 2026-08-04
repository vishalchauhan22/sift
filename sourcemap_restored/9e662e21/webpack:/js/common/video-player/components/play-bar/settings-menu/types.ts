export enum SettingsPopoversContent {
  root,
  speedSelector,
  qualitySelector,
  closedCaptionsSelector,
  closedCaptionsLanguageSelector,
}

export type SettingsMenuProps = {
  onBackButtonClick: (menuContent: SettingsPopoversContent) => void;
  videoId: string;
  rolloutTranslateCaptions?: boolean;
};
