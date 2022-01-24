<script lang="ts">
    import StopwatchList from './StopwatchList.svelte';
    import StopwatchAdd from './StopwatchAdd.svelte';

    import { addStopwatch } from './stores';
</script>

<main>
    {#if $addStopwatch}
        <StopwatchAdd/>
    {:else}
        <StopwatchList/>
    {/if}
</main>

<style>
    main{
        padding: 1rem;
    }

    /* large screen */
    @media only screen and (min-width: 600px){
        main{
            margin-left: 4rem;
        }
    }

    /* small screen */
    @media only screen and (max-width: 600px){
        main{
            margin-left: 0;
        }
    }
</style>
