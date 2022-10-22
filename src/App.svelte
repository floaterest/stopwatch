<script lang="ts">
    import Input from './lib/Input.svelte';
    import { started, stopwatches, storage } from './lib/stores';
    import { key } from './lib/storage';
    import Started from './lib/Started.svelte';
    import Stopwatch from './lib/Stopwatch.svelte';

    $: localStorage.setItem(key, JSON.stringify($storage));
</script>

<Input/>
<section>
    {#each Object.entries($stopwatches) as [name, stopwatch]}
        {#if $started.has(name)}
            <Started {name} {stopwatch}/>
        {:else}
            <Stopwatch {name} {stopwatch}/>
        {/if}
    {/each}
</section>

<style lang="sass">
    section
        display: grid
        gap: 0.5em
        grid-template-columns: repeat(auto-fill, minmax(6em, 1fr))
</style>
