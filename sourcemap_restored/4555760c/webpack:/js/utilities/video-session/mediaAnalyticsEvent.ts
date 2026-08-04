import { getGraphQlClientInsights } from '@js/utilities/graphql';

import CtaClick from './ctaClick.graphql';
import DownloadClick from './downloadClick.graphql';

let client;

export function trackCtaClick(
  videoId: string,
  sessionId: string,
  anonName?: string
): void {
  sendMutation(CtaClick, { videoId, sessionId, anonName });
}

export function trackDownloadClick(videoId: string, sessionId?: string): void {
  sendMutation(DownloadClick, { videoId, sessionId });
}

function sendMutation(mutation, variables) {
  if (!client) {
    client = getGraphQlClientInsights();
  }

  client.mutate({
    mutation,
    variables,
  });
}
