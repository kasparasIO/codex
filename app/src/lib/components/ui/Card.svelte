<script lang="ts">
    export let imgSrc = "";
    export let imgAlt = "";
    export let style = "";
</script>

<div class="card" {style}>
  <div class="w-16 h-16">
    <img src="{imgSrc}" alt="{imgAlt}">
</div>
<div class="w-full py-2">
    <h3 class="text-center text-2xl"><slot name="title"/></h3>
</div>
<div class="w-[95%] h-[1px] bg-primary transition divider"/>
  <slot name="description"/>
  <div class="w-full py-2 mt-auto flex justify-center">
    <slot name="btn" />
  </div>
</div>


<style lang="postcss">
    .card { 
    @apply aspect-[4/5] border border-primary rounded-md py-2 px-1 flex flex-col gap-2 items-center;
    box-shadow: 7px 5px black;
    width: var(--card-width);
    height: var(--card-height);    
    }
    .divider {
        box-shadow: 1px 1px 0 2px black;
    }
</style>