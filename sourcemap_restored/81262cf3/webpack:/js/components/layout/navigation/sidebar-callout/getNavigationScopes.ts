import {
  AUTOJOIN_SIDEBAR,
  FAVORITES,
  INVITE_CREATOR_ACTION,
  INVITE_VIEWER_ACTION,
  PERSONAL_ARCHIVE_READ,
  PERSONAL_ARCHIVE_WRITE,
  PERSONAL_LIBRARY_READ,
  PERSONAL_LIBRARY_WRITE,
  SUGGESTED_WORKSPACE_SIDEBAR,
  TEAM_ARCHIVE_READ,
  TEAM_ARCHIVE_WRITE,
  TEAM_LIBRARY_READ,
  TEAM_LIBRARY_WRITE,
  WATCH_LATER,
  WORKSPACE_DOMAIN_JOIN_MANAGE,
} from '@loomhq/shared-utilities/constants/scopes';

export const getNavigationScopes = (
  scopes: string[]
): {
  hasAutojoinSidebarScope: boolean;
  hasFavoritesScope: boolean;
  hasInviteCreatorActionScope: boolean;
  hasInviteViewerActionScope: boolean;
  hasPersonalArchiveReadScope: boolean;
  hasPersonalArchiveWriteScope: boolean;
  hasPersonalLibraryReadScope: boolean;
  hasPersonalLibraryWriteScope: boolean;
  hasSuggestedWorkspaceSidebarScope: boolean;
  hasTeamArchiveReadScope: boolean;
  hasTeamArchiveWriteScope: boolean;
  hasTeamLibraryReadScope: boolean;
  hasTeamLibraryWriteScope: boolean;
  hasWatchLaterScope: boolean;
  hasWorkspaceJoinManageScope: boolean;
} => ({
  hasAutojoinSidebarScope: scopes.includes(AUTOJOIN_SIDEBAR),
  hasFavoritesScope: scopes.includes(FAVORITES),
  hasInviteCreatorActionScope: scopes.includes(INVITE_CREATOR_ACTION),
  hasInviteViewerActionScope: scopes.includes(INVITE_VIEWER_ACTION),
  hasPersonalArchiveReadScope: scopes.includes(PERSONAL_ARCHIVE_READ),
  hasPersonalArchiveWriteScope: scopes.includes(PERSONAL_ARCHIVE_WRITE),
  hasPersonalLibraryReadScope: scopes.includes(PERSONAL_LIBRARY_READ),
  hasPersonalLibraryWriteScope: scopes.includes(PERSONAL_LIBRARY_WRITE),
  hasSuggestedWorkspaceSidebarScope: scopes.includes(
    SUGGESTED_WORKSPACE_SIDEBAR
  ),
  hasTeamArchiveReadScope: scopes.includes(TEAM_ARCHIVE_READ),
  hasTeamArchiveWriteScope: scopes.includes(TEAM_ARCHIVE_WRITE),
  hasTeamLibraryReadScope: scopes.includes(TEAM_LIBRARY_READ),
  hasTeamLibraryWriteScope: scopes.includes(TEAM_LIBRARY_WRITE),
  hasWatchLaterScope: scopes.includes(WATCH_LATER),
  hasWorkspaceJoinManageScope: scopes.includes(WORKSPACE_DOMAIN_JOIN_MANAGE),
});
