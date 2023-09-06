<script lang="ts">
	import HeaderSection from '$lib/HeaderSection.svelte';
	import MiscellaneousSection from '$lib/MiscellaneousSection.svelte';
	import PhotoSection from '$lib/PhotoSection.svelte';

	import { layouts } from '$lib/sectionLayouts/sectionLayouts';

	export let pageData: pageData;
</script>

<div class="page" style="--main-color: {pageData.mainColor};--soft-grey: {pageData.textColor};">
	<PhotoSection hexColor={pageData.mainColor} />
	<HeaderSection headerData={pageData.header} />
	<MiscellaneousSection misc={pageData.misc} />
	<main>
		{#each pageData.sections as section}
			<svelte:component this={layouts[section.layout]} {section} />
		{/each}
	</main>
</div>

<style>
	main {
		margin: 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
