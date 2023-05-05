<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let currentCoordinates: number[];

	onMount(() => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			currentCoordinates = [position.coords.latitude, position.coords.longitude];

			goto(`/weather?latitude=${currentCoordinates[0]}&longitude=${currentCoordinates[1]}`);
		});

		if (currentCoordinates) {
			console.log(currentCoordinates);
		}
	});
</script>

<h1 class="font-bold text-xl mb-5 p-2">r_weather</h1>
<p>{currentCoordinates}</p>
<p>Please either accept location permissions or select a location.</p>
