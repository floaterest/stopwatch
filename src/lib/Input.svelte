<script lang="ts">
	import { now, stopwatches } from './stores';
	import type { Stopwatch } from './Stopwatch.ts';

	let input = '';
	let error = '';

	function check(): string{
		let titles = input.split(' ');
		for(const t of titles){
			if(!t) return 'Title cannot be empty string or end with space';
			if(t in $stopwatches) return t + ' already exists';
		}
		return '';
	}

	function submit(){
		if(!check()) return input;
		const started = false;
		const timestamp = $now;
		const duration = 0;
		for(const t of input.split(' ')){
			$stopwatches[t] = { started, timestamp, duration } as Stopwatch;
		}
		return '';
	}
</script>

<form on:sumbit|preventDefault={()=>input=submit()} class:error>
    <label for="add"></label>
    <input type="text" id="add" placeholder="type titles here"
           bind:value={input} on:keyup={()=>error=check()}>
</form>
<span>{error}</span>

<style lang="sass">
    @import '../global'
    form
        width: 100%
        display: flex
        border-radius: 3em
        border: 1px solid $white
        &.error
            border-color: $pink
    input
        background: unset
        color: unset
        width: 100%
        border: none
        padding: 1em
        height: 1em
</style>