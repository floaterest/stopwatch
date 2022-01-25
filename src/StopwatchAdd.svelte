<script lang="ts">
    import { stopwatches } from './stores';
    import type Stopwatch from './Stopwatch';

    let message = '';
    let input: string;

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
    <input type="text"
           bind:value={input}
           on:keyup={create}
           placeholder="type title here"
    >
    {#if message}
        <span>{message}</span>
    {/if}
</label>

<style>
    input{
        font-size: 1rem;
    }
</style>
