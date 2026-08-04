import React from 'react';

import { Container, IconButton, Tooltip } from '@loomhq/lens';
import { StackablePopover } from '@js/common/stackable-popover';
import { SvgBell } from '@loomhq/lens/icons/bell';
import { LOOM_BARE_URI, NOTIFICATIONS_PAGE } from '@js/constants/routes';
import { useUnseenNotificationsCount } from '@js/common/notifications/useUnseenNotificationCount';
import Notifications from '@js/components/destination-notifications/notifications';
import { NotificationQueryType } from '@js/globalTypes.generated';
import {
  FEATURE_GATES,
  ControlType,
} from '@loomhq/shared-utilities/constants/statsig';
import { useFlagIsActivated } from '@js/hooks/featureFlag';

import { Header } from './header';
import styles from './styles.module.less';

export const NotificationsBell: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [queryType, setQueryType] = React.useState<NotificationQueryType>(
    NotificationQueryType.All
  );
  const { count: unseenNotificationsCount } = useUnseenNotificationsCount();
  const closePopover = () => {
    setIsOpen(false);
    setQueryType(NotificationQueryType.All);
  };

  const isNotificationsPopoverEnabled = useFlagIsActivated({
    flag: FEATURE_GATES.NOTIFICATIONS_POPOVER_GATE,
    controlType: ControlType.STATSIG_FEATURE_GATE,
    activationValues: [true],
  });

  const onClickHandler: React.ComponentProps<
    typeof IconButton
  >['onClick'] = event => {
    if (isNotificationsPopoverEnabled) {
      setIsOpen(!isOpen);
      return;
    }

    if (event.metaKey || event.ctrlKey) {
      window.open(`https://${LOOM_BARE_URI}${NOTIFICATIONS_PAGE}`, '_blank');
    } else {
      window.open(
        `https://${LOOM_BARE_URI}${NOTIFICATIONS_PAGE}`,
        '_self',
        'noopener'
      );
    }
  };

  return (
    <StackablePopover
      isOpen={isOpen}
      placement="bottomCenter"
      onClose={closePopover}
      content={
        <Container
          minWidth={60}
          maxWidth={60}
          maxHeight={90}
          paddingX="large"
          backgroundColor="white"
          borderSide="all"
          borderWidth="1px"
          radius="50"
          overflow="auto"
          position="relative"
        >
          <Notifications
            header={
              <Container
                position="sticky"
                top="0"
                backgroundColor="white"
                paddingTop="large"
              >
                <Header
                  onItemClick={setQueryType}
                  onRedirectToNotifications={closePopover}
                />
              </Container>
            }
            queryType={queryType}
          />
        </Container>
      }
    >
      <Tooltip content="Notifications" placement="bottomCenter">
        {unseenNotificationsCount > 0 && (
          <div className={styles.bubble}>
            <Container backgroundColor="record" height="small" width="small" />
          </div>
        )}
        <IconButton
          altText="Notifications"
          icon={<SvgBell />}
          onClick={onClickHandler}
        />
      </Tooltip>
    </StackablePopover>
  );
};
