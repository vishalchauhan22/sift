import {
  ANON_SHARE_GATE_MOBILE_MODAL,
  ANON_SHARE_GATE_MODAL,
} from '@js/common/modal-container';
import { Gates } from '@js/pages/share/common/constants/gates';
import { isMobile } from '@js/utilities/device';
import { LOOM_URI } from '@js/constants/routes';

export type AnonShareGateTypes =
  | typeof ANON_SHARE_GATE_MODAL
  | typeof ANON_SHARE_GATE_MOBILE_MODAL;

export enum ASGTertiaryButtonIcon {
  Comment = 'comment',
  React = 'react',
}

export function getAnonShareGateModalType(): AnonShareGateTypes {
  return isMobile ? ANON_SHARE_GATE_MOBILE_MODAL : ANON_SHARE_GATE_MODAL;
}

/**
 * NOTE(daniel, outreach) Running experiment on exp-asg-gated-signup-flow variant-2 that redirects to main welcome onboarding instead of back to the ASG modal
 * @param {string}  videoId - Share page link to redirect to after user verifies their email
 * @param {Gates} gate - If the user is requesting to download a gated video, show the main welcome flow and start video download when after successful signup
 * @returns {string} Redirect link to either /welcome or back to the share page video, resuming the ASG modal flow.
 */
export function useGetAsgRedirectLink({
  videoId,
  gate,
}: {
  videoId: string;
  gate?: Gates;
}): string {
  const WELCOME_LINK_WITH_DOWNLOAD = `${LOOM_URI}/welcome?redirect_to_share=${videoId}&start_download=true`;
  const RESUME_SHARE_PAGE_ASG = `${LOOM_URI}/share/${videoId}?resume-anon-signup=true`;

  if (gate === Gates.HARD_GATE_DOWNLOAD) {
    return WELCOME_LINK_WITH_DOWNLOAD;
  }

  return RESUME_SHARE_PAGE_ASG;
}
