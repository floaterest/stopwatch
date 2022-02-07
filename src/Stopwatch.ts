export interface Stopwatch{
    started: boolean
    /**
     * last time when stopwatch is started in unix time(ms)
     */
    timestamp: number
    /**
     * number of seconds before the stopwatch is started
     */
    before: number
    /**
     * total number of seconds
     */
    total: number
    /**
     * indicates whether the stopwatch is preview only
     */
    dead: boolean
}

export interface Stopwatches{
    [title: string]: Stopwatch;
}
