import { VideoSource } from '@js/components/video-player-fresh/video-source/useVideoSource';
import { isPolicyExpired } from '@js/utilities/part-credentials';

// Sometimes Chrome suspends a tab and reloads the player without fetching the resource creds.
// In this case, reload the tab to re-fetch the credentials needed for the resource.
export const refreshIfPolicyExpired = (source: VideoSource): boolean => {
  if (
    source.partCredentials &&
    source.partCredentials.Policy &&
    isPolicyExpired(source.partCredentials.Policy)
  ) {
    location.reload();

    return true;
  }

  return false;
};
