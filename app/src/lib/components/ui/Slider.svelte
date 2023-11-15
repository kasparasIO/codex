<script lang="ts">
    export let style = "";
</script>

<div class="flex flex-nowrap gap-10 overflow-x-scroll py-4 items-center max-w-[80%]" {style}>
  <div class="max-w-none flex flex-row gap-10 flex-nowrap">
    <slot/>
  </div>
</div>

<style lang="postcss">
* {
  scrollbar-width: thin;
  scrollbar-color: #0b215c black; 
}


*::-webkit-scrollbar {
  width: 12px; 
}

*::-webkit-scrollbar-track {
  background: black; 
  border-radius: 6px;
}

*::-webkit-scrollbar-thumb {
  background-color: #0b215c; 
  border-radius: 20px; 
  @apply transition;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #103089; 
}
</style>