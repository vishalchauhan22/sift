import React, { useState } from 'react';

import {
  Button,
  Container,
  List,
  ListRow,
  Text,
  Tooltip,
  Toast,
  TextInput,
} from '@loomhq/lens';
import { SvgRefresh } from '@loomhq/lens/icons/refresh';
import {
  ALL_FTUX,
  FTUX_NOTIFICATIONS,
} from '@loomhq/shared-utilities/constants/ftux';
import { useCurrentUserSelector } from '@js/common/current-user';
import { ErrorText } from '@js/common/error-management';

import { formatAdminDate } from '@js/pages/admin/common';

import { useGetAllUserPropertiesQuery } from './GetAllUserProperties.generated';
import { useResetFtuxMutation } from './ResetFtux.generated';
export const FtuxTable = ({
  hasStickyHeader = false,
}: {
  hasStickyHeader?: boolean;
}): JSX.Element | null => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useCurrentUserSelector(user => user.id, undefined);

  const [userQuery, setUserQuery] = useState<string | null>(
    userId?.toString() ?? ''
  );

  const [resetFtux] = useResetFtuxMutation({
    fetchPolicy: 'no-cache',
    onCompleted: ({ resetFtuxComponent }) => {
      if (resetFtuxComponent?.__typename === 'resetFtuxComponentPayload') {
        const { success, ftux } = resetFtuxComponent;
        if (success) {
          setToastMessage(`🚀 ${ftux} FTUX component reset successfully`);
          refetch({ userId: userQuery ?? '' });
        } else {
          setToastMessage(`😭 ${ftux} FTUX component reset failed`);
        }
        setToastIsOpen(true);
      }
    },
  });

  const {
    data: userPropertiesData,
    refetch,
    loading,
  } = useGetAllUserPropertiesQuery({
    variables: { userId: userId ?? '' },
    onError: err => {
      setErrorMessage(`Failed to load user properties, ${err.message}`);
    },
  });

  if (
    loading ||
    !userPropertiesData?.getAllUserProperties ||
    userPropertiesData?.getAllUserProperties?.__typename !==
      'GetAllUserPropertiesPayload'
  ) {
    return null;
  }
  const userPropertiesMap = (
    userPropertiesData.getAllUserProperties.properties || []
  ).reduce((acc, { name, value }) => {
    if (name !== null && value !== null) {
      acc[name] = value;
    }
    return acc;
  }, {});

  const sortedFtux = ALL_FTUX.map(ftux => ({
    name: ftux,
    priority: FTUX_NOTIFICATIONS[ftux]?.priority ?? Number.MAX_VALUE,
  })).sort((a, b) => a.priority - b.priority);

  return (
    <>
      <Container>
        <TextInput
          aria-label="Enter a user ID"
          id="userQuery"
          className="mb:medium"
          placeholder={userId?.toString() ?? ''}
          onChange={e => setUserQuery(e.target.value.trim())}
        />

        <Button
          variant="primary"
          onClick={() => {
            setToastMessage(`Loading user properties for user ${userQuery}`);
            setToastIsOpen(true);
            refetch({ userId: userQuery ?? '' });
          }}
        >
          Search
        </Button>
      </Container>
      <Toast isOpen={toastIsOpen} onCloseClick={() => setToastIsOpen(false)}>
        {toastMessage}
      </Toast>
      <>{errorMessage ? <ErrorText error={errorMessage} /> : null}</>

      <Container marginBottom="xlarge" position="relative">
        <List
          columns={['auto', '3fr', '1fr', '1fr', '1fr', '1fr']}
          gap="large"
          variant="stripe"
        >
          <Container
            {...(hasStickyHeader ? { position: 'sticky', top: -2 } : undefined)}
          >
            <ListRow paddingX="medium" paddingY="small">
              <Tooltip content={`Reset to default value`}>
                <Text alignment="center" fontWeight="bold">
                  Reset
                </Text>
              </Tooltip>
              <Text fontWeight="bold">Name</Text>
              <Text alignment="center" fontWeight="bold">
                Dismissed
              </Text>
              <Text alignment="center" fontWeight="bold">
                Team
              </Text>
              <Text alignment="center" fontWeight="bold">
                Priority
              </Text>
              <Text alignment="center" fontWeight="bold">
                Expiration
              </Text>
            </ListRow>
          </Container>
          {sortedFtux.map(({ name: ftux }, i) => {
            const ftuxNotification = FTUX_NOTIFICATIONS[ftux];

            if (!ftuxNotification) {
              return null;
            }

            const { priority, team, expires } = ftuxNotification;
            const invalidExpiration = isNaN(expires);
            let expiresString = '';
            if (!expires) {
              expiresString = 'N/A';
            } else if (invalidExpiration) {
              expiresString = 'Invalid expiry date, please check config';
            } else {
              expiresString = formatAdminDate(expires);
            }

            // Check if ftux is in user property table
            const userPropertyValue = userPropertiesMap[ftux];

            const displayValue =
              userPropertyValue !== undefined ? userPropertyValue : 'Not set';

            return (
              <ListRow key={`ftux-${i}`} paddingX="medium" paddingY="small">
                <Button
                  size="small"
                  icon={<SvgRefresh />}
                  onClick={() => {
                    resetFtux({ variables: { userId: userId ?? '', ftux } });
                  }}
                />
                <Text>{ftux}</Text>
                <Text alignment="center">{displayValue.toString()}</Text>
                <Text alignment="center">{team?.name ?? ''}</Text>
                <Text alignment="center">{priority}</Text>
                <Text alignment="center">{expiresString}</Text>
              </ListRow>
            );
          })}
        </List>
      </Container>
    </>
  );
};
