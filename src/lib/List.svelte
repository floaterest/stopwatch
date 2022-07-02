<script lang="ts">
	import Stopwatch from './Stopwatch.svelte';
	import { stopwatches, times } from './stores';
	import { hhmmss } from './Stopwatch.ts';

	let active = Object.keys($stopwatches)[0];

	const remove = (title: string) => () => stopwatches.update(
		sws => Object.entries(sws).filter(([k, _]) => k != title).reduce(
			(acc, [title, sw]) => {
				acc[title] = sw;
				return acc;
			}, {}
		)
	);
</script>

<svelte:head>
    <title>{hhmmss($times[active])}</title>
</svelte:head>

<section>
    {#each Object.entries($stopwatches) as [title, stopwatch]}
        <Stopwatch {title} bind:stopwatch bind:active remove="{remove(title)}"/>
    {/each}
</section>

<style lang="sass">
    section
        display: grid
        gap: 1rem
        font-size: 3em
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr))
</style>