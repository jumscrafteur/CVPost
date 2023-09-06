<script lang="ts">
	import { layouts } from '$lib/pageLayouts/pageLayouts';
	import type { z } from 'zod';
	import { CVSchema } from './validation';

	import Panel from './Panel.svelte';
	import Modal from './Modal.svelte';

	export let data;

	let cv: z.infer<typeof CVSchema> | undefined;

	if (data.cv)
		try {
			cv = CVSchema.parse(data.cv);
		} catch (error) {
			console.error(error);
		}

	console.log(cv);

	let showLinkModal = false;
</script>

<div class="container">
	<Panel bind:cv bind:showLinkModal />
	{#if cv}
		{#each cv.pages as page}
			<svelte:component this={layouts[page.layout]} pageData={page} />
		{/each}
	{/if}
	<Modal bind:cv bind:showLinkModal />
</div>

<style>
	:global(.page) {
		z-index: 5;
		width: 21cm;
		height: 29.7cm;

		box-shadow: rgb(100, 100, 111, 0.2) 0px 7px 29px 0px;

		border-radius: 0.2rem;

		display: grid;

		grid-template-columns: 1fr 2.5fr;
		grid-template-rows: 6cm auto;

		overflow: hidden;
	}

	:global(.page::after) {
		pointer-events: none;
		z-index: -1;
		content: ' ';
		width: 21cm;
		height: 29.7cm;

		border-radius: 0.2rem;

		opacity: 0.15;

		position: absolute;

		box-shadow: var(--main-color) 0px 7px 29px 0px;

		background-color: transparent;
	}

	@font-face {
		font-family: 'Skyscapers';
		src: url('//2ttf.com/webfont/6IF8GLA3aiM/webfont.ttf') format('truetype');
	}

	.container {
		--1-level-font: 'Barlow', sans-serif;
		--2-level-font: 'Anonymous Pro', monospace;
		--3-level-font: 'Glacial Indifference', sans-serif;

		--radius-size: 0.1rem;

		padding: 2.5rem 0;
		gap: 2.5rem;

		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;
	}

	@media print {
		.container {
			padding: 0;
			gap: 0;
		}

		:global(.page) {
			border-radius: 0;
		}
	}

	@media screen and (max-width: 850px) {
		:global(.page) {
			width: 100%;
			height: 100%;
		}

		:global(.page::after) {
			width: 100%;
			height: 100%;
		}

		.container {
			gap: 0.5rem;
		}
	}
</style>
