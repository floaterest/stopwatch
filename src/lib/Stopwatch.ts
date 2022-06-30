export interface Stopwatch{
	started: boolean;
	/// when stopwatch is paused
	timestamp: number;
	/// duration when stopwatch is pased
	duration: number;
}