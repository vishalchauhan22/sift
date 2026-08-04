import { SHARE_CTA_COPY_LINK_CLICK } from '@js/constants/events';
import { SHOW_EXTENSION_TUTORIAL_OVERLAY } from '@js/constants/localStorage';

import { useCompleteChecklistItem } from '@js/hooks/checklist';
import { useSharePageSlugs } from '@js/hooks/experiments/useSharePageSlugs';
import { useMatchLargeTabletOrDesktop } from '@js/hooks/useMatchMedia';

import React, { useRef, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { track } from '@js/utilities/analytics';
import { copyVideoUrlWithShareId } from '@js/utilities/url';

import {
  getAliasVideoUrl,
  getShareVideoUrl,
  isAliasVideoUrl,
} from '@js/utilities/video';

import { ChecklistItem } from '@js/globalTypes.generated';

import { Button, Container, Icon, IconButton, Tooltip } from '@loomhq/lens';
import { SvgLink } from '@loomhq/lens/icons/link';

import styles from './styles.module.css';
import { useVideoCopyLinkButtonTooltipContent } from '@js/hooks/useVideoCopyLinkButtonTooltipContent';

function getLink(
  videoId: string,
  {
    currentSeconds,
    nameForSlug,
  }: { currentSeconds: number; nameForSlug?: string | null }
): string {
  if (isAliasVideoUrl(window.location.pathname)) {
    const [, aliasId] = location.pathname.match(/\/a\/([a-z0-9]{32})*/) ?? [];

    if (aliasId) {
      return getAliasVideoUrl(aliasId, currentSeconds);
    }
  }

  return getShareVideoUrl(videoId, { currentSeconds, nameForSlug });
}

type CopyShareVideoLinkButtonProps = {
  videoId: string;
  videoName?: string;
  analyticsSource: string;
  organizationId: string | undefined; // TODO LEAF-95 remove organizationId prop when clean up FG
  currentSeconds?: number;
  showTutorial?: boolean;
  variant?: 'primary' | 'neutral';
  hasTransparentBackground?: boolean;
};

const TutorialOverlay = () => {
  return (
    <>
      <Container
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom="-2px" // So overlay takes up height including bottom border of header
        backgroundColor="rgba(75, 66, 173, 0.8)"
        zIndex={2}
      />

      <div className={styles.animatedArrow}>
        <svg
          width={114}
          height={119}
          viewBox="0 0 114 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.styledArrow}
            d="M81.1026 17.1876C82.9771 11.8374 87.1421 1.30131 88.8057 1.95893C90.4692 2.61656 97.4592 12.9136 100.746 17.98"
            stroke="white"
            strokeWidth="3"
            strokeMiterlimit="1.5"
          />

          <path
            className={styles.styledLine}
            d="M2 92.1658C21.3572 99.2581 60.9676 104.849 64.5522 70.4755C65.2016 64.2483 58.6091 52.6449 51.6939 57.137C45.3954 61.2285 52.8272 72.55 68.0603 69.6427C89.4236 65.5654 100.769 34.5125 88.7188 4.16391"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </div>
    </>
  );
};

function InnerCopyShareVideoLinkIconButton({
  videoId,
  videoName,
  analyticsSource,
  organizationId,
  currentSeconds = 0,
  showTutorial = false,
  variant = 'neutral',
  isTextButton,
  hasTransparentBackground = false,
}: CopyShareVideoLinkButtonProps & { isTextButton: boolean }): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  const includeSlugInUrl = useSharePageSlugs();
  const onLargeTabletOrDesktop = useMatchLargeTabletOrDesktop();

  const { completeChecklistItem: completeShareVideoCheckListItem } =
    useCompleteChecklistItem(ChecklistItem.ShareVideo);

  const url = getLink(videoId, {
    currentSeconds,
    nameForSlug: includeSlugInUrl ? videoName : null,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const tooltipContent = useVideoCopyLinkButtonTooltipContent({
    videoId,
    organizationId,
    isCopied,
  });

  const [showTutorialOverlay, setShowTutorialOverlay] = useLocalStorageState(
    SHOW_EXTENSION_TUTORIAL_OVERLAY
  );

  function onCopy() {
    const [_, shareId] = copyVideoUrlWithShareId({
      videoUrl: inputRef?.current?.value,
    });

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    if (showTutorial) {
      setShowTutorialOverlay(false);
    }

    track(SHARE_CTA_COPY_LINK_CLICK, {
      video_id: videoId,
      share_id: shareId,
      source: analyticsSource,
      seconds: currentSeconds >= 1 ? currentSeconds : undefined,
    });

    completeShareVideoCheckListItem();
  }

  const urlInput = (
    <input className="none" ref={inputRef} readOnly value={url} />
  );

  return (
    <>
      {isTextButton ? (
        <Container
          backgroundColor={
            hasTransparentBackground ? 'transparent' : 'background'
          }
          position="relative"
          radius="150"
          zIndex={2}
        >
          {urlInput}
          <Tooltip
            tabIndex={-1}
            content={tooltipContent}
            placement="bottomCenter"
            maxWidth={30}
          >
            <IconButton
              altText="Copy link"
              icon={<SvgLink />}
              onClick={onCopy}
            />
          </Tooltip>
        </Container>
      ) : (
        <>
          <Container>
            {urlInput}
            {showTutorial && Boolean(showTutorialOverlay) && (
              <TutorialOverlay />
            )}
            {/* Z-index bring button over tutorial overlay when tutorial overlay is showing */}
            <Container position="relative" zIndex={2}>
              <Tooltip
                tabIndex={-1}
                content={tooltipContent}
                placement="bottomCenter"
                maxWidth={30}
              >
                <Button
                  variant={variant}
                  onClick={onCopy}
                  size={onLargeTabletOrDesktop ? 'medium' : 'small'}
                >
                  <Icon
                    icon={<SvgLink />}
                    color={variant === 'primary' ? 'background' : 'body'}
                    size={onLargeTabletOrDesktop ? '3' : '2'}
                  />
                </Button>
              </Tooltip>
            </Container>
          </Container>
        </>
      )}
    </>
  );
}

export const CopyShareVideoLinkIconTextButton = (
  props: CopyShareVideoLinkButtonProps
): JSX.Element => {
  return <InnerCopyShareVideoLinkIconButton {...props} isTextButton={true} />;
};

export const CopyShareVideoLinkIconButton = (
  props: CopyShareVideoLinkButtonProps
): JSX.Element => {
  return <InnerCopyShareVideoLinkIconButton {...props} isTextButton={false} />;
};
