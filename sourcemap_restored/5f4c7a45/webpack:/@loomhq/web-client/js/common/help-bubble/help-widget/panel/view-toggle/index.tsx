import { CSM_AI_WIDGET_FORM_OPENED } from '@js/constants/events';

import cx from 'classnames';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import React from 'react';

import * as analytics from '@js/utilities/analytics';

import { Text } from '@loomhq/lens';

import $ from './styles.module.css';
import { useCsmJourneyId } from '../../csm-journey-id';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../../utilities/analytics/attribute-transformer';

type ViewToggleProps = {
  view: 'chat' | 'contact';
  onViewChange: (view: 'chat' | 'contact') => void;
};

const ToggleButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={cx($.toggleButton, {
        [$.active]: active,
      })}
      aria-pressed={active}
      onClick={onClick}
    >
      <Text fontWeight="bold">{children}</Text>
    </button>
  );
};

export const ViewToggle = ({
  view,
  onViewChange,
}: ViewToggleProps): React.ReactNode => {
  const csmJourneyId = useCsmJourneyId();
  const workspace = useGetSelectedWorkspace();
  const workspacePlan = workspace?.type;

  return (
    <div className={cx($.toggleContainer, view === 'contact' && $.contact)}>
      <div className={$.toggleSlider}></div>
      <ToggleButton
        active={view === 'chat'}
        onClick={() => {
          onViewChange('chat');
        }}
      >
        Chat
      </ToggleButton>
      <ToggleButton
        active={view === 'contact'}
        onClick={() => {
          analytics.track(CSM_AI_WIDGET_FORM_OPENED, {
            ...withIdentifiers(
              CSM_AI_WIDGET_FORM_OPENED,
              AnalyticsEntityId.csmJourneyId(csmJourneyId, 'csmJourneyId')
            ),
            view,
            workspacePlan,
          });
          onViewChange('contact');
        }}
      >
        Contact Support
      </ToggleButton>
    </div>
  );
};
