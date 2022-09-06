import { readable, writable } from 'svelte/store';
import type { Storage } from './storage';
import { key } from './storage';
import { now as _now } from './helpers';

const init: Storage = { increment: 1, stopwatches: {} };

export const now = readable<number>(_now(), set => {
    console.debug('start interval');
    const int = setInterval(() => set(_now()), 1000);
    return () => {
        console.debug('clear interval');
        clearInterval(int);
    };
});

// read state from localStorange
export const storage = writable<Storage>(((storage: Storage) => ({
    ...storage, ...JSON.parse(localStorage.getItem(key) || '{}')
}))(init));

export const started = writable<Set<string>>(new Set());
