import type { BiggerPictureInstance } from 'bigger-picture';
import 'bigger-picture/css';

let bp: BiggerPictureInstance;

/**
 * Dynamically imports bigger-picture and creates reusable instance.
 */
export function biggerPicture(node: HTMLElement) {
	(async () => {
		if (!bp) {
			const BiggerPictureThumbnails = (await import('$lib/Thumbnails.svelte')).default;
			bp = new BiggerPictureThumbnails({
				target: document.body
			}) as unknown as BiggerPictureInstance;
		}
		// find links
		const items = node.querySelectorAll('a');
		// loop and add click listener
		for (let el of items) {
			el.addEventListener('click', (e: Event) => {
				e.preventDefault();
				bp.open({
					items,
					el
				});
			});
		}
	})();
	return {
		destroy() {
			// @ts-ignore
			bp?.$destroy();
			// @ts-ignore
			bp = undefined;
		}
	};
}
