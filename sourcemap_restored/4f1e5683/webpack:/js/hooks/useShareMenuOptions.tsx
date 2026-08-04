// Used in JSDoc type hinting
import { LARGE_TABLET_MIN_WIDTH } from '@js/constants/breakpoints';
import { isDev } from '@js/constants/environment';
import { ErrorSeverities } from '@js/constants/error-severities';

import {
  CAPTIONS_DOWNLOAD_CLICK,
  CAPTIONS_DOWNLOAD_COMPLETED,
  DUPLICATE_ITEM_CLICK,
  ORGANIZE_VIDEO,
  SHARE_CTA_COPY_LINK_CLICK,
  VIDEO_DOWNLOAD_CLICK,
} from '@js/constants/events';

import {
  ARCHIVE,
  CONTACT_SALES,
  COPY_LINK,
  DELETE,
  DIVE,
  DOWNLOAD,
  DOWNLOAD_CAPTIONS,
  DUPLICATE,
  MAKE_PRIVATE,
  MAKE_PUBLIC,
  MOVE,
  NOTIFICATIONS,
  SEARCH,
  SHARE,
} from '@js/constants/menuOptions';

import {
  LOOM_BARE_URI,
  LOOM_URI,
  MY_VIDEOS_PAGE,
  NOTIFICATIONS_PAGE,
  CONTACT_SALES as CONTACT_SALES_URL,
} from '@js/constants/routes';

import { useConfirmationToast } from '@js/common/confirmation-toast/useConfirmationToast';
import {
  useCurrentUserSelector,
  useIsCurrentUserLoggedIn,
} from '@js/common/current-user';
import { useErrorBar } from '@js/common/error-management/error-bar/useErrorBar';
import {
  CONFIRM_DELETE_ITEM_MODAL,
  DESTINATION_SEARCH_MODAL,
  DOWNLOAD_VIDEO_INFO_MODAL,
  SHARE_UI_MODAL,
  VIDEO_MOVE_MODAL,
} from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { ASGSource } from '@js/common/onboarding';
import { ShareModalSource } from '@js/common/share-video/share-modal/enums';
import {
  useTranscript,
  useUserCanAccessTranscript,
} from '@js/common/transcripts';
import { useShouldHideLeftNav } from '@js/common/useShouldHideLeftNav';
import { useVideoPasswordContext } from '@js/common/video-password/useVideoPasswordContext';
import { useVideoContext } from '@js/common/video-player';
import { useGetTranscodedVideoUrl } from '@js/common/video/useGetTranscodedVideoUrl';
import { useGetTranscodedVideoUrlStore } from '@js/common/video/useGetTranscodedVideoUrlStore';
import { useDownloadDisabledForVideo } from '@js/common/workspace-settings/useDownloadDisabledForVideo';
import UpgradeOrHighlightTooltip from '@js/components/upgrade-or-highlight-tooltip';
import { PersonalizedVideoMenuOptionsTooltip } from '@js/components/video-personalization/PersonalizedVideoMenuOptionsTooltip';
import copy from 'copy-to-clipboard';
import { useShouldSeeNavHeaderContactSalesCta } from '@js/hooks/contactSales';
import { StartDownloadParams, useStartDownload } from '@js/hooks/header';
import { useShouldShowTrigger } from '@js/hooks/triggers';
import { useCompleteTrigger } from '@js/hooks/useCompleteTrigger';
import { useHasScope } from '@js/hooks/useHasScopes';
import { useUserInSameWorkspaceAsItem } from '@js/hooks/workspace';
import { Gates } from '@js/pages/share/common/constants/gates';
import React from 'react';
import { convertAndDownloadSrtCaptions } from '@js/utilities/captions';
import * as loggerx from '@js/utilities/loggerx';
import { getAnonShareGateModalType } from '@js/utilities/modals';
import { newNameOfDuplicates } from '@js/utilities/text';
import { UpgradeComponentFeature } from '@js/utilities/upgrades';
import { copyVideoUrlWithShareId } from '@js/utilities/url';

