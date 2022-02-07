import { writable } from 'svelte/store';

import type { Stopwatches } from './Stopwatch';

export const stopwatches = writable<Stopwatches>({});
