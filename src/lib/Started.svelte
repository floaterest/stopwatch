<script lang="ts">
    import Stopwatch from './Stopwatch.svelte';
    import { now } from './stores';
</script>

<Stopwatch {...$$props} now="{$now}"/>
