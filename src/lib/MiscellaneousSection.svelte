<script lang="ts">
	import { Phone, MapPin, Mail, Github } from 'lucide-svelte';

	export let misc: pageData['misc'];
</script>

<main>
	<div class="colorPad" />
	<section>
		<h3>CONCTACT</h3>
		<div>
			<Phone size="40" />
			<p>{misc.contact.phone}</p>
		</div>
		<div>
			<MapPin size="40" />
			<p>{misc.contact.adresse}</p>
		</div>
		<div>
			<Mail size="40" />
			<p>{misc.contact.mail}</p>
		</div>
		<div>
			<Github size="40" />
			<p>{misc.contact.github}</p>
		</div>
	</section>
	<section>
		<h3>QUALITÉS</h3>
		<div>
			{#each misc.qualities as qualitie}
				<p>{qualitie}</p>
			{/each}
		</div>
	</section>
	<section>
		<h3>DIVERS</h3>
		<div>
			{#each misc.other as o}
				<p>{o}</p>
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		background-color: var(--main-color);
	}

	.colorPad {
		width: 100%;
		height: 5rem;

		background-color: rgba(0, 0, 0, 0.1);
	}

	section {
		padding: 0.5rem 2rem;

		display: flex;
		flex-direction: column;

		gap: 1rem;
	}

	section div {
		color: white;
		font-family: var(--3-level-font);

		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 0.25rem;

		text-align: center;
	}

	h3 {
		font-family: var(--1-level-font);
		padding-bottom: 0.25rem;
		border-bottom: 1.5px solid white;

		text-align: center;

		color: white;
	}
</style>
