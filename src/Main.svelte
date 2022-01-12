<script lang="ts">
    import StopwatchItem from './StopwatchItem.svelte';
    import type Stopwatch from './Stopwatch';

    function tostr(seconds: number){
        return [
            Math.floor(seconds / 3600), // hours
            Math.floor((seconds % 3600) / 60), // minutes
            seconds % 60, // seconds
        ].map(t => t.toString().padStart(2, '0')).join(':');
    }

    const titles = Array.from(Array(30), (_, i) => i).map(i => i.toString().padStart(3, '0'));
    let sws: Stopwatch[] = titles.map(t => {
        return {
            title: t,
            started: false,
            elapsed: 0,
            time: tostr(0),
        };
    });

    function onChange(title: string, started: boolean){
        console.log(title, started);
    }
</script>

<main>
    <section>
        {#each sws as stopwatch}
            <StopwatchItem {stopwatch} {onChange}/>
        {/each}
    </section>
</main>

<style>
    section{
        display: grid;
        gap: 1rem;
        font-size: 3rem;
        grid-template-columns:repeat(auto-fill, minmax(270px, 1fr));
    }

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
