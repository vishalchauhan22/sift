/* eslint-disable no-console */
import { deviceDetails } from '@js/utilities/device';

import { sendIncrementMetric } from '@loomhq/loom-js-statsd/frontend';

/** Types **/ import {
  VIDEO_WEBM,
  AUDIO_WEBM,
  DASH,
  MP4,
  MP2T,
  M3U8,
} from '@loomhq/shared-utilities/constants/mimes';

interface MimeCodecsSupport {
  videoMimeCodecs: MIMECodecs[];
  audioMimeCodecs: MIMECodecs[];
  sourceMimeType: string;

  // If true, we require every combination of video/audio codecs to be supported in order to
  // say the mimetype is supported.
  requireAllCombinations?: boolean;
}

type MIMECodecs = {
  mime: string;
  codecs: string;
};

type MIMECodecCheck = {
  canPlay: boolean;
  apiUsed: string;
};

/**
 * @typedef SupportAPICheck
 * @property {boolean} canPlay -- Rather a MIME/Codec(s) can be played on the browser
 * @property {boolean} isAPIAvailable -- Rather the expected API was available
 */
type SupportAPICheck = {
  canPlay: boolean;
  isAPIAvailable: boolean;
};

/**
 * User type definition
 * @typedef {Object} MimeTypeCodecCompositionType
 * @property {string} mimeCodecVideo
 * @property {string} [mimeCodecAudio]
 */

export type MimeTypeCodecCompositionType = {
  mimeCodecVideo: string;
  mimeCodecAudio?: string;
};

type CompatibilityCheckFuncType = (
  mimeTypeCodecComposition: MimeTypeCodecCompositionType
) => SupportAPICheck | Promise<SupportAPICheck>;

interface GetBrowserSupportedMimeTypesType {
  formatMimeCodecs: typeof formatMimeCodecs;
  mimeCodecSupported: ReturnType<typeof buildMimeCodecSupported>;
}

/** /Types **/

export const mediaSourceCheck = (
  mimeTypeCodecComposition: MimeTypeCodecCompositionType
): SupportAPICheck => {
  if ('MediaSource' in window) {
    const { mimeCodecVideo } = mimeTypeCodecComposition;

    return {
      canPlay: MediaSource.isTypeSupported(mimeCodecVideo),
      isAPIAvailable: true,
    };
  }

  return {
    canPlay: false,
    isAPIAvailable: false,
  };
};

export const mediaCapabilitiesCheck = async (
  mimeTypeCodecComposition: MimeTypeCodecCompositionType
): Promise<SupportAPICheck> => {
  const defaultReject = {
    canPlay: false,
    isAPIAvailable: false,
  };

  const { mimeCodecVideo, mimeCodecAudio } = mimeTypeCodecComposition;

  if (navigator.mediaCapabilities) {
    try {
      const mediaConfiguration: MediaDecodingConfiguration = {
        type: 'file',
        video: {
          contentType: mimeCodecVideo,
          bitrate: 1500,
          framerate: 30,
          height: 100,
          width: 100,
        },
      };

      if (mimeCodecAudio) {
        mediaConfiguration['audio'] = {
          contentType: mimeCodecAudio,
          channels: '2.1',
          samplerate: 48000,
          bitrate: 1500,
        };
      }

      const { supported } =
        await navigator.mediaCapabilities.decodingInfo(mediaConfiguration);

      return {
        canPlay: supported,
        isAPIAvailable: true,
      };
    } catch (err) {
      console.error(
        'Media Capabilities failed for:',
        {
          mimeCodecVideo,
          mimeCodecAudio,
        },
        err
      );

      return defaultReject;
    }
  }

  return defaultReject;
};

export const DEFAULT_MIME_CODECS_CHECKERS: Record<
  string,
  CompatibilityCheckFuncType
> = {
  mediaCapabilitiesCheck,
  mediaSourceCheck,
};

export const DEFAULT_LOOM_SUPPORTED_MIME_CODECS: Record<
  string,
  MimeCodecsSupport
> = {
  dash: {
    videoMimeCodecs: [
      { mime: VIDEO_WEBM, codecs: 'vp8' },
      { mime: VIDEO_WEBM, codecs: 'vp09.00.10.08' },
    ],

    audioMimeCodecs: [{ mime: AUDIO_WEBM, codecs: 'opus' }],
    sourceMimeType: DASH,
    requireAllCombinations: true,
  },
  hls: {
    videoMimeCodecs: [
      { mime: MP4, codecs: 'avc1.4d002a' },
      { mime: MP2T, codecs: 'avc1.4d002a' },
    ],

    audioMimeCodecs: [],
    sourceMimeType: M3U8,
  },
  mp4: {
    videoMimeCodecs: [{ mime: MP4, codecs: 'avc1.4d002a' }],
    audioMimeCodecs: [],
    sourceMimeType: MP4,
  },
};

export const formatMimeCodecs = ({ mime, codecs }: MIMECodecs): string =>
  `${mime}; codecs="${codecs}"`;

