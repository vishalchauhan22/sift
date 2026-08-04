import {
  SUBSCRIPTION_STATUS_ACTIVE,
  SUBSCRIPTION_STATUS_CANCELED,
  SUBSCRIPTION_STATUS_INCOMPLETE,
  SUBSCRIPTION_STATUS_INCOMPLETE_EXPIRED,
  SUBSCRIPTION_STATUS_PAST_DUE,
  SUBSCRIPTION_STATUS_TRIALING,
} from '@loomhq/billing-core/constant';
import { MILLISECONDS_TO } from '@loomhq/shared-utilities/constants/units';

import { safeDateFormat } from '../datetime';

import { GetWorkspaceBillingDetailsQuery } from '@js/common/billing/getWorkspaceBillingDetails.generated';

export type BillingDetails =
  | NonNullable<GetWorkspaceBillingDetailsQuery['billing']>['billing_details']
  | null;

export const isTrialing = (billingDetails?: BillingDetails): boolean => {
  const plan = billingDetails?.plan;

  if (!plan) {
    return false;
  }

  return plan.current_status === SUBSCRIPTION_STATUS_TRIALING;
};

export const isActive = (billingDetails?: BillingDetails): boolean => {
  const plan = billingDetails?.plan;

  if (!plan) {
    return false;
  }

  return plan.current_status === SUBSCRIPTION_STATUS_ACTIVE;
};

export const isPastDue = (billingDetails?: BillingDetails): boolean => {
  const plan = billingDetails?.plan;

  if (!plan) {
    return false;
  }

  return plan.current_status === SUBSCRIPTION_STATUS_PAST_DUE;
};

export const isCancelled = (billingDetails?: BillingDetails): boolean => {
  const plan = billingDetails?.plan;

  if (!plan) {
    return false;
  }

  return plan.current_status === SUBSCRIPTION_STATUS_CANCELED;
};

export const paymentFailed = (billingDetails?: BillingDetails): boolean => {
  const plan = billingDetails?.plan;

  if (!plan) {
    return false;
  }

  const currentStatus = plan.current_status;

  return (
    currentStatus === SUBSCRIPTION_STATUS_INCOMPLETE ||
    currentStatus === SUBSCRIPTION_STATUS_INCOMPLETE_EXPIRED
  );
};

export const cancelAtPeriodEnd = (billingDetails?: BillingDetails): boolean => {
  const billing_period = billingDetails?.billing_period;

  if (!billing_period) {
    return false;
  }

  return Boolean(billing_period?.cancel_at_period_end);
};

export const willBeActive = (billingDetails?: BillingDetails): boolean => {
  return isTrialing(billingDetails) && !cancelAtPeriodEnd(billingDetails);
};

/**
 * Pure trial is a trial that is not associated with a payment method.
 * These users will be downgraded to the free tier after the trial ends.
 */
export const isPureTrial = (billingDetails?: BillingDetails): boolean => {
  return Boolean(billingDetails?.plan?.pure_trial);
};

export function getDaysLeftInTrialFromBillingDetails(
  billingDetails?: BillingDetails
): number {
  if (!billingDetails) {
    return 0;
  }

  const periodEnd = billingDetails?.billing_period?.period_end;
  const periodEndDate = periodEnd ? new Date(periodEnd) : new Date();
  const daysLeft = Math.ceil(
    (periodEndDate.getTime() - Date.now()) / MILLISECONDS_TO.DAY
  );

  return daysLeft;
}

export function getNextBillingDateString(
  billingDetails: BillingDetails
): string {
  const periodEnd = billingDetails?.billing_period?.period_end;

  if (!periodEnd) {
    return '';
  }

  return safeDateFormat(periodEnd, 'MMM d, yyyy');
}

export function isWorkspaceTrialing(
  billingDetails: BillingDetails,
  frozenTime: number | undefined
): boolean {
  if (!billingDetails?.billing_period?.trial_end) {
    return false;
  }

  return frozenTime
    ? billingDetails.billing_period.trial_end > frozenTime
    : billingDetails.billing_period.trial_end > Date.now();
}
