<script lang="ts">
	export let showModal = false; // boolean

	let dialog: any; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
    class="theme-colors"
>
    <!-- svelte-ignore a11y-autofocus -->
	<button class="close-button" autofocus on:click={() => dialog.close()}>
        <svg class="square-colors2 mark-selected" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >	
            <line opacity="0.8" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%"></line>
            <line opacity="0.8" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%"></line>			
        </svg>
    </button>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
        margin: auto;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
    .close-button {
        width:  2.5rem;
        height: 2.5rem;
        border: 0;
    }
    .mark-selected {        
        stroke: var(--color-1);
        border-color: var(--color-border);
    }

</style>
