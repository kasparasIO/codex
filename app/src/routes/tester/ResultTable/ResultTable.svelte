<script lang="ts">
	import { hostData } from "../stores";
	import Domain from "./Domain.svelte";
</script>
{#if $hostData}
<div class="w-full flex flex-col">
    <div class="w-full flex flex-row">
        <button class="table-nav">Website</button>
        <button class="table-nav">Domain</button>
        <button class="table-nav">Email</button>
    </div>
    <div class="w-full rounded-md border border-primary p-2">
            <Domain domainData={$hostData} />
    </div>
</div>    
{/if}


<style lang="postcss">
    .table-nav {
        @apply px-8 pt-1 border-x border-t border-primary rounded-t-[4px] hover:border-primary_light;
    }
</style>