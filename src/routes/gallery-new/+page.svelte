<script lang="ts">
	import { biggerPicture } from '$lib/biggerPicture.js';
	import { masonry } from '$lib/masonry';

	export let data;
	const { image_urls } = data;

	const image_data = image_urls.map((url) => {
		return {
			src: url,
			width: 500,
			height: 500,
			alt: 'cabin1'
		};
	});

	const macy_options = {
		margin: 20,
		columns: 4,
		breakAt: {
			1200: {
				columns: 3
			},
			580: {
				columns: 2,
				margin: 14
			}
		}
	};
</script>

<div class="gallery" use:biggerPicture use:masonry={macy_options}>
	{#each image_data.slice(0, 15) as image}
		<a
			href={image.src}
			data-img={image.src}
			data-thumb={image.src}
			data-alt="cabin1"
			data-height={image.height}
			data-width={image.width}
		>
			<img
				src={image.src}
				alt="cabin1"
				on:load={(e) => {
					/** use naturalWidth and naturalHeight from image */
					const img = e.target;
					// @ts-ignore
					image.width = img.naturalWidth * 10;
					// @ts-ignore
					image.height = img.naturalHeight * 10;
				}}
			/>
		</a>
	{/each}
</div>

<style>
	:global(body) {
		margin: 0;
	}
	.gallery {
		width: 1200px;
		max-width: 95%;
		margin: 2em auto;
	}
	a {
		display: grid;
	}
	img {
		width: 100%;
	}
</style>
