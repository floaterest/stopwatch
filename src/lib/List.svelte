<script lang="ts">
	import Stopwatch from './Stopwatch.svelte';
	import type { Stopwatch as SW } from './Stopwatch.ts';
	import { stopwatches, times, now } from './stores';

	let active = Object.keys($stopwatches)[0];

	function hhmmss(seconds: number){
		return [seconds / 3600 | 0, seconds / 60 | 0 % 60, seconds % 60].map(
			n => n.toString().padStart(2, '0')
		).join(':');
	}

	const off = (title: string) => () => $stopwatches[title] = {
		...$stopwatches[title],
		duration: $times[title],
		started: false,
	} as SW;

	const on = (title: string) => () => {
		active = title;
		$stopwatches[title] = {
			...$stopwatches[title],
			timestamp: $now,
			started: true,
		} as SW;
	};

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
        <Stopwatch {title} toggle="{(stopwatch.started?off:on)(title)}"
                   {stopwatch} remove="{remove(title)}"
                   display="{hhmmss($times[title])}"/>
    {/each}
</section>

<style lang="sass">
    section
        display: grid
        gap: 1rem
        font-size: 3em
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr))
</style>