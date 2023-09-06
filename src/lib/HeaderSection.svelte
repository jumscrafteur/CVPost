<script lang="ts">
	export let headerData: {
		title: string;
		subTitle: string;
		paragraph: string;
	};
</script>

<div>
	<h1>{headerData.title}</h1>
	<h2>{headerData.subTitle}</h2>
	<p>{headerData.paragraph}</p>
</div>

<style>
	div {
		margin: 2rem;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h1 {
		font-family: var(--1-level-font);
		font-weight: 900;

		color: var(--main-color);
	}

	h2 {
		font-family: var(--2-level-font);
		color: var(--soft-grey);
		padding-bottom: 0.2rem;
		border-bottom: 2px solid var(--soft-grey);
	}

	p {
		font-family: var(--3-level-font);
		color: var(--soft-grey);
	}
</style>
