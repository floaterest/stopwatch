<script lang="ts">
    import { state } from './stores';
    import { now } from './helpers';
    import type { Stopwatch } from './State';

    let value = '';
    $: names = value.trim().split(' ');
    $: error = names.find(name => $state.stopwatches[name]) || '';

    const input = {
        type: 'text',
        placeholder: 'Type titles here...'
    };

    function submit({ keyCode }){
        if(keyCode !== 13) return;
        /// push new stopwatches
        const stopwatch: Stopwatch = { timestamp: now(), duration: 0 };
        $state.stopwatches = Object.assign($state.stopwatches, ...names.map(
            name => ({ [name]: { ...stopwatch } })
        ));
        value = '';
    }

</script>

<input {...input} bind:value class:error on:keyup={submit}>
<span>{error && `${error} already exists!`}</span>

<style lang="sass">
    @use '../app' as *
    input
        font-size: unset
        box-sizing: border-box
        border-radius: 3em
        border: 1px solid $white
        background: unset
        color: unset
        width: 100%
        padding: 1em
        height: 1em
</style>