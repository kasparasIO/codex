<script lang="ts">
	import { copyToClipboard } from "$lib/utils";
	import DnsTable from "./DnsTable.svelte";
	import Propagation from "./Propagation.svelte";
	import { hostData } from "./lib";   
    const keys = Object.keys($hostData?.whois ?? {});
</script>

{#if $hostData}

<div class="w-full px-1 py-2">
    <h2 class="text-xl border-b border-text">WHOIS</h2>
</div>
<div>
    {#each keys as key }  
        {#if $hostData.whois && $hostData.whois[key]} 
            <div class="grid grid-cols-[1fr_2fr] !border-r cursor-pointer copy" use:copyToClipboard> 
                <span class="!text-left px-4">{key}</span>
                <span class="!border-r-0 !text-left px-4">
                    {$hostData.whois[key]?.length > 0 ? `${$hostData.whois[key]}`: "Not found"}</span>       
            </div>    
        {/if}
    {/each}
</div>
<div class="w-full px-1 py-2">
 <h2 class="text-xl border-b border-text">DNS ZONE</h2>
</div>
<DnsTable/>
<div class="w-full px-1 py-2 vertical-flex">
    <h2 class="text-xl border-b border-text">PROPAGATION</h2>
<Propagation/>
</div>   

{/if}

<style lang="postcss">
 span{
    @apply h-full text-center border-r border-slate-400;
 }
 .grid {
    @apply border border-slate-400 border-r-0;
 }
</style>
