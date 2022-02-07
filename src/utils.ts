import type { Stopwatch } from './Stopwatch';

/**
 * convert seconds to HH:MM:SS
 */
export function time(seconds: number): string{
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
export const create = (dead: boolean = false): Stopwatch => ({
    started: false,
    timestamp: 0,
    before: 0,
    total: 0,
    dead: dead,
});
