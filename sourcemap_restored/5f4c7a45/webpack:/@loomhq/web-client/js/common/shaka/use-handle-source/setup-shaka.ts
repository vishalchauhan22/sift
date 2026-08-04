import {
  AVSERVER_SEGMENT_SPLITTING,
  SHAKA_RESPONSE_LOGGING,
} from '@loomhq/shared-utilities/constants/featureFlag';
import {
  STATUS_OK,
  STATUS_PARTIAL_CONTENT,
} from '@loomhq/shared-utilities/constants/http';
import { Feature } from '@loomhq/shared-utilities/constants/product';
import {
  createShakaInstance,
  ShakaError,
  ShakaErrorDetail,
  ShakaInstance,
  ShakaPlayerConfiguration,
  VideoStreamingMimeTypeCopy,
} from '@js/common/shaka';
import {
  MANIFEST,
  MEDIA_ERR_DECODE,
  MEDIA_ERR_SRC_NOT_SUPPORTED,
  SEGMENT,
} from '@js/common/shaka/constants';
import { ShakaErrorDetailData } from '@js/common/shaka/types';
import { Player, Video } from '@js/common/video-player';
import UAParser from 'ua-parser-js';

import {
  ERROR_CATEGORIES,
  getCurrentPageName,
  PLAYER_EVENTS,
  ReportPlayerDistributionFn,
  ReportPlayerEventFn,
} from '@js/components/video-player-fresh/playback/events';
import { PlayerLogTypes } from '@js/components/video-player-fresh/playerLogTypes';
import {
  configureBufferingGoal,
  destroyMseTech,
} from '@js/components/video-player-fresh/utils';
import {
  getLogTypesByMimeType,
  getRoundedTs,
  makePushPlayerLogs,
  parseCacheHeaderString,
  PLAYER_LOG_SLICE,
  playerDistributionMetric,
} from '@js/components/video-player-fresh/utils/player-logging';
import { VideoSource } from '@js/components/video-player-fresh/video-source/useVideoSource';
import { getFlagValueForUser } from '@js/utilities/featureFlag';
import * as loggerx from '@js/utilities/loggerx';
import { isPolicyExpired } from '@js/utilities/part-credentials';

import { SuccessMarkers } from '@js/utilities/rum/constants';

import { getLoomBrowserSupportedMimeTypes } from '@js/utilities/video-supported-mime';
import { ControlType } from '@loomhq/shared-utilities/constants/statsig';

type SetupShakaProps = {
  mimeType: VideoStreamingMimeTypeCopy;
  player: Player;
  video: Video;
  source: VideoSource;
  onUnrecoverableError: () => void;
  preload: boolean;
  reportPlayerEvent: ReportPlayerEventFn;
  reportPlayerDistribution: ReportPlayerDistributionFn;
  abrConfig?: ShakaPlayerConfiguration['abr'];
  markSuccess: (markerName: string) => void;
  isLoggedIn: boolean;
};

// Sometimes Chrome suspends a tab and reloads the player without fetching the resource creds.
// In this case, reload the tab to re-fetch the credentials needed for the resource.
const refreshIfPolicyExpired = (source: VideoSource): boolean => {
  if (
    source.partCredentials &&
    source.partCredentials.Policy &&
    isPolicyExpired(source.partCredentials.Policy)
  ) {
    location.reload();

    return true;
  }

  return false;
};

const makeUserAgentInfo = (): Record<string, string> => {
  const parser = new UAParser(window.navigator.userAgent);
  const uaResult = parser.getResult();
  return {
    UAInfo: uaResult,
    UABrowserName: uaResult.browser.name || '',
  };
};

//Based on the enums here https://github.com/faisalman/ua-parser-js/blob/master/src/enums/ua-parser-enums.js
//supporting all desktop browsers, mobile apps, and moble views (i.e., webview and webkit)
const supportedBrowsers = [
  'Chrome',
  'Firefox',
  'Safari',
  'Edge',
  'Mobile Safari',
  'Chrome WebView',
  'Mobile Chrome',
  'Mobile Firefox',
  'Edge WebView',
  'Edge WebView2',
  'Webkit',
];

