import {
  BACKLINK_INDIVIDUAL_LINK_CLICKED,
  BACKLINK_INDIVIDUAL_LINK_REMOVE_CLICKED,
} from '@js/constants/events';

import cx from 'classnames';
import React from 'react';

import * as analytics from '@js/utilities/analytics';

import { Arrange, Container, Icon, Loader, Text, Tooltip } from '@loomhq/lens';
import { SvgLinkBroken } from '@loomhq/lens/icons/link-broken';
import { BacklinkSourceType } from '@loomhq/shared-utilities/constants/backlinks';

import styles from './styles.module.css';

type ConnectProps = {
  connectText: string;
  handleConnectClick: () => void;
};

type RemoveProps = {
  handleRemoveClick: () => void;
  isLoading: boolean;
};

type AnalyticsProps = {
  video_id: string;
  link_destination: BacklinkSourceType;
};

type Props = {
  isLoading: boolean;
  icon: JSX.Element;
  link: string;
  linkContent: string;
  connectProps?: ConnectProps;
  removeProps?: RemoveProps;
  analyticsProps: AnalyticsProps;
};

const LoadingState = () => (
  <Container
    height={2}
    backgroundColor="disabledBackground"
    radius="medium"
    width={20}
  />
);

const ButtonWrapper = ({
  children,
  handleClick,
  position,
}: {
  children: React.ReactNode;
  handleClick: () => void;
  position: 'left' | 'right';
}) => (
  <button
    className={cx({
      [styles.backlinkPreviewButton]: true,
      [styles.borderRadiusLeft]: position === 'left',
      [styles.borderRadiusRight]: position === 'right',
    })}
    onClick={e => {
      handleClick();
      e.stopPropagation();
      e.preventDefault();
    }}
  >
    {children}
  </button>
);

const IconAndConnectSection = ({
  connectProps,
  icon,
}: {
  connectProps?: ConnectProps;
  icon: JSX.Element;
}) => {
  if (!connectProps) {
    return (
      <Container paddingY={0.5} paddingLeft={1} height={4}>
        <Icon icon={icon} />
      </Container>
    );
  }

  const { connectText, handleConnectClick } = connectProps;

  return (
    <ButtonWrapper handleClick={handleConnectClick} position="left">
      <Container paddingY={0.5} paddingX={1} height={4}>
        <Arrange gap={1}>
          <Icon icon={icon} />
          <Text color="info" hasEllipsis>
            {connectText}
          </Text>
        </Arrange>
      </Container>
    </ButtonWrapper>
  );
};

const RemoveLinkSection = ({
  removeProps,
  showRemoveButton,
  analyticsProps,
}: {
  removeProps: RemoveProps;
  showRemoveButton: boolean;
  analyticsProps: AnalyticsProps;
}) => {
  if (!showRemoveButton) {
    return null;
  }

  const { handleRemoveClick, isLoading } = removeProps;

  return (
    <ButtonWrapper
      handleClick={() => {
        handleRemoveClick();
        analytics.track(
          BACKLINK_INDIVIDUAL_LINK_REMOVE_CLICKED,
          analyticsProps
        );
      }}
      position="right"
    >
      <Tooltip content="Unlink">
        <Container paddingY={1} paddingX={1} height={4}>
          {isLoading ? (
            <Loader size="small" />
          ) : (
            <Icon icon={<SvgLinkBroken />} size={2} />
          )}
        </Container>
      </Tooltip>
    </ButtonWrapper>
  );
};

export const BaseBacklinkPreview = ({
  isLoading,
  icon,
  link,
  linkContent,
  connectProps,
  removeProps,
  analyticsProps,
}: Props): JSX.Element => {
  const [showRemoveButton, setShowRemoveButton] = React.useState(false);
  const [isHoveringLink, setIsHoveringLink] = React.useState(false);

  return (
    <a
      onClick={() => {
        analytics.track(BACKLINK_INDIVIDUAL_LINK_CLICKED, analyticsProps);
      }}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setShowRemoveButton(true)}
      onMouseLeave={() => setShowRemoveButton(false)}
    >
      <Container
        radius="100"
        width="100%"
        borderSide="all"
        borderColor={isHoveringLink ? 'primary' : 'border'}
      >
        <Arrange gap={1} columns={['auto', '1fr', 'auto']}>
          <IconAndConnectSection icon={icon} connectProps={connectProps} />

          {isLoading ? (
            <LoadingState />
          ) : (
            <Text
              color="info"
              hasEllipsis
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              {linkContent}
            </Text>
          )}

          {removeProps ? (
            <RemoveLinkSection
              removeProps={removeProps}
              showRemoveButton={showRemoveButton}
              analyticsProps={analyticsProps}
            />
          ) : null}
        </Arrange>
      </Container>
    </a>
  );
};
