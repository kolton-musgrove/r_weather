<script lang="ts">
	import { onMount } from 'svelte';
	import { getWeather } from '$lib/weather';

	let mounted: boolean = false;
	let currentLocation: number[];
	let weather: any;

	onMount(async () => {
		mounted = true;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				currentLocation = [position.coords.latitude, position.coords.longitude];

				weather = await getWeather({
					latitude: currentLocation[0],
					longitude: currentLocation[1],
					hourly: ['temperature_2m'],
					daily: ['temperature_2m_max', 'temperature_2m_min']
				});
				console.log(weather);
			});
		}
	});
</script>

{#if mounted}
	<h1>r_weather</h1>

	{#if currentLocation}
		<p>Current location: {currentLocation}</p>
		{#if weather}
			<h1>Daily Weather</h1>
			<div class="flex">
				<div>
					{#each weather.daily.time as daily_time}
						<p>{daily_time}</p>
					{/each}
				</div>
				<div>
					{#each weather.daily.temperature_2m_max as daily_max}
						<p>{daily_max}</p>
					{/each}
				</div>
				<div>
					{#each weather.daily.temperature_2m_min as daily_min}
						<p>{daily_min}</p>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<p>Unable to get current location</p>
	{/if}
{:else}
	<h1>Loading...</h1>
{/if}
