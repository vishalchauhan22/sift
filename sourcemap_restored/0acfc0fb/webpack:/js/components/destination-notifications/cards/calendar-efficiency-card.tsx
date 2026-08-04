import { usePersistentRecordAllowed } from '@js/hooks/sdk';
import React, { Suspense } from 'react';

import { reactLazyRetry } from '@js/utilities/reactLazyRetry';

import { Align, Button, Spacer } from '@loomhq/lens';

import { CalendarEfficiencyCardProps } from '../types';

export const CalendarEfficiencyCard = ({
  notification,
}: CalendarEfficiencyCardProps): JSX.Element => {
  const RecordButton = reactLazyRetry(() =>
    import(
      /* webpackChunkName: "RecordButton" */ '@js/components/record-button'
    ).then(module => ({ default: module.RecordButton }))
  );
  const persistentRecordAllowed = usePersistentRecordAllowed();

  return (
    <>
      Send a Pre-meeting video before your next meeting. Start with everyone
      ready to dive in.
      <Spacer top={2} />
      {persistentRecordAllowed && (
        <Align alignment="bottomLeft">
          <Suspense fallback={null}>
            <RecordButton source={notification?.notificationType}>
              <Button variant="primary">Record now</Button>
            </RecordButton>
          </Suspense>
        </Align>
      )}
    </>
  );
};
