<script lang="ts">
	import type { PageServerData } from './$types';
	import type { weatherResponse } from '$lib/types';
	import { mapWeatherCodeToDescription } from '$lib/weather';
	import { StatWidget } from '$lib/components';
	import { getCurrentHour } from '$lib/time';

	export let data: PageServerData;

	const weather: weatherResponse = data.weather;
	const locality: string = data.locality;

	$: headerBackgroundClass = `w-full flex-col flex items-center p-2 ${weatherSummary}`;
	$: currentHour = getCurrentHour();
	$: weatherSummary = mapWeatherCodeToDescription(weather.hourly.weathercode, currentHour);
</script>

<body class="flex flex-col w-full items-center">
	<h1 class="font-bold text-xl mb-5 p-2">r_weather</h1>
	<header class={headerBackgroundClass}>
		<div class="w-full p-5">
			<p class="text-2xl font-bold">{weather.hourly.temperature_2m[currentHour]}°F</p>
			<p>
				{locality} - {weatherSummary}
			</p>
		</div>
	</header>

	<main class="w-5/6 p-2">
		<hr class="my-5" />
		<h2 class="text-xl">Weather Details</h2>
		<p class="font-light text-sm text-gray-500">Weather now</p>
		<div class="flex w-full h-fit flex-wrap">
			<StatWidget
				iconName="fa-temperature-high"
				stat={weather.daily.temperature_2m_max[0]}
				statUnit="°F"
				widgetText="Daily High"
			/>

			<StatWidget
				iconName="fa-temperature-low"
				stat={weather.daily.temperature_2m_min[0]}
				statUnit="°F"
				widgetText="Daily Low"
			/>

			<StatWidget
				iconName="fa-umbrella"
				stat={weather.hourly.precipitation_probability[currentHour]}
				statUnit="%"
				widgetText="Chance"
				precision={1}
			/>

			<StatWidget
				iconName="fa-wind"
				stat={weather.hourly.windspeed_10m[currentHour]}
				statUnit="mph"
				widgetText="Wind Speed"
			/>

			<StatWidget
				iconName="fa-temperature-low"
				stat={weather.hourly.apparent_temperature[currentHour]}
				statUnit="°F"
				widgetText="Feels Like"
			/>

			<StatWidget
				iconName="fa-tint"
				stat={weather.hourly.relativehumidity_2m[currentHour]}
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
</body>