/**
 * Provides a list of manifest and/or video MIME types supported
 *
 * @param  {MimeCodecsSupport[]} typesToCheck
 * @param  {GetBrowserSupportedMimeTypesType} tooling
 * @returns Promise<string[]>
 */
export const getBrowserSupportedMimeTypes = async (
  typesToCheck: MimeCodecsSupport[],
  tooling: GetBrowserSupportedMimeTypesType
): Promise<string[]> => {
  const { mimeCodecSupported, formatMimeCodecs } = tooling;
  const supportedMimeTypes: string[] = [];

  for (const typeToCheck in typesToCheck) {
    const {
      videoMimeCodecs,
      audioMimeCodecs,
      sourceMimeType,
      requireAllCombinations,
    } = typesToCheck[typeToCheck];

    let isMimeTypeSupported = true;

    for (const videoType in videoMimeCodecs) {
      if (supportedMimeTypes.includes(sourceMimeType)) {
        break;
      }

      const fullAudioTypes = [...audioMimeCodecs, undefined];
      const videoMimeCodec = videoMimeCodecs[videoType];

      for (const audioType in fullAudioTypes) {
        const audioMimeCodec = fullAudioTypes[audioType];
        const mimeCodecComposition: MimeTypeCodecCompositionType = {
          mimeCodecVideo: formatMimeCodecs(videoMimeCodec),
        };

        if (audioMimeCodec) {
          mimeCodecComposition.mimeCodecAudio =
            formatMimeCodecs(audioMimeCodec);
        }

        const isSupported = await mimeCodecSupported(mimeCodecComposition);

        if (isSupported.canPlay) {
          if (!requireAllCombinations) {
            supportedMimeTypes.push(sourceMimeType);
            // We only need one combination of codecs, so bail early
            break;
          }
        } else if (requireAllCombinations) {
          // We require all combinations of codecs, but this combination failed, so
          // bail early and set it to false
          isMimeTypeSupported = false;
          break;
        }
      }
    }

    if (requireAllCombinations && isMimeTypeSupported) {
      // We went through all combinations and isMimeTypeSupported is still true
      supportedMimeTypes.push(sourceMimeType);
    }
  }

  return supportedMimeTypes;
};

let supportedMimeTypes: string[] | null = null;
let derivationPromise: Promise<string[]> | null = null;

/**
 * Provides a list of manifest and/or video MIME types supported by Loom on the browser
 *
 * @returns Promise<string[]>
 */
export const getLoomBrowserSupportedMimeTypes = ():
  | string[]
  | Promise<string[]> => {
  // We've calculated the support types, so let's return directly without using a promise so that
  // the caller doesn't need to resolve it.
  if (supportedMimeTypes) {
    return supportedMimeTypes;
  }

  // We've begun a promise to calculate the support types, so let's return that promise so that
  // we don't derive twice.
  if (derivationPromise) {
    return derivationPromise;
  }

  const tooling = {
    mimeCodecSupported: buildMimeCodecSupported(DEFAULT_MIME_CODECS_CHECKERS),
    formatMimeCodecs,
  };

  const { dash, hls, mp4 } = DEFAULT_LOOM_SUPPORTED_MIME_CODECS;

  derivationPromise = getBrowserSupportedMimeTypes([dash, hls, mp4], tooling);

  return derivationPromise.then(result => {
    supportedMimeTypes = result;

    sendIncrementMetric({
      name: 'player.derivedMimeTypes',
      count: 1,
      tags: {
        hls: supportedMimeTypes.includes(M3U8),
        dash: supportedMimeTypes.includes(DASH),
        mp4: supportedMimeTypes.includes(MP4),
        osName: deviceDetails.os.name,
        browserName: deviceDetails.browser.name,
      },
    });

    return result;
  });
};

export const buildMimeCodecSupported =
  (mimeCodecCheckingFunctions: Record<string, CompatibilityCheckFuncType>) =>
  (
    mimeTypeCodecComposition: MimeTypeCodecCompositionType
  ): ReturnType<typeof isMimeCodecSupported> =>
    isMimeCodecSupported(mimeTypeCodecComposition, mimeCodecCheckingFunctions);

export const isMimeCodecSupported = async (
  mimeTypeCodecComposition: MimeTypeCodecCompositionType,
  compatibilityCheckFunctionsTree: Record<string, CompatibilityCheckFuncType>
): Promise<MIMECodecCheck> => {
  for (const funcName in compatibilityCheckFunctionsTree) {
    const compatibilityCheckFunc = compatibilityCheckFunctionsTree[funcName];

    const result = await compatibilityCheckFunc(mimeTypeCodecComposition);

    if (result.isAPIAvailable) {
      return {
        canPlay: result.canPlay,
        apiUsed: funcName,
      };
    }
  }

  return {
    canPlay: false,
    apiUsed: '',
  };
};

export function changeTypeSupported(): boolean {
  const sourceBuffer = getSourceBuffer();

  return typeof sourceBuffer?.prototype?.changeType === 'function';
}

function getSourceBuffer(): typeof self.SourceBuffer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return self.SourceBuffer || (self as any).WebKitSourceBuffer;
}
