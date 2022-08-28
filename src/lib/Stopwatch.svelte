<script lang="ts">
	import type { Stopwatch } from './Stopwatch.ts';
	import { now, times } from './stores';
	import { hhmmss } from './Stopwatch.ts';

	export let title: string;
	export let stopwatch: Stopwatch;
	export let active: string;
	export let remove: () => void;


	function on(){
		stopwatch.started = true;
		stopwatch.timestamp = $now;
		active = title;
	}

	function off(){
		stopwatch.started = false;
		stopwatch.duration = $times[title];
	}

	function reset(){
		stopwatch.duration = 0;
		stopwatch.timestamp = $now;
	}

	$: started = stopwatch.started;
	$: innerHTML = hhmmss($times[title]);
</script>

<fieldset>
    <legend>{title}</legend>
    <!--     <code class:started contenteditable="true" bind:innerHTML></code> -->
    <code class:started>{innerHTML}</code>
    <section>
        <button on:click={started?off:on} class="material-icons">
            {#if started}&#xe034;{:else}&#xe037;{/if}
        </button>
        <button on:click={reset} class="material-icons">&#xe5d5;</button>
        <button on:click={remove} class="material-icons">&#xe872;</button>
    </section>
</fieldset>

<style lang="sass">
    @import '../app'
    fieldset
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        user-select: none
        padding: 0
    legend
        margin-left: 1em
    code
        width: 100%
        text-align: center
        font-family: $mono
        &.started
            background: darkgreen
    section
        display: flex
        justify-content: center
        width: 100%
        align-items: center
    button
        flex: 1
        width: 50%
        background: $darkest
        color: unset
        text-transform: uppercase
        border: none
        display: flex
        justify-content: center
        align-items: center
        font-size: 1em
        &:not(:disabled)
            cursor: pointer

</style>