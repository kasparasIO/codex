<script lang="ts">
    export let style = "";
</script>

<div class="flex flex-nowrap gap-10 overflow-x-scroll py-4 slider" {style}>
  <slot/>
</div>

<style lang="postcss">
  :global(.slider) {
    @apply flex flex-nowrap gap-4 overflow-x-scroll;
    width: var(--slider-visible-width);
  }
  :global(.slider > div) {
    width: 25%;
    height: 4rem; 
    border-radius: 0.5rem;
    flex: 0 0 auto;
    margin-right: 1rem;
  }
  :global(.slider > div:last-child) {
  margin-right: 0;
  }
  .slider::-webkit-scrollbar {
  display: none;
}
  .slider {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
  @media screen and (max-width: 1120px){
  .slider {
    max-width: 100%
  }
}
</style>