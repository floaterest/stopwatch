<script lang="ts">
    import type { Stopwatch } from './storage';
    import { editing, started, storage } from './stores';
    import { toseconds } from './helpers';

    export let stopwatch: Stopwatch;
    export let now: number = stopwatch.timestamp;
    export let name: string;
    export let on: (seconds: number) => void;
    export let off: (seconds: number) => void;

    $: seconds = toseconds(stopwatch, $storage.increment, now);
    $: contenteditable = $editing == name;
    $: display = [seconds / 3600, seconds / 60, seconds].map(
        n => (n % 60 | 0).toString().padStart(2, '0')
    ).join(':');

    let err = false;
    const start = $started.has(name);

    function fout({ target: { innerText } }: { target: HTMLElement }){
        if((err = !/\d\d:\d\d:\d\d/.test(innerText))) return;
        off(innerText.split(':').map(Number).reduceRight(
            ({ acc, mul }, cur) => ({ acc: acc + cur * mul, mul: mul * 60 }),
            { acc: 0, mul: 1 }
        ).acc);
        $editing = '';
    }

    function remove(){
        off(seconds);
        const { [name]: _, ...stopwatches } = $storage.stopwatches;
        $storage.stopwatches = stopwatches as { [name: string]: Stopwatch };
    }

</script>

<fieldset class:start>
    <legend>{name}</legend>
    <code {contenteditable} on:focusout={fout} on:focusin={()=> err = false} class:err>{display}</code>
    <section class="material-icons">
        {#if start}
            <button on:click={() => off(seconds)}>pause</button>
        {:else}
            <button on:click={() => $editing = name}>edit</button>
            <button on:click={() => on(seconds)}>play_arrow</button>
            <button on:click={remove}>delete</button>
        {/if}
    </section>
</fieldset>

<style lang="sass">
    @use '../app' as *
    @use 'sass:color'
    .start
        border-color: $lime
        color: $lime
    .err
        color: $pink
    fieldset
        display: flex
        font-size: 2em
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
    section
        display: flex
        justify-content: center
        width: 100%
        align-items: center
    button
        flex: 1
        background: $darkest
        font-size: 2em
        font-family: unset
        color: unset
        border: none
        cursor: pointer
</style>