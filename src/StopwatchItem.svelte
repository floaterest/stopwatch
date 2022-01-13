<script lang="ts">
    import type Stopwatch from './Stopwatch';

    export let stopwatch: Stopwatch;
    let { title, started, time } = stopwatch;
    export let onChange: (title: string, started: boolean) => void;
</script>

<fieldset>
    <legend>{title}</legend>
    <code class:started>{time}</code>
    <button>{started ? 'pause' : 'start'}</button>
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
		background-color: black;

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
		color: var(--text-primary);
		text-transform: uppercase;
		font-size: 1em;
		padding: 0;
		cursor: pointer;
	}
</style>
