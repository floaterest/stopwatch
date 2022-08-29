<script lang="ts">
    import Input from './lib/Input.svelte';
    import { state } from './lib/stores';
    import type { State } from './lib/State';
    import Started from './lib/Started.svelte';
    import Stopwatch from './lib/Stopwatch.svelte';

    export function save(state: State){
        /// save state to localStorage
        // todo save display time
        console.log('save', state);
        const { increment, stopwatches } = state;
        localStorage.setItem(state.key, JSON.stringify({
            increment, stopwatches
        }));
    }

    const on = (name: string) => () => $state.started = $state.started.add(name);
    const off = (name: string) => () => {
        $state.started.delete(name);
        $state.started = $state.started;
    };

    $: save($state);
    $: stopwatches = Object.entries($state.stopwatches).map(
        ([name, stopwatch]) => ({
            name,
            props: { name, stopwatch, on: on(name), off: off(name) },
        })
    );

</script>

<!-- <svelte:window on:beforeunload={unload} on:load={load}/> -->
<Input/>
<section>
    {#each stopwatches as { name, props }}
        {#if $state.started.has(name)}
            <Started {...props}/>
        {:else}
            <Stopwatch {...props}/>
        {/if}
    {/each}
</section>

<style lang="sass">
    section
        display: grid
        gap: 1em
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr))
</style>
