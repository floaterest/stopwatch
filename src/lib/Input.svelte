<script lang="ts">
    import { increment, now, stopwatches, tonumber } from './stores';
    import type { Stopwatch } from './storage';

    let value = '', focus = false;
    const init: Stopwatch = { duration: 0, timestamp: now(), reset: 0 };
    $: res = value.trim().split(/\s+/).filter(Boolean).map(
        s => [s, ...s.split('@', 2)]
    ).map(
        ([s, name, rest]) => ({ s, name, reset: tonumber(rest) })
    ).map(
        ({ s, name, reset }) => isFinite(reset) ?
            { name, stopwatch: { reset, duration: reset } } :
            { name: s, stopwatch: {} }
    ) as { name: string, stopwatch: Partial<Stopwatch> }[];
    $: err = res.find(({ name }) => $stopwatches[name])?.name || '';


    function submit(){
        /// push new stopwatches
        $stopwatches = Object.assign($stopwatches, ...res.map(
            ({ name, stopwatch }) => ({ [name]: { ...init, ...stopwatch } })
        ));
        value = '';
    }

    const input = {
        type: 'text',
        placeholder: 'Type titles here...',
        autocomplete: 'off'
    };
</script>

<section class:err class:focus on:focusin={() => focus = true} on:focusout={() => focus = false}>
    <form on:submit|preventDefault={submit}>
        <label for="stopwatch" class="material-icons-round">timer</label>
        <input id="stopwatch" {...input} bind:value>
    </form>
    <input id="increment" type="number" bind:value={$increment}/>
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
    section
        @include transition(border)
        border-radius: $radius
        width: 100%
        border: 1px solid $white
        display: flex
        align-items: center
        &.focus
            @include color($teal)
        &.err
            @include color($pink)
    form
        display: flex
        flex: 1
    .material-icons-round
        @include transition(color)
        display: flex
        align-items: center
        justify-content: center
        margin: 0.2em
    input#stopwatch
        flex: 1
        width: 100%
    input#increment
        width: 2.5em
        padding-right: 1em
        padding-left: 0.5em
        border-left: 1px solid $white
        text-align: right
</style>