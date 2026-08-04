import saveAs from 'file-saver';
import * as logger from '@js/utilities/loggerx';

const confirmExitPage = (ev: {
  preventDefault: () => void;
  returnValue: string;
}) => {
  ev.preventDefault();

  const warningMessage =
    'Loom is still downloading. Are you sure you want to leave?';

  ev.returnValue = warningMessage;

  return warningMessage;
};

class DownloadProgressUtil {
  private onProgressCallback: (progress: number) => void;
  private onCompletedCallback: () => void;
  private onErrorCallback: () => void;
  private time: number;
  private downloadData?: Blob;
  private fileName?: string;
  private timerInterval?: NodeJS.Timeout;
  private request?: XMLHttpRequest;

  constructor(
    onProgressCallback: (progress: number) => void,
    onCompletedCallback: () => void,
    onErrorCallback: () => void
  ) {
    this.onProgressCallback = onProgressCallback;
    this.onCompletedCallback = onCompletedCallback;
    this.onErrorCallback = onErrorCallback;
    this.time = 0;
  }

  setTime = (): void => {
    this.time = this.time || 0;
    this.time++;
  };

  onProgress = (ev: ProgressEvent<XMLHttpRequestEventTarget>): void => {
    const percentProgress = (ev.loaded * 100) / ev.total;
    const roundedProgress = Math.floor(percentProgress);

    this.onProgressCallback(roundedProgress);
  };

  onLoad = (ev: ProgressEvent<XMLHttpRequestEventTarget>): void => {
    const target = ev.target;

    if (target && target instanceof XMLHttpRequest) {
      const type = target.getResponseHeader('Content-Type');
      const blob = new Blob([target.response], { type: type ?? undefined });

      this.downloadData = blob;

      clearInterval(this.timerInterval);

      window.removeEventListener('beforeunload', confirmExitPage);

      this.onCompletedCallback();
    }
  };

  onError = (): void => {
    this.cleanup();
    this.onErrorCallback();
  };

  fetch = (url = '', filename: string | null = null): void => {
    this.fileName = filename || url.split('/').pop();

    this.request && this.request.abort();

    this.request = new XMLHttpRequest();

    this.request.addEventListener('progress', this.onProgress);
    this.request.addEventListener('load', this.onLoad);
    this.request.addEventListener('error', this.onError);

    window.addEventListener('beforeunload', confirmExitPage);

    this.request.open('GET', url);

    this.request.responseType = 'blob';

    this.request.send();

    clearInterval(this.timerInterval);

    this.time = 0;
    this.timerInterval = setInterval(this.setTime, 1000);
  };

  abort = (): void => {
    this.request && this.request.abort();
    this.cleanup();
  };

  cleanup = (): void => {
    this.request = undefined;
    this.fileName = undefined;
    this.downloadData = undefined;

    clearInterval(this.timerInterval);

    window.removeEventListener('beforeunload', confirmExitPage);
  };

  save = (): void => saveAs(this.downloadData, this.fileName);
}

let downloadManager: DownloadProgressUtil;

export function abortDownload(): void {
  if (downloadManager) {
    logger.info('Abort download', {});
    downloadManager.abort();
  }
}

export function saveDownload(): void {
  if (downloadManager) {
    logger.info('Saving download', {});
    downloadManager.save();
  }
}

type CallbackParams = {
  onProgress: (number) => void;
  onCompleted: () => void;
  onError: () => void;
};

export function createDownload(
  url: string,
  name: string,
  { onProgress, onCompleted, onError }: CallbackParams
): void {
  downloadManager = new DownloadProgressUtil(onProgress, onCompleted, onError);

  downloadManager.fetch(url, name);
}
