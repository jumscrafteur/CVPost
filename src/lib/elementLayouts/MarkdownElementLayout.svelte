<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let element: element;
</script>

<div>
	<!-- <p>{element.text}</p> -->
	<SvelteMarkdown source={element.text} />
</div>

<style>
	div :global(p) {
		font-family: var(--3-level-font);
		color: var(--soft-grey);

		line-height: 1.3rem;

		margin-bottom: 0.5rem;
	}

	div :global(h1),
	div :global(h2),
	div :global(h3),
	div :global(h4),
	div :global(h5),
	div :global(h6) {
		font-family: var(--2-level-font);
		color: var(--soft-grey);
		padding-bottom: 0.2rem;

		border-bottom: 1px solid var(--main-color);
	}

	div :global(em) {
		text-decoration: underline var(--main-color);
		text-decoration-thickness: 2px;
	}

	div :global(blockquote) {
		padding-left: 1rem;
		border-left: 2px solid var(--main-color);
	}

	div :global(ol),
	div :global(ul) {
		font-family: var(--3-level-font);
		padding-left: 1rem;
	}

	div :global(a) {
		color: var(--main-color);
		text-decoration-thickness: 2px;
	}
</style>
