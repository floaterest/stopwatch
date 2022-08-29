import type { Stopwatch } from './State';

export function now(): number{
    /// current timpstamp in seconds
    return new Date().getTime() / 1000 | 0;
}

export function hhmmss({ timestamp, duration }: Stopwatch, increment: number){
    return '';
}