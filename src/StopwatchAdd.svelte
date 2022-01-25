<script lang="ts">
    import { stopwatches } from './stores';

    let error = '';

    function check(e: Event | string){
        let title: string;
        if(typeof e === 'string'){
            title = e;
            if(!title){
                return error = 'Title cannot be empty string!';
            }
        }else{
            if(!(title = (e.target as HTMLInputElement).value)){
                return error = 'Title cannot be empty string!';
            }
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
        // suppose the title has passed `check()`
        let title = (e.target as HTMLInputElement).value;

        //#region add multiple stopwatches for space separated input
        let titles = title.split(' ');
        // check each title
        if(titles.some(t => check(t))) return;
        let toAdd = titles.map(t => ({
            title: t,
            timestamp: new Date().getTime(),
            seconds: 0,
            started: false,
            time: stopwatches.time(0),
        }));
        //#endregion add multiple stopwatches

        stopwatches.update(sws => [ ...sws, ...toAdd ]);
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
