<script lang="ts">
	import { layouts } from '$lib/elementLayouts/elementLayouts';

	export let section: section;
</script>

<section>
	<h3>{section.title}</h3>
	<div class="grid">
		{#each section.elements as element}
			<div>
				<svelte:component this={layouts[element.layout]} {element} />
			</div>
		{/each}

		<!-- <div>
			<p>PHP</p>
			<div class="jaugeBg">
				<div class="jauge" />
			</div>
		</div>
		<div>
			<p>Python</p>
			<div class="jaugeBg">
				<div class="jauge" />
			</div>
		</div>
		<div>
			<p>C</p>
			<div class="jaugeBg">
				<div class="jauge" />
			</div>
		</div> -->
	</div>
</section>

<style>
	h3 {
		font-family: var(--2-level-font);
		color: var(--soft-grey);
		padding-bottom: 0.2rem;
		border-bottom: 2px solid var(--soft-grey);

		border-bottom: 1px solid var(--main-color);
		font-size: 1.2rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		/* align-items: center; */
		justify-items: stretch;

		column-gap: 1rem;

		margin: 0.5rem 1rem;
	}

	.grid div {
		display: flex;
		align-items: center;
		gap: 1rem;
		/* align-content: stretch; */
	}
</style>
