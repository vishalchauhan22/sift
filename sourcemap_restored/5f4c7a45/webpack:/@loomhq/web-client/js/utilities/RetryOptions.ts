export interface RetryOptions {
  retries: number;
  interval: number | ((retries: number, failures: number) => number);
  failures?: number;
  onRetry?: () => void;
}

export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  retries: 5,
  interval: (_, failures) => 100 * (failures || 1) * 2,
};
