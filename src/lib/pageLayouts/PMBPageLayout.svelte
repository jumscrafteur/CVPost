<script lang="ts">
	import MiscellaneousSection from '$lib/MiscellaneousSection.svelte';
	import PhotoSection from '$lib/PhotoSection.svelte';

	import { layouts } from '$lib/sectionLayouts/sectionLayouts';

	export let pageData: pageData;
</script>

<div class="page" style="--main-color: {pageData.mainColor};--soft-grey: {pageData.textColor};">
	<PhotoSection hexColor={pageData.mainColor} />
	<MiscellaneousSection misc={pageData.misc} />
	<main>
		<h1>{pageData.header.title}</h1>
		<h2>{pageData.header.subTitle}</h2>
		{#each pageData.sections as section}
			<svelte:component this={layouts[section.layout]} {section} />
		{/each}
	</main>
</div>

<style>
	main {
		margin: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		grid-column: 2 / span 1;
		grid-row: 1 / span 2;
	}

	h1 {
		font-family: var(--1-level-font);
		font-weight: 900;

		/* margin-bottom: 0.5rem; */

		/* margin: 2rem 0; */

		color: var(--main-color);
	}

	h2 {
		font-family: var(--2-level-font);
		color: var(--soft-grey);
		padding-bottom: 0.2rem;
		border-bottom: 2px solid var(--soft-grey);
	}
</style>
