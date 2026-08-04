import React from 'react';

import { SpaceStateChangeCardProps } from '../../types';
import { VisitSpaceCard } from './visit-space-card';

export const SpaceStateChangeCard = ({
  notification,
}: SpaceStateChangeCardProps): JSX.Element => {
  return (
    <VisitSpaceCard
      notification={notification}
      action={notification.data.wasArchived ? 'archived' : 'unarchived'}
      title={`A Space you're in has changed`}
    />
  );
};
