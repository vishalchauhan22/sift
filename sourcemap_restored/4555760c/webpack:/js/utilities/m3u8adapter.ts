import {
  isIOS,
  iframeSafeIsSafari as isSafari,
  isIOSChrome,
  isFirefoxIOS,
  isEdgeIOS,
} from '@js/utilities/device';

export class M3u8Adapter {
  /**
   * Whether the URL should be base64-encoded is based on native HLS support.
   * Native HLS Support is available on all iOS and Safari.
   * Some other platforms support native HLS, but Shaka does not recommend using their native HLS
   * playback. https://github.com/shaka-project/shaka-player/blob/58aa45f285219928d2a6243d8a0e196c7606fb6b/lib/player.js#L1395-L1397
   * See https://github.com/loomhq/loom/pull/21727 for details
   * 3/31/25 - this also applies to requesting desktop sites within the mobile apps of browsers
   */
  static currentPlatformSupportsNativeHls(): boolean {
    return Boolean(
      isIOS || isSafari || isIOSChrome || isFirefoxIOS || isEdgeIOS
    );
  }
  /**
   * According the m3u8 RFC,
   * "Each line is a URI, is blank, or starts with the
   * character '#'.  Blank lines are ignored.  Whitespace MUST NOT be
   * present, except for elements in which it is explicitly specified."
   */
  static base64EncodeUrls(
    m3u8: string,
    absolutePath: string,
    queryParameters: string
  ): string {
    // Remove \r. Lines can end with either \n or \r\n
    // Either way, we always return \n
    const m3u8UnixEol = m3u8.replace(/\r/g, '');

    const m3u8Lines = m3u8UnixEol.split('\n');

    m3u8Lines.forEach((line: string, index: string | number) => {
      if (line === '') {
        return;
      }

      //  #EXT-X-MAP:<attribute-list>
      //  The following attributes are defined:
      //  URI
      //  BYTERANGE
      if (line.startsWith('#EXT-X-MAP:') || line.startsWith('#EXT-X-MEDIA:')) {
        m3u8Lines[index] = line.replace(
          /URI="(.+?)"/g,
          `URI="${absolutePath}/$1?${queryParameters}"`
        );

        return;
      }

      if (line.startsWith('#')) {
        return;
      }

      // URI!
      m3u8Lines[index] = `${absolutePath}/${line}?${queryParameters}`;
    });

    return m3u8Lines.join('\n');
  }

  /**
   * This function processes a m3u8 file and applies the function "processor"
   * for every subplaylist URI, ignoring the media URI
   * This applies to media playlists, or audio playlists
   *
   * @param {String} m3u8
   * @param {function(String): Promise<String>} processor
   */
  static async applyProcessToPlaylists(
    m3u8: string,
    processor: (url: string) => Promise<string>
  ): Promise<string> {
    // Remove \r. Lines can end with either \n or \r\n
    // Either way, we always return \n
    const m3u8UnixEol = m3u8.replace(/\r/g, '');

    const m3u8Lines = m3u8UnixEol.split('\n');

    const processedM3u8Lines = m3u8Lines.map(async (line: string) => {
      if (line.startsWith('#EXT-X-MEDIA:')) {
        const uriRegex = /URI="(.+?)"/g;

        const result = uriRegex.exec(line);

        if (result === null) {
          throw new Error(`Malform m3u8 line ${line}`);
        }

        const newPlaylist = await processor(result[1]);

        return line.replace(/URI="(.+?)"/g, `URI="${newPlaylist}"`);
      }

      if (line.startsWith('#')) {
        return line;
      }

      // At this point, it's an uri: a playlist or a media file
      if (line.includes('.m3u8')) {
        return processor(line);
      }

      return line;
    });

    const resolvedProcessedM3u8Lines = await Promise.all(processedM3u8Lines);

    return resolvedProcessedM3u8Lines.join('\n');
  }

  static validateSubplaylist(m3u8: string): boolean {
    //not a subplaylist
    if (!m3u8.includes('EXT-X-PLAYLIST-TYPE')) {
      return true;
    }
    //contains references to media files
    if (!m3u8.includes('EXTINF')) {
      return false;
    }
    return true;
  }
}
