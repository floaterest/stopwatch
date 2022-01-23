import { writable } from 'svelte/store';
import type Stopwatch from './Stopwatch';

export const addStopwatch = (() => {
    const { subscribe, update } = writable(false);

    return {
        subscribe,
        toggle: () => update(add => !add),
    };
})();

export const stopwatches = writable<Stopwatch[]>([]);
