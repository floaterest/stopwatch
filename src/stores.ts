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

/**
 * create an empty stopwatch
 */
function create(title: string, dead: boolean = false): Stopwatch{
    return {
        started: false,
        title: title,
        timestamp: 0,
        seconds: 0,
        time: time(0),
        dead: dead,
    };
}

export const stopwatches = (() => {
    const { subscribe, update, set } = writable<Stopwatch[]>([]);
    return {
        subscribe,
        update,
        set,
        time: time,
        create: create,
    };
})() as Writable<Stopwatch[]> & {
    time: (seconds: number) => string,
    create: (title: string) => Stopwatch,
};
