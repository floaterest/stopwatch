<script lang="ts">
    import { now, storage } from './stores';
    import type { Stopwatch } from './storage';

    let value = '';
    $: names = value.trim().split(' ');
    $: error = names.find(name => $storage.stopwatches[name]) || '';

    const input = { type: 'text', placeholder: 'Type titles here...' };

    function submit({ keyCode }){
        if(keyCode !== 13) return;
        /// push new stopwatches
        const stopwatch: Stopwatch = { duration: 0, timestamp: now(), reset: 0 };
        $storage.stopwatches = Object.assign($storage.stopwatches, ...names.map(
            name => ({ [name]: { ...stopwatch } })
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