const isSupportedBrowser = (browserName: string): boolean => {
  return supportedBrowsers.includes(browserName) || browserName.length === 0;
};

const getMediaErrorCodeMessage = (code: ShakaErrorDetailData): string => {
  //https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code#media_error_code_constants
  switch (code) {
    case 3:
      return MEDIA_ERR_DECODE;
    case 4:
      return MEDIA_ERR_SRC_NOT_SUPPORTED;
    default:
      return code.toString();
  }
};

const getNetworkingRequestTypeMessage = (
  code: ShakaErrorDetailData
): string => {
  //https://shaka-player-demo.appspot.com/docs/api/shaka.net.NetworkingEngine.html#.RequestType
  switch (code) {
    case 0:
      return MANIFEST;
    case 1:
      return SEGMENT;
    default:
      return code.toString();
  }
};

const getShakaPlayerErrorLogMessage = (
  code: number,
  data: ShakaErrorDetailData[] | undefined
): string => {
  //https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html
  if (code === VIDEO_ERROR_CODE) {
    return data && data.length >= 3
      ? ':' + (data[2] || getMediaErrorCodeMessage(data[0]))
      : '';
  } else if (code === MEDIA_SOURCE_OPERATION_FAILED_CODE) {
    return data && data.length >= 2
      ? ':' + getMediaErrorCodeMessage(data[0])
      : '';
  } else if (code >= BAD_HTTP_STATUS_CODE && code <= TIMEOUT_CODE) {
    const i = HTTP_ERROR_CODES[code];
    return data && data.length > i
      ? ':' + getNetworkingRequestTypeMessage(data[i])
      : '';
  }
  return (data?.length ?? 0) >= 3 ? ':' + data?.[2] : '';
};

const truncateErrorMessage = (
  code: number,
  errorMessage: string
): string | undefined => {
  let truncatedMessage;
  if (
    code === VIDEO_ERROR_CODE ||
    code === MEDIA_SOURCE_OPERATION_FAILED_CODE
  ) {
    const splitMessage = getMediaErrorCodeMessage(errorMessage).split(':');
    if (splitMessage.length > 1) {
      truncatedMessage = splitMessage[1];
    } else {
      truncatedMessage = getMediaErrorCodeMessage(errorMessage);
    }
  }
  return truncatedMessage;
};

const MAX_ERROR_RETRIES = 5;
const STALE_TAB_ERROR_CODES = [1001, 4012];
const VIDEO_ERROR_CODE = 3016;
const MEDIA_SOURCE_OPERATION_FAILED_CODE = 3014;
const BAD_HTTP_STATUS_CODE = 1001;
const TIMEOUT_CODE = 1003;
const HTTP_ERROR_CODES = {
  1001: 4,
  1002: 2,
  1003: 3,
};

//Shaka 7xxx codes are not actionable
const isLoomErrorCode = (code: number): boolean => {
  return !(code >= 7000 && code < 8000);
};

