<script lang="ts">
    import Input from './lib/Input.svelte';
    import { started, storage } from './lib/stores';
    import { key } from './lib/storage';
    import Started from './lib/Started.svelte';
    import Stopwatch from './lib/Stopwatch.svelte';
    import { now } from './lib/helpers';

    const on = (name: string) => (seconds: number) => {
        $storage.stopwatches[name].timestamp = now();
        $started = $started.add(name);
    };
    const off = (name: string) => (seconds: number) => {
        $storage.stopwatches[name].duration = seconds;
        $started.delete(name);
        $started = $started;
    };

    $: localStorage.setItem(key, JSON.stringify($storage));
    $: stopwatches = Object.entries($storage.stopwatches).map(
        ([name, stopwatch]) => ({
            name, stopwatch, on: on(name), off: off(name)
        })
    );

</script>

<Input/>
<section>
    {#each stopwatches as { name, ...props }}
        {#if $started.has(name)}
            <Started {name} {...props}/>
        {:else}
            <Stopwatch {name} {...props}/>
        {/if}
    {/each}
</section>

<style lang="sass">
    section
        display: grid
        gap: 1em
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr))
</style>
