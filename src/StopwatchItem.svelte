<script lang="ts">
    import type Stopwatch from './Stopwatch';

    export let stopwatch: Stopwatch;
    let { title, started, time } = stopwatch;
    export let onChange: (title: string, started: boolean) => void;
</script>

<fieldset>
    <legend>{title}</legend>
    <code class:started>{time}</code>
    <label>
        <input type="checkbox" bind:checked="{started}" on:change={()=>onChange(title,started)}>
        <span>{started ? 'pause' : 'start'}</span>
    </label>
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

	label{
		width: 100%;
		background-color: var(--background-primary);
		cursor: pointer;

		input{
			display: none;
		}

		span{
			display: flex;
			justify-content: center;
			text-transform: uppercase;
		}
	}
</style>
