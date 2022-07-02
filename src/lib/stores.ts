import { derived, readable, writable } from 'svelte/store';
import type { Stopwatch } from './Stopwatch';

const time = () => new Date().getTime() / 1000 | 0;

// current time in seconds
export const now = readable<number>(time(), set => {
	const interval = setInterval(() => set(time()), 1000);
	return () => clearInterval(interval);
});

const timestamp = time();
const started = false;
const duration = 0;
// stopwatch title -> stopwatch
export const stopwatches = writable<{ [id: string]: Stopwatch }>({
	a: { started, timestamp, duration },
	b: { started, timestamp, duration },
	c: { started, timestamp, duration },
	d: { started, timestamp, duration },
});

// stopwatch title -> current number of seconds
export const times = derived<any[], { [id: string]: number }>([now, stopwatches],
	([$now, $stopwatches]) => Object.entries($stopwatches).reduce(
		(acc, [title, { started, timestamp, duration }]) => {
			// if started { add delta } else { use duration }
			acc[title] = started ? duration + $now - timestamp : duration;
			return acc;
		},
		{}
	)
);
