<svelte:options tag="swirl-cms" />

<script>
  import { onMount } from 'svelte'
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui'
  const QUERY_PARAM = 'swirl-cms'
  let init = false
  let open = false
  function handleClick(e) {
    e.preventDefault()
    open = !open
  }
  const swirlCmsElements = document.querySelectorAll('[data-swirl-cms-id]')
  console.log(swirlCmsElements)
  // Create a drop pad that will be attached to each swirl-cms element
  const dropPad = document.createElement('div')
  dropPad.classList.add('drop-pad')
  dropPad.style = `
		height: 70px;
		background-color: #89e189;
		position: absolute;
		width: 100vw;
		opacity: 0;
	`

  function checkInit() {
    const urlParams = new URLSearchParams(window.location.search)
    init = urlParams.has(QUERY_PARAM)
    return init
  }

  onMount(() => {
    if (!checkInit()) return
    console.log('Mount')
    // Get all elements with data-swirl-cms attribute
    swirlCmsElements.forEach(element => {
      const dropPadClone = dropPad.cloneNode(true)
      // Insert a drop pad after each element
      element.insertAdjacentElement('afterend', dropPadClone)
      // Add drag events to drop pads
      dropPadClone.addEventListener('dragover', e => {
        e.preventDefault()
        dropPadClone.style.opacity = '1'
        dropPadClone.style.position = 'relative'
      })
      dropPadClone.addEventListener('dragleave', e => {
        dropPadClone.style.opacity = '0'
        dropPadClone.style.position = 'absolute'
      })

      dropPadClone.addEventListener('drop', e => {
        e.dataTransfer.dropEffect = 'move'
        const data = e.dataTransfer.getData('swirl-cms-id')
        console.log('Element dropped ', data)
        dropPadClone.style.opacity = '0'
        dropPadClone.style.position = 'absolute'
        // TODO: Make socket call to get the required component by swirl-cms-id
        // Insert the component just below the drop pad
        // Add drop pad to the bottom of that element too
      })
    })
  })

  function handleDragStart(e) {
    console.log('drag start')
    e.dataTransfer.setData('swirl-cms-id', e.target.id)
    e.dataTransfer.dropEffect = 'move'
  }
  function handleDragEnd(e) {
    e.preventDefault()
    console.log('drag end')
  }
</script>

{#if init}
  {#if !open}
    <div class="h-[35vh]" />
  {/if}
  <div
    class="container fixed bottom-0 left-0 right-0 mx-auto h-[35vh] max-w-[800px] rounded-t-xl bg-neutral-900/80 shadow backdrop-blur transition-all delay-150 ease-in-out"
    class:open
  >
    <button
      class="absolute bottom-[35vh] left-1/2 tracking-tighter"
      on:click={handleClick}>==</button
    >
    <TabGroup>
      <TabList>
        <Tab let:selected
          ><div
            class={`${
              selected ? 'border-b-2 border-pink-600 text-pink-600' : ''
            } px-3.5 py-2`}
          >
            Add
          </div></Tab
        >
        <Tab let:selected
          ><div
            class={`${
              selected ? 'border-b-2 border-pink-600 text-pink-600' : ''
            } px-3.5 py-2`}
          >
            Edit
          </div></Tab
        >
        <Tab let:selected
          ><div
            class={`${
              selected ? 'border-b-2 border-pink-600 text-pink-600' : ''
            } px-3.5 py-2`}
          >
            Settings
          </div></Tab
        >
      </TabList>
      <TabPanels>
        <TabPanel>Content 1</TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>

    <!-- <h1>Swirl-CMS</h1>
    <h2>Edit schema</h2>
    <h2>Components</h2>
    <h3>Buttons</h3>
    <button
      id="button1"
      draggable="true"
      data-swirl-cms-id="button1#1234"
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}
    >
      Button
    </button>
    <button>Button2</button> -->
  </div>
{/if}

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .open {
    bottom: -35vh;
  }
  *[draggable='true'] {
    cursor: move;
  }
</style>
