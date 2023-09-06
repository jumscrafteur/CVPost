<script lang="ts">
	import { layouts } from '$lib/elementLayouts/elementLayouts';
	export let section: section;
</script>

<section>
	<h3>{section.title}</h3>
	{#each section.elements as element}
		<svelte:component this={layouts[element.layout]} {element} />
	{/each}
</section>

<style>
	h3 {
		font-family: var(--2-level-font);
		color: var(--soft-grey);
		padding-bottom: 0.2rem;

		border-bottom: 1px solid var(--main-color);
		font-size: 1.2rem;
	}
</style>
