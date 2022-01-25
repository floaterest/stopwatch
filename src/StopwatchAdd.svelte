<script lang="ts">
    import { stopwatches } from './stores';

    let error = '';

    function check(e: Event){
        let title: string;
        if(!(title = (e.target as HTMLInputElement).value)){
            return error = 'Title cannot be empty string!';
        }
        // no leading/trailing space
        title = title.trim();
        if($stopwatches.some(sw => sw.title === title)){
            return error = title + ' already exists!';
        }
        // no error
        return error = '';
    }

    function create(e: FocusEvent){
        let title = (e.target as HTMLInputElement).value;
        stopwatches.update(sws => [
            ...sws, {
                title: title,
                timestamp: new Date().getTime(),
                seconds: 0,
                started: false,
                time: stopwatches.time(0),
            },
        ]);
        console.debug('created ', title);
    }
</script>

<label>
    <input type="text"
           on:focusout={create}
           on:keyup={check}
           placeholder="type title here"
    >
    {#if error}
        <span>{error}</span>
    {/if}
</label>

<style>
    input{
        font-size: 1rem;
    }
</style>
