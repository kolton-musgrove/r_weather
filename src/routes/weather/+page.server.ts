import type { PageServerLoad } from './$types';
import { getLocality } from '$lib/location';
import { getWeather } from '$lib/weather';

export const load: PageServerLoad = (async ({ url }) => {
	if (!url.searchParams.has('latitude') && !url.searchParams.has('longitude')) {
		throw new Error('unable to obtain location information successfully');
	}

	const latitude = parseFloat(url.searchParams.get('latitude') as string) as number;
	const longitude = parseFloat(url.searchParams.get('longitude') as string) as number;

	const locality = await getLocality(latitude, longitude);

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

	return { locality, weather };
}) satisfies PageServerLoad;
