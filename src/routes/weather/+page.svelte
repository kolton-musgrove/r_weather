<script lang="ts">
	import type { PageServerData } from './$types';
	import type { weatherResponse } from '$lib/types';
	import { mapWeatherCodeToDescription } from '$lib/weather';
	import { StatWidget } from '$lib/components';
	import { getCurrentHour } from '$lib/time';

	export let data: PageServerData;

	const weather: weatherResponse = data.weather;
	const locality: string = data.locality;

	const weatherCodes: number[] = weather.hourly.weathercode as number[];
	const temperature_2m: number[] = weather.hourly.temperature_2m as number[];
	const precipitation_probability: number[] = weather.hourly.precipitation_probability as number[];
	const windspeed_10m: number[] = weather.hourly.windspeed_10m as number[];
	const apparent_temperature: number[] = weather.hourly.apparent_temperature as number[];
	const relativehumidity_2m: number[] = weather.hourly.relativehumidity_2m as number[];
	const temperature_2m_max: number[] = weather.daily.temperature_2m_max as number[];
	const temperature_2m_min: number[] = weather.daily.temperature_2m_min as number[];

	let hourlyWeather: string = 'temperature';
	let hourlyWeatherUnit: string = '°F';
	let hourlyWeatherArray: number[] = [];
	let hourlyTimeArray: string[] = [];

	const updateHourlyWeatherArray = (hourlyWeather: string) => {
		const hourlyOffset = new Date().getHours();

		switch (hourlyWeather) {
			case 'temperature':
				hourlyWeatherUnit = '°F';
				hourlyWeatherArray = weather.hourly.temperature_2m?.slice(hourlyOffset) as number[];
				break;
			case 'wind':
				hourlyWeatherUnit = 'mph';
				hourlyWeatherArray = weather.hourly.windspeed_10m?.slice(hourlyOffset) as number[];
				break;
			case 'precipitation_probability':
				hourlyWeatherUnit = '%';
				hourlyWeatherArray = weather.hourly.precipitation_probability?.slice(
					hourlyOffset
				) as number[];
				break;
			case 'precipitation':
				hourlyWeatherUnit = '"';
				hourlyWeatherArray = weather.hourly.precipitation?.slice(hourlyOffset) as number[];
				break;
		}

		hourlyTimeArray = weather.hourly.time
			?.map((time: string, index: number) => {
				const hour = new Date(time).getHours().toString();
				return hour;
			})
			.slice(hourlyOffset) as string[];
	};

	$: headerBackgroundClass = `w-full flex-col flex items-center p-2 ${weatherSummary}`;
	$: currentHour = getCurrentHour();
	$: weatherSummary = mapWeatherCodeToDescription(weatherCodes, currentHour);
	$: updateHourlyWeatherArray(hourlyWeather);
</script>

<body class="flex flex-col w-full items-center">
	<h1 class="font-bold text-xl mb-5 p-2">r_weather</h1>
	<header class={headerBackgroundClass}>
		<div class="w-full p-5">
			<p class="text-2xl font-bold">{temperature_2m[currentHour]}°F</p>
			<p>
				{locality} - {weatherSummary}
			</p>
		</div>
	</header>

	<main class="w-5/6 p-2">
		<section>
			<hr class="my-5" />
			<h2 class="text-xl">Weather Details</h2>
			<p class="font-light text-sm text-gray-500">Weather now</p>
			<div class="flex w-full h-fit flex-wrap">
				<StatWidget
					iconName="fa-temperature-high"
					stat={temperature_2m_max[0]}
					statUnit="°F"
					widgetText="Daily High"
				/>

				<StatWidget
					iconName="fa-temperature-low"
					stat={temperature_2m_min[0]}
					statUnit="°F"
					widgetText="Daily Low"
				/>

				<StatWidget
					iconName="fa-umbrella"
					stat={precipitation_probability[currentHour]}
					statUnit="%"
					widgetText="Chance"
					precision={1}
				/>

				<StatWidget
					iconName="fa-wind"
					stat={windspeed_10m[currentHour]}
					statUnit="mph"
					widgetText="Wind Speed"
				/>

				<StatWidget
					iconName="fa-temperature-low"
					stat={apparent_temperature[currentHour]}
					statUnit="°F"
					widgetText="Feels Like"
				/>

				<StatWidget
					iconName="fa-tint"
					stat={relativehumidity_2m[currentHour]}
					statUnit="%"
					widgetText="Humidity"
				/>
			</div>
		</section>
		<hr class="my-5" />

		<section>
			<h2 class="text-xl">Hourly Forecast</h2>
			<p class="font-light text-sm text-gray-500">Weather over the next 24 hours</p>
			<div class="inline-flex w-full justify-center">
				<button
					class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
					on:click={() => (hourlyWeather = 'temperature')}
				>
					<i class="fa-solid fa-temperature-half" />
				</button>
				<button
					class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
					on:click={() => (hourlyWeather = 'wind')}
				>
					<i class="fa-solid fa-wind" />
				</button>
				<button
					class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
					on:click={() => (hourlyWeather = 'precipitation_probability')}
				>
					<i class="fa-solid fa-umbrella" />
				</button>
				<button
					class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
					on:click={() => (hourlyWeather = 'precipitation')}
				>
					<i class="fa-solid fa-tint" />
				</button>
			</div>

			<div class="flex flex-col overflow-x-scroll">
				<div class="flex flex-row">
					{#each hourlyWeatherArray as weather, j}
						{#if j < 24}
							<p class="w-12 px-10">{weather}{hourlyWeatherUnit}</p>
						{/if}
					{/each}
				</div>
				<div class="flex flex-row pb-3">
					{#each hourlyTimeArray as time, i}
						{#if i < 24}
							<p class="w-12 px-10">{time.slice(0)}</p>
						{/if}
					{/each}
				</div>
			</div>
		</section>
	</main>
</body>
