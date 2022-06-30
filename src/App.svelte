<script lang="ts">
	import List from './lib/List.svelte';
	import Input from './lib/Input.svelte';
	import { now, stopwatches, times } from './lib/stores';
	import type { Stopwatch } from './lib/Stopwatch.ts';

	/// key for localStorage
	export let key: string;

	// load times from localStorage
	function load(){
		let storage;
		if(!(storage = localStorage.getItem(key))) return;
		const timestamp = $now;
		const started = false;
		$stopwatches = Object.entries(JSON.parse(storage) as { [id: string]: number }).reduce(
			(acc, [title, duration]) => {
				acc[title] = {
					started,
					timestamp,
					duration,
				} as Stopwatch;
				return acc;
			},
			{}
		);
	}

	// save times to localStorage
	function unload(){
		localStorage.setItem(key, JSON.stringify($times));
	}
</script>

<svelte:window on:beforeunload={unload} on:load={load}/>
<Input/>
<List/>
