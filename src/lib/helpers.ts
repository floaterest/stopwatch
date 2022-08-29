import type { Stopwatch } from './State';

export function now(): number{
    /// current timpstamp in seconds
    return new Date().getTime() / 1000 | 0;
}

export function hhmmss(stopwatch: Stopwatch, increment: number, now: number){
    const { duration: du, timestamp: ts } = stopwatch;
    const seconds = Math.max(du + (now - ts) * increment, 0);
    return [seconds / 3600 | 0, (seconds / 60 | 0) % 60, seconds % 60].map(
        n => n.toString().padStart(2, '0')
    ).join(':');
}