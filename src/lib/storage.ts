export const key = 'stopwatch';

export interface Stopwatch{
    // stored duration when stopwatch is paused
    duration: number;
    // duration to reset to
    reset: number;
    /// when stopwatch is paused
    timestamp: number;
}

export interface Storage{
    /// number of seconds to increment on each IRL second
    increment: number;
    stopwatches: { [name: string]: Stopwatch };
}
