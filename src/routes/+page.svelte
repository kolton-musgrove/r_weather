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

				weather = await getWeather(currentLocation[0], currentLocation[1]);
			});
		}
	});
</script>

{#if mounted}
	<h1>r_weather</h1>

	{#if currentLocation}
		<p>Current location: {currentLocation}</p>
		{#if weather}
			<p>Current weather: {weather}</p>
		{/if}
	{:else}
		<p>Unable to get current location</p>
	{/if}
{:else}
	<h1>Loading...</h1>
{/if}
