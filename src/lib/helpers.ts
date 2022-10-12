import type { Stopwatch } from './storage';

export function now(): number{
    /// current timpstamp in seconds
    return new Date().getTime() / 1000 | 0;
}

export function toseconds(stopwatch: Stopwatch, increment: number, now: number){
    const { duration: du, timestamp: ts } = stopwatch;
    return du + Math.max((now - ts) * increment, 0);
}

export function hhmmss(s: number){
    return [s / 3600 | 0, (s / 60 | 0) % 60, s % 60].map(
        n => n.toString().padStart(2, '0')
    ).join(':');
}

export function parse(s: string): number | null{
    /// parse hhmmss to seconds
    if(!/\d\d:\d\d:\d\d/.test(s)) return null;
    return s.split(':').map(Number).reduceRight(
        ([acc, mul], cur) => [acc + cur * mul, mul * 60], [0, 1]
    )[0];
}