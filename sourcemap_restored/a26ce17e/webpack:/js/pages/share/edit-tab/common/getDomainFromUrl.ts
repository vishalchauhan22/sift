import normalizeUrl from 'normalize-url';

export const getDomainFromUrl = (url: string): string | undefined => {
  try {
    const normalizedUrl = normalizeUrl(url, { stripWWW: true });

    const urlObj = new URL(normalizedUrl);
    const hostname = urlObj.hostname;
    const parts = hostname.split('.');
    const domain = parts.length > 1 ? parts.slice(-2)[0] : parts[0];

    return domain;
  } catch (e) {
    return undefined;
  }
};