import { Icon } from '@loomhq/lens';
import { SvgArchive } from '@loomhq/lens/icons/archive';
import { SvgBell } from '@loomhq/lens/icons/bell';
import { SvgComment } from '@loomhq/lens/icons/comment';
import { SvgCopy } from '@loomhq/lens/icons/copy';
import { SvgDownload } from '@loomhq/lens/icons/download';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';
import { SvgFolder } from '@loomhq/lens/icons/folder';
import { SvgLink } from '@loomhq/lens/icons/link';
import { SvgLinkOff } from '@loomhq/lens/icons/link-off';
import { SvgPublicOn } from '@loomhq/lens/icons/public-on';
import { SvgSearch } from '@loomhq/lens/icons/search';
import { SvgText } from '@loomhq/lens/icons/text';
import { SvgTrash } from '@loomhq/lens/icons/trash';
import { SvgUsersAdd } from '@loomhq/lens/icons/users-add';
import { CREATED_BY_ME_FILTER } from '@loomhq/shared-utilities/constants/loomsPage';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  AUTHENTICATED_USER_ACCESS,
  FAVORITES,
  PERSONAL_ARCHIVE_WRITE,
  PERSONAL_LIBRARY_WRITE,
  TEAM_LIBRARY_WRITE,
  VIDEO_DOWNLOAD_ACCESS,
  VIDEO_SHARE_PRIVATE_ACTION,
  VIDEO_TOOLS_ACCESS,
} from '@loomhq/shared-utilities/constants/scopes';
import {
  ALL as ALL_TRIGGERS,
  SHOW_DOWNLOAD_VIDEO_INFO_MODAL,
} from '@loomhq/shared-utilities/constants/triggers';
import { ADMIN } from '@loomhq/shared-utilities/constants/userRoles';
import { TRANSCRIPTION_STATUSES } from '@loomhq/shared-utilities/constants/videoTranscript';
import { VideoPersonalizationType } from '@js/globalTypes.generated';
import {
  useMatchLargeTablet,
  useMatchLargeTabletOrDesktop,
  useMatchMedia,
  useMatchSmallDesktop,
} from '@js/hooks/useMatchMedia';
import * as analytics from '@js/utilities/analytics';
import { TrimProgressUpdatedTooltip } from '@js/utilities/trimProgressTooltip';

import { useArchiveVideosMutation } from './ArchiveVideos.generated';
import { useDuplicateVideoMutation } from './DuplicateVideo.generated';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
import { getVideoAge } from '@js/components/video-player-fresh/playback/events';
import { useRemoveVideoFromWatchLaterListMutation } from '@js/common/watch-later/RemoveVideoFromWatchLaterList.generated';
import GetUserWatchLaterListCount from '@js/common/GetUserWatchLaterListCount.graphql';

import type { FormattedWorkspaceMembership } from '@js/common/workspace-memberships/use-get-workspace-memberships';
import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../utilities/analytics/attribute-transformer';

const { AnonDownloadVideoOnSharePage } = ASGSource;

const SHARE_PAGE = 'share-page';

