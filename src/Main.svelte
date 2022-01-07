<script lang="ts">
    import StopwatchItem from './StopwatchItem.svelte';

    const titles = Array.from(Array(30), (_, i) => i).map(i => i.toString().padStart(3, '0'));
</script>

<main>
    <section>
        {#each titles as title}
            <StopwatchItem title={title}/>
        {/each}
    </section>
</main>

<style>
    section{
        display: grid;
        gap: 1rem;
        font-size: 3rem;
        grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));
    }

    main{
        padding: 1rem;

    }

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
