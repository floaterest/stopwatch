import { readable, writable } from 'svelte/store';
import type { State } from './State';
import { now as _now } from './helpers';

const init: State = {
    key: 'stopwatch',
    increment: 1,
    stopwatches: {},
    started: new Set()
};

export const now = readable<number>(_now(), set => {
    console.log('set int');
    const int = setInterval(() => set(_now()), 1000);
    return function(){
        console.log('clear int');
        clearInterval(int);
    };
});

// read state from localStorange
export const state = writable<State>(((state: State) => ({
    ...state, ...JSON.parse(localStorage.getItem(state.key) || '{}')
}))(init));
