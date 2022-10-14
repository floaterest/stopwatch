<script lang="ts">
    import Stopwatch from './Stopwatch.svelte';
    import { int } from './stores';
</script>

<Stopwatch {...$$props} now="{$int}"/>
