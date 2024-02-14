import { browser } from '$app/environment';
import { tick } from 'svelte';

async function createMasonryGrid(node: HTMLElement, options = {}) {
	console.log(options);
	// @ts-ignore
	const { default: Macy } = await import('macy');
	tick();
	Macy({
		container: node,
		...options
	});
}

export function masonry(node: HTMLElement, options = {}) {
	if (browser) {
		createMasonryGrid(node, options);
	}
}
