import {
  sendIncrementMetric,
  sendDistributionMetric,
  sendHistogramMetric,
} from '@loomhq/loom-js-statsd/frontend';

export const incrementMetric = (name: string, tags = {}): void => {
  sendIncrementMetric({ name, tags, count: 1 });
};

export const distributionMetric = (
  name: string,
  value: string | number,
  tags = {}
): void => {
  sendDistributionMetric({ name, tags, value });
};

export const histogramMetric = (
  name: string,
  value: string | number,
  tags = {}
): void => {
  sendHistogramMetric({ name, tags, value });
};
