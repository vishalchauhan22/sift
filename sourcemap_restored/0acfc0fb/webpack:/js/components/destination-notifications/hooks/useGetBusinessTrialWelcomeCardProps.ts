import { useGetBusinessTrialWelcomeCardPropsQuery } from '@js/common/notifications/cards/business-trial-welcome-card/getBusinessTrialWelcomeCardProps.generated';
import { Workspace } from '../types';
import * as logger from '@js/utilities/loggerx';
import { Feature } from '@loomhq/shared-utilities/constants/product';

export interface BusinessTrialWelcomeCardData {
  notification: {
    workspace: Workspace;
  };
}

export const useGetBusinessTrialWelcomeCardProps = (
  notificationId: string
): { notification: BusinessTrialWelcomeCardData | null; loading: boolean } => {
  const { data, loading } = useGetBusinessTrialWelcomeCardPropsQuery({
    variables: { notificationId },
    onError: error => {
      logger.error(
        error,
        {
          message:
            'BusinessTrialWelcomeCard: Unable to fetch business trial welcome card props',
          notificationId,
        },
        {
          feature: Feature.Notifications,
        }
      );
    },
  });

  const notification =
    data?.getBusinessTrialWelcomeCardProps as BusinessTrialWelcomeCardData | null;

  return { notification, loading };
};
