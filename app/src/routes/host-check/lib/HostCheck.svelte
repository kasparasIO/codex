<script lang="ts">
	import { onMount } from "svelte";
	import Submitter from "./Submitter.svelte";
	import type { HostData } from "./types";
	import { hostData } from "./lib";
	import Domain from "./Domain.svelte";
	import Email from "./Email.svelte";
	import Website from "./Website.svelte";
    export let paramData: HostData| undefined = undefined
    let selected = "Domain"
    onMount(() => {
        if (paramData) {
            hostData.set(paramData)
        }
    })

</script>

<div class="flex flex-col gap-4 w-full relative">
    <Submitter />
    {#if $hostData}
<div class="w-full flex flex-col">
    <div class="w-full flex flex-row">
        
        <button on:click={() => {selected = "Website"}} 
        class="table-nav">Website</button>
        
        <button on:click={() => {selected = "Domain"}}
        class="table-nav 
        {selected === "Domain" ? "active" : ""}">
        Domain</button>
        
        <button on:click={() => {selected = "Email"}}
         class="table-nav
         {selected === "Email"? "active": ""}">Email</button>

    </div>
    <div class="w-full rounded-md border border-primary p-2 flex flex-col gap-4">
    <span class="flex flex-row gap-2 text-xl">Host:  
    <a class="text-accent transition hover:text-accent_light" target="_blank" href="https://{$hostData.domain_name}">
        {$hostData.domain_name}
      </a>
    </span>
        {#if selected === "Domain"}
            <Domain/>
        {:else if selected === "Email"}
        <Email/>
        {:else if selected === "Website"}
        <Website/>
        {/if}
    </div>
</div>    
{/if}
</div>

<style lang="postcss">
    .table-nav {
        @apply px-8 pt-1 border-x border-t border-primary rounded-t-[4px] hover:border-primary_light;
    }
    :global(.table-nav.active) {
        @apply border-primary_light
    }
</style>