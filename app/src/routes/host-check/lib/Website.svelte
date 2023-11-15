<script lang="ts">
import { copyToClipboard } from "$lib/utils";
import { onDestroy } from "svelte";
import { checkNS, hostData, isNsPropagated } from "./lib";
import type {NsPropagationCheck, Ping} from "./types";
let loadingNs = false;
let nameserverData: NsPropagationCheck | undefined = undefined;
let loadingPing = false;
let ping: Ping|undefined = undefined; 
let loadingHeaders = false;
let headers: string[] | undefined = undefined;
let loadingSitemap = false; 
let sitemapRoutes: string[] = [];

const pingHost = async () => {
    if ($hostData && !loadingPing) {
        try {
        loadingPing = true;
        const domain = $hostData.domain_name
        const data = await fetch(`/api/host/ping?host=${domain}`, {method: "POST"});
        const res = await data.json()
        ping = res;
        } catch (e) {
        console.log((e as Error).message)
        } finally {
        loadingPing = false;
        }
    }
}
const getHostHeaders = async () => {
    if(!$hostData || loadingHeaders) return;
    try {
        loadingHeaders = true;
        const req = await fetch(`/api/host/headers?host=${$hostData.domain_name}`);
        const res: string[] = await req.json();
        if(req.ok) {
        headers = res;
     }
    } catch (e) {
        console.log((e as Error).message)
    } finally {
        loadingHeaders = false;
    }
}
const getNsData = async () => {
    try {
        loadingNs = true; 
        if ($hostData){
        const nsData = await checkNS($hostData?.domain_name);
        if (nsData) {
            const resObject = isNsPropagated(nsData);
            nameserverData = resObject
        }
    }
} catch (e) {
    console.log(e);
} finally {
    loadingNs = false; 
    }
}
const responseTimeMessage = (duration: number) => {
        if (duration <= 500) {
            return `${Math.round(duration)}ms Host response is quick`;
        } else if (duration > 500) {
            return `${Math.round(duration)}ms Host response is noticeable`;
        } else if (duration >= 1000) {
            return `${Math.round(duration)}ms Host response is slow`;
        } 
}
const getSitemapRoutes = async () => {
    if(!$hostData || loadingSitemap) return;
    try {
        loadingSitemap = true;
        const req = await fetch(`/api/host/sitemap-pages?host=${$hostData.domain_name}`);
        const res: string[] = await req.json();
        if(req.ok) {
        sitemapRoutes = res;
     }
    } catch (e) {
        console.log((e as Error).message)
    } finally {
        loadingSitemap = false;
    }
}
let unsubscribe: () => void;
const subscribeToHostData = () => {
unsubscribe = hostData.subscribe(() => {
    getNsData();
    pingHost();
    getHostHeaders();
    getSitemapRoutes();    
}) 
}
subscribeToHostData();
onDestroy(() => {
    if (unsubscribe) {
        unsubscribe()
    }
})
</script>

<div class="w-full flex flex-col gap-4 px-2 py-5">
    <div class="w-full border-b border-slate-400 text-2xl">
        <h2>Host breakdown</h2>
    </div>
    <div class="w-full flex flex-row gap-2 items-center">
        <span class="text-xl">DNS Zone:</span>
        {#if loadingNs}
            <span class="loader w-14"></span>
        {:else if nameserverData && nameserverData.isPropagated}
            <span class="text-emerald-500">DNS zone is active</span>
        {:else}
            <span class="text-red-500">DNS zone is inactive</span>
        {/if}
    </div>
    <div class="w-full flex flex-row gap-2 items-center">
        <span class="text-xl">
            Host Status:
        </span>
        {#if loadingPing}
            <span class="loader w-14"></span>
        {/if}
        {#if ping && !loadingPing}
            <span class="text-emerald-500 text-lg">Host is active</span>
        {:else if !ping && !loadingPing}
            <span class="text-red-500 text-lg">Host is inactive</span>
        {/if}
    </div>
    {#if ping && !loadingPing}
        <div class="w-full flex flex-row gap-2 items-center">
            <span class="text-xl">Time To Respond:</span>
           <span class="{ping.duration <= 500? "green" : ping.duration > 500 && ping.duration < 1000 ? "yellow" : "red"}
           text-lg">{responseTimeMessage(ping.duration)}</span>
        </div>
    {/if}
    <div class="w-full text-2xl vertical-flex">
        <h2 class="border-b border-slate-400">
            Routes in Sitemap:
        </h2>
    {#if loadingSitemap} 
        <div class="w-full flex justify-center">
            <span class="loader w-14"/>
        </div>
    {/if}
        {#if sitemapRoutes.length > 0 && !loadingSitemap}
        <ul class="vertical-flex list-inside list-disc px-4 text-lg max-h-[20rem] overflow-y-scroll">
            {#each sitemapRoutes as path }
                <li><a target="_blank" class="transition hover:text-accent_light" 
                    href="https://{$hostData?.domain_name}{path}">{$hostData?.domain_name}{path}</a></li>
            {/each}
        </ul>
        {:else if !sitemapRoutes && !loadingSitemap}
        <h3 class="text-red-500 text-xl">Sitemap Not found</h3>
        {/if}
    </div>
    <div class="w-full text-2xl vertical-flex">
        <h2 class="border-b border-slate-400">
            Header Breakdown:
        </h2>
    {#if loadingHeaders} 
        <div class="w-full flex justify-center">
            <span class="loader w-14"/>
        </div>
    {/if}
        {#if headers && !loadingHeaders}
        <ul class="verical-flex !gap-0 list-inside list-disc px-4">
            {#each headers as headerData} 
                <li class="text-lg copy" use:copyToClipboard>
                    {headerData}
                </li>
            {/each}
        </ul>
        {:else if !headers && !loadingHeaders}
            <h3 class="text-xl text-red-500">Get Request to Website did not return any headers</h3>
        {/if}
    </div>
</div>

<style lang="postcss">
    .green {
        @apply text-emerald-500;
    }
    .yellow {
        @apply text-yellow-500;
    }
    .red {
        @apply text-red-500;
    }
* {
  scrollbar-width: thin;
  scrollbar-color: #0b215c #2d3748; 
}


*::-webkit-scrollbar {
  width: 12px; 
}

*::-webkit-scrollbar-track {
  background: #2d3748; 
}

*::-webkit-scrollbar-thumb {
  background-color: #0b215c; 
  border-radius: 20px; 
  border: 3px solid #2d3748; 
  @apply transition;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #103089; 
}
</style>