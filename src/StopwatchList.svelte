<script lang="ts">
    import StopwatchItem from './StopwatchItem.svelte';

    import type Stopwatch from './Stopwatch';

    import { stopwatches } from './stores';

    // create sample stopwatches
    if(!$stopwatches.length){
        const titles = Array.from(Array(8), (_, i) => i).map(i => i.toString().padStart(3, '0'));
        stopwatches.set(titles.map(t => ({
            started: false,
            title: t,
            timestamp: new Date().getTime(),
            seconds: 0,
            time: stopwatches.time(0),
            dead: false,
        })));
    }

    let interval: number;
    let counting = 0;
    let doubleClick: string;
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
        stopwatches.update(sws => sws.map(sw => {
            if(sw.started){
                sw.time = stopwatches.time(sw.seconds + delta(sw.timestamp));
            }
            return sw;
        }));
    }

    /**
     * toggle clicked stopwatch and set/clear interval if needed
     */
    function onClick(sw: Stopwatch){
        now = new Date().getTime();
        // if this click is the second click from a double click
        if(doubleClick == sw.title){
            // pause all stopwatches
            stopwatches.update(sws => sws.map(sw => {
                if(sw.started){
                    sw.started = false;
                    sw.seconds += delta(sw.timestamp);
                }
                return sw;
            }));
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
        stopwatches.update(sws => sws.map(sw => sw.title === sw.title ? sw : sw));
    }
</script>

<form>
    <label for="add"></label>
    <input id="add" type="text" placeholder="type title here">
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
    </button>
</form>
<section>
    {#each $stopwatches as stopwatch}
        <StopwatchItem {stopwatch} {onClick}/>
    {/each}
</section>

<style lang="less">
	form{
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		border-radius: 1rem;
		border: 1px solid white;

		input{
			margin: 0 10px;
			outline: none;
			background: none;
			border: none;
			font-size: 1rem;
			width: 100%;

			&::placeholder{
				color: var(--text-color);
			}
		}
	}


	section{
		width: 100%;
		display: grid;
		gap: 1rem;
		font-size: 3rem;
		grid-template-columns:repeat(auto-fill, minmax(270px, 1fr));
	}
</style>
