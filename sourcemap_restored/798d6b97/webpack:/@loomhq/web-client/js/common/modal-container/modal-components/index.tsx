import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { ModalComponentMap } from '../types';
import * as ModalTypes from './constants';
import { ModalTypeEnum } from './enums';

export const ModalComponents: ModalComponentMap = {
  [ModalTypes.ADD_VIDEO_TO_SPACE_SEARCH_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'AddVideoToSpaceSearchModal' */
      '@js/components/spaces/add-search-ui'
    ).then(module => ({ default: module.ModalContent }))
  ),
  [ModalTypes.ADMIN_DELETE_ACCOUNT_WARNING_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'AdminDeleteAccountWarningModal' */
      '@js/components/profile/admin-delete-account-warning-modal'
    ).then(module => ({ default: module.AdminDeleteAccountWarningModal }))
  ),
  [ModalTypes.ADMIN_FORCE_ADD_MEMBERS_CONFIRMATION_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ForceAddMembersConfirmationModal' */
      '@js/pages/admin/workspaces/workspace-lookup/members/force-add-members/ConfirmationModal'
    ).then(module => ({ default: module.ForceAddMembersConfirmationModal }))
  ),
  [ModalTypes.ADMIN_SUSPEND_ACCOUNT_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'SuspendAccountModal' */
      '@js/pages/admin/workspaces/billing/suspend-account-modal'
    ).then(module => ({ default: module.SuspendAccountModal }))
  ),
  [ModalTypeEnum.AI_MEETING_NOTES_LOCATION_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'AiMeetingNotesLocationModal' */
      '@js/pages/my-meetings/ai-meeting-notes-location-modal'
    ).then(module => ({ default: module.AiMeetingNotesLocationModal }))
  ),
  [ModalTypeEnum.CONFLUENCE_PAGE_CREATION_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ConfluencePageCreationModal' */
      '@js/common/workflows/workflows-modal/modal-footer/ConfluencePageCreationModal'
    ).then(module => ({ default: module.ConfluencePageCreationModal }))
  ),
  // TODO: Rename the directory to anon-creator-signup-modal after moving out of components dir
  [ModalTypeEnum.ANON_CREATOR_SIGNUP_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'AnonCreatorSignupModal' */
      '@js/components/share-video/anon-creator-auth-modal'
    ).then(module => ({ default: module.AnonCreatorSignupModal }))
  ),
  [ModalTypes.ANON_SHARE_GATE_MOBILE_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'AnonymousShareGateMobileModal' */
      '@js/pages/share/anonymous-share-gate-modal/mobile'
    ).then(module => ({ default: module.AnonymousShareGateMobileModal }))
  ),
  [ModalTypes.ANON_SHARE_GATE_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'AnonymousShareGateDesktopModal' */
      '@js/pages/share/anonymous-share-gate-modal/desktop'
    ).then(module => ({
      default: module.AnonymousShareGateDesktopModal,
    }))
  ),
  [ModalTypeEnum.HARD_GATE_VIEWS_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'HardGateViewsModal' */
      '@js/pages/share/anonymous-share-gate-modal/hard-gate-views-modal'
    ).then(module => ({ default: module.HardGateViewsModal }))
  ),
  [ModalTypeEnum.HARD_GATE_COMMENT_EMOJI_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'HardGateCommentEmojiModal' */
      '@js/pages/share/anonymous-share-gate-modal/hard-gate-comment-emoji-modal'
    ).then(module => ({ default: module.HardGateCommentEmojiModal }))
  ),
  [ModalTypes.ARCHIVE_SPACE_CONFIRMATION]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ArchiveSpaceConfirmationModal' */
        '@js/components/spaces/modals/ArchiveSpaceConfirmationModal'
      )
  ),
  [ModalTypes.AUTOJOIN_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'AutojoinModal' */
        '@js/components/layout/navigation/AutoJoinModal'
      )
  ),
  [ModalTypes.CANCEL_SCHEDULED_PAUSE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'CancelScheduledPauseModal' */
        '@js/components/billing/CancelScheduledPauseModal'
      )
  ),
  [ModalTypes.CHECKLIST_RECORD_BUTTON_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'RecordButtonModal' */
        '@js/components/layout/navigation/get-started-checklist/record-button-modal'
      )
  ),
  [ModalTypes.CONFIRM_DELETE_ITEM_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ConfirmDeleteItemModal' */
      '@js/components/confirm-delete-item-modal'
    ).then(module => ({ default: module.ConfirmDeleteItemModal }))
  ),
  [ModalTypes.CONTACT_SUPPORT_CONFIRMATION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ContactSupportConfirmationModal' */
        '@js/common/help-bubble/contact-support-confirmation-modal'
      )
  ),
  [ModalTypes.CONTACT_SUPPORT_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ContactSupportModal' */
      '@js/common/help-bubble/contact-support-modal'
    ).then(module => ({
      default: module.ContactSupportModal,
    }))
  ),
  [ModalTypes.CREATE_NEW_WORKSPACE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'CreateNewWorkspaceModal' */
        '@js/components/layout/header/createWorkspaceModal'
      )
  ),
  [ModalTypes.CREATE_SPACE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'CreateSpaceModal' */
        '@js/components/spaces/modals/CreateSpaceModal'
      )
  ),
  [ModalTypes.DATA_RETENTION_PREVIEW_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'DataRetentionPreviewModal' */
        '@js/components/manage-workspace/data/data-retention-preview-modal'
      )
  ),
  [ModalTypes.DESTINATION_MOVE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'DestinationMoveModal' */
        '@js/components/destination-move-modal'
      )
  ),
  [ModalTypes.DESTINATION_SEARCH_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'DestinationSearchModal' */
        '@js/components/destination-search'
      )
  ),
  [ModalTypes.DOWNLOAD_VIDEO_INFO_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'DownloadVideoInfoModal' */
      '@js/components/download-video-info-modal'
    ).then(module => ({ default: module.DownloadVideoInfoModal }))
  ),
  [ModalTypes.EDIT_SPACE_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'EditSpaceModal' */
      '@js/components/spaces/modals/EditSpaceModal'
    ).then(module => ({ default: module.EditSpaceModal }))
  ),
  [ModalTypes.END_USER_SESSION_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'EndUserSessionModal' */
      '@js/common/auth'
    ).then(module => ({ default: module.EndUserSessionModal }))
  ),
  [ModalTypes.EXT_SOURCE_WORKSPACE_CONTACTS_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ExtSourceWorkspaceContactsModal' */
      '@js/components/manage-workspace/integrations/ext-source-workspace-contacts-modal'
    ).then(module => ({ default: module.ExtSourceWorkspaceContactsModal }))
  ),
  [ModalTypes.FOLDER_MOVE_CONFIRMATION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'FolderMoveConfirmationModal' */
        '@js/components/move-modal/confirmation-modal/FolderMoveConfirmationModal'
      )
  ),
  [ModalTypes.FOLDER_SETTINGS_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'FolderSettingsModal' */
      '@js/components/folder-settings-modal'
    ).then(module => ({ default: module.FolderSettingsModal }))
  ),
  [ModalTypes.FORGOT_PASSWORD_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ForgotPasswordModal' */
        '@js/components/signup/forgot-password-modal'
      )
  ),
  [ModalTypes.IMPORT_RECORDINGS_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ImportRecordingsModal' */
        '@js/components/looms/calendar/ImportRecordingsModal'
      )
  ),
  [ModalTypes.LEAVE_WORKSPACE_CONFIRMATION]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'LeaveWorkspaceConfirmationModal' */
      '@js/pages/settings/content-transfer'
    ).then(module => ({ default: module.LeaveWorkspaceConfirmationModal }))
  ),
  [ModalTypes.MANUAL_PAYMENT_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ManualPaymentElementModal' */
        '@js/components/billing/ManualPaymentElementModal'
      )
  ),
  [ModalTypes.PAUSE_SUBSCRIPTION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'PauseSubscriptionModal' */
        '@js/components/billing/PauseSubscriptionModal'
      )
  ),
  [ModalTypes.PRODUCT_SELECTION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: "PlanSelectionModal" */ '@js/components/ProductSelectionModal'
      )
  ),
  [ModalTypes.PURCHASE_AI_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'PurchaseAIModal' */
        '@js/components/billing/PurchaseAIModal'
      )
  ),
  [ModalTypeEnum.RECORD_MEETING_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'RecordMeetingModal' */
      '@js/pages/my-meetings/common'
    ).then(module => ({ default: module.RecordMeetingModal }))
  ),
  [ModalTypes.REQUEST_UPGRADE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'RequestUpgradeModal' */
        '@js/components/request-upgrade-modal'
      )
  ),
  [ModalTypes.RESUME_PAUSED_SUBSCRIPTION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ResumePausedSubscriptionModal' */
        '@js/components/billing/ResumePausedSubscriptionModal'
      )
  ),
  [ModalTypes.ROLE_MANDATORY_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'RoleMandatoryModal' */
      '@js/common/welcome/role-mandatory-modal'
    ).then(module => ({ default: module.RoleMandatoryModal }))
  ),
  [ModalTypes.SCREENSHOT_SETTINGS_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ScreenshotSettingsModal' */
      '@js/pages/screenshot/screenshot-settings-modal'
    ).then(module => ({ default: module.ScreenshotSettingsModal }))
  ),
  [ModalTypes.SDK_RECORDING_LOADING_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'SdkRecordingLoadingModal' */
        '@js/components/record-button/LoadingModal'
      )
  ),
  [ModalTypes.SHARE_FOLDER_MODAL]: reactLazyRetry(() =>
    import(/* webpackChunkName: "ShareFolderModal" */ '@js/common/folder').then(
      module => ({ default: module.ShareFolderModal })
    )
  ),
  [ModalTypes.SHARE_RECORD_REPLY_SIGNUP_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ShareRecordReplySignupModal' */
        '@js/components/share-video/share-record-reply-signup-modal'
      )
  ),
  [ModalTypes.SHARE_UI_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'ShareUiModal' */
      '@js/common/share-video/share-modal'
    ).then(module => ({ default: module.ModalWrapper }))
  ),
  [ModalTypes.SHOW_FOLLOWS_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'ShowFollowsModal' */
        '@js/components/user-profile/profile-page/user-profile-stream/StreamModal'
      )
  ),
  [ModalTypes.SIGNUP_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'SignupModal' */
        '@js/components/signup/signup-modal'
      )
  ),
  [ModalTypes.SLACK_WORKSPACE_CONNECTED_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'SlackWorkspaceConnectedModal' */
        '@js/components/manage-workspace/integrations/SlackWorkspaceConnectedModal'
      )
  ),
  [ModalTypes.SPACES_FOLDER_MOVE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'MoveModal' */
        '@js/components/move-modal/SpacesFolderMoveModal'
      )
  ),
  [ModalTypes.TEAM_INVITE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: "TeamInviteModalRouter" */ '@js/components/manage-workspace/team-invite-modal-router'
      )
  ),
  [ModalTypes.UNARCHIVE_SPACE_CONFIRMATION]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'UnarchiveSpaceConfirmationModal' */
        '@js/components/spaces/modals/UnarchiveSpaceConfirmationModal'
      )
  ),
  [ModalTypes.VERIFY_EMAIL_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'VerifyEmailModal' */
      '@js/common/verify-email'
    ).then(module => ({ default: module.VerifyEmail }))
  ),
  [ModalTypes.VIDEO_MOVE_CONFIRMATION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'VideoMoveConfirmationModal' */
        '@js/components/move-modal/confirmation-modal/VideoMoveConfirmationModal'
      )
  ),
  [ModalTypes.VIDEO_MOVE_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'MoveModal' */
        '@js/components/move-modal/VideoMoveModal'
      )
  ),
  [ModalTypes.VIDEO_THUMBNAIL_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'VideoThumbnailModal' */
      '@js/components/share-video-fresh/right-panel/editor-tools/thumbnail-widget/thumbnail-modal'
    ).then(module => ({ default: module.VideoThumbnailModal }))
  ),
  [ModalTypes.WORKFLOWS_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'WorkflowsModal' */
      '@js/common/workflows/workflows-modal'
    ).then(module => {
      return { default: module.WorkflowsModal };
    })
  ),
  [ModalTypes.WORKSPACE_CONFIGURATION_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: 'WorkspaceConfigurationModal' */
        '@js/components/workspace-configuration-modal'
      )
  ),
  [ModalTypes.WORKSPACE_CONTACTS_CONFIRMATION_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: 'WorkspaceContactsConfirmationModal' */
      '@js/components/manage-workspace/integrations/ConfirmationModal'
    ).then(module => {
      return { default: module.ConfirmationModal };
    })
  ),
  [ModalTypes.WORKSPACE_SELECTOR_MODAL]: reactLazyRetry(
    () =>
      import(
        /* webpackChunkName: "WorkspaceSelectorModal" */ '@js/components/default-workspace-modal'
      )
  ),
  [ModalTypeEnum.WORKSPACE_MIGRATION_MODAL]: reactLazyRetry(() =>
    import(
      /* webpackChunkName: "WorkspaceMigrationModal" */ '@js/pages/share/modals/workspace-migration'
    ).then(module => ({ default: module.WorkspaceMigrationModal }))
  ),
};
