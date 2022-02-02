<script lang="ts">
    import type Stopwatch from './Stopwatch';

    import { stopwatches } from './stores';
</script>
<form>
    <label for="add"></label>
    <input id="add" type="text" placeholder="type title here">
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
    </button>
</form>

<style lang="less">
	@padding: 1rem;
	@size: 2rem;
	form{
		width: 100%;
		display: flex;
		border-radius: calc(@size + @padding);
		border: 1px solid white;

		input{
			padding: @padding 0;
			font-size: @size;
			outline: none;
			width: 100%;
			margin-left: @size;
		}

		button{
			width: calc(@size + 0.5rem);
			margin-right: @size;

			svg{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
