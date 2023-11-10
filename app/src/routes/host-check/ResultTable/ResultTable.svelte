<script lang="ts">
	import { hostData } from "../stores";
	import Domain from "./Domain.svelte";
	import Email from "./Email.svelte";
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
        
        <button on:click={() => {selected = "Email"}}
         class="table-nav
         {selected === "Email"? "active": ""}">Email</button>
    </div>  
    <div class="w-full rounded-md border border-primary p-2">
        {#if selected === "Domain"}
            <Domain hostData={$hostData} />
        {/if}
        {#if selected === "Email"}
            <Email/>
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