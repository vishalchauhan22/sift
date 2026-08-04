const toJsonBlob = require('./to-json-blob');

const isStaging = process.env.NODE_ENV === 'staging';
const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

/**
 *
 * @param {object} metrics
 * @param {Array<import('..').MetricIncrement>} metrics.increments
 * @param {Array<import('..').MetricGauge>} metrics.gauges
 * @param {Array<import('..').MetricDistribution>} metrics.distributions
 * @param {Array<import('..').MetricHistogram>} metrics.histograms
 */
function sendMetricsBeacon({
  increments = [],
  gauges = [],
  distributions = [],
  histograms = [],
}) {
  let url = 'https://www.loom.com/metrics/graphql';

  if (isStaging || isTest) {
    url = 'https://stage.loom.com/metrics/graphql';
  }

  if (isDev) {
    url = 'https://loomlocal.com:6391/metrics/graphql';
  }

  const body = {
    operationName: 'EmitDatadogEvents',
    variables: {
      gauge: gauges.map(formatMetric),
      increment: increments.map(formatMetric),
      distribution: distributions.map(formatMetric),
      histogram: histograms.map(formatMetric),
    },
    query: `mutation EmitDatadogEvents(
      $increment: [DatadogIncrementInput!]!
      $gauge: [DatadogGuageInput!]!
      $distribution: [DatadogDistributionInput!]!
      $histogram: [DatadogHistogramInput!]!
    ) {
      emitDatadogEvents(increment: $increment, gauge: $gauge, distribution: $distribution, histogram: $histogram) {
        ... on EmitDatadogEventsPayload {
          success
          message
          __typename
        }
        __typename
      }
    }`,
  };

  let beaconSucceeded = false;

  try {
    beaconSucceeded =
      window.navigator.sendBeacon?.call(
        window.navigator,
        url,
        toJsonBlob(body),
      ) ?? false;
  } finally {
    if (!beaconSucceeded) {
      window.fetch(url, {
        method: 'POST',
        body: toJsonBlob(body),
      });
    }
  }
}

/**
 * @param {import('..').DataDogMetric} metric
 * @returns {{keyName: string, count?: number; value?: number | string; tags: Array<{key: string, value: string}> }}
 */
function formatMetric(metric) {
  const event = {
    keyName: `frontend.${metric.name}`,
  };

  if (metric.value !== null && metric.value !== undefined) {
    event.value = metric.value;
  }

  if (metric.count !== null && metric.count !== undefined) {
    event.count = metric.count;
  }

  if (metric.tags) {
    event.tags = [];

    Object.entries(metric.tags || {})
      .filter(([key, value]) => {
        return (
          key !== null &&
          key !== undefined &&
          value !== null &&
          value !== undefined
        );
      })
      .forEach(([key, value]) => {
        event.tags.push({ key, value: value.toString() });
      });
  }

  return event;
}

module.exports = sendMetricsBeacon;
