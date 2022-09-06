export const key = 'stopwatch';

export interface Stopwatch{
    /// when stopwatch is paused
    timestamp: number;
    // stored duration when stopwatch is paused
    duration: number;
}

export interface Storage{
    /// number of seconds to increment on each IRL second
    increment: number;
    stopwatches: { [name: string]: Stopwatch };
}
