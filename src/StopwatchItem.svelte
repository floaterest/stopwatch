<script lang="ts">
    import { time } from './utils';
    import type { Stopwatch } from './Stopwatch';

    export let title: string;
    export let stopwatch: Stopwatch;
    export let onClick: (title: string) => void;
</script>

<fieldset class:dead={stopwatch.dead}>
    <legend>{title}</legend>
    <code class:started={stopwatch.started}>{time(stopwatch.total)}</code>
    {#if stopwatch.dead}
        <button disabled>preview</button>
    {:else}
        <button on:click={() => onClick(title)}>
            {stopwatch.started ? 'pause' : 'start'}
        </button>
    {/if}
</fieldset>

<style lang="less">
	fieldset{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 100%;

		user-select: none;
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
