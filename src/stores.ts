import { writable } from 'svelte/store';

export const addStopwatch = (() => {
    const { subscribe, update } = writable(false);

    return {
        subscribe,
        toggle: () => update(add => !add),
    };
})();
