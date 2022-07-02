export interface Stopwatch{
	started: boolean;
	/// when stopwatch is paused
	timestamp: number;
	// stored duration when stopwatch is paused
	duration: number;
}

export function hhmmss(seconds: number){
	seconds = seconds || 0;
	return [seconds / 3600 | 0, (seconds / 60 | 0) % 60, seconds % 60].map(
		n => n.toString().padStart(2, '0')
	).join(':');
}
