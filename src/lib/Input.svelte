<script lang="ts">
    import { now, storage, tonumber } from './stores';
    import type { Stopwatch } from './storage';

    let value = '';
    const input = { type: 'text', placeholder: 'Type titles here...' };
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
    $: error = stopwatches.find(({ name }) => $storage.stopwatches[name])?.name || '';


    function submit({ keyCode }){
        if(keyCode !== 13 || error) return;
        /// push new stopwatches
        $storage.stopwatches = Object.assign($storage.stopwatches, ...stopwatches.map(
            ({ name, stopwatch }) => ({ [name]: { ...init, ...stopwatch } })
        ));
        value = '';
    }

</script>

<section>
    <input {...input} bind:value id="stopwatch" class:error on:keyup={submit}>
    <input id="increment" type="number" bind:value={$storage.increment}/>
</section>
<span>{error && `${error} already exists!`}</span>

<style lang="sass">
    @use '../app' as *

    section
        display: flex
    input
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
            -webkit-appearance: none
            margin: 0
        &[type=number]
            -moz-appearance: textfield
        font-size: unset
        box-sizing: border-box
        background: unset
        color: unset
        padding: 1em
        height: 1em
    input#increment
        width: 5em
    input#stopwatch
        width: 90%
        border-radius: 3em
        border: 1px solid $white
</style>