<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCity } from '$lib/location';

	let currentCoordinates: number[];
	let locationName = 'Search by city';
	let message = 'Please either accept location permissions or enter a location using city, state name (i.e. Lynchburg, VA).';

	onMount(() => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			currentCoordinates = [position.coords.latitude, position.coords.longitude];

			goto(`/weather?latitude=${currentCoordinates[0]}&longitude=${currentCoordinates[1]}`);
		});

		if (currentCoordinates) {
			console.log(currentCoordinates);
		}
	});

	async function onSearch(e: Event) {
		if (e.key === "Enter") {
			await searchByCity()
		}
	}

	async function searchByCity() {
		let loc = locationName.split(", ");
		let city = loc[0];
		let state = loc[1];
		try {
			let coords = await getCity(city, state);
			currentCoordinates = [coords.lat, coords.lon];
			goto(`/weather?latitude=${currentCoordinates[0]}&longitude=${currentCoordinates[1]}`);
		} catch(e) {
			message = 'Location not found. Please try again.'
			locationName = 'Search by city';
		}
	}
</script>

<div class="flex flex-col w-full items-center">
	<h1 class="font-bold text-xl mb-5 p-2">r_weather</h1>
	<div class="flex flex-row">	
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#6b7280" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
		<input class="border-2 rounded border-gray-500 p-2 text-slate-400 focus:text-black" on:keyup={(e) => {onSearch(e)}} bind:value={locationName} on:focus={() => {locationName = ''}}>
	</div>
	<p class="text-center m-4">{message}</p>
	<svg class="m-2" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 7.35q3.05-2.8 4.525-5.088T18 10.2q0-2.725-1.738-4.462T12 4Q9.475 4 7.737 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35Zm0 2.275q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.4-1.8 5.163t-5.45 5.987q-.15.125-.35.2t-.4.075ZM12 10.2Z"/></svg>
</div>

