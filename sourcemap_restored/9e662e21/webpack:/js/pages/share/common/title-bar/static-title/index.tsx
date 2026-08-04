import cn from 'classnames';
import { StaticTitleWithVariables } from '@js/components/video-personalization/static-title-with-variables';
import { useExpVizCohesionShareTitle } from '@js/hooks/experiments/useExpVizCohesionShareTitle';

import React from 'react';

import { useHover } from 'react-laag';

import { TextWrapper } from '../common/TextWrapper';
import { AutoTitlePopoverContainer } from './auto-title-popover-container';
import { Icon } from '@loomhq/lens';
import { SvgEditBorder } from '@loomhq/lens/icons/edit-border';
import styles from './styles.module.css';

const TitleText = ({
  title,
  doesVideoHavePersonalizedTitle,
}: {
  title: string;
  doesVideoHavePersonalizedTitle?: boolean;
}): JSX.Element => {
  const emptyTitle = title.trim() === '';
  const { isExpVizCohesionShareTitle } = useExpVizCohesionShareTitle();

  if (emptyTitle) {
    return <i>(empty)</i>;
  }

  if (doesVideoHavePersonalizedTitle) {
    return <StaticTitleWithVariables title={title} />;
  }

  if (isExpVizCohesionShareTitle) {
    return (
      <span className={styles.staticTitleWrapper}>
        <span className={styles.staticTitleEditIcon}>
          <Icon icon={<SvgEditBorder />} />
        </span>
        <span className={styles.staticTitle}>{title}</span>
      </span>
    );
  }

  return <>{title}</>;
};

type StaticTitleProps = {
  title: string;
  isEditable: boolean;
  isAutoTitleDisplayed: boolean;
  doesVideoHavePersonalizedTitle?: boolean;
  onClick: () => void;
};

export const StaticTitle = ({
  title,
  isEditable,
  isAutoTitleDisplayed,
  doesVideoHavePersonalizedTitle,
  onClick,
}: StaticTitleProps): JSX.Element => {
  const [isHover, hoverProps] = useHover();

  return (
    <div
      className={cn({
        [styles.staticTitleEditableContainer]: isEditable,
      })}
      {...hoverProps}
    >
      <TextWrapper onClick={onClick}>
        <TitleText
          title={title}
          doesVideoHavePersonalizedTitle={doesVideoHavePersonalizedTitle}
        />
      </TextWrapper>
      <div data-lens-theme="light">
        <AutoTitlePopoverContainer
          isOpen={isHover && isAutoTitleDisplayed && isEditable}
        />
      </div>
    </div>
  );
};
