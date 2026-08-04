import { useVideoPasswordContext } from '@js/common/video-password';

export const useHideInformationDueToPassword = (): boolean => {
  const { needsPassword, password } = useVideoPasswordContext();
  const passwordEntered = password && password.length > 0;

  if (!needsPassword || passwordEntered) {
    return false;
  }

  return true;
};
