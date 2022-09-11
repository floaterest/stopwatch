import { readable, writable } from 'svelte/store';
import type { Storage } from './storage';
import { key } from './storage';

const parsers = [
    { regex: /^\d+$/, func: Number },
    {
        regex: /^\d\d:\d\d:\d\d$/,
        func: innerText => innerText.split(':').map(Number).reduceRight(
            ({ acc, mul }, cur) => ({ acc: acc + cur * mul, mul: mul * 60 }),
            { acc: 0, mul: 1 }
        ).acc
    }
] as { regex: RegExp, func: (s: string) => number }[];

export const tonumber = (s: string) => parsers.reduce(
    (n, { regex, func }) => {
        if(!Number.isNaN(n)){
            return n;
        }else if(regex.test(s)){
            return func(s);
        }else{
            return NaN;
        }
    },
    NaN
);

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
}))({ increment: 1, stopwatches: {} }));

export const started = writable<Set<string>>(new Set());
