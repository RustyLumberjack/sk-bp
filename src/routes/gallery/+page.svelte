<script lang="ts">
	import { onMount } from "svelte";
	import BiggerPicture from 'bigger-picture/svelte'
  import images from './images.js';
  import BiggerPictureThumbnails from "./Thumbnails.svelte";

  // ======================
  // MACY
  // ======================
	let MacyComponent: typeof import("svelte-macy").Macy;
	let options = {
		columns: 1,
		trueOrder: false,
		margin: 0,
		mobileFirst: false,
		breakAt: {},
	};
	
	let offset = 0;
  let macy: any;
  // ======================

  let bp: any;
  let imageLinks: any;

  let biggerPicture;
  let htmlElementToMount: HTMLElement;

	let ready = false;
  onMount(async () => {
		ready = true;
    MacyComponent = (await import("svelte-macy")).Macy // or .default;

    bp = BiggerPicture({
  	  target: document.body,
	  })

    biggerPicture = new BiggerPictureThumbnails({
      target: document.body
      // target: htmlElementToMount,
    });
    
    imageLinks = document.querySelectorAll('#images > a')

    // for (let link of imageLinks) {
    //   link.addEventListener("click", openGallery);
    // }
    
	});


function openGallery(e) {
  e.preventDefault();
  biggerPicture.open({
    el: e.currentTarget,
    items: imageLinks
  });
}

  // function openGallery(e) {
  //   console.log('openGallery()');
  //   console.log('==== e:')
  //   console.log(e);
  //   console.log('==== e.target:')
  //   console.log(e.target)
	//   e.preventDefault()
  //   bp.open({
  //     items: imageLinks,
  //     el: e.currentTarget,
  //     onOpen: (container: any) => { 
  //       container.classList.add('fixed', 'w-full', 'h-full', 'mt-[500px]')
  //       // container.classList.add('flex')
  //       // container.classList.add('items-center')
  //       // container.classList.add('right-100')
  //       container.classList.add('m-auto', 'flex', 'justify-center')
  //       container.classList.add('bg-gray-800', 'z-100', 'bg-opacity-50')
  //       // container.classList.add('absolute')
  //       // container.classList.add('w-[100vw]') z
  //       // container.classList.add('h-[100vh]')
  //       // fixed top-0 left-0 right-0
  //       console.log(container);
  //     }, // container.classList.add('w-[100vw] h-[100vh] bg-gray-800'),
  //   })
  // }
</script>

{#if ready}
		<!-- <div id="images" class="fixed bg-gray-800 w-[100vw] h-[100vh] mt-12 m-auto flex justify-center">
      <a
      on:click={(e) => {
        console.log('')
        openGallery(e)
      }}
      href="/cabin1.jpg"
      data-img="/cabin1.jpg"
      data-thumb="/cabin1.jpg"
      data-alt="cabin1"
      data-height="100"
      data-width="100"
    >
      <img src="/cabin1.jpg" alt="cabin1" />
    </a>
    </div>
  </div> -->

	<!-- {#each images.slice(0, 15 + offset) as image}
		<img src={image} alt={image} />
	{/each} -->

  <div class="bg-gray-800 w-[50vw] h-full m-auto justify-center" bind:this={htmlElementToMount}>
  <svelte:component this="{MacyComponent}" bind:macy options="{options}">
    <div id="images" class="border-4 min-h-[100vh]">
    {#each images.slice(0, 15 + offset) as image}
      <a
      on:click={(e) => {
        console.log('on:click (e)')
        console.log(e);
        openGallery(e)
      }}
      href={image}
      data-img={image}
      data-thumb={image}
      data-alt="cabin1"
      data-height="1200"
      data-width="400"
    >
      <img src={image} alt={image} />
    </a>
    {/each}
    </div>
  </svelte:component>
  </div>
{/if}
