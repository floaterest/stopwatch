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

<section>
    <div id="stopwatch" class:err class:focus>
        <span class="material-icons-round">timer</span>
        <input {...input} bind:value on:keyup={submit}
               on:focusin={() => focus = true} on:focusout={() => focus = false}>
    </div>
    <input id="increment" type="number" bind:value={$storage.increment}/>
</section>
<div id="err">{err && `${err} already exists!`}</div>

<style lang="sass">
    @use '../colors' as *
    $radius: 1em
    @mixin transition($prop)
        transition-property: $prop
        transition-duration: 200ms
    @mixin color($color)
        border-color: $color
        .material-icons-round
            color: $color
    section, #err
        font-size: 0.5em
    #err
        color: $pink
    section
        display: flex

    input#increment
        width: 5em
    #stopwatch
        @include transition(border)
        border-radius: $radius
        width: 90%
        border: 1px solid $white
        display: flex
        align-items: center
        span.material-icons-round
            @include transition(color)
            display: flex
            align-items: center
            justify-content: center
            padding: 0.2em
        input
            width: 100%
            padding-right: $radius
        &.focus
            @include color($teal)
        &.err
            @include color($pink)
</style>