const commonProps = optionType => {
  switch (optionType) {
    case COPY_LINK:
      return {
        key: COPY_LINK,
        icon: <SvgLink />,
        title: COPY_LINK,
      };
    case SHARE:
      return {
        key: SHARE,
        icon: <SvgUsersAdd />,
        title: SHARE,
      };
    case MOVE:
      return {
        key: MOVE,
        icon: <SvgFolder />,
        title: MOVE,
      };
    case DUPLICATE:
      return {
        key: DUPLICATE,
        icon: <SvgCopy />,
        title: DUPLICATE,
      };
    case ARCHIVE:
      return {
        key: ARCHIVE,
        icon: <SvgArchive />,
        title: ARCHIVE,
      };
    case DOWNLOAD:
      return {
        key: DOWNLOAD,
        icon: <SvgDownload />,
        title: DOWNLOAD,
      };
    case DOWNLOAD_CAPTIONS:
      return {
        key: DOWNLOAD_CAPTIONS,
        icon: <SvgText />,
        title: DOWNLOAD_CAPTIONS,
      };
    case DELETE:
      return {
        key: DELETE,
        icon: <SvgTrash />,
        title: DELETE,
      };
    case MAKE_PUBLIC:
      return {
        key: MAKE_PUBLIC,
        icon: <SvgPublicOn />,
        title: MAKE_PUBLIC,
      };
    case MAKE_PRIVATE:
      return {
        key: MAKE_PRIVATE,
        icon: <SvgLinkOff />,
        title: MAKE_PRIVATE,
      };
    case DIVE:
      return {
        key: DIVE,
        icon: <SvgExternalLink />,
        title: DIVE,
      };
    case SEARCH:
      return {
        key: SEARCH,
        icon: <SvgSearch />,
        title: SEARCH,
      };
    case NOTIFICATIONS:
      return {
        key: NOTIFICATIONS,
        icon: <SvgBell />,
        title: NOTIFICATIONS,
      };
    case CONTACT_SALES:
      return {
        key: CONTACT_SALES,
        icon: <SvgComment />,
        title: CONTACT_SALES,
      };
    default: {
      return {};
    }
  }
};

const SHARE_VIDEO_MENU = [
  SHARE,
  SEARCH,
  NOTIFICATIONS,
  MOVE,
  DUPLICATE,
  ARCHIVE,
  DOWNLOAD,
  DOWNLOAD_CAPTIONS,
  DELETE,
  DIVE,
  CONTACT_SALES,
];

const checkConditionsMet = conditions => conditions.every(c => c);

type Scopes = {
  hasVideoSharePrivateScope: boolean;
  hasPersonalLibraryWriteScope: boolean;
  hasTeamLibraryWriteScope: boolean;
  hasVideoToolsAccessScope: boolean;
  hasArchiveAccessScope: boolean;
  hasAuthenticatedAccess: boolean;
  hasFavoritesScope: boolean;
  hasDownloadsScope: boolean;
};

type Permissions = {
  userIsOwner: boolean;
  userCanEdit: boolean;
  userInSameWorkspace: boolean;
  userCanAccessTranscript: boolean;
  userIsLoomAdmin: boolean;
};

type Extras = {
  shouldShowDownloadInfoModal: boolean;
  transcriptStatus?: (typeof TRANSCRIPTION_STATUSES)[number];
  captionDownloadUrl?: string;
  downloadUrl?: string | null;
  videoButtonsShowing: boolean;
  contactSalesButtonType: string;
};

type GetVideoActionMenuItemsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  video: any;
  scopes: Scopes;
  permissions: Permissions;
  completeTrigger: (triggerName: (typeof ALL_TRIGGERS)[number]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extras: Extras;
  fetchShareVideoDownloadUrl: () => void;
  onLargeTabletOrDesktop: boolean;
  currentPlanIsFreePlan: boolean;
  isDownloadGateExperiment: boolean;
  onSmallDesktop: boolean;
  isLoggedIn: boolean;
  hideSideNav: boolean;
  needsPassword: boolean;
  password: string | null;
  onLargeTablet: boolean;
  setVideo: (newVideo) => void;
  startDownload: (params: StartDownloadParams) => void;
  workspace: FormattedWorkspaceMembership | undefined;
};

