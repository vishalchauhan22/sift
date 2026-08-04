import fetch from '@js/utilities/fetch';
interface LoomLocation {
  country: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export async function getLocation(): Promise<LoomLocation> {
  const response = await fetch('https://location.loom.com', {
    method: 'GET',
  });

  return {
    country: response.headers.get('x-loom-country') ?? '',
    city: response.headers.get('x-loom-city') ?? '',
    postalCode: response.headers.get('x-loom-postal-code') ?? '',
    latitude: parseFloat(response.headers.get('x-loom-latitude') ?? ''),
    longitude: parseFloat(response.headers.get('x-loom-longitude') ?? ''),
  };
}
