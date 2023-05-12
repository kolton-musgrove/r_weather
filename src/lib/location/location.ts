import type { locationResponse } from '$lib/types';
//import { REV_GEOCODE_API_KEY } from '$env/static/private';
export async function getLocality(latitude: number, longitude: number): Promise<string> {
	const REV_GEOCODE_API_KEY = 'test'
	const endpoint: URL = new URL(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${REV_GEOCODE_API_KEY}`
	);

	const response = await fetch(endpoint);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = (await response.json()) as locationResponse;

	return data.locality;
}

export async function getCity(cityName: string, state: string): Promise<string> {
	const OPEN_WEATHER_API_KEY = 'test'
	const locationEndpoint: URL = new URL(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${state},us&appid=${OPEN_WEATHER_API_KEY}`
	);

	const response = await fetch(locationEndpoint);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const geoLocation = await response.json();
	console.log('test', geoLocation.coord);
	return geoLocation.coord;
}