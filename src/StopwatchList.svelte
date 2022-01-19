<script lang="ts">
    import StopwatchItem from './StopwatchItem.svelte';
    import type Stopwatch from './Stopwatch';

    // create sample stopwatches
    const titles = Array.from(Array(8), (_, i) => i).map(i => i.toString().padStart(3, '0'));
    let stopwatches: Stopwatch[] = titles.map(t => {
        return {
            title: t,
            timestamp: new Date().getTime(),
            seconds: 0,
            started: false,
            time: time(0),
        };
    });

    let interval: number;
    let counting = 0;
    let doubleClick: string;
    let now: number;

    /**
     * convert seconds to HH:MM:SS
     */
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
        stopwatches = stopwatches.map(sw => {
            if(sw.started){
                sw.time = time(sw.seconds + delta(sw.timestamp));
            }
            return sw;
        });
    }

    /**
     * toggle clicked stopwatch and set/clear interval if needed
     */
    function onClick(sw: Stopwatch){
        now = new Date().getTime();
        // if this click is the second click from a double click
        if(doubleClick == sw.title){
            // pause all stopwatches
            stopwatches = stopwatches.map(sw => {
                if(sw.started){
                    sw.started = false;
                    sw.seconds += delta(sw.timestamp);
                }
                return sw;
            });
            // reset to 0 counting stopwatches and clear interval
            console.debug('cleared interval after double click');
            clearInterval(interval);
            interval = null;
            counting = 0;

            return;
        }

        sw.started = !sw.started;
        if(sw.started){
            counting++;
            // update timestamp
            sw.timestamp = now;
            // set the interval if not set yet
            if(!interval){
                console.debug('created new interval');
                interval = setInterval(update, 1000) as number;
            }
        }else{
            counting--;
            // update seconds
            sw.seconds += delta(sw.timestamp);
            // clear interval if all stopwatches are stopped
            if(!counting){
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
        doubleClick = sw.title;
        setTimeout(() => doubleClick = null, 500);

        // update the clicked stopwatch
        stopwatches = stopwatches.map(sw => sw.title === sw.title ? sw : sw);
    }
</script>

<section>
    {#each stopwatches as stopwatch}
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
