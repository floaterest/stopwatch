<script lang="ts">
    import Stopwatch from './Stopwatch.svelte';
    import { now } from './stores';

    export let stopwatch: Stopwatch;
</script>

<Stopwatch {...$$props} now="{$now}"/>
