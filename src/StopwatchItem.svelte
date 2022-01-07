<script lang="ts">
    export let title: string;
</script>

<fieldset>
    <legend>{title}</legend>
    <code>00:00:00</code>
    <button>start</button>
</fieldset>

<style>
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
</style>
