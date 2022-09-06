<script lang="ts">
    import type { Stopwatch } from './storage';
    import { started, storage } from './stores';
    import { hhmmss, seconds } from './helpers';

    export let stopwatch: Stopwatch;
    export let now: number = stopwatch.timestamp;
    export let name: string;
    export let on: () => void;
    export let off: () => void;
    const start = $started.has(name);
    $: display = seconds(stopwatch, $storage.increment, now);

    function edit(){
        console.log(name, 'edit');
    }

    function remove(){
        off();
        const { [name]: _, ...stopwatches } = $storage.stopwatches;
        $storage.stopwatches = stopwatches as { [name: string]: Stopwatch };
    }
</script>

<fieldset class:start>
    <legend>{name}</legend>
    <code>{hhmmss(display)}</code>
    <section>
        <button on:click={() => (start?off:on)(display)} class="material-icons">
            {#if start}pause{:else}play_arrow{/if}
        </button>
        <button on:click={edit} class="material-icons">edit</button>
        <button on:click={remove} class="material-icons">delete</button>
    </section>
</fieldset>

<style lang="sass">
    @use '../app' as *
    @use 'sass:color'
    fieldset
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        user-select: none
        padding: 0
    legend
        margin-left: 1em
    .start
        border-color: $lime
        color: $lime
    code
        width: 100%
        text-align: center
        font-family: $mono
    section
        display: flex
        justify-content: center
        width: 100%
        align-items: center
    button
        flex: 1
        background: $darkest
        color: unset
        border: none
        cursor: pointer
</style>