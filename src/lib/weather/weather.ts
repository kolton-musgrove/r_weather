type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type weatherOptions = {
	latitude: number;
	longitude: number;
	hourly?: string;
	daily?: string;
	current_weather?: boolean;
	temperature_unit?: 'celsius' | 'fahrenheit';
	windspeed_unit?: 'ms' | 'kmh' | 'mph' | 'kn';
	precipitation_unit?: 'mm' | 'in';
	timezone?: string;
	past_days?: IntRange<0, 3>;
	forecast_days?: IntRange<0, 17>;
};

export type Weather = {};

export async function getWeather(latitude: number, longitude: number): Promise<Weather> {
	const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;

	const weatherOptions: weatherOptions = {
		latitude,
		longitude,
		hourly: 'temperature_2m'
	};

	const fullUrl = new URL(baseUrl);

	// appends the weather options to the url
	Object.entries(weatherOptions).forEach(([key, value]) => {
		if (value) fullUrl.searchParams.append(key, value.toString());
	});

	const response = await fetch(fullUrl.toString());

	return response.json();
}
