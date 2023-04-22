type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type dailyOptions =
	| 'temperature_2m_max'
	| 'temperature_2m_min'
	| 'apparent_temperature_max'
	| 'apparent_temperature_min'
	| 'precipitation_sum'
	| 'rain_sum'
	| 'showers_sum'
	| 'snowfall_sum'
	| 'precipitation_hours'
	| 'precipitation_probability_max'
	| 'precipitation_probability_min'
	| 'precipitation_probability_mean'
	| 'weathercode'
	| 'sunrise'
	| 'sunset'
	| 'windspeed_10m_max'
	| 'windspeed_10m_min'
	| 'winddirection_10m_dominant'
	| 'shortwave_radiation_sum'
	| 'et0_fao_evapotranspiration'
	| 'uv_index_max'
	| 'uv_index_clear_sky_max';

type hourlyOptions =
	| 'temperature_2m'
	| 'relativehumidity_2m'
	| 'dewpoint_2m'
	| 'apparent_temperature'
	| 'pressure_msl'
	| 'surface_pressure'
	| 'cloudcover'
	| 'cloudcover_low'
	| 'cloudcover_mid'
	| 'cloudcover_high'
	| 'windspeed_10m'
	| 'windspeed_80m'
	| 'windspeed_120m'
	| 'windspeed_180m'
	| 'winddirection_10m'
	| 'winddirection_80m'
	| 'winddirection_120m'
	| 'winddirection_180m'
	| 'windgusts_10m'
	| 'shortwave_radiation'
	| 'direct_radiation'
	| 'direct_normal_irradiance'
	| 'diffuse_radiation'
	| 'vapor_pressure_deficit'
	| 'cape'
	| 'evapotranspiration'
	| 'et0_fao_evapotranspiration'
	| 'precipitation'
	| 'precipitation'
	| 'snowfall'
	| 'precipitation_probability'
	| 'rain'
	| 'showers'
	| 'weathercode'
	| 'snow_depth'
	| 'freezinglevel_height'
	| 'visibility'
	| 'soil_temperature_0cm'
	| 'soil_temperature_6cm'
	| 'soil_temperature_18cm'
	| 'soil_temperature_54cm'
	| 'soil_moisture_0_1cm'
	| 'soil_moisture_1_3cm'
	| 'soil_moisture_3_9cm'
	| 'soil_moisture_9_27cm'
	| 'soil_moisture_27_81cm'
	| 'is_day';

export type weatherOptions = {
	latitude: number;
	longitude: number;
	hourly?: hourlyOptions[];
	daily?: dailyOptions[];
	current_weather?: boolean;
	temperature_unit?: 'celsius' | 'fahrenheit';
	windspeed_unit?: 'ms' | 'kmh' | 'mph' | 'kn';
	precipitation_unit?: 'mm' | 'in';
	timezone?: string;
	past_days?: IntRange<0, 3>;
	forecast_days?: IntRange<0, 17>;
};

export type Weather = {
	latitude: number;
	longitude: number;
	elevation: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	hourly: {
		time?: string[];
		temperature_2m?: number[];
		relativehumidity_2m?: number[];
		dewpoint_2m?: number[];
		apparent_temperature?: number[];
		pressure_msl?: number[];
		surface_pressure?: number[];
		cloudcover?: number[];
		cloudcover_low?: number[];
		cloudcover_mid?: number[];
		cloudcover_high?: number[];
		windspeed_10m?: number[];
		windspeed_80m?: number[];
		windspeed_120m?: number[];
		windspeed_180m?: number[];
		winddirection_10m?: number[];
		winddirection_80m?: number[];
		winddirection_120m?: number[];
		winddirection_180m?: number[];
		windgusts_10m?: number[];
		shortwave_radiation?: number[];
		direct_radiation?: number[];
		direct_normal_irradiance?: number[];
		diffuse_radiation?: number[];
		vapor_pressure_deficit?: number[];
		cape?: number[];
		evapotranspiration?: number[];
		et0_fao_evapotranspiration?: number[];
		precipitation?: number[];
		precipitation?: number[];
		snowfall?: number[];
		precipitation_probability?: number[];
		rain?: number[];
		showers?: number[];
		weathercode?: number[];
		snow_depth?: number[];
		freezinglevel_height?: number[];
		visibility?: number[];
		soil_temperature_0cm?: number[];
		soil_temperature_6cm?: number[];
		soil_temperature_18cm?: number[];
		soil_temperature_54cm?: number[];
		soil_moisture_0_1cm?: number[];
		soil_moisture_1_3cm?: number[];
		soil_moisture_3_9cm?: number[];
		soil_moisture_9_27cm?: number[];
		soil_moisture_27_81cm?: number[];
		is_day?: number[];
	};
};
