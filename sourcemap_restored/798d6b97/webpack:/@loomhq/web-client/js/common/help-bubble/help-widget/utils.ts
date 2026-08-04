import { LoggedInUser } from '@js/common/current-user/schema/types';
import { CANNY_IO_FEEDBACK_URL } from '@js/common/help-bubble/help-menu/constants';
import { CANNY_IO_APP_ID } from '@js/constants/runtimeConfig';

export const cannyIdentifyUser = (currentUser: LoggedInUser): void => {
  window.Canny &&
    window.Canny(
      'identify',
      {
        appID: CANNY_IO_APP_ID,
        user: {
          email: currentUser.email,
          name: [currentUser.firstName, currentUser.lastName].join(' '),
          id: Number(currentUser.id),
          customFields: {
            workspace_role: currentUser.memberships?.[0]?.member_role as string,
            workspace_id: currentUser.memberships?.[0]?.organization
              .id as any as number,
          },
        },
      },
      () => {
        window.location.href = CANNY_IO_FEEDBACK_URL;
      }
    );
};
