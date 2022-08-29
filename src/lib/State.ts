export interface Stopwatch{
    /// when stopwatch is paused
    timestamp: number;
    // stored duration when stopwatch is paused
    duration: number;
}

export interface State{
    /// key for localStorage
    key: string;
    /// number of seconds to increment on each IRL second
    increment: number;
    /// set of names
    started: Set<string>;
    stopwatches: { [name: string]: Stopwatch };
}
