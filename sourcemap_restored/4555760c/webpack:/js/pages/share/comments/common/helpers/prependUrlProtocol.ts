// NOTE(dan, viewerx): Adds "https://" to urls missing a protocol all-together.
// This is the case in user submitted comments, where a user can enter a URL formatted as "www.google.com", for example

type PrependUrlProtocolProps = {
  url: string;
};

export const prependUrlProtocol = ({ url }: PrependUrlProtocolProps): URL => {
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    url = 'https://' + url;
  }

  return new URL(url);
};
