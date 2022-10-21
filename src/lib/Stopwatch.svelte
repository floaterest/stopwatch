<script lang="ts">
    import type { Stopwatch } from './storage';
    import { now as _now, started, storage, tonumber } from './stores';

    export let stopwatch: Stopwatch;
    export let now: number = stopwatch.timestamp;
    export let name: string;

    $: seconds = (() => {
        const { duration: du, timestamp: ts } = stopwatch;
        return Math.max(du + (now - ts) * $storage.increment, 0);
    })();
    $: display = [seconds / 3600, seconds / 60, seconds].map(
        n => (n % 60 | 0).toString().padStart(2, '0')
    ).join(':');

    let disabled = false;
    let focus = false;
    const start = $started.has(name);
    const contenteditable = !start;

    function on(){
        $storage.stopwatches[name].timestamp = _now();
        $started = $started.add(name);
    }

    function off(){
        $storage.stopwatches[name].duration = seconds;
        $started.delete(name);
        $started = $started;
    }

    function fout({ target: { innerText } }: { target: HTMLElement }){
        focus = false;
        const n = tonumber(innerText);
        if(!(disabled = isNaN(n)))
            $storage.stopwatches[name].duration = n;
    }

    function fin(){
        disabled = false;
        focus = true;
    }

    function reset(){
        disabled = false;
        stopwatch.duration = stopwatch.reset;
    }

    function remove(){
        const { [name]: _, ...stopwatches } = $storage.stopwatches;
        $storage.stopwatches = stopwatches as { [name: string]: Stopwatch };
    }
</script>

<fieldset class:start class:focus>
    <legend>{name}</legend>
    <code {contenteditable} on:focusout={fout} on:focusin={fin}
          class:disabled>{display}</code>
    <section class="material-icons-round">
        {#if start}
            <button on:click={off}>pause</button>
        {:else}
            <button on:click={reset}>replay</button>
            <button on:click={on} {disabled}>play_arrow</button>
            <button on:click={remove}>delete_forever</button>
        {/if}
    </section>
</fieldset>

<style lang="sass">
    @use '../colors' as *
    @use '../mixins' as *
    @use 'sass:color'
    .start
        border-color: $lime
        color: $lime
    .disabled
        color: $pink
    .focus
        legend
            color: $teal
        border-color: $teal
    fieldset
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        padding: 0
        @include transition(border)
    legend
        user-select: none
        margin-left: 1em
        @include transition(color)
    section
        display: flex
        justify-content: center
        width: 100%
        align-items: center
    button
        flex: 1
        background: $darkest
        &[disabled]
            cursor: unset
            filter: brightness(50%)
</style>