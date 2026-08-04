const toJsonBlob = require('./to-json-blob');

const DEFAULT_MAX_BYTE_SIZE = 1024 * 48; // 48KB
const DEFAULT_FLUSH_INTERVAL = 10000; // 10 seconds

class MetricsQueue {
  /**
   *
   * @param {object} options
   * @param {number} options.flushInterval
   * @param {number} options.maxByteSize
   * @param {(metrics: { increments: Metric[], gauges: Metric[], distributions: Metric[]  }) => void} options.onFlush
   */
  constructor(options = {}) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onFlush = options.onFlush || (() => {});
    this.maxByteSize = options.maxByteSize || DEFAULT_MAX_BYTE_SIZE;
    this.flushInterval = options.flushInterval || DEFAULT_FLUSH_INTERVAL;

    this.flushTimeout = null;
    this.increments = [];
    this.gauges = [];
    this.distributions = [];
    this.histograms = [];
    this.size = 0;

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });
  }

  /**
   *
   * @param {object} metrics
   * @param {Array<import('..').MetricIncrement>} metrics.increments
   * @param {Array<import('..').MetricGauge>} metrics.gauges
   * @param {Array<import('..').MetricDistribution>} metrics.distributions
   * @param {Array<import('..').MetricHistogram>} metrics.histograms
   */
  add({ increments = [], gauges = [], distributions = [], histograms = [] }) {
    let size = 0;

    if (increments.length > 0) {
      size += toJsonBlob(increments).size;
    }

    if (gauges.length > 0) {
      size += toJsonBlob(gauges).size;
    }

    if (distributions.length > 0) {
      size += toJsonBlob(distributions).size;
    }

    if (histograms.length > 0) {
      size += toJsonBlob(histograms).size;
    }

    if (size === 0) {
      return;
    }

    if (this.size + size >= this.maxByteSize) {
      this.flush();
    }

    this.increments.push(...increments);
    this.gauges.push(...gauges);
    this.distributions.push(...distributions);
    this.histograms.push(...histograms);
    this.scheduleFlush();
  }

  flush() {
    clearTimeout(this.flushTimeout);
    this.flushTimeout = null;

    if (
      this.increments.length ||
      this.gauges.length ||
      this.distributions.length ||
      this.histograms.length
    ) {
      this.onFlush({
        increments: this.increments,
        gauges: this.gauges,
        distributions: this.distributions,
        histograms: this.histograms,
      });
      this.increments = [];
      this.gauges = [];
      this.distributions = [];
      this.histograms = [];
      this.size = 0;
    }

    this.scheduleFlush();
  }

  scheduleFlush() {
    if (!this.flushTimeout) {
      this.flushTimeout = setTimeout(() => this.flush(), this.flushInterval);
    }
  }

  destroy() {
    clearTimeout(this.flushTimeout);
    this.flushTimeout = null;
    this.increments = [];
    this.gauges = [];
    this.distributions = [];
    this.histograms = [];
    this.size = 0;
  }
}

module.exports = MetricsQueue;