const useVideoActionMenuItems = ({
  video,
  scopes,
  permissions,
  completeTrigger,
  extras,
  fetchShareVideoDownloadUrl,
  onLargeTabletOrDesktop,
  currentPlanIsFreePlan,
  isDownloadGateExperiment,
  onSmallDesktop,
  isLoggedIn,
  hideSideNav,
  needsPassword,
  password,
  onLargeTablet,
  setVideo,
  startDownload,
  workspace,
}: GetVideoActionMenuItemsOptions) => {
  const { areDownloadsDisabled, refetchDownloadDisabledForVideo } =
    useDownloadDisabledForVideo(video.id);
  const downloadsEnabledForWorkspace = !areDownloadsDisabled;
  const { showErrorBar } = useErrorBar();
  const { openModal } = useModals();
  const [duplicateVideoMutation] = useDuplicateVideoMutation({
    variables: {
      videoId: video.id,
      newName: newNameOfDuplicates(video.title),
      spaceId: null,
      password,
    },
    onCompleted: data => {
      const { setShowConfirmationToast } = useConfirmationToast.getState();
      if (
        data?.duplicateVideo?.__typename === 'DuplicateVideoPayload' &&
        data.duplicateVideo.newVideo
      ) {
        setShowConfirmationToast(
          `${
            data.duplicateVideo.newVideo?.name || 'Duplicated video'
          } successfully created`
        );

        const url = `https://${LOOM_BARE_URI}/share/${data.duplicateVideo.newVideo.id}`;

        copy(url, { format: 'text/plain' });
        window.open(url, '_blank');
      } else {
        showErrorBar({
          message: 'Oops! Failed to duplicate video.',
          severity: ErrorSeverities.ERROR,
        });
      }
    },
    onError: () => {
      showErrorBar({
        message: 'Oops! Failed to duplicate video.',
        severity: ErrorSeverities.ERROR,
      });
    },
  });

  const [removeFromWatchLaterList] = useRemoveVideoFromWatchLaterListMutation({
    variables: { videoId: video.id },
    update(cache, { data }) {
      // Check if the removal was a success based on the typename. Example of fails are: GenericError, UserNotAuthorized
      if (
        data?.removeVideoFromWatchLaterList?.__typename ===
        'RemoveVideoFromWatchLaterListPayload'
      ) {
        // 1. Update watch later count
        cache.updateQuery(
          {
            query: GetUserWatchLaterListCount,
          },
          cacheData => {
            const currentCount = cacheData?.result?.unwatchedCount;

            if (currentCount) {
              return {
                result: {
                  ...cacheData.result,
                  unwatchedCount: currentCount - 1,
                },
              };
            }
          }
        );

        // 2. Remove video from watch later list
        cache.evict({
          id: cache.identify({
            id: video.id,
            __typename: 'RegularUserVideo',
          }),
        });

        cache.gc();
      }
    },
  });

  const [archiveVideosMutation] = useArchiveVideosMutation({
    variables: {
      videoIds: [video.id],
      isArchived: true,
    },
    onCompleted: data => {
      const { setShowConfirmationToast } = useConfirmationToast.getState();

      if (data?.result?.__typename === 'ArchiveVideosPayload') {
        removeFromWatchLaterList();

        setShowConfirmationToast('Video archived');

        window.location.href = `${LOOM_URI}${MY_VIDEOS_PAGE}`;
      } else {
        showErrorBar({
          message: 'Oops! Failed to archive video.',
          severity: ErrorSeverities.ERROR,
        });
      }
    },
    onError: () => {
      showErrorBar({
        message: 'Oops! Failed to archive video.',
        severity: ErrorSeverities.ERROR,
      });
    },
  });
  const { userIsOwner, userCanEdit, userInSameWorkspace, userIsLoomAdmin } =
    permissions;

  // Wrap the hook in a top-level function so that it can be executed in a callback
  const handleTrimProgressTooltipComplete = () => {
    // React Hook must live at the top-level
    fetchShareVideoDownloadUrl();
  };

  const getVideoOptionOrNull = menuItem => {
    switch (menuItem) {
      case COPY_LINK: {
        if (!checkConditionsMet([!video.archived])) {
          return null;
        }

        if (onLargeTabletOrDesktop && onSmallDesktop && isLoggedIn) {
          return {
            ...commonProps(COPY_LINK),
            onClick: () => {
              const [, shareId] = copyVideoUrlWithShareId({
                videoUrl: `https://${LOOM_BARE_URI}/share/${video.id}`,
              });

              analytics.track(SHARE_CTA_COPY_LINK_CLICK, {
                ...withIdentifiers(
                  SHARE_CTA_COPY_LINK_CLICK,
                  AnalyticsEntityId.video(video.id, 'video_id'),
                  AnalyticsEntityId.share(shareId, 'share_id')
                ),
                source: 'kebab_menu',
              });
            },
          };
        }

        return null;
      }

      case SHARE: {
        if (
          !checkConditionsMet([!video.archived, scopes.hasAuthenticatedAccess])
        ) {
          return null;
        }

        if (onLargeTablet && currentPlanIsFreePlan) {
          return {
            ...commonProps(SHARE),
            onClick: () => {
              openModal({
                modalType: SHARE_UI_MODAL,
                options: {
                  videoId: video.id,
                  setVideo,
                  source: ShareModalSource.ChangePrivacy,
                },
              });
            },
          };
        }

        return null;
      }

      case SEARCH: {
        if (onLargeTablet) {
          return {
            ...commonProps(SEARCH),
            onClick: () => {
              openModal({
                modalType: DESTINATION_SEARCH_MODAL,
                options: {
                  useResponsive: true,
                },
              });
            },
          };
        }

        return null;
      }

      case NOTIFICATIONS: {
        if (hideSideNav && onLargeTablet) {
          return {
            ...commonProps(NOTIFICATIONS),
            onClick: () => {
              window.open(
                `https://${LOOM_BARE_URI}${NOTIFICATIONS_PAGE}`,
                '_self',
                'noopener'
              );
            },
          };
        }

        return null;
      }

      case MOVE: {
        if (
          !checkConditionsMet([
            userCanEdit,
            !video.archived,
            scopes.hasVideoToolsAccessScope,
            scopes.hasAuthenticatedAccess,
          ])
        ) {
          return null;
        }

        return {
          ...commonProps(MOVE),
          disabled: video.isParentOfPersonalizedCopies,
          onClick: () => {
            // Destination modal expects items in the GraphQL format returned by the getLooms query on the Destination pages,
            // so this transforms the data from the share page state to the format that's expected
            const folder = video.folder ?? {};

            /** @type {MoveVideoType} */
            const moveVideo = { ...video, folder };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const filters: any[] = []; // openModal options is of type any

            if (isLoggedIn) {
              filters.push({ type: CREATED_BY_ME_FILTER });
            }

            openModal({
              modalType: VIDEO_MOVE_MODAL,
              options: {
                videos: [moveVideo],
                filters,
                navigateToDestinationFolderAfterMove: false,
              },
            });

            analytics.track(ORGANIZE_VIDEO, {
              root_folder: video.folder_id,
              is_owner: video.isOwner,
            });
          },
          title: video.isParentOfPersonalizedCopies ? (
            <PersonalizedVideoMenuOptionsTooltip
              title={MOVE}
              content="This video contains variables and must remain in its folder."
            />
          ) : (
            MOVE
          ),
        };
      }

      case DUPLICATE: {
        if (
          !checkConditionsMet([
            userIsOwner || (video.isTeamShared && userInSameWorkspace),
            !video.archived,
            scopes.hasVideoToolsAccessScope,
            scopes.hasAuthenticatedAccess,
            video.personalizationType !== VideoPersonalizationType.Audio,
          ])
        ) {
          return null;
        }

        return {
          ...commonProps(DUPLICATE),
          onClick: () => {
            duplicateVideoMutation();

            analytics.track(DUPLICATE_ITEM_CLICK, {
              ...withIdentifiers(
                DUPLICATE_ITEM_CLICK,
                AnalyticsEntityId.video(video.id, 'entity_id')
              ),
              click_source: SHARE_PAGE,
              entity_type: 'video',
              workspace: 'private',
            });
          },
        };
      }

      case ARCHIVE: {
        if (
          !checkConditionsMet([
            userIsOwner || (video.isTeamShared && userInSameWorkspace),
            !video.archived,
            scopes.hasArchiveAccessScope,
            scopes.hasAuthenticatedAccess,
          ])
        ) {
          return null;
        }

        return {
          ...commonProps(ARCHIVE),
          onClick: () => {
            archiveVideosMutation();
          },
        };
      }

      case DOWNLOAD: {
        if (
          !checkConditionsMet([
            video.downloadable,
            !needsPassword,
            !video.archived,
            isLoggedIn,
            downloadsEnabledForWorkspace,
          ])
        ) {
          return null;
        }

        const notInScope =
          !scopes.hasDownloadsScope && isDownloadGateExperiment;

        const downloadUrl = extras.downloadUrl;

        const isVariablesChild =
          !video.isParentOfPersonalizedCopies &&
          video.personalizationType === VideoPersonalizationType.Audio;

        const titleComponent = isVariablesChild ? (
          <PersonalizedVideoMenuOptionsTooltip
            title={DOWNLOAD}
            content="This video contains variables and cannot be downloaded"
          />
        ) : isDownloadGateExperiment ? (
          <UpgradeOrHighlightTooltip
            scope={VIDEO_DOWNLOAD_ACCESS}
            placement="rightCenter"
            title={DOWNLOAD}
            feature={UpgradeComponentFeature.DOWNLOAD}
            highlightText="Download your video"
          />
        ) : (
          DOWNLOAD
        );

        return {
          ...commonProps(DOWNLOAD),
          disabled: !downloadUrl || isVariablesChild,
          icon: notInScope ? (
            <Icon color="disabledContent" icon={<SvgDownload />} />
          ) : (
            <SvgDownload />
          ),

          onClick: async () => {
            const opts = {
              video_id: video.id,
              is_owner: video.isOwner,
              video_age: video.createdAt ? getVideoAge(video) : 'NA',
            };

            analytics.track(VIDEO_DOWNLOAD_CLICK, opts);

            const areDownloadsDisabledAfterRefetch =
              await refetchDownloadDisabledForVideo();

            if (areDownloadsDisabledAfterRefetch) {
              return;
            }

            if (notInScope) {
              return;
            }

            if (downloadUrl == null) {
              return;
            }

            const downloadName = `${video.title || video.id}.mp4`;
            const downloadParams = {
              url: downloadUrl,
              name: downloadName,
              opts,
              password,
            };

            if (extras.shouldShowDownloadInfoModal) {
              openModal({
                modalType: DOWNLOAD_VIDEO_INFO_MODAL,
                options: downloadParams,
              });
              completeTrigger(SHOW_DOWNLOAD_VIDEO_INFO_MODAL);
            } else {
              if (!isLoggedIn) {
                openModal({
                  modalType: getAnonShareGateModalType(),
                  options: {
                    header: 'Sign up to download this video',
                    hideModeSwitcher: true,
                    gate: Gates.HARD_GATE_DOWNLOAD,
                    source: AnonDownloadVideoOnSharePage,
                  },
                });

                return;
              }

              startDownload(downloadParams);
            }
          },
          title:
            !downloadUrl && video?.processingInformation?.trimId ? (
              <TrimProgressUpdatedTooltip
                videoId={video.id}
                onComplete={handleTrimProgressTooltipComplete}
              />
            ) : (
              titleComponent
            ),
        };
      }

      case DOWNLOAD_CAPTIONS: {
        if (
          !checkConditionsMet([
            video.downloadable,
            !needsPassword,
            !video.archived,
            isLoggedIn,
            downloadsEnabledForWorkspace,
          ])
        ) {
          return null;
        }

        const notInScope =
          !scopes.hasDownloadsScope && isDownloadGateExperiment;

        const downloadUrl = extras.captionDownloadUrl;

        const titleComponent = isDownloadGateExperiment ? (
          <UpgradeOrHighlightTooltip
            scope={VIDEO_DOWNLOAD_ACCESS}
            placement="rightCenter"
            title={DOWNLOAD_CAPTIONS}
            feature={UpgradeComponentFeature.DOWNLOAD_CAPTIONS}
            highlightText="Download captions"
          />
        ) : (
          DOWNLOAD_CAPTIONS
        );

        return {
          ...commonProps(DOWNLOAD_CAPTIONS),
          disabled: !downloadUrl,
          icon: notInScope ? (
            <Icon color="disabledContent" icon={<SvgText />} />
          ) : (
            <SvgText />
          ),

          onClick: async () => {
            analytics.track(CAPTIONS_DOWNLOAD_CLICK, {
              ...withIdentifiers(
                CAPTIONS_DOWNLOAD_CLICK,
                AnalyticsEntityId.video(video.id, 'video_id')
              ),
              is_owner: video.isOwner,
              source: 'kebab_menu',
              member_role: workspace?.memberRole,
              current_plan: workspace?.type,
            });

            if (notInScope) {
              return;
            }

            if (!isLoggedIn) {
              openModal({
                modalType: getAnonShareGateModalType(),
                options: {
                  header: 'Sign up to download these captions',
                  hideModeSwitcher: true,
                  gate: Gates.HARD_GATE_DOWNLOAD,
                  source: AnonDownloadVideoOnSharePage,
                },
              });

              return;
            }

            if (downloadUrl) {
              const areDownloadsDisabledAfterRefetch =
                await refetchDownloadDisabledForVideo();

              if (areDownloadsDisabledAfterRefetch) {
                return;
              }

              try {
                await convertAndDownloadSrtCaptions(
                  downloadUrl,
                  `${video.title || video.id}.srt`
                );

                analytics.track(CAPTIONS_DOWNLOAD_COMPLETED, {
                  ...withIdentifiers(
                    CAPTIONS_DOWNLOAD_COMPLETED,
                    AnalyticsEntityId.video(video.id, 'video_id')
                  ),
                  is_owner: video.isOwner,
                  member_role: workspace?.memberRole,
                  current_plan: workspace?.type,
                });
              } catch (error) {
                loggerx.error(
                  'Unable to download captions',
                  { error },
                  { feature: Feature.TranscriptExtraction }
                );
              }
            }
          },
          title: titleComponent,
        };
      }

      case DELETE: {
        if (
          !checkConditionsMet([
            userIsOwner || (video.isTeamShared && userInSameWorkspace),
            scopes.hasVideoToolsAccessScope,
            scopes.hasAuthenticatedAccess,
          ])
        ) {
          return null;
        }

        return {
          ...commonProps(DELETE),
          onClick: () => {
            openModal({
              modalType: CONFIRM_DELETE_ITEM_MODAL,
              options: {
                videos: [{ ...video, password }],
                redirectUrl: `https://${LOOM_BARE_URI}${MY_VIDEOS_PAGE}`,
              },
            });
          },
        };
      }

      case DIVE: {
        if (userIsLoomAdmin || isDev) {
          return {
            ...commonProps(DIVE),
            onClick: () => {
              const url = `https://${LOOM_BARE_URI}/admin/videos/video-dive/${video.id}`;

              window.open(url, '_blank');
            },
          };
        }

        return null;
      }

      case CONTACT_SALES: {
        const contactSalesType = extras.contactSalesButtonType;

        if (contactSalesType === 'none') {
          return null;
        }

        const url = new URL(CONTACT_SALES_URL, window.location.origin);
        return {
          ...commonProps(CONTACT_SALES),
          onClick: () => {
            window.open(url.toString(), '_blank');
          },
        };
      }
      default:
        return null;
    }
  };

  return SHARE_VIDEO_MENU.map(o => getVideoOptionOrNull(o)).filter(i => i);
};

