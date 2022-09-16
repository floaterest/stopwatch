<script lang="ts">
    import { now, storage, tonumber } from './stores';
    import type { Stopwatch } from './storage';

    let value = '', focus = false;
    const init: Stopwatch = { duration: 0, timestamp: now(), reset: 0 };
    $: names = value.trim().split(' ');
    $: stopwatches = value.trim().split(/\s+/).filter(Boolean).map(
        s => [s, ...s.split('@', 2)]
    ).map(
        ([s, name, rest]) => ({ s, name, reset: tonumber(rest) })
    ).map(
        ({ s, name, reset }) => isFinite(reset) ?
            { name, stopwatch: { reset, duration: reset } } :
            { name: s, stopwatch: {} }
    ) as { name: string, stopwatch: Partial<Stopwatch> }[];
    $: err = stopwatches.find(({ name }) => $storage.stopwatches[name])?.name || '';


    function submit({ keyCode }){
        if(keyCode !== 13 || err) return;
        /// push new stopwatches
        $storage.stopwatches = Object.assign($storage.stopwatches, ...stopwatches.map(
            ({ name, stopwatch }) => ({ [name]: { ...init, ...stopwatch } })
        ));
        value = '';
    }

    const input = { type: 'text', placeholder: 'Type titles here...' };
</script>

<section class:err class:focus>
    <span class="material-icons-round">timer</span>
    <input id="stopwatch" {...input} bind:value on:keyup={submit}
           on:focusin={() => focus = true} on:focusout={() => focus = false}>
    <input id="increment" type="number" bind:value={$storage.increment}/>
</section>
{#if err}
    <div id="err"><code>{err}</code> already exists!</div>
{/if}

<style lang="sass">
    @use '../colors' as *
    @use '../mixins' as *

    $radius: 1em
    @mixin color($color)
        border-color: $color
        .material-icons-round
            color: $color

    section, #err
        font-size: 0.5em
    #err
        color: $pink
        font-family: Roboto, sans-serif
    input#increment
        width: 5em
    section
        @include transition(border)
        border-radius: $radius
        width: 100%
        border: 1px solid $white
        display: flex
        align-items: center
        span.material-icons-round
            @include transition(color)
            display: flex
            align-items: center
            justify-content: center
            margin: 0.2em
        input#stopwatch
            width: 90%
        input#increment
            width: 5%
            padding-left: 0.5em
            border-left: 1px solid $white
        &.focus
            @include color($teal)
        &.err
            @include color($pink)
</style>