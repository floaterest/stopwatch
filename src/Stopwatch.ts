export default interface Stopwatch{
    /*
    must be unique across all stopwatches
     */
    title: string
    /*
    last time when stopwatch is started in unix time(ms)
     */
    timestamp: number
    /*
    number of seconds since the stopwatch is started
     */
    seconds: number
    started: boolean
    /*
    time displayed in the ui
     */
    time: string
}
