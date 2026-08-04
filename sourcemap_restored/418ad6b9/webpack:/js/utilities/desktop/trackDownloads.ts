import { incrementMetric } from '@js/utilities/metrics';

export const parseVersionFromDownloadUrl = (
  url: string
): { version: string; os: 'win' | 'mac'; url: string } => {
  const isWin = url.includes('exe');
  let splitUrl;

  if (url.includes('-arm64')) {
    splitUrl = url.replace('-arm64', '').trim().split('/');
  } else {
    splitUrl = url.split('/');
  }

  const fileName = splitUrl[splitUrl.length - 1];

  return {
    version: fileName.replace(/[^0-9.-]|(?!^)-/g, ''),
    os: isWin ? 'win' : 'mac',
    url,
  };
};

export const trackDesktopDownloads = (url: string): void => {
  const tags = parseVersionFromDownloadUrl(url);

  incrementMetric('desktop.download', tags);
};
