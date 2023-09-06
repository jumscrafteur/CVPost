<script lang="ts">
	export let element: element;
</script>

<p>{element.text}</p>
<div class="jaugeBg">
	<div class="jauge" style="width: {element.subText};" />
</div>

<style>
	p {
		text-align: end;
		width: 50%;
	}

	.jaugeBg {
		width: 50%;
		height: 0.5rem;

		background-color: var(--soft-grey);

		border-radius: 999px;
	}

	.jaugeBg::after {
		content: '';

		width: 1rem;
		height: 1rem;

		background-color: red;
	}

	.jauge {
		height: 100%;
		background-color: var(--main-color);

		border-radius: 999px;
	}

	p {
		font-size: 1.2rem;

		font-family: var(--3-level-font);
		color: var(--soft-grey);

		white-space: pre-wrap;
	}
</style>
