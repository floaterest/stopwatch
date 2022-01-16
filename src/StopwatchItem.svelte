<script lang="ts">
    import type Stopwatch from './Stopwatch';

    export let stopwatch: Stopwatch;
    export let onClick: (stopwatch: Stopwatch) => void;

</script>

<fieldset>
    <legend>{stopwatch.title}</legend>
    <code class:started={stopwatch.started}>{stopwatch.time}</code>
    <button on:click={()=>onClick(stopwatch)}>
        {stopwatch.started ? 'pause' : 'start'}
    </button>
</fieldset>

<style lang="less">
	fieldset{
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: hidden;
		background-color: var(--background-darker);

		legend{
			margin-left: 1rem;
		}

		code{
			padding: 0 1.2rem;
			width: 100%;
			text-align: center;

			&.started{
				background-color: darkgreen;
			}
		}
	}

	button{
		width: 100%;
		background-color: var(--background-primary);
		border: none;
		color: var(--text-color);
		text-transform: uppercase;
		font-size: 1em;
		padding: 0;
		cursor: pointer;
	}
</style>
