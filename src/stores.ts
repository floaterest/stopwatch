import { Writable, writable } from 'svelte/store';
import type Stopwatch from './Stopwatch';

/**
 * convert seconds to HH:MM:SS
 */
function time(seconds: number): string{
    // convert to HH:MM:SS
    let h: number | string = Math.floor(seconds / 3600);
    let m: number | string = Math.floor(seconds / 60) % 60;
    let s: number | string = seconds % 60;

    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m;
    if(s < 10) s = '0' + s;
    return h + ':' + m + ':' + s;
}

export const addStopwatch = (() => {
    const { subscribe, update } = writable(false);

    return {
        subscribe,
        toggle: () => update(add => !add),
    };
})();


export const stopwatches = (() => {
    const { subscribe, update, set } = writable<Stopwatch[]>([]);
    return {
        subscribe,
        update,
        set,
        time: time,
    };
})() as Writable<Stopwatch[]> & { time: (seconds: number) => string };
