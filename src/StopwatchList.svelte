<script lang="ts">
    import StopwatchItem from './StopwatchItem.svelte';
    import type Stopwatch from './Stopwatch';

    function time(seconds: number){
        // convert to HH:MM:SS
        let h: number | string = Math.floor(seconds / 3600);
        let m: number | string = Math.floor(seconds / 60) % 60;
        let s: number | string = seconds % 60;

        if(h < 10) h = '0' + h;
        if(m < 10) m = '0' + m;
        if(s < 10) s = '0' + s;
        return h + ':' + m + ':' + s;
    }

    const titles = Array.from(Array(30), (_, i) => i).map(i => i.toString().padStart(3, '0'));
    let sws: Stopwatch[] = titles.map(t => {
        return {
            title: t,
            timestamp: new Date() as number,
            seconds: 0,
            started: false,
            time: time(0),
        };
    });

    function onClick(s: Stopwatch){
        console.log(s.title, s.started);
        s.started = !s.started;
        sws = sws.map(sw => sw.title === s.title ? s : sw);
    }
</script>

<section>
    {#each sws as stopwatch}
        <StopwatchItem {stopwatch} {onClick}/>
    {/each}
</section>

<style>
    section{
        display: grid;
        gap: 1rem;
        font-size: 3rem;
        grid-template-columns:repeat(auto-fill, minmax(270px, 1fr));
    }
</style>
