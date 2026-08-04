/* eslint-disable @loomhq/loom/no-js-extension */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button, Dropdown, Modal, Text } from '@loomhq/lens';

import { trackDesktopDownloads } from '@js/utilities/desktop/trackDownloads';
import {
  MAC_SUPPORT,
  fetchLinkByPlatform,
} from '@js/utilities/download-desktop';

import styles from './styles.module.less';

const ARM64_SUFFIX = '-arm64';

const DownloadMacModalPortal = ({
  showModal,
  setShowModal,
  onIntelClick,
  onSiliconClick,
}) => {
  return createPortal(
    <Modal
      secondaryButton={
        <Button variant="primary" onClick={onIntelClick}>
          MacOS - Intel
        </Button>
      }
      mainButton={
        <Button onClick={onSiliconClick}>MacOS - Apple Silicon</Button>
      }
      title={'Select the version that’s right for you'}
      isOpen={showModal}
      onCloseClick={() => setShowModal(false)}
      onBackgroundClick={() => setShowModal(false)}
    >
      <ol className={styles.list}>
        <li>At the top left, open the Apple menu.</li>
        <li>Select About This Mac.</li>
        <li>In the “Overview” tab, look for “Processor” or “Chip”.</li>
        <li>Check if it says “Intel” or “Apple”.</li>
      </ol>
    </Modal>,
    document.body
  );
};

const DownloadDesktopDropdown = props => {
  const {
    inlineTrigger,
    hasFullWidth,
    trigger,
    afterOnClick = () => {},
  } = props;

  const [intelLink, setIntelLink] = useState();
  const [arm64Link, setArm64Link] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLinkByPlatform(MAC_SUPPORT).then(downloadLinks => {
      setIntelLink(
        downloadLinks.find(macLink => !macLink.includes(ARM64_SUFFIX))
      );

      setArm64Link(
        downloadLinks.find(macLink => macLink.includes(ARM64_SUFFIX))
      );
    });
  }, []);

  const onOptionClick = optionHref => {
    trackDesktopDownloads(optionHref);
    window.location.href = optionHref;
    afterOnClick(optionHref);
  };

  const onHowToChooseClick = () => {
    setShowModal(true);
  };

  const onIntelClick = () => {
    onOptionClick(intelLink);
  };

  const onSiliconClick = () => {
    onOptionClick(arm64Link);
  };

  return (
    <>
      <DownloadMacModalPortal
        showModal={showModal}
        setShowModal={setShowModal}
        onIntelClick={onIntelClick}
        onSiliconClick={onSiliconClick}
      />
      <Dropdown
        trigger={trigger}
        className={classNames(
          styles.dropdown,
          hasFullWidth && styles.fullWidth,
          inlineTrigger && styles.inlineTrigger
        )}
        options={[
          {
            title: 'Download for MacOS - Intel chip',
            disabled: !intelLink,
            onClick: onIntelClick,
          },
          {
            title: 'Download for MacOS - Apple M chip',
            disabled: !arm64Link,
            onClick: onSiliconClick,
          },
          {
            title: (
              <Text color="blurple" fontWeight="bold">
                Need help choosing?
              </Text>
            ),
            onClick: onHowToChooseClick,
            hasDivider: true,
          },
        ]}
      />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default DownloadDesktopDropdown;
