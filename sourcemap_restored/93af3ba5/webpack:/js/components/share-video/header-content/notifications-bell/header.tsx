import { NAVIGATION_ITEM_CLICKED } from '@js/constants/events';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Arrange, IconButton, Tab, Tabs, Text } from '@loomhq/lens';
import { SvgExternalLink } from '@loomhq/lens/icons/external-link';

import * as analytics from '@js/utilities/analytics';

import {
  NOTIFICATIONS_CONFIG,
  SETTINGS,
} from '@js/components/destination-notifications/constants';
import { NotificationQueryType } from '@js/globalTypes.generated';

type HeaderProps = {
  onItemClick?: (type: NotificationQueryType) => void;
  onRedirectToNotifications?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  onItemClick,
  onRedirectToNotifications,
}) => {
  const [activeTab, setActiveTab] = useState<NotificationQueryType>(
    NotificationQueryType.All
  );

  return (
    <>
      <Arrange autoFlow="column" justifyContent="space-between">
        <Text variant="title" htmlTag="h1">
          Notifications
        </Text>
        <Link
          key={SETTINGS.path}
          to={`/notifications/${activeTab}`}
          target="_blank"
          onClick={() => {
            analytics.track(NAVIGATION_ITEM_CLICKED, {
              primary_nav_item: SETTINGS.primary_nav_item,
              secondary_nav_item: SETTINGS.secondary_nav_item,
            });
            onRedirectToNotifications?.();
          }}
        >
          <IconButton
            altText="Open Notifications"
            icon={<SvgExternalLink />}
            iconColor="bodyDimmed"
            tabIndex={-1}
          />
        </Link>
      </Arrange>

      <Tabs hasBottomBorder>
        {NOTIFICATIONS_CONFIG.map(
          ({ text, path, primary_nav_item, secondary_nav_item }) => {
            const queryType = path as NotificationQueryType;

            return (
              <Tab
                key={queryType}
                htmlTag="span"
                isActive={queryType === activeTab}
                onClick={() => {
                  analytics.track(NAVIGATION_ITEM_CLICKED, {
                    primary_nav_item,
                    secondary_nav_item,
                  });
                  setActiveTab(queryType);
                  onItemClick?.(queryType);
                }}
              >
                <span className="pt:medium pb:small block">{text}</span>
              </Tab>
            );
          }
        )}
      </Tabs>
    </>
  );
};
