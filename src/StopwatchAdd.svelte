<script lang="ts">
    import StopwatchItem from './StopwatchItem.svelte';

    import type Stopwatch from './Stopwatch';
    import { stopwatches } from './stores';

    let message = '';
    let input: string;
    let previews: Stopwatch[] = [];

    function check(stopwatches: Stopwatch[], s: string){
        if(!s){
            return 'Title cannot be empty string or ends with space!';
        }
        // no leading/trailing space
        s = s.trim();
        if(stopwatches.some(sw => sw.title === s)){
            return s + ' already exists!';
        }

    }

    function create(e: KeyboardEvent){
        // add multiple stopwatches for space separated input
        let titles = input.split(' ');
        // check each title
        if(titles.some(t => message = check($stopwatches, t))){
            return;
        }

        previews = titles.map(t => ({
            title: t,
            timestamp: 0,
            seconds: 0,
            started: false,
            time: stopwatches.time(0),
        }));

        // no error
        message = 'will create ' + titles.toString();
        // create element on Enter
        if(e.key !== 'Enter') return;
        let toAdd = titles.map(t => ({
            title: t,
            timestamp: new Date().getTime(),
            seconds: 0,
            started: false,
            time: stopwatches.time(0),
        }));

        stopwatches.update(sws => [ ...sws, ...toAdd ]);
        console.debug('created ', titles);
    }
</script>

<label>
    <input type="text" bind:value={input}
           on:keyup={create} placeholder="type title here">
</label>
{#if message}
    <span>{message}</span>
{/if}
<section>
    {#each previews as stopwatch}
        <StopwatchItem {stopwatch} onClick={null}/>
    {/each}
</section>

<style>
    input{
        font-size: 1rem;
    }
</style>