type UseShareMenuOptionsProps = {
  currentPlanIsFreePlan: boolean;
  isDownloadGateExperiment: boolean;
};

export const useShareMenuOptions = ({
  currentPlanIsFreePlan,
  isDownloadGateExperiment,
}: UseShareMenuOptionsProps): ReturnType<typeof useVideoActionMenuItems> => {
  const hasTeamLibraryWriteScope = useHasScope(TEAM_LIBRARY_WRITE);
  const hasVideoToolsAccessScope = useHasScope(VIDEO_TOOLS_ACCESS);
  const hasArchiveAccessScope = useHasScope(PERSONAL_ARCHIVE_WRITE);

  const { setVideo, video } = useVideoContext();
  const { needsPassword, password } = useVideoPasswordContext();
  const { url: downloadUrl } = useGetTranscodedVideoUrlStore();
  const { transcriptStatus, captionsUrl: captionDownloadUrl } = useTranscript();

  const scopes: Scopes = {
    hasVideoSharePrivateScope: useHasScope(VIDEO_SHARE_PRIVATE_ACTION),
    hasPersonalLibraryWriteScope: useHasScope(PERSONAL_LIBRARY_WRITE),
    hasTeamLibraryWriteScope,
    hasVideoToolsAccessScope,
    hasArchiveAccessScope,
    hasAuthenticatedAccess: useHasScope(AUTHENTICATED_USER_ACCESS),
    hasFavoritesScope: useHasScope(FAVORITES),
    hasDownloadsScope: useHasScope(VIDEO_DOWNLOAD_ACCESS),
  };

  // Permissions
  const userInSameWorkspace = useUserInSameWorkspaceAsItem(
    video?.organizationId
  );

  const userCanAccessTranscript = useUserCanAccessTranscript();

  const userIsLoomAdmin = useCurrentUserSelector(
    user => user.role === ADMIN,
    false
  );

  const isLoggedIn = useIsCurrentUserLoggedIn();
  const { selectedWorkspace: workspace } = useGetWorkspaceMemberships();

  const permissions: Permissions = {
    userIsOwner: Boolean(video.isOwner),
    userCanEdit: Boolean(video.currentUserCanEdit),
    userInSameWorkspace,
    userCanAccessTranscript,
    userIsLoomAdmin,
  };
  const [displayContactSalesCta] = useShouldSeeNavHeaderContactSalesCta();
  // Extras
  const extras = {
    shouldShowDownloadInfoModal: useShouldShowTrigger(
      SHOW_DOWNLOAD_VIDEO_INFO_MODAL
    ),
    transcriptStatus,
    captionDownloadUrl: captionDownloadUrl as Extras['captionDownloadUrl'],
    downloadUrl,
    videoButtonsShowing: useMatchMedia(
      `(min-width: ${LARGE_TABLET_MIN_WIDTH}px)`
    ),
    contactSalesButtonType: displayContactSalesCta ? 'link' : 'none',
  } as Extras;
  // Menu construction
  const completeTrigger = useCompleteTrigger();
  const { fetchShareVideoDownloadUrl } = useGetTranscodedVideoUrl();

  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();
  const onLargeTablet = useMatchLargeTablet();
  const onSmallDesktop = useMatchSmallDesktop();
  const hideSideNav = useShouldHideLeftNav();
  const startDownload = useStartDownload();

  return useVideoActionMenuItems({
    completeTrigger,
    currentPlanIsFreePlan,
    extras,
    fetchShareVideoDownloadUrl,
    hideSideNav,
    isDownloadGateExperiment,
    isLoggedIn,
    needsPassword: needsPassword ?? true,
    onLargeTablet,
    onLargeTabletOrDesktop,
    onSmallDesktop,
    password,
    permissions,
    scopes,
    setVideo,
    startDownload,
    video,
    workspace,
  });
};