export function setupShaka({
  mimeType,
  player,
  video,
  source,
  onUnrecoverableError,
  preload,
  reportPlayerEvent,
  reportPlayerDistribution,
  abrConfig,
  markSuccess,
  isLoggedIn,
}: SetupShakaProps): void {
  const {
    logTypeLoadError,
    logTypeInit,
    logTypeFragmentLoaded,
    logTypeBuffering,
    logTypeSetupError,
    logTypePlaybackError,
    logTypePlaybackErrorMax,
    logTypeStreamingError,
    logTypeStreamingErrorMax,
  } = getLogTypesByMimeType(mimeType);
  const uaInfo = makeUserAgentInfo();
  const videoId = video.modelId ?? video.id;

  const pushPlayerLogs = makePushPlayerLogs(player);

  const sourceUrl = source.sourceUrl;
  let streamingRetries = 0;
  let loadRetries = 0;
  let playbackRetries = 0;
  let hasAlreadyFatalyErrored = false;
  let bufferStartTime: number | null = null;
  const uniqueShakaErrors = new Set();

  const onLoadError = async (error: ShakaErrorDetail) => {
    // WARNING: these errors are not bubbled up!
    const { code, severity, data } = error;

    if (
      STALE_TAB_ERROR_CODES.includes(code) &&
      refreshIfPolicyExpired(source)
    ) {
      return;
    }

    const supportedMimeTypesReturnedValue = getLoomBrowserSupportedMimeTypes();
    let browserSupportedMimeTypes;
    if (Array.isArray(supportedMimeTypesReturnedValue)) {
      browserSupportedMimeTypes = supportedMimeTypesReturnedValue;
    } else {
      browserSupportedMimeTypes = await supportedMimeTypesReturnedValue;
    }

    const context = {
      errorCode: `load:${code}${
        (data?.length ?? 0) >= 3 ? ':' + data?.[2] : ''
      }`,
      videoType: mimeType,
      loadError: true,
      uaInfo: uaInfo.UAInfo,
      sourceUrl: source.sourceUrl,
      browserSupportedMimeTypes,
      recordingVersion: video.videoProperties.recordingVersion,
      isLoomErrorCode: isLoomErrorCode(code),
    };

    if (!isSupportedBrowser(uaInfo.UABrowserName)) {
      loggerx.info('Shaka error for unsupported browser', {
        ...context,
        videoId,
      });
      return;
    }

    const tags = {
      ...context,
      feature: Feature.VideoPlayer,
      // Leaving videoId out of `context` because of its high cardinality
      videoId,
      page: getCurrentPageName(),
    };

    // Recoverable errors
    if (severity === 1) {
      pushPlayerLogs(`${logTypeLoadError}:${PlayerLogTypes.skip}`, error);

      reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
        errorCode: code,
        errorCategory: ERROR_CATEGORIES.LOAD,
        fatal: false,
        hasComposition: sourceUrl.includes('-composition-'),
      });

      return;
    }

    if (loadRetries < MAX_ERROR_RETRIES) {
      // We can still retry to try to get the load call working, so let's retry.
      loadRetries++;
      pushPlayerLogs(`${logTypeLoadError}:${PlayerLogTypes.retryLoad}`, {
        error,
        code: error.code,
        loadRetries,
      });
      // Destroy the existing Shaka player if it's there
      destroyMseTech(player).then(() =>
        // Create a new one!
        createShaka()
      );
      reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
        errorCode: code,
        errorCategory: ERROR_CATEGORIES.LOAD,
        fatal: false,
        first: !uniqueShakaErrors.has(context.errorCode),
        hasComposition: sourceUrl.includes('-composition-'),
      });
      uniqueShakaErrors.add(code);

      return;
    }

    destroyMseTech(player);

    pushPlayerLogs(`${logTypeLoadError}:${PlayerLogTypes.switchToMP4}`, error);

    const errorObject = {
      error,
      logsCount: player.logs.length,
      lastLogs: player.logs.slice(PLAYER_LOG_SLICE),
      errorData: error?.data,
      roundedTs: getRoundedTs(),
    };

    const errorLogMessage = getShakaPlayerErrorLogMessage(code, data);
    const errorMessage = `[Shaka Player Error] ${code}${errorLogMessage}`;
    loggerx.error(Error(errorMessage), errorObject, tags);
    const truncatedErrorMessage = truncateErrorMessage(code, errorLogMessage);

    // The player already errored out fatally, we don't want to track errors twice to protect our dashboard
    // success rate is calculated on dash.loading & dash.errored.{fatal: true}
    if (!hasAlreadyFatalyErrored) {
      reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
        errorCode: code,
        errorCategory: ERROR_CATEGORIES.LOAD,
        errorMessage,
        truncatedErrorMessage,
        fatal: true,
        first: !uniqueShakaErrors.has(context.errorCode),
        isLoomErrorCode: isLoomErrorCode(code),
        hasComposition: sourceUrl.includes('-composition-'),
      });
      uniqueShakaErrors.add(context.errorCode);

      hasAlreadyFatalyErrored = true;
    }

    onUnrecoverableError();
  };

  pushPlayerLogs(logTypeInit, {
    manifestUrl: sourceUrl,
    partCredentials: source.partCredentials,
    videoElement: player.media,
    canPlayWebm:
      (document.createElement('video').canPlayType &&
        document.createElement('video').canPlayType('video/webm')) ||
      'yes',
  });

  const createShaka = () => {
    reportPlayerEvent(PLAYER_EVENTS.LOADING_STARTED);

    try {
      const shaka: ShakaInstance = createShakaInstance({
        manifestUrl: sourceUrl,
        partCredentials: source.partCredentials,
        videoElement: player.media,
        onLoadError,
        preload,
        mimeType,
        abrConfig,
      });

      player.mseTech = shaka;

      shaka.getNetworkingEngine().registerResponseFilter((_t, res) => {
        if (res.fromCache) {
          return;
        }

        const duration = res.timeMs;
        const resHeaders = res.headers;

        const cacheHeader = parseCacheHeaderString(resHeaders['x-cache']);

        pushPlayerLogs(logTypeFragmentLoaded, res);

        reportPlayerDistribution(PLAYER_EVENTS.FRAGMENT_LOAD_TIME, duration, {
          cacheHeader,
        });
      });

      //log non-ok Shaka responses from AVServer
      shaka
        .getNetworkingEngine()
        .registerResponseFilter(async (_type, response): Promise<void> => {
          if (
            response.status === STATUS_OK ||
            response.status === STATUS_PARTIAL_CONTENT
          ) {
            return;
          }
          const shouldLog = await getFlagValueForUser({
            flag: SHAKA_RESPONSE_LOGGING,
            controlType: ControlType.STATSIG_FEATURE_GATE,
          });
          if (!shouldLog) {
            return;
          }
          loggerx.info('Non-ok Shaka Response', {
            statusCode: response.status,
            videoId,
            recordingVersion: video.videoProperties.recordingVersion,
            mimeType,
            uri: response.uri,
            sourceUrl,
          });
        });

      if (!preload) {
        configureBufferingGoal(player);
      }

      shaka.addEventListener('loaded', () => {
        reportPlayerEvent(PLAYER_EVENTS.READY);
      });

      shaka.addEventListener('manifestparsed', () => {
        player.listenToResolutionVariantEvents(); // Needed in order to show quality selector options
      });

      shaka.addEventListener('streaming', () => {
        markSuccess(SuccessMarkers.Streaming);
      });

      shaka.addEventListener('adaptation', () => {
        const variantTracks = shaka.getVariantTracks();
        const sortedRenditionBandwidths = variantTracks
          .sort((a, b) => b.bandwidth - a.bandwidth)
          .map(rendition => rendition.bandwidth);
        const shakaStats = shaka.getStats();

        if (
          sortedRenditionBandwidths.length > 0 &&
          shakaStats.switchHistory.length === 1
        ) {
          if (variantTracks[0].videoMimeType === 'video/mp2t') {
            reportPlayerEvent('frontend.rendition.selectedRendition', {
              selected_rendition: shakaStats.switchHistory[0].bandwidth / 1000,
              max_bandwidth: sortedRenditionBandwidths[0] / 1000,
            });
          }

          const renditionPosition =
            sortedRenditionBandwidths.indexOf(
              shakaStats.switchHistory[0].bandwidth
            ) + 1;

          reportPlayerEvent('frontend.rendition.selectedRenditionPosition', {
            rendition_position: renditionPosition,
            rendition_count: sortedRenditionBandwidths.length,
          });
        }
      });

      shaka
        .getNetworkingEngine()
        .registerResponseFilter(function func(_, request) {
          if (request.uri) {
            let segmentIndex = '';

            if (
              request.uri.includes('video') &&
              request.uri.includes('-0a.ts')
            ) {
              segmentIndex = '0a';
              player.isSplitSegment = true;
            } else if (
              request.uri.includes('video') &&
              request.uri.includes('-0.ts')
            ) {
              segmentIndex = '0';
            }

            if (segmentIndex && request.timeMs) {
              markSuccess(SuccessMarkers.FirstSegmentDownloadFinished);
              getFlagValueForUser({ flag: AVSERVER_SEGMENT_SPLITTING }).then(
                avserverSegmentSplitting => {
                  playerDistributionMetric(
                    'frontend.perf.firstSegmentHlsLatency',
                    request.timeMs,
                    {
                      segmentIndex,
                      AVSERVER_SEGMENT_SPLITTING: avserverSegmentSplitting,
                      ANONYMOUS: !isLoggedIn,
                      recordingVersion: video.videoProperties.recordingVersion,
                    }
                  );

                  playerDistributionMetric(
                    'frontend.perf.firstSegmentHlsRequestTime',
                    performance.now(),
                    {
                      segmentIndex,
                      AVSERVER_SEGMENT_SPLITTING: avserverSegmentSplitting,
                      ANONYMOUS: !isLoggedIn,
                      recordingVersion: video.videoProperties.recordingVersion,
                    }
                  );
                }
              );
            }
          }
        });

      shaka.addEventListener('downloadfailed', evt => {
        if (evt.error.data[1] === 404 && evt.error.data[0].includes('video')) {
          loggerx.error(
            `404 received for player video segment request`,
            {
              videoId,
              split_segment_ttl: video.processingInformation?.splitSegmentTtl,
              uri: evt.error.data[0],
            },
            {
              videoId,
              feature: Feature.VideoPlayer,
              uri: evt.error.data[0],
            }
          );
        }
      });

      shaka.addEventListener('buffering', evt => {
        const time = performance.now();

        if (evt.buffering && player.isWaiting && player.currentTime > 0) {
          // Save the time when the buffering started
          if (!bufferStartTime) {
            bufferStartTime = time;
          }

          reportPlayerEvent(PLAYER_EVENTS.BUFFERING);
        }

        if (!evt.buffering && bufferStartTime) {
          reportPlayerDistribution(
            PLAYER_EVENTS.BUFFERING_TIME,
            performance.now() - bufferStartTime
          );
          bufferStartTime = null;
        }

        pushPlayerLogs(logTypeBuffering, evt);
      });

      shaka.addEventListener('error', async (error: ShakaError) => {
        const { code, severity, data } = error.detail;

        const supportedMimeTypesReturnedValue =
          getLoomBrowserSupportedMimeTypes();
        let browserSupportedMimeTypes;
        if (Array.isArray(supportedMimeTypesReturnedValue)) {
          browserSupportedMimeTypes = supportedMimeTypesReturnedValue;
        } else {
          browserSupportedMimeTypes = await supportedMimeTypesReturnedValue;
        }

        const context = {
          code,
          videoType: source.sourceMimeType,
          page: getCurrentPageName(),
          sourceUrl: source.sourceUrl,
          browserSupportedMimeTypes,
          recordingVersion: video.videoProperties.recordingVersion,
          loadError: false,
          isLoomErrorCode: isLoomErrorCode(code),
          uaInfo: uaInfo.UAInfo,
        };

        // Recoverable errors
        if (severity === 1) {
          pushPlayerLogs(`${logTypeLoadError}:${PlayerLogTypes.skip}`, error);

          reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
            errorCode: code,
            errorCategory: ERROR_CATEGORIES.PLAYBACK,
            fatal: false,
            hasComposition: sourceUrl.includes('-composition-'),
          });

          return;
        }

        if (
          STALE_TAB_ERROR_CODES.includes(code) &&
          refreshIfPolicyExpired(source)
        ) {
          return;
        }

        if (!isSupportedBrowser(uaInfo.UABrowserName)) {
          loggerx.info('Shaka error for unsupported browser', {
            ...context,
            videoId,
          });
          return;
        }

        if (playbackRetries < MAX_ERROR_RETRIES) {
          // We haven't hit the max number of playback retries, so let's retry
          playbackRetries++;

          pushPlayerLogs(logTypePlaybackError, {
            error,
            code,
            playbackRetries,
          });

          // Destroy the existing Shaka player if it's there
          destroyMseTech(player).then(() =>
            // Create a new one!
            createShaka()
          );
          reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
            errorCode: code,
            errorCategory: ERROR_CATEGORIES.PLAYBACK,
            fatal: false,
            first: !uniqueShakaErrors.has(code),
            hasComposition: sourceUrl.includes('-composition-'),
          });

          uniqueShakaErrors.add(code);

          return;
        }

        // We've hit the max, so let's not retry. Shaka will fatal at this point and we'll switch to MP4.
        pushPlayerLogs(logTypePlaybackErrorMax, {
          error,
          code,
          playbackRetries,
        });

        pushPlayerLogs(
          `${logTypeLoadError}:${PlayerLogTypes.switchToMP4}`,
          error.detail
        );

        const errorObject = {
          error: error.detail,
          errorData: error.detail?.data,
          logsCount: player.logs.length,
          lastLogs: player.logs.slice(PLAYER_LOG_SLICE),
          roundedTs: getRoundedTs(),
        };

        const errorLogMessage = getShakaPlayerErrorLogMessage(code, data);
        const errorMessage = `[Shaka Player Error] ${code}${errorLogMessage}`;
        loggerx.error(Error(errorMessage), errorObject, {
          ...context,
          videoId,
          feature: Feature.VideoPlayer,
        });
        const truncatedErrorMessage = truncateErrorMessage(
          code,
          errorLogMessage
        );

        // The player already errored out fatally, we don't want to track errors twice to protect our dashboard
        // success rate is calculated on dash.loading & dash.errored.{fatal: true}
        // https://www.loom.com/share/da1bdab2810b4cc4a634704efbb9fb76
        if (!hasAlreadyFatalyErrored) {
          reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
            errorCode: code,
            errorCategory: ERROR_CATEGORIES.PLAYBACK,
            errorMessage,
            truncatedErrorMessage,
            fatal: true,
            first: !uniqueShakaErrors.has(code),
            isLoomErrorCode: isLoomErrorCode(code),
            hasComposition: sourceUrl.includes('-composition-'),
          });

          uniqueShakaErrors.add(code);

          hasAlreadyFatalyErrored = true;
        }

        destroyMseTech(player).then(() => {
          onUnrecoverableError();
        });
      });

      shaka.configure('streaming.failureCallback', error => {
        if (error.severity === shaka.util.Error.Severity.CRITICAL) {
          if (streamingRetries < MAX_ERROR_RETRIES) {
            // We haven't hit the max number of streaming retries, so let's retry
            streamingRetries++;

            pushPlayerLogs(logTypeStreamingError, {
              error,
              code: error.code,
              streamingRetries,
            });
            shaka.retryStreaming();
            reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
              errorCode: error.code,
              errorCategory: ERROR_CATEGORIES.STREAMING,
              fatal: false,
              first: !uniqueShakaErrors.has(error.code),
              hasComposition: sourceUrl.includes('-composition-'),
            });

            uniqueShakaErrors.add(error.code);
          } else {
            // We've hit the max, so let's not retry. Shaka will fatal at this point and we'll switch to MP4.
            pushPlayerLogs(logTypeStreamingErrorMax, {
              error,
              code: error.code,
              streamingRetries,
            });
          }
        }
      });
    } catch (e) {
      pushPlayerLogs(logTypeSetupError, e);

      // The player already errored out fatally, we don't want to track errors twice to protect our dashboard
      // success rate is calculated on dash.loading & dash.errored.{fatal: true}
      if (!hasAlreadyFatalyErrored) {
        reportPlayerEvent(PLAYER_EVENTS.PLAYER_ERROR, {
          errorCategory: ERROR_CATEGORIES.SETUP,
          errorCode: -1,
          fatal: true,
          hasComposition: sourceUrl.includes('-composition-'),
        });

        hasAlreadyFatalyErrored = true;
      }

      onUnrecoverableError();

      loggerx.error(
        Error(`[Shaka Player Error] Setup failed`),
        {
          errorName: e.name || e,
          errorMessage: e.message || e,
          errorStack: e.stack || e,
          logsCount: player.logs.length,
          lastLogs: player.logs.slice(PLAYER_LOG_SLICE),
          page: getCurrentPageName(),
          videoType: source.sourceMimeType,
          roundedTs: getRoundedTs(),
          uaInfo: uaInfo.UAInfo,
        },
        { feature: Feature.VideoPlayer }
      );
    }
  };

  // Destroy the existing Shaka player if it's there, then create a new one
  destroyMseTech(player).then(() => createShaka());
}
