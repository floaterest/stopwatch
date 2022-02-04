<script lang="ts">
    import type Stopwatch from './Stopwatch';

    export let stopwatch: Stopwatch;
    export let onClick: (stopwatch: Stopwatch) => void;
</script>

<fieldset class:dead={stopwatch.dead}>
    <legend>{stopwatch.title}</legend>
    <code class:started={stopwatch.started}>{stopwatch.time}</code>
    {#if stopwatch.dead}
        <button disabled>preview</button>
    {:else}
        <button on:click={() => onClick(stopwatch)}>
            {stopwatch.started ? 'pause' : 'start'}
        </button>
    {/if}
</fieldset>

<style lang="less">
	fieldset{
        user-select: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: hidden;
		background-color: var(--background-darker);
		border-style: solid;

		&.dead{
			filter: brightness(50%);
		}

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
		text-transform: uppercase;
	}
</style>
