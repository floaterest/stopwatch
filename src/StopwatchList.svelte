<script lang="ts">
    import StopwatchInput from './StopwatchInput.svelte';
    import StopwatchItem from './StopwatchItem.svelte';

    import { stopwatches } from './stores';
    import { create } from './utils';

    // if has local storage
    let input = localStorage.getItem('input') ?? '';
    if(input){
        console.debug('found"', input, '"from localStorage');
    }else{
        const titles = Array.from(Array(8), (_, i) => i).map(i => i.toString().padStart(3, '0'));
        stopwatches.set(titles.reduce((obj, title) => ({ ...obj, [title]: create() }), {}));
    }

    // id for setInterval
    let interval: number;
    // number of active stopwatches
    let active = 0;
    // title of the stopwatch that is being double clicked
    let doubleClick: string;
    // current timestamp
    let now: number;

    /**
     * returns number of seconds since start time to now
     * @param timestamp start timestamp
     */
    function delta(timestamp: number){
        return Math.floor((now - timestamp) / 1000);
    }

    /**
     * find all started stopwatches and update their displayed time
     */
    function update(){
        now = new Date().getTime();
        stopwatches.update(sws => Object.entries(sws).reduce((obj, [ key, sw ]) => {
            if(sw.started){
                sw.total = sw.before + delta(sw.timestamp);
            }
            return { ...obj, [key]: sw };
        }, {}));
    }

    /**
     * toggle clicked stopwatch and set/clear interval if needed
     */
    function onClick(title: string){
        now = new Date().getTime();
        // if this click is the second click from a double click
        if(doubleClick == title){
            // pause all stopwatches
            stopwatches.update(sws => Object.entries(sws).reduce((obj, [ key, sw ]) => {
                if(sw.started){
                    sw.started = false;
                    sw.before += delta(sw.timestamp);
                }
                return { ...obj, [key]: sw };
            }, {}));
            // reset to 0 counting stopwatches and clear interval
            console.debug('cleared interval after double click');
            clearInterval(interval);
            interval = null;
            active = 0;

            return;
        }

        const sw = { ...$stopwatches[title] };
        sw.started = !sw.started;
        if(sw.started){
            active++;
            // update timestamp
            sw.timestamp = now;
            // set the interval if not set yet
            if(!interval){
                console.debug('created new interval');
                interval = setInterval(update, 1000) as number;
            }
        }else{
            active--;
            // update seconds
            sw.before += delta(sw.timestamp);
            // clear interval if all stopwatches are stopped
            if(!active){
                console.debug('cleared interval');
                clearInterval(interval);
                interval = null;
            }
        }
        /**
         * the next click in 500ms will be considered a double click
         * according to Windows, the default timing of a double click is 500ms
         * source: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setdoubleclicktime
         */
        doubleClick = title;
        setTimeout(() => doubleClick = null, 500);

        // update the clicked stopwatch
        stopwatches.update(sws => ({ ...sws, [title]: sw }));
    }
</script>

<StopwatchInput {input}/>
<section>
    {#each Object.entries($stopwatches) as [title, stopwatch]}
        <StopwatchItem {title} {stopwatch} {onClick}/>
    {/each}
</section>

<style>
    section{
        width: 100%;
        display: grid;
        gap: 1rem;
        font-size: 3rem;
        grid-template-columns:repeat(auto-fill, minmax(270px, 1fr));
    }
</style>
