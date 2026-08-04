import React, { useCallback } from 'react';
import { Container, Arrange, Icon, Link, Text } from '@loomhq/lens';
import { SvgAutoTitles } from '@loomhq/lens/icons/auto-titles';
import { SvgAutoChapters } from '@loomhq/lens/icons/auto-chapters';
import { SvgAutoSummaries } from '@loomhq/lens/icons/auto-summaries';
import { SvgCallToAction } from '@loomhq/lens/icons/call-to-action';
import { useDefaultSettings } from '@js/pages/share/common/settings/useDefaultSettingsStore';
import { AI_SIDEBAR_CHAPTERS_EDIT_CLICKED } from '@js/constants/events';
import { useChaptersContext } from '@js/pages/share/common/chapters';
import { useDescriptionContext } from '@js/pages/share/common/context';
import { useTitleBar, TitleFieldFocusSource } from '@js/pages/share/common';

import $ from './styles.module.css';

const DefaultSettingsCallout: React.FC = () => {
  const { setShowDefaultSettings } = useDefaultSettings();

  return (
    <Text size="body-sm">
      Manage your Loom AI default settings{' '}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link htmlTag="button" onClick={() => setShowDefaultSettings(true)}>
        here
      </Link>
    </Text>
  );
};

type AiAppliedMenuButtonProps = {
  icon: JSX.Element;
  text: string;
  onEditClick: () => void;
};

const AiAppliedMenuButton: React.FC<AiAppliedMenuButtonProps> = ({
  icon,
  text,
  onEditClick,
}) => {
  return (
    <button className={$.aiAppliedMenuButton} onClick={onEditClick}>
      <Icon icon={icon} className={$.aiAppliedIcon} />
      {text}
      <span className={$.editText}>Edit</span>
    </button>
  );
};

export type AutoAppliedOptionsProps = {
  isAiZoomApplied?: boolean;
  isAiTitleApplied?: boolean;
  isAiChaptersApplied?: boolean;
  isAiSummaryApplied?: boolean;
  displayDefaultSettingsCallout?: boolean;
  videoId: string;
  onTitleEditClick?: VoidFunction;
  onChaptersEditClick?: VoidFunction;
  onSummaryEditClick?: VoidFunction;
  onZoomEditClick?: VoidFunction;
};

export const AutoAppliedOptions: React.FC<AutoAppliedOptionsProps> = ({
  videoId,
  isAiZoomApplied = false,
  isAiTitleApplied = false,
  isAiChaptersApplied = false,
  isAiSummaryApplied = false,
  displayDefaultSettingsCallout = false,
  onTitleEditClick,
  onChaptersEditClick,
  onSummaryEditClick,
  onZoomEditClick,
}) => {
  const { enterEditMode: enterTitleEditMode } = useTitleBar();
  const { focusDescriptionInput } = useDescriptionContext();
  const { editChapters } = useChaptersContext();

  const redirectToEditPage = useCallback(() => {
    window.location.href = `/edit/${videoId}`;
  }, [videoId]);

  const handleTitleEdit = () => {
    onTitleEditClick?.();
    enterTitleEditMode(TitleFieldFocusSource.AISidebar, videoId);
  };

  const handleSummaryEdit = () => {
    onSummaryEditClick?.();
    focusDescriptionInput(videoId, 'sidebar');
  };

  const handleChaptersEdit = () => {
    onChaptersEditClick?.();
    editChapters({
      analyticsEventName: AI_SIDEBAR_CHAPTERS_EDIT_CLICKED,
      scrollIntoView: true,
    });
  };

  const handleZoomEdit = () => {
    onZoomEditClick?.();
    redirectToEditPage();
  };

  return (
    <Container backgroundColor="background">
      <Arrange autoFlow="row" gap="medium" justifyContent="stretch">
        {isAiZoomApplied && (
          <AiAppliedMenuButton
            icon={<SvgCallToAction />}
            text="Zoom to clicks added"
            onEditClick={handleZoomEdit}
          />
        )}

        {isAiTitleApplied && (
          <AiAppliedMenuButton
            icon={<SvgAutoTitles />}
            text="Title added"
            onEditClick={handleTitleEdit}
          />
        )}

        {isAiChaptersApplied && (
          <AiAppliedMenuButton
            icon={<SvgAutoChapters />}
            text="Chapters added"
            onEditClick={handleSummaryEdit}
          />
        )}

        {isAiSummaryApplied && (
          <AiAppliedMenuButton
            icon={<SvgAutoSummaries />}
            text="Summary added"
            onEditClick={handleChaptersEdit}
          />
        )}
        {displayDefaultSettingsCallout ? <DefaultSettingsCallout /> : null}
      </Arrange>
    </Container>
  );
};
