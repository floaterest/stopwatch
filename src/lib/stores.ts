import { readable, writable } from 'svelte/store';
import type { Storage } from './storage';
import { key } from './storage';

const init: Storage = { increment: 1, stopwatches: {} };

/// return current timpstamp in seconds
export const now = () => new Date().getTime() / 1000 | 0;

export const int = readable<number>(now(), set => {
    console.debug('start interval');
    set(now());
    const interval = setInterval(() => set(now()), 1000);
    return () => {
        console.debug('clear interval');
        clearInterval(interval);
    };
});

// read state from localStorange
export const storage = writable<Storage>(((storage: Storage) => ({
    ...storage, ...JSON.parse(localStorage.getItem(key) || '{}')
}))(init));

export const started = writable<Set<string>>(new Set());
export const editing = writable<string>('');
