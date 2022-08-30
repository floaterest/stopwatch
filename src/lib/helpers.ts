import type { Stopwatch } from './State';

export function now(): number{
    /// current timpstamp in seconds
    return new Date().getTime() / 1000 | 0;
}

export function seconds(stopwatch: Stopwatch, increment: number, now: number){
    const { duration: du, timestamp: ts } = stopwatch;
    return Math.max(du + (now - ts) * increment, 0);
}

export function hhmmss(s: number){
	return [s / 3600 | 0, (s / 60 | 0) % 60, s % 60].map(
		n => n.toString().padStart(2, '0')
	).join(':');
}