import { derived, readable, writable } from 'svelte/store';
import type { State } from './State';
import { now as _now } from './helpers';

function read(state: State): State{
    /// read state from localStorange
    let storage: string = localStorage.getItem(state.key);
    return storage ? JSON.parse(storage) as State : state;
}

export const now = readable<number>(_now(), set => {
    console.log('set int');
    const int = setInterval(() => set(_now()), 1000);
    return function(){
        console.log('clear int');
        clearInterval(int);
    };
});

export const state = writable<State>(read({
    key: 'stopwatch',
    increment: 1,
    stopwatches: {}
} as State));

export const started = writable<Set<string>>(new Set());

// export const times = derived(state, ({ stopwatches, increment }) =>
//     Object.assign({}, ...Object.entries(stopwatches).map(
//         ([name, stopwatch]) => ({ [name]: 1 })
//     ))
// );
