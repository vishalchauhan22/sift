const MetricsQueue = require('./lib/metrics-queue');
const sendMetricsBeacon = require('./lib/send-metrics-beacon');

const isTest = process.env.NODE_ENV === 'test';
const metricsQueue = new MetricsQueue({ onFlush: sendMetricsBeacon });

/**
 *
 * @param {object} options
 * @param {Array<import('.').MetricIncrement>} options.increments
 * @param {Array<import('.').MetricGauge>} options.gauges
 * @param {Array<import('.').MetricDistribution>} options.distributions
 * @returns {boolean}
 */
function sendMetrics({ increments = [], gauges = [], distributions = [] }) {
  metricsQueue.add({ increments, gauges, distributions });
}

/**
 * @description Send a frontend observability metric as a DataDog "increment"
 * @param {import('.').MetricIncrement} metric
 */
function sendIncrementMetric(metric) {
  metricsQueue.add({ increments: [metric] });
}

/**
 * @description Send a frontend observability metric as a DataDog "gauge"
 * @param {import('.').MetricGauge} metric
 */
function sendGaugeMetric(metric) {
  metricsQueue.add({ gauges: [metric] });
}

/**
 * @description Send a frontend observability metric as a DataDog "distribution"
 * @param {import('.').MetricDistribution} metric
 */
function sendDistributionMetric(metric) {
  metricsQueue.add({ distributions: [metric] });
}

/**
 * @description Send a frontend observability metric as a DataDog "histogram"
 * @param {import('.').MetricHistogram} metric
 */
function sendHistogramMetric(metric) {
  metricsQueue.add({ histograms: [metric] });
}

/**
 * @description Flush any pending metrics to the backend
 */
function flushPendingMetrics() {
  metricsQueue.flush();
}

module.exports = {
  sendMetrics,
  sendIncrementMetric,
  sendGaugeMetric,
  sendDistributionMetric,
  sendHistogramMetric,
  flushPendingMetrics,
  metricsQueue: isTest ? metricsQueue : undefined,
};
