<script lang="ts">
import { onDestroy, onMount } from "svelte";
import type { PropagationResponse } from "./types";
import { hostData } from "./lib";
import { copyToClipboard } from "$lib/utils";
import { ArrowDown, Keyboard } from "lucide-svelte";

type dnsType = "A" | "AAAA" | "CNAME" | "MX" | "NS" | "TXT";
let selectedType: dnsType | string = "A";
const dnsTypes = [
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "TXT"
];
let propagationResults: PropagationResponse | undefined;
let open = false;
let loading = false; 
const queryDns = async () => { 
try {
if ($hostData?.domain_name && selectedType && !loading) {
    loading = true;
    const req = await fetch(`/api/host/propagation?host=${$hostData.domain_name}&type=${selectedType}`)
    if (req.ok) {
    const res = await req.json()
    propagationResults = res;
    } else {
    console.log(req.statusText)
    }
 }
} catch (e) {
    console.log((e as Error).message)
 } finally {
    loading = false;
 }
}
const handleClick = () => {
    queryDns();
}
const handleEscape = (e:KeyboardEvent) => {
    if (e.code === "Escape") open = false;
}

const handleClickOutside = (e:MouseEvent) => {
    if (e.target!== document.querySelector(".sel-type")) {
        open = false
    }
}
let unsubscribe: () => void;
const subscribeToHostData = () => {
    hostData.subscribe(() => {
        propagationResults = undefined;
    })
}
subscribeToHostData()
onMount(() => {
    document.addEventListener("keydown", handleEscape)
    document.addEventListener("click", handleClickOutside)
})
onDestroy(()=> {
    if(document){
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("click", handleClickOutside)
    }
    if(unsubscribe) {
        unsubscribe()
    }
})
</script>

<div class="grid grid-cols-[4fr_1fr] text-xl border-[3px] rounded-[4px] border-secondary transition hover:border-secondary_light
main-container">
    <button on:click={()=> {open = !open;}}
    class="mx-auto w-full relative rounded-l-md flex flex-row items-center sel-type">
        <span class="mx-auto">{selectedType}</span> 
        <div class="mr-2">
            <ArrowDown size={24} color={"#0b215c"} />
        </div>
    </button>
    <button on:click={handleClick} class="btn border-l-2 border-secondary rounded-none hover:bg-primary_light">
        <span>CHECK</span> 
    </button>
</div>
<div class="grid grid-cols-[4fr_1fr] relative">
    <div class="{open ? 'open' : ''}
    vertical-flex items-center px-8 border-x-2 border-b-2 border-secondary_light rounded-md pb-5 transition-all
    scale-y-0 dropdown h-0 relative z-0">
    {#each dnsTypes as type }
            <button class="w-full mr-5 border-b border-secondary transition hover:border-secondary_light" 
            on:click={() => {selectedType = type; open = false;}}>
                {type}
            </button>
    {/each}
    </div>
</div>
{#if loading}
<div class="w-full flex flex-row justify-center">
    <span class="loader"></span>
</div>
{/if}

{#if propagationResults && !loading}
    <div class="w-full flex flex-col gap-2">
        {#each propagationResults.results as result }
            <div class="w-full grid grid-cols-[3fr_1fr_0.5fr] gap-4 items-center border-y border-slate-400">
                <span>{result.server} </span>
                <div class="flex flex-col gap-1 col-start-2">
                    {#each result.answer as answer }
                         <span use:copyToClipboard class="cursor-pointer copy">
                            {propagationResults.type === 'MX' ? answer.exchange : answer.data || answer.address}
                        </span>
                    {/each}
                </div>
                <span class="text-xl {result.answer.length ? 'text-green-500' : 'text-red-500'}">
                    {result.answer.length ? 'V' : 'X'}</span>
            </div>
        {/each}
    </div>
{/if}
<div class="{propagationResults? "h-[20px]": "h-[150px]"}"/>

<style lang="postcss">
    :global(.open) {
        @apply scale-y-100 h-auto;
    }
    .dropdown {
        transform-origin: top;
    }
    .copy:after {
        right: 5rem;
    }
</style>