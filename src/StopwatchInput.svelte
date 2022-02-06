<script lang="ts">
    import { stopwatches } from './stores';

    let input = '';
    // zwsp, it's truthy but it looks empty
    let error = '\u200b';
    $: titles = input.split(' ');

    function check(){
        for(const title of titles){
            if(!title){
                return 'Title cannot be empty string or ending with space!';
            }
            // no duplicate
            if($stopwatches.filter(sw => !sw.dead).some(sw => sw.title === title)){
                return title + ' already exists!';
            }
        }
        // add preview
        stopwatches.update(sws => [
            ...sws.filter(sw => !sw.dead),
            ...titles.map(t => stopwatches.create(t, true)),
        ]);
        return '';
    }

    function onSubmit(){
        stopwatches.update(sws => [
            ...sws.filter(sw => !sw.dead),
            ...titles.map(t => stopwatches.create(t)),
        ]);
        input = '';
    }
</script>

<form on:submit|preventDefault={onSubmit} class:error>
    <label for="add"></label>
    <input id="add" type="text" placeholder="type title here"
           bind:value={input} on:keyup={()=>error=check()}>
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
    </button>
</form>
<span>{error}</span>

<style lang="less">
	@padding: 1rem;
	@size: 1rem;
	@radius: calc(@size / 2 + @padding);
	form{
		width: 100%;
		display: flex;
		border-radius: @radius;
		border: 1px solid white;

		&.error{
			border-color: red;

			button{
				display: none;
			}
		}

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
		color: var(--accent);

		svg{
			width: 100%;
			height: 100%;
		}
	}

	span{
		white-space: pre-wrap;
	}
</style>
