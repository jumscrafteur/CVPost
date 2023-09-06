<script lang="ts">
	export let element: element;
</script>

<p>{element.text}</p>
<p class="subText">{element.subText}</p>

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
</style>
