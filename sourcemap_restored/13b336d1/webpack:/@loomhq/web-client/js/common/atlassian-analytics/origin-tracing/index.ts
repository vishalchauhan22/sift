import OriginTracer from '@atlassiansox/origin-tracing';

export function addOriginTracing(url: string): {
  url: string;
  origin: OriginTracer;
} {
  const origin = new OriginTracer({ product: 'loom' });

  if (!url) {
    throw new Error('Please provide a URL');
  }

  return { url: origin.addToUrl(url), origin };
}
