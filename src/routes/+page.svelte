<script lang="ts">
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { getWeather, mapWeatherCodeToDescription } from '$lib/weather';
	import { StatWidget } from '$lib/components';
	import { getCurrentHour } from '$lib/time';

	export let data: PageServerData;

	let currentCoordinates: number[];
	let currentLocation: string;
	let weatherSummary: string;
	let weather: any;

	$: headerBackgroundClass = `w-full flex-col flex items-center p-2 ${weatherSummary}`;
	$: currentHour = getCurrentHour();

	onMount(async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				currentCoordinates = [position.coords.latitude, position.coords.longitude];

				// currentLocation = await getLocation(currentCoordinates[0], currentCoordinates[1]);

				weather = await getWeather({
					latitude: currentCoordinates[0],
					longitude: currentCoordinates[1],
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

				console.log(weather);
			});
		}
	});
</script>

<body class="flex flex-col w-full items-center">
	<h1 class="font-bold text-xl mb-5 p-2">r_weather</h1>
	{#if currentCoordinates}
		{#if weather}
			<header class={headerBackgroundClass}>
				<div class="w-full p-5">
					<p class="text-2xl font-bold">{weather.hourly.temperature_2m[currentHour]}°F</p>
					<p>
						{currentLocation} - {mapWeatherCodeToDescription(
							weather.hourly.weathercode,
							currentHour
						)}
					</p>
				</div>
			</header>

			<main class="w-5/6 p-2">
				<hr class="my-5" />
				<h2 class="text-xl ">Weather Details</h2>
				<p class="font-light text-sm text-gray-500">Weather now</p>
				<div class="flex w-full h-fit flex-wrap">
					<StatWidget
						iconName="fa-temperature-high"
						stat={parseFloat(weather.daily.temperature_2m_max[0])}
						statUnit="°F"
						widgetText="Daily High"
					/>

					<StatWidget
						iconName="fa-temperature-low"
						stat={parseFloat(weather.daily.temperature_2m_min[0])}
						statUnit="°F"
						widgetText="Daily Low"
					/>

					<StatWidget
						iconName="fa-umbrella"
						stat={parseFloat(weather.hourly.precipitation_probability[currentHour])}
						statUnit="%"
						widgetText="Chance"
						precision={1}
					/>

					<StatWidget
						iconName="fa-wind"
						stat={parseFloat(weather.hourly.windspeed_10m[currentHour])}
						statUnit="mph"
						widgetText="Wind Speed"
					/>

					<StatWidget
						iconName="fa-temperature-low"
						stat={parseFloat(weather.hourly.apparent_temperature[currentHour])}
						statUnit="°F"
						widgetText="Feels Like"
					/>

					<StatWidget
						iconName="fa-tint"
						stat={parseFloat(weather.hourly.relativehumidity_2m[currentHour])}
						statUnit="%"
						widgetText="Humidity"
					/>
				</div>
				<hr class="my-5" />

				<h2 class="text-xl">Hourly Forecast</h2>
				<p class="font-light text-sm text-gray-500">Weather over the next 24 hours</p>
				<div class="inline-flex w-full justify-center">
					<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
						<i class="fa-solid fa-temperature-half" />
					</button>
					<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
						<i class="fa-solid fa-wind" />
					</button>
					<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
						<i class="fa-solid fa-umbrella" />
					</button>
					<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
						<i class="fa-solid fa-tint" />
					</button>
				</div>
			</main>
		{/if}
	{:else}
		<!-- Need to implement Open-Meteo's Geocoding API and a search bar for cities -->
		<!-- currently this is just a loading spinner while the data loads-->
		<div
			class="flex animate-spin items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-blue-500 to-white-100"
		>
			<div class="h-9 w-9 rounded-full bg-white" />
		</div>
	{/if}
</body>
