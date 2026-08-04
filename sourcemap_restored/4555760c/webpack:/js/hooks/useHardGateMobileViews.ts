import { useIsCurrentUserLoggedIn } from '@js/common/current-user';
import { ModalTypeEnum } from '@js/common/modal-container';
import { useModals } from '@js/common/modal-container/useModals';
import { useState, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { isMobile, isSafari } from '@js/utilities/device';

import { ASGSource } from '../common/onboarding';
import { Gates } from '../pages/share/common/constants/gates';

export const HARD_GATED_VIDEO_IDS_LOCALSTORAGE_KEY = 'hard_gated_video_ids';

export function useHardGateMobileViews(): boolean {
  const isLoggedIn = useIsCurrentUserLoggedIn();
  // There is an ongoing bug with safari that commonly leads to video desyncs on mobile. This prevents us from using
  // this behavior for hard gating views (since end of video never happens we cannot trigger on it).
  // https://useloom.atlassian.net/browse/MI-1161
  // This apparently will take a rewrite/refactor of the way the avserver processes videos in chunks, so it may not be
  // solved for a long time. When it is, we can remove the safari check.
  return isMobile && !isLoggedIn && !isSafari;
}

export function useHardGateViewModalOnLoad(videoId: string): void {
  const shouldHardGateMobileViews = useHardGateMobileViews();
  const isLoggedIn = useIsCurrentUserLoggedIn();
  const [gatedVideoIds] = useLocalStorageState<Record<string, boolean>>(
    HARD_GATED_VIDEO_IDS_LOCALSTORAGE_KEY,
    {
      defaultValue: {},
    }
  );
  const { openModal } = useModals();
  const [shownModal, setShownModal] = useState(false);

  useEffect(() => {
    if (
      !isLoggedIn &&
      !shownModal &&
      shouldHardGateMobileViews &&
      gatedVideoIds[videoId]
    ) {
      setShownModal(true);
      openModal({
        modalType: ModalTypeEnum.HARD_GATE_VIEWS_MODAL,
        options: {
          source: ASGSource.SignedOutHardGatingViews,
          signupParams: {
            signup_source: ASGSource.SignedOutHardGatingViews,
          },
          gate: Gates.HARD_GATE_VIEWS,
        },
      });
    }
  }, [
    gatedVideoIds,
    isLoggedIn,
    openModal,
    setShownModal,
    shouldHardGateMobileViews,
    shownModal,
    videoId,
  ]);
}
