<script lang="ts">
    export let title: string;
    export let time: string = '00:00:00';
    export let started: boolean;
</script>

<fieldset>
    <legend>{title}</legend>
    <code>{time}</code>
    <label>
        <input type="checkbox" bind:checked="{started}">
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
