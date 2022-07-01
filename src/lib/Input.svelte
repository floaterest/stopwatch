<script lang="ts">
	import { now, stopwatches } from './stores';
	import type { Stopwatch } from './Stopwatch.ts';

	let input = '';
	let error = '';

	function check(){
		return error = (() => {
			for(const t of input.split(' ')){
				if(!t) return 'Title cannot be empty string or end with space';
				if(t in $stopwatches) return t + ' already exists';
			}
			return '';
		})();
	}

	function submit(){
		if(check()) return;
		const started = false;
		const timestamp = $now;
		const duration = 0;
		for(const t of input.split(' ')){
			$stopwatches[t] = { started, timestamp, duration } as Stopwatch;
		}
		input = '';
	}
</script>

<input type="text" placeholder="type titles here" class:error
       bind:value={input} on:keyup={e=>(e.keyCode===13?submit:check)()}>
<span>{error}</span>

<style lang="sass">
    @import '../global'
    input
        border-radius: 3em
        border: 1px solid $white
        background: unset
        color: unset
        width: 100%
        padding: 1em
        height: 1em
        &.error
            border-color: $pink
</style>