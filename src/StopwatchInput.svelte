<script lang="ts">
    import { stopwatches } from './stores';

    let input = '';
    let error = '';
    let disabled = true;
    $: titles = input.split(' ');

    function check(){
        for(const title of titles){
            if(!title){
                error = 'Title cannot be empty string or ending with space!';
                return true;
            }
            // no duplicate
            if($stopwatches.filter(sw => !sw.dead).some(sw => sw.title === title)){
                error = title + ' already exists!';
                return true;
            }
        }
        // add preview
        stopwatches.update(sws => [
            ...sws.filter(sw => !sw.dead),
            ...titles.map(t => stopwatches.create(t, true)),
        ]);
        error = '';
        return false;
    }

    function onSubmit(){
        stopwatches.update(sws => [
            ...sws.filter(sw => !sw.dead),
            ...titles.map(t => stopwatches.create(t)),
        ]);
        input = '';
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <label for="add"></label>
    <input id="add" type="text" placeholder="type title here"
           bind:value={input} on:keyup={()=>disabled=check()}>
    <button {disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
    </button>
</form>
{#if error}
    <span>{error}</span>
{/if}

<style lang="less">
	@padding: 1rem;
	@size: 1rem;
	@radius: calc(@size / 2 + @padding);
	form{
		width: 100%;
		display: flex;
		border-radius: @radius;
		border: 1px solid white;

		input{
			padding: @padding 0;
			height: @size;
			outline: none;
			width: 100%;
			margin-left: @radius;
		}

	}

	button{
		@width: calc(@size + 0.5rem);
		width: @width;
		margin-right: calc(@radius - @width / 2);

		&:disabled{
			color: red;
		}

		&:not(:disabled){
			color: var(--accent);
		}

		svg{
			width: 100%;
			height: 100%;
		}
	}
</style>
