<script lang="ts">
    export let title: string;
    let checked: boolean;
</script>

<fieldset>
    <legend>{title}</legend>
    <code>00:00:00</code>
    <label class="switch">
        <input type="checkbox" bind:checked="{checked}">
        <span class="label">{checked ? 'pause' : 'start'}</span>
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
	}

	legend{
		margin-left: 0.5rem;
	}

	code{
		padding: 0 1.2rem;
	}

	button{
		width: 100%;
		text-transform: uppercase;
		background-color: var(--background-primary);
		color: var(--text-primary);
		border: none;
		/* don't override font size */
		font-size: 1em;
	}

	label{
		width: 100%;
		cursor: pointer;
		padding: 0;
	}

	input{
		display: none;
		box-sizing: content-box;
	}

	span{
		text-align: center;
		justify-content: center;
		color: var(--text-primary);
		background-color: var(--background-primary);
		box-shadow: none;
		position: relative;
		font-size: 1em;
		text-transform: uppercase;
		border-radius: inherit;
		box-sizing: content-box;
		transition: All 0.3s ease;
		width: 100%;
		display: flex;

		&:before, &:after{
			position: absolute;
			top: 50%;
			margin-top: -.5em;
			line-height: 1;
			transition: inherit;
			box-sizing: content-box;
		}

		&:before{
			color: #aaa;
			text-shadow: 0 1px rgba(255, 255, 255, 0.5);
			right: inherit;
			left: 11px;

		}

		&:after{
			color: #9370db;
			left: 11px;
			text-shadow: 0 1px rgba(0, 0, 0, 0.2);
			opacity: 0;
		}
	}
</style>
