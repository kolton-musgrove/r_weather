import type { PageServerLoad } from './$types';
import type { weatherResponse } from '$lib/types';
import { getLocality } from '$lib/location';
import { getWeather } from '$lib/weather';
import { redis } from '$lib/cache';

async function cacheWeatherResponse(
	latitude: number,
	longitude: number,
	weatherResponse: weatherResponse
): Promise<void> {
	try {
		if (!redis) return;

		const key = `${latitude},${longitude}`;
		const value = JSON.stringify(weatherResponse);

		await redis.set(key, value, 'EX', 60 * 15);
	} catch (error) {
		console.error('Unable to cache weather response.');
	}
}

async function getWeatherFromCache(
	latitude: number,
	longitude: number
): Promise<weatherResponse | null | void> {
	try {
		if (!redis) return;

		const key = `${latitude},${longitude}`;
		const value = await redis.get(key);

		if (value) {
			console.log('Weather response found in cache.');
			return JSON.parse(value) as weatherResponse;
		} else {
			console.log('Weather response not found in cache.');
			return null;
		}
	} catch (error) {
		console.error('Unable to get weather response from cache.');
		return;
	}
}

export const load: PageServerLoad = (async ({ url }) => {
	if (!url.searchParams.has('latitude') && !url.searchParams.has('longitude')) {
		throw new Error('unable to obtain location information successfully');
	}

	const latitude = parseFloat(url.searchParams.get('latitude') as string) as number;
	const longitude = parseFloat(url.searchParams.get('longitude') as string) as number;

	// get the city, state, etc. (currently just city name)
	const locality = await getLocality(latitude, longitude);

	// new api call/function to get the latitude and longitude from the city name
	// const { latitude, longitude } = await getCoords(locality);

	// get the weather data from the city's latitude and longitude
	const cachedWeatherResponse = await getWeatherFromCache(latitude, longitude);

	if (cachedWeatherResponse) {
		return { locality, weather: cachedWeatherResponse };
	} else if (cachedWeatherResponse === null) {
		const weather = await getWeather({
			latitude,
			longitude,
			hourly: [
				'temperature_2m',
				'weathercode',
				'precipitation_probability',
				'windspeed_10m',
				'apparent_temperature',
				'relativehumidity_2m',
				'winddirection_10m',
				'precipitation'
			],
			daily: ['temperature_2m_max', 'temperature_2m_min'],
			temperature_unit: 'fahrenheit',
			windspeed_unit: 'mph'
		});

		await cacheWeatherResponse(latitude, longitude, weather);

		return { locality, weather };
	}
}) satisfies PageServerLoad;
