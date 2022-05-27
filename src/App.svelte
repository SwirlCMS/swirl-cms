<svelte:options tag="epic-cms" />

<script>
  import { onMount } from 'svelte'
  const QUERY_PARAM = 'swirl-cms'
  let init = false
  let open = false
  function handleClick(e) {
    e.preventDefault()
    open = !open
  }
  const epicCmsElements = document.querySelectorAll('[data-epic-cms-id]')
  console.log(epicCmsElements)
  // Create a drop pad that will be attached to each epic-cms element
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
    // Get all elements with data-epic-cms attribute
    epicCmsElements.forEach(element => {
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
        const data = e.dataTransfer.getData('epic-cms-id')
        console.log('Element dropped ', data)
        dropPadClone.style.opacity = '0'
        dropPadClone.style.position = 'absolute'
        // TODO: Make socket call to get the required component by epic-cms-id
        // Insert the component just below the drop pad
        // Add drop pad to the bottom of that element too
      })
    })
  })

  function handleDragStart(e) {
    console.log('drag start')
    e.dataTransfer.setData('epic-cms-id', e.target.id)
    e.dataTransfer.dropEffect = 'move'
  }
  function handleDragEnd(e) {
    e.preventDefault()
    console.log('drag end')
  }
</script>

{#if init}
  {#if !open}
    <div class="spacer" />
  {/if}
  <div class="components-drawer" class:open>
    <button class="toggle" on:click={handleClick}>X</button>
    <h1>Epic-CMS</h1>
    <h2>Edit schema</h2>
    <h2>Components</h2>
    <h3>Buttons</h3>
    <button
      id="button1"
      draggable="true"
      data-epic-cms-id="button1#1234"
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}
    >
      Button
    </button>
    <button>Button2</button>
  </div>
{/if}

<style>
  .spacer {
    height: 400px;
  }
  .components-drawer {
    width: 100%;
    height: 400px;
    position: fixed;
    bottom: 0;
    box-shadow: 0px -7px rgba(0, 0, 0, 0.8);
    background-color: #fff;
    transition: bottom 0.3s ease-in-out;
  }

  .components-drawer .toggle {
    position: absolute;
    bottom: 406px;
    left: 50vw;
  }
  .components-drawer.open {
    bottom: -407px;
  }
  *[draggable='true'] {
    cursor: move;
  }
</style>
