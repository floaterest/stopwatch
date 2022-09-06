<script lang="ts">
    import type { Stopwatch } from './storage';
    import { started, storage } from './stores';
    import { hhmmss, seconds } from './helpers';

    export let stopwatch: Stopwatch;
    export let now: number = stopwatch.timestamp;
    export let name: string;
    export let on: () => void;
    export let off: () => void;

    let contenteditable = false;

    function focusout({ target }: { target: HTMLElement }){
        console.log(name, 'focusout', target.innerText);
        contenteditable = false;
    }

    function edit(){
        console.log(name, 'edit');
        contenteditable = true;
    }

    function remove(){
        off();
        const { [name]: _, ...stopwatches } = $storage.stopwatches;
        $storage.stopwatches = stopwatches as { [name: string]: Stopwatch };
    }

    const start = $started.has(name);
    $: display = seconds(stopwatch, $storage.increment, now);
</script>

<fieldset class:start>
    <legend>{name}</legend>
    <code {contenteditable} on:focusout={focusout}>{hhmmss(display)}</code>
    <section>
        <button on:click={() => (start?off:on)(display)} class="material-icons">
            {#if start}pause{:else}play_arrow{/if}
        </button>
        <button on:click={edit} class:disabled={start} class="material-icons">
            edit
        </button>
        <button on:click={remove} class="material-icons">delete</button>
    </section>
</fieldset>

<style lang="sass">
    @use '../app' as *
    @use 'sass:color'
    button.disabled
        filter: brightness(50%)
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
        &:not(.disabled)
            cursor: pointer
</style>