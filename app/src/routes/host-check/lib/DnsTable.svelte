<script lang="ts">
	import { copyToClipboard } from "$lib/utils";
    import { hostData } from "./lib";
</script>

{#if $hostData && $hostData.dns_lookup}
    <div class="vertical-flex text-center !gap-0 border-r border-text">
        <div class="grid grid-cols-[72px_1fr] items-center">
            <span class="border-t border-l">Type</span>
            <span class="border-t">Content</span>
        </div>

        {#each $hostData.dns_lookup as {recordType, records}}
            {#if recordType === "MX" && records}
                {#each records as record}
                    <div class="grid grid-cols-[72px_2fr_1fr] record-row">
                        <span>{recordType}</span>
                        <span class="copy" use:copyToClipboard>{typeof record !== "string" ? record.exchange : ''}</span>
                        <span class="copy" use:copyToClipboard>{typeof record !== "string" ? record.priority : ''}</span>
                    </div>
                {/each}
            {:else if records}
                {#each records as record}
                    <div class="grid grid-cols-[72px_1fr] items-center record-row">
                        <span>{recordType}</span>    
                        <span class="copy" use:copyToClipboard>{record}</span>
                    </div>
                {/each}
            {/if}
        {/each}
    </div>
{/if}

<style lang="postcss">
    span {
        @apply border-b border-text h-full;
    }
    .record-row span {
        @apply border-l;
    }
</style>
