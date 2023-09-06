<script lang="ts">
	import { layouts } from '$lib/elementLayouts/elementLayouts';
	export let section: section;
</script>

<section>
	{#each section.elements as element}
		<svelte:component this={layouts[element.layout]} {element} />
	{/each}
</section>
