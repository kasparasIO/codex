<script lang="ts">
    import type { HostData, MxRecord } from "$lib";
    import { copyToClipboard } from "$lib";
    
    export let domainData: HostData | undefined;
    const isMxRecord = (record: any): record is MxRecord => {
        return (record as MxRecord).exchange !== undefined;
    }
</script>

{#if domainData}
<div class="w-full px-1 py-2">
 <h2 class="text-xl border-b border-text">DNS ZONE</h2>
    <span class="text-lg !border-r-0">Host: 
        <a target="_blank" class="link" href="https://{domainData.domain_name}">{domainData.domain_name}</a>
    </span>
</div>
<div class="w-full flex flex-col border-x border-b border-slate-400">
<div class="w-full grid grid-cols-[72px_1fr] text-lg">
    <span class="border-r border-slate-400 px-4">Type</span>
    <span class="px-4">Content</span>
</div>
        {#each domainData.dns_lookup as dnsRecord}
            {#if Array.isArray(dnsRecord.records)}
                {#each dnsRecord.records as record}
                    {#if dnsRecord.recordType === "MX" && isMxRecord(record)}
                       <div class="grid grid-cols-[72px_2fr_1fr] gap-1 items-center"> 
                        <span>
                        {dnsRecord.recordType}
                        </span>
                        <span class="copy" use:copyToClipboard>
                        {record.exchange}
                        </span>
                        <span class="pr-2">
                        Priority: {record.priority}
                        </span>
                     </div>
                    {:else}
                    <div class="grid grid-cols-[72px_1fr] gap-1 items-center text-center">
                        <span>
                        {dnsRecord.recordType}
                        </span>
                        <span class="copy" use:copyToClipboard>
                        {record}
                        </span>
                    </div>
                    {/if}
                {/each}
            {:else if dnsRecord.records}
            <div class="grid grid-cols-[72px_1fr] gap-1 items-center">
                <span>{dnsRecord.recordType}</span> 
                <span class="copy" use:copyToClipboard>{dnsRecord.records}</span>
            </div>
            {/if}
        {/each}
    </div>  
{/if}

<style lang="postcss">
 span{
    @apply h-full text-center border-r border-slate-400;
 }
 .grid {
    @apply border border-slate-400 border-r-0;
 }
 .copy {
    @apply relative;
 }
 .copy:hover {
    cursor: pointer;
 }
 .copy:hover::after {
    content: "";
    display: block;
    position: absolute;
    right: 12px;
    top: 4px;
    width: 16px;
    height: 16px;
    background: url('copy.png');
 }
</style>
