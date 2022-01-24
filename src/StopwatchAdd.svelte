<script lang="ts">
    import { stopwatches } from './stores';

    let target: HTMLInputElement;

    function create(e: FocusEvent){
        if(!(target = e.target as HTMLInputElement).value) return;
        stopwatches.update(sws => [
            ...sws, {
                title: target.value,
                timestamp: new Date().getTime(),
                seconds: 0,
                started: false,
                time: stopwatches.time(0),
            },
        ]);
        console.debug(`created ${target.value}`);
    }
</script>

<label>
    <input type="text" on:focusout={create} placeholder="type title here">
</label>

<style>
    input{
        font-size: 1rem;
    }
</style>
