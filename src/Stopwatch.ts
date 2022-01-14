export default interface Stopwatch{
    started: boolean
    /**
     * displayed title, must be unique across all stopwatches
     */
    title: string
    /**
     * last time when stopwatch is started in unix time(ms)
     */
    timestamp: number
    /**
     * number of seconds since the stopwatch is started
     */
    seconds: number
    /**
     * time displayed in the ui
     */
    time: string
}
