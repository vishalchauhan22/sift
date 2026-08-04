/* eslint-disable @loomhq/loom/limit-parent-import-depth */

import React from 'react';

import { Container, Spacer, Tab, Tabs } from '@loomhq/lens';
import { SvgSettings } from '@loomhq/lens/icons/settings';

import {
  useCaptionsSelector,
  usePopoverHandler,
  useQualitySelector,
} from '../../hooks';
import { videoGlobalContainerClassName } from '../../variables';
import { ClosedCaptionsSelector } from '../closed-captions-selector';
import { QualitySelector } from '../quality-selector';
import { PlayerButton } from './player-button';
import { SettingsPopover } from './settings-popover';

type QualityButtonProps = {
  videoId: string;
};

type Tab = {
  title?: string;
  content?: React.ReactNode;
};

export const SettingsButton: React.FC<
  React.PropsWithChildren<QualityButtonProps>
> = ({ videoId }) => {
  const [settingsMenuIsOpen, setSettingsMenuIsOpen, ref] = usePopoverHandler();

  const boundaryRef = React.useRef<Element>();

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current as Element;

    boundaryRef.current = element.closest(
      `.${videoGlobalContainerClassName}`
    ) as Element;
  }, [ref]);

  const handleOnPlayerButtonClick = React.useCallback(() => {
    setSettingsMenuIsOpen(!settingsMenuIsOpen);
  }, [settingsMenuIsOpen, setSettingsMenuIsOpen]);

  const { shouldDisplayQualitySelector } = useQualitySelector(videoId);
  const { shouldDisplayCaptionsSelector } = useCaptionsSelector();

  const tabs = React.useMemo<Tab[]>(() => {
    const newTabs: Tab[] = [];

    if (shouldDisplayQualitySelector) {
      newTabs.push({
        title: 'Quality',
        content: <QualitySelector videoId={videoId} />,
      });
    }

    if (shouldDisplayCaptionsSelector) {
      newTabs.push({
        title: 'Closed Captions',
        content: <ClosedCaptionsSelector videoId={videoId} />,
      });
    }

    return newTabs;
  }, [shouldDisplayQualitySelector, shouldDisplayCaptionsSelector, videoId]);

  const [activeTab, setActiveTab] = React.useState<Tab | null>(null);

  React.useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0]);
    }
  }, [tabs]);

  return (
    <div ref={ref}>
      {tabs.length ? (
        <SettingsPopover
          isOpen={settingsMenuIsOpen}
          content={
            <>
              <Tabs>
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    isActive={tab?.title === activeTab?.title}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab?.title}
                  </Tab>
                ))}
              </Tabs>
              <Spacer bottom="small" />
              <Container padding="small">{activeTab?.content}</Container>
            </>
          }
        >
          <PlayerButton
            label={settingsMenuIsOpen ? '' : 'Settings'}
            icon={<SvgSettings />}
            onClick={handleOnPlayerButtonClick}
          />
        </SettingsPopover>
      ) : null}
    </div>
  );
};
