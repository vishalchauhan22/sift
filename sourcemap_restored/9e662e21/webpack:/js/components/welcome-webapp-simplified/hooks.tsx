import { isDev } from '@js/constants/environment';

import React, { useEffect, useState, useRef } from 'react';
import create from 'zustand';

import { emailUtils } from '@loomhq/shared-utilities';
import { asyncIsPublicDomain } from '@js/utilities/email-validation/asyncIsPublicDomain';
import { jsonParseOrDefault } from '@js/utilities/json/safe-json-parse';
import { getParam } from '@js/utilities/url';
import {
  getLocalStorageKey,
  clearLocalStorageKey,
} from '@js/utilities/localStorage';
import { getCookie } from '@js/utilities/cookieUtils';
import { InviteFlow } from '@js/globalTypes.generated';
import { useInvitationCapabilities } from '@js/hooks/useInvitationCapabilities';
import { KEY_ATLASSIAN_INVITE_ACCEPTED } from '@loomhq/shared-utilities/constants/cookie';

import { ToastMessageType, UseWorkspaceNameType } from './types';
import { useGetWorkspaceMemberships } from '@js/common/workspace-memberships';
const { parseDomain } = emailUtils;

const forceFullPath = isDev && getParam('force_restart') === 'true';

export const useWorkspaceName = create<UseWorkspaceNameType>(set => ({
  workspaceName: '',
  touched: false,
  setWorkspaceName: workspaceName => set({ workspaceName, touched: true }),
}));

export const asyncIsWorkDomain = async (
  currentUserEmail: string
): Promise<boolean> => {
  if (!currentUserEmail) {
    return false;
  }

  const emailDomain = parseDomain(currentUserEmail);

  return !(await asyncIsPublicDomain(emailDomain));
};

// local storage keys for toast notifications
export const COMMENT_POSTED_TOAST = 'comment-posted-toast';
export const EMOJI_REACTED_TOAST = 'emoji-reacted-toast';

export const useSendToastNotifications = (
  setIsOpen: (isOpen: boolean) => void
): JSX.Element => {
  const [toastMessage, setToastMessage] = useState(<></>);

  useEffect(() => {
    const commentPostedToastMessage = getLocalStorageKey(COMMENT_POSTED_TOAST);

    const message = jsonParseOrDefault(
      commentPostedToastMessage,
      {}
    ) as ToastMessageType;
    const videoOwnerName = message?.videoOwnerName;
    const videoId = message?.commentVideoId;

    if (videoId) {
      const message = videoOwnerName
        ? ` You successfully reacted to ${videoOwnerName}'s video`
        : 'You successfully reacted to the video';

      setToastMessage(
        <a href={`/share/${videoId}`} target="_blank" rel="noreferrer noopener">
          {message}
        </a>
      );
      setIsOpen(true);
    }

    clearLocalStorageKey(COMMENT_POSTED_TOAST);
  }, [setIsOpen]);

  useEffect(() => {
    const emojiReactedToastMessage = getLocalStorageKey(EMOJI_REACTED_TOAST);
    const message = jsonParseOrDefault(
      emojiReactedToastMessage,
      {}
    ) as ToastMessageType;
    const videoOwnerName = message?.videoOwnerName;
    const videoId = message?.emojiReactVideoId;

    if (videoId) {
      const message = videoOwnerName
        ? ` You successfully reacted to ${videoOwnerName}'s video`
        : 'You successfully reacted to the video';

      setToastMessage(
        <a href={`/share/${videoId}`} target="_blank" rel="noreferrer noopener">
          {message}
        </a>
      );

      setIsOpen(true);
    }

    clearLocalStorageKey(EMOJI_REACTED_TOAST);
  }, [setIsOpen]);

  return toastMessage;
};

export enum WorkspaceConsolidationFlow {
  AtlassianInvitedSkipWorkspace = 'atlassian_invited_skip_workspace',
  AtlassianInvitedShowWorkspace = 'atlassian_invited_show_workspace',
  OrgNonAtlaInvitedSkipWorkspace = 'non_atla_org_invited_skip_workspace',
  LoomInvitedStandardCreateOrJoin = 'standard_create_join_workspace',
}

// This is only here for legacy reasons - it will fully disappear when we move to the FlowManager,
// but for now the progress bar depends on it to determine length.
export const useWorkspaceFlow = (): {
  workspaceOnboardingFlow: WorkspaceConsolidationFlow | null;
  loading: boolean;
} => {
  const { loading: loadingInvitationCapabilities, inviteFlow } =
    useInvitationCapabilities({
      isOnboarding: true,
    });
  const { data: workspaceMemberships, loading: workspaceMembershipsLoading } =
    useGetWorkspaceMemberships();
  const hasCurrentWorkspaceMembership = (workspaceMemberships?.length || 0) > 0;

  const [currentWorkspaceFlow, setCurrentWorkspaceFlow] =
    useState<WorkspaceConsolidationFlow | null>(null);
  const stepsFinalized = useRef(false);

  useEffect(() => {
    // Wait for all data to be available before making a decision
    if (
      stepsFinalized.current ||
      workspaceMembershipsLoading ||
      loadingInvitationCapabilities
    ) {
      return;
    }

    if (inviteFlow === InviteFlow.Atlassian) {
      const isOnboardingViaInvite = getCookie(KEY_ATLASSIAN_INVITE_ACCEPTED);
      if (isOnboardingViaInvite || isOnboardingViaInvite === 'true') {
        setCurrentWorkspaceFlow(
          WorkspaceConsolidationFlow.AtlassianInvitedSkipWorkspace
        );
      } else {
        setCurrentWorkspaceFlow(
          WorkspaceConsolidationFlow.AtlassianInvitedShowWorkspace
        );
      }
    } else if (inviteFlow === InviteFlow.None) {
      // inviteFlow = None is actually weirdly named, if you look at the endpoint
      // this is when we are invited from any organization that is not atlassian.
      // when this is a standard signup flow, it is InviteFlow.Loom
      setCurrentWorkspaceFlow(
        WorkspaceConsolidationFlow.OrgNonAtlaInvitedSkipWorkspace
      );
    } else if (forceFullPath || !hasCurrentWorkspaceMembership) {
      setCurrentWorkspaceFlow(
        WorkspaceConsolidationFlow.LoomInvitedStandardCreateOrJoin
      );
    } else {
      setCurrentWorkspaceFlow(
        WorkspaceConsolidationFlow.LoomInvitedStandardCreateOrJoin
      );
    }

    stepsFinalized.current = true;
  }, [
    inviteFlow,
    loadingInvitationCapabilities,
    hasCurrentWorkspaceMembership,
    workspaceMembershipsLoading,
  ]);

  return {
    workspaceOnboardingFlow: currentWorkspaceFlow,
    loading: loadingInvitationCapabilities || workspaceMembershipsLoading,
  };
};
