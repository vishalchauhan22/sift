import { getIdentifier } from '@js/utilities/entity';
import { raise } from '@js/utilities/error';

import { getProductGrants } from '@loomhq/billing-core/utility';

import type Stripe from 'stripe';

interface SimplifiedPhase {
  start_date: number;
  end_date: number;
  products: string[];
  interval: Stripe.Price.Recurring.Interval | null;
  grants: Array<ReturnType<typeof getProductGrants>>;
}

function formatSimplifiedPhase(
  phase: Stripe.SubscriptionSchedule.Phase
): SimplifiedPhase {
  let interval: Stripe.Price.Recurring.Interval | null = null;

  const grants = phase.items.map(item => {
    const price = item.price;

    if (typeof price === 'string') {
      raise('price is a string');
    }

    if (price.deleted) {
      raise('price is deleted');
    }

    interval = price.recurring?.interval ?? null;

    return getProductGrants(getIdentifier(price.product));
  });

  const products = new Set<string>();

  grants.forEach(grant => {
    grant.base && products.add(grant.base);
    grant.addon && products.add(grant.addon);
  });

  return {
    start_date: phase.start_date,
    end_date: phase.end_date,
    products: Array.from(products),
    interval,
    grants,
  };
}

export function summarizeSchedule({
  schedule,
  unixDate,
}: {
  schedule: Stripe.SubscriptionSchedule;
  unixDate: number;
}): {
  currentPhase: SimplifiedPhase | null;
  nextPhase: SimplifiedPhase | null;
} {
  const currentPhase = schedule.current_phase
    ? schedule.phases.find(
        phase => phase.start_date <= unixDate && phase.end_date >= unixDate
      )
    : null;
  const nextPhase = schedule.phases.find(phase => phase.start_date > unixDate);

  return {
    currentPhase: currentPhase ? formatSimplifiedPhase(currentPhase) : null,
    nextPhase: nextPhase ? formatSimplifiedPhase(nextPhase) : null,
  };
}
