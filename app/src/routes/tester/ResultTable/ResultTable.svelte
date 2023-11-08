<script lang="ts">
	import { hostData } from "../stores";
	import Domain from "./Domain.svelte";
    let selected = "Domain";
</script>
{#if $hostData}
<div class="w-full flex flex-col">
    <div class="w-full flex flex-row">
        <button class="table-nav">Website</button>
        <button on:click={() => {selected = "Domain"}}
        class="table-nav 
        {selected === "Domain" ? "active" : ""}">
        Domain</button>
        <button class="table-nav">Email</button>
    </div>  
    <div class="w-full rounded-md border border-primary p-2">
    <span class="text-lg !border-r-0">Host: 
        <a target="_blank" class="link" href="https://{$hostData.domain_name}">{$hostData.domain_name}</a>
    </span>
        {#if selected === "Domain"}
        <Domain hostData={$hostData} />
        {/if}
    </div>
</div>    
{/if}


<style lang="postcss">
    .table-nav {
        @apply px-8 pt-1 border-x border-t border-primary rounded-t-[4px] hover:border-primary_light;
    }
    :global(.table-nav.active) {
        @apply border-primary_light
    }
</style>