<script lang="ts">
    import type { Stopwatch } from './storage';
    import { started, storage } from './stores';
    import { hhmmss, seconds } from './helpers';

    export let stopwatch: Stopwatch;
    export let now: number = stopwatch.timestamp;
    export let name: string;
    export let on: (display: number) => void;
    export let off: (display: number) => void;

    $: display = seconds(stopwatch, $storage.increment, now);
    let contenteditable = false;
    const start = $started.has(name);
    const _on = () => on(display);
    const _off = () => off(display);

    function focusout({ target }: { target: HTMLElement }){
        console.log(name, 'focusout', target.innerText);
        contenteditable = false;
    }

    function edit(){
        contenteditable = true;
    }

    function remove(){
        off(display);
        const { [name]: _, ...stopwatches } = $storage.stopwatches;
        $storage.stopwatches = stopwatches as { [name: string]: Stopwatch };
    }
</script>

<fieldset class:start>
    <legend>{name}</legend>
    <code {contenteditable} on:focusout={focusout}>{hhmmss(display)}</code>
    <section>
        {#if start}
            <button on:click={_off} class="material-icons">pause</button>
        {:else}
            <button on:click={edit} class="material-icons">edit</button>
            <button on:click={_on} class="material-icons">play_arrow</button>
            <button on:click={remove} class="material-icons">delete</button>
        {/if}
    </section>
</fieldset>

<style lang="sass">
    @use '../app' as *
    @use 'sass:color'
    .start
        border-color: $lime
        color: $lime
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