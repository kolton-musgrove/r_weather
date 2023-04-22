import type { weatherOptions, Weather } from '$lib/types/weather';

export async function getWeather(options: weatherOptions): Promise<Weather> {
	const baseUrl = `https://api.open-meteo.com/v1/forecast`;

	const fullUrl = new URL(baseUrl);

	// appends the weather options to the url
	Object.entries({ ...options, timezone: 'auto' }).forEach(([key, value]) => {
		if (value) {
			if (Array.isArray(value)) value = value.join(',');
			fullUrl.searchParams.append(key, value.toString());
		}
	});

	const response = await fetch(fullUrl.toString());

	return response.json();
}
