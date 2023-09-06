<script lang="ts">
	import { page } from '$app/stores';
	import type { z } from 'zod';
	import { CVSchema } from './validation';

	import { Trash2, Link, FileInput, Download } from 'lucide-svelte';
	import { saveAs } from 'file-saver';
	import type { ChangeEventHandler } from 'svelte/elements';

	export let cv: z.infer<typeof CVSchema> | undefined;
	export let showLinkModal: Boolean;

	const showPanel = $page.url.searchParams.get('showPanel') == '1';
	let fileName: string | undefined;

	const onFileInput: ChangeEventHandler<HTMLInputElement & EventTarget> = (e) => {
		var reader = new FileReader();
		reader.onload = onReaderLoad;

		if (e.target == null) return;

		const files = (e.target as HTMLInputElement).files;
		if (!files || files.length == 0) return;

		const file = files[0];

		reader.readAsText(file);
		fileName = file.name;
	};

	const onReaderLoad = (e: ProgressEvent<FileReader>) => {
		if (e.target == null || typeof e.target.result != 'string') return;

		let fileData = JSON.parse(e.target.result);
		let validationData = CVSchema.safeParse(fileData);

		if (!validationData.success) {
			console.error(validationData.error.issues);
			return;
		}

		cv = validationData.data;
	};

	let fileInput: HTMLInputElement;
</script>

<div class="pannel {showPanel ? '' : 'hidden'}">
	<input type="file" bind:this={fileInput} on:change={onFileInput} style="display: none;" />
	<button
		class="fileButton"
		on:click={() => {
			fileInput.click();
		}}>{fileName ?? 'No file selected'}</button
	>
	<button
		on:click={() => {
			fileInput.value = '';

			cv = undefined;
			fileName = undefined;
		}}
		disabled={cv === undefined}><Trash2 /></button
	>
	<button
		on:click={() => {
			showLinkModal = true;
		}}
		disabled={cv === undefined}><Link /></button
	>
	<button
		on:click={() => {
			var blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' });
			saveAs(blob, 'cv.json');
		}}
		disabled={cv === undefined}><Download /></button
	>
</div>

<style>
	.pannel {
		position: fixed;
		top: 0;
		left: 50%;

		background-color: white;

		transform: translate(-50%, -100%) translateY(1rem);

		padding: 1rem 1.5rem 1rem;

		border-radius: 0 0 var(--radius-size) var(--radius-size);

		box-shadow: rgb(100, 100, 111, 0.3) 0px 7px 29px 0px;

		z-index: 9;

		transition: all 0.25s ease-out 0.1s;

		display: flex;

		align-items: center;
		gap: 0.5rem;
	}

	.pannel button {
		height: 2rem;

		padding: 0.25rem 0.5rem;

		border: none;
		background-color: black;

		color: white;

		border-radius: var(--radius-size);

		box-shadow: 0px 0px #888;

		transition: all 0.1s linear 0.1s;
	}

	.pannel button:hover,
	.pannel button:active {
		transform: translateY(-5px);
		box-shadow: 0px 5px #888;
		/* box-shadow: ; */
	}

	.pannel button:disabled {
		background-color: #888;
	}

	.pannel::before {
		content: ' ';

		position: fixed;
		background-color: #999;

		width: 2rem;
		height: 0.25rem;

		bottom: 0.375rem;
		left: 50%;

		transform: translateX(-50%);
	}

	.pannel:hover,
	.pannel:active {
		transform: translate(-50%, 0);
	}

	.pannel.hidden {
		display: none;
	}

	.pannel .fileButton {
		width: 10rem;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	@media print {
		.pannel {
			display: none;
		}
	}
</style>
