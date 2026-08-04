import {
  REQUEST_AI_MODAL_OPENED,
  LOOM_AI_UPGRADE_BUTTON_CLICKED,
} from '@js/constants/events';
import { CONTACT_SALES, LOOM_PROD_URI } from '@js/constants/routes';

import { usePaywallRequest } from '@js/actions/request-upgrade';
import { useCurrentUserSelector } from '@js/common/current-user';
import { PurchaseCtaClickOptions } from '@js/common/loom-ai-add-on-purchase-cta/types';
import { useGetUserRoleForSelectedWorkspace } from '@js/hooks/workspace';
import { useGetSelectedWorkspace } from '@js/hooks/workspace-basic';
import { isAtlassianManagedWorkspace } from '@js/utilities/workspace';

import * as analytics from '@js/utilities/analytics';

import { useModals } from './modal-container/useModals';

import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';
import { withIdentifiers } from '../utilities/analytics/attribute-transformer';

export const useLoomAiAddonPurchaseOnClick = (
  options: PurchaseCtaClickOptions
): { onClick: () => void } => {
  const { openModal } = useModals();
  const workspace = useGetSelectedWorkspace();
  const selectedUserId = useCurrentUserSelector(user => user.id, null);
  const memberRole = useGetUserRoleForSelectedWorkspace();
  const atlassianManagedWorkspace = isAtlassianManagedWorkspace(workspace);
  const paywallRequest = usePaywallRequest();

  if (options.purchaseType === 'request-ai') {
    return {
      onClick: () => {
        options.onCloseClick?.();
        paywallRequest('loom-ai', {
          analyticEvent: REQUEST_AI_MODAL_OPENED,
          source: options.source,
        });
      },
    };
  }

  if (options.purchaseType === 'sales-led') {
    return {
      onClick: () => {
        analytics.track(
          LOOM_AI_UPGRADE_BUTTON_CLICKED,
          {
            ...withIdentifiers(
              LOOM_AI_UPGRADE_BUTTON_CLICKED,
              AnalyticsEntityId.workspace(
                workspace?.id,
                'string',
                'workspace_id'
              ),
              AnalyticsEntityId.user(selectedUserId, 'user_id')
            ),
            purchase_type: options.purchaseType,
            source: options.source,
            workspace_type: workspace?.type,
            member_role: memberRole,
          },
          () => {
            window.location.href = `${LOOM_PROD_URI}${CONTACT_SALES}`;
          }
        );
      },
    };
  }

  if (options.purchaseType === 'add-on-only') {
    return {
      onClick: () => {
        if (atlassianManagedWorkspace) {
          paywallRequest('loom-ai', {
            analyticEvent: REQUEST_AI_MODAL_OPENED,
            source: options.source,
          });
          options.onCloseClick?.();
        } else {
          analytics.track(LOOM_AI_UPGRADE_BUTTON_CLICKED, {
            ...withIdentifiers(
              LOOM_AI_UPGRADE_BUTTON_CLICKED,
              AnalyticsEntityId.workspace(
                workspace?.id,
                'string',
                'workspace_id'
              ),
              AnalyticsEntityId.user(selectedUserId, 'user_id')
            ),
            purchase_type: options.purchaseType,
            source: options.source,
            workspace_type: workspace?.type,
            member_role: memberRole,
          });
          openModal({
            modalType: 'PURCHASE_AI_MODAL',
            options: { source: options.source },
          });
          options.onCloseClick?.();
        }
      },
    };
  }

  if (options.purchaseType === 'has-ai-addon') {
    return {
      onClick: () => {
        analytics.track(LOOM_AI_UPGRADE_BUTTON_CLICKED, {
          ...withIdentifiers(
            LOOM_AI_UPGRADE_BUTTON_CLICKED,
            AnalyticsEntityId.workspace(
              workspace?.id,
              'string',
              'workspace_id'
            ),
            AnalyticsEntityId.user(selectedUserId, 'user_id')
          ),
          purchase_type: options.purchaseType,
          source: options.source,
          workspace_type: workspace?.type,
          member_role: memberRole,
        });

        options.onCloseClick && options.onCloseClick();
      },
    };
  }

  // if we got here the purchase type is 'with-base-plan'
  return {
    onClick: () => {
      analytics.track(
        LOOM_AI_UPGRADE_BUTTON_CLICKED,
        {
          ...withIdentifiers(
            LOOM_AI_UPGRADE_BUTTON_CLICKED,
            AnalyticsEntityId.workspace(
              workspace?.id,
              'string',
              'workspace_id'
            ),
            AnalyticsEntityId.user(selectedUserId, 'user_id')
          ),
          purchase_type: options.purchaseType,
          source: options.source,
          workspace_type: workspace?.type,
          member_role: memberRole,
        },
        async () => {
          if (options.onCloseClick) {
            await options.onCloseClick();
          }

          paywallRequest('loom-ai', {
            analyticEvent: LOOM_AI_UPGRADE_BUTTON_CLICKED,
            source: options.source,
          });
        }
      );
    },
  };
};
