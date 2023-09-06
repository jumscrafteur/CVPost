<script lang="ts">
	import { page } from '$app/stores';
	import { X } from 'lucide-svelte';
	import type { CVSchema } from './validation';
	import type { z } from 'zod';
	import { encodeBase64URLData } from '$lib/utils';

	export let cv: z.infer<typeof CVSchema> | undefined;
	export let showLinkModal: Boolean;

	$: base64UrlEncodedData = cv ? encodeBase64URLData(cv) : '';
</script>

{#if showLinkModal}
	<div class="linkModalBg">
		<div class="linkModal">
			<h2>Vous pouvez partager le liens suivant</h2>
			<input
				type="text"
				value={`${$page.url.origin}/?data=${base64UrlEncodedData}`}
				id="linkContainer"
				disabled
			/>
			<button
				on:click={() => {
					let linkContainer = document.querySelector('#linkContainer');

					linkContainer?.select();
					linkContainer?.setSelectionRange(0, 99999);

					// console.log(linkContainer.value);

					navigator.clipboard.writeText(linkContainer.value);

					showLinkModal = false;
				}}>Copy Link</button
			>
			<button
				class="close"
				on:click={() => {
					showLinkModal = false;
				}}><X size="16" /></button
			>
		</div>
	</div>
{/if}

<style>
	.linkModalBg {
		z-index: 10;
		position: fixed;

		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.5);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.linkModal {
		display: flex;
		flex-direction: column;

		gap: 1rem;
		font-family: var(--2-level-font);
		width: 50%;
		/* height: 30%; */

		background-color: white;

		border-radius: 0.2rem;

		padding: 2rem;

		position: relative;
	}

	.linkModal input {
		background-color: #f2f2f2;
		padding: 0.5rem 1rem;

		color: black;

		border-radius: 0.1rem;
		border: none;

		overflow-y: scroll;
	}

	.close {
		position: absolute;

		font-size: 0.75rem;

		width: 2rem;
		height: 2rem;

		top: 1rem;
		right: 1rem;
	}

	.linkModal button {
		font-family: var(--2-level-font);

		background-color: black;
		color: white;

		border: none;
		padding: 0.5rem;

		border-radius: 0.1rem;
	}
</style>
