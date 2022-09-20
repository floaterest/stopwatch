<script lang="ts">
    import type { Stopwatch } from './storage';
    import { increment, now as _now, started, stopwatches, tonumber } from './stores';

    export let stopwatch: Stopwatch;
    export let now: number = stopwatch.timestamp;
    export let name: string;

    let focus = false;
    const start = $started.has(name);
    const { duration: du, timestamp: ts } = stopwatch;

    $: seconds = Math.max(du + (now - ts) * $increment, 0);
    $: innerHTML = [seconds / 3600, seconds / 60, seconds].map(
        n => (n % 60 | 0).toString().padStart(2, '0')
    ).join(':');
    $: disabled = start || isNaN(tonumber(innerHTML));

    function on(){
        $stopwatches[name].duration = tonumber(innerHTML);
        $stopwatches[name].timestamp = _now();
        $started = $started.add(name);
    }

    function off(){
        $stopwatches[name].duration = seconds;
        $started.delete(name);
        $started = $started;
    }

    function reset(){
        stopwatch.duration = stopwatch.reset;
    }

    function remove(){
        const { [name]: _, ...sws } = stopwatches;
        $stopwatches = sws as { [name: string]: Stopwatch };
    }
</script>

<fieldset class:start class:focus>
    <legend>{name}</legend>
    {#if start}
        <code>{innerHTML}</code>
    {:else}
        <code on:focusout={() => focus = false} on:focusin={() => focus = true}
              contenteditable="true" class:disabled bind:innerHTML></code>
    {/if}
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
        user-select: none
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