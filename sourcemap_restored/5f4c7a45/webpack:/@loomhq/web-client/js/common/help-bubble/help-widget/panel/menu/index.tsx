import React from 'react';

import * as analytics from '@js/utilities/analytics';

import { Arrange } from '@loomhq/lens';
import { stringUtils } from '@loomhq/shared-utilities';

import { HELP_BUBBLE_ITEM_CLICKED } from '@js/constants/events';

import $ from './styles.module.css';
import { useCsmJourneyId } from '../../csm-journey-id';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../../../../../utilities/analytics/attribute-transformer';

type BaseItem = {
  title: string;
  emoji: string;
  onClick?: () => void;
};

interface LinkItem extends BaseItem {
  href: string;
}

interface ButtonItem extends BaseItem {
  onClick: () => void;
}

export type MenuGroup = {
  items: (ButtonItem | LinkItem)[];
};

type PanelMenuProps = {
  menuGroups: MenuGroup[];
};

export const CsmWidgetPanelMenu = ({
  menuGroups,
}: PanelMenuProps): React.ReactNode => {
  const csmJourneyId = useCsmJourneyId();

  return (
    <ul>
      {menuGroups.map((group, i) => {
        return (
          <li className={$.group} key={i}>
            <ul>
              {group.items.map(item => {
                const itemContent = (
                  <Arrange gap="small">
                    <span aria-hidden>{item.emoji}</span>
                    <span>{item.title}</span>
                  </Arrange>
                );

                const onClick = () => {
                  const itemLabelSnakeCase = stringUtils.titleToSnakeCase(
                    item.title
                  );

                  analytics.track(HELP_BUBBLE_ITEM_CLICKED, {
                    ...withIdentifiers(
                      HELP_BUBBLE_ITEM_CLICKED,
                      AnalyticsEntityId.csmJourneyId(
                        csmJourneyId,
                        'csmJourneyId'
                      )
                    ),
                    item: itemLabelSnakeCase,
                  });

                  if ('onClick' in item) {
                    item.onClick?.();
                  }
                };

                return (
                  <li className={$.item} key={item.title}>
                    {'href' in item ? (
                      <a
                        className={$.pressable}
                        href={item.href}
                        target="_blank"
                        onClick={onClick}
                        rel="noopener noreferrer"
                      >
                        {itemContent}
                      </a>
                    ) : (
                      <button className={$.pressable} onClick={onClick}>
                        {itemContent}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
