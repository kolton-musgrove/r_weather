<script lang="ts">
	export let iconName: string;
	export let stat: number | string;
	export let statUnit: string;
	export let widgetText: string;
	export let precision: number = 2;

	$: iconClass = `fa-solid h-8 p-2 w-1/4 self-center ${iconName}`;
</script>

<div class="flex flex-row justify-start w-1/2 py-1">
	<i class={iconClass} />
	<div class="flex flex-col">
		{#if typeof stat === 'number' && statUnit === '%'}
			<h1 class="font-bold">
				{Number(stat / 100).toLocaleString(undefined, {
					style: 'percent',
					maximumFractionDigits: precision
				})}
			</h1>
		{:else if typeof stat === 'number'}
			<h1 class="font-bold">{stat.toPrecision(precision)}{statUnit}</h1>
		{:else}
			<h1 class="font-bold">{stat}{statUnit}</h1>
		{/if}
		<p>{widgetText}</p>
	</div>
</div>
