<script lang="ts">
	export let element: element;
</script>

<p>{element.text}</p>
<ul>
	{#each element.subText as subText}
		<li><p class="subText">{subText}</p></li>
	{/each}
</ul>

<style>
	p {
		font-size: 1.2rem;
		font-family: var(--3-level-font);
		color: var(--soft-grey);

		white-space: pre-wrap;
	}

	.subText {
		font-weight: normal;
		opacity: 0.6;
		font-size: 1rem;
	}

	.subText:not(:last-child) {
		margin-bottom: 0.2rem;
	}

	ul {
		padding: 0 0 0 1.5rem;
	}
</style>
