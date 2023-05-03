import type { weatherOptions, weatherResponse, weatherCategoryToCode } from '$lib/types';

export async function getWeather(options: weatherOptions): Promise<weatherResponse> {
	const baseUrl = `https://api.open-meteo.com/v1/forecast`;

	const fullUrl = new URL(baseUrl);

	// appends the weather options to the url
	Object.entries({ ...options, timezone: 'auto' }).forEach(([key, value]) => {
		if (value) {
			if (Array.isArray(value)) value = value.join(',');
			fullUrl.searchParams.append(key, value.toString());
		}
	});

	const response = (await fetch(fullUrl.toString()).then((res) => res.json())) as weatherResponse;

	return response;
}

export function mapWeatherCodeToDescription(weatherCodes: number[], currentHour: number): string {
	let currentWeatherCode: number = weatherCodes[currentHour];

	// if the current weather code is 0 or 2, it means that the weather is the same as the previous hour
	// so we need to find the first hour where the weather code is different
	if ([0, 2].includes(currentWeatherCode)) {
		let hourOffset: number = currentHour - 1;

		while (weatherCodes[hourOffset] === currentWeatherCode) {
			hourOffset--;
		}

		currentWeatherCode = weatherCodes[hourOffset];
	}

	const weatherDescriptionToCode: weatherCategoryToCode = {
		Clear: [1],
		Overcast: [3],
		Fog: [45, 48],
		Drizzle: [51, 53, 55],
		Freezing_rain: [56, 57, 66, 67],
		Rain: [61, 63, 65, 80, 81, 82],
		Snow: [71, 73, 75, 77, 85, 86],
		Thunderstorm: [95, 96, 99]
	};

	for (const [description, codes] of Object.entries(weatherDescriptionToCode)) {
		if (codes.includes(currentWeatherCode)) return description;
	}

	throw new Error(`Unknown weather code: ${currentWeatherCode}`);
}
