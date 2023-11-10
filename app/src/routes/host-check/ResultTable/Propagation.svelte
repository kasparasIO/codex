<script lang="ts">
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { hostData } from "../stores";
import type { PropagationResponse } from "$lib";
let domain = $hostData?.domain_name;
let loading = false; 


type dnsType = "A" | "AAAA" | "CNAME" | "MX" | "NS" | "TXT";
let selectedType: dnsType | string = "A";
const dnsTypes = [
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "TXT"
]
let open = false;
const propagationResults = writable<PropagationResponse | undefined>(undefined);
hostData.subscribe(() => {
    propagationResults.set(undefined);
})


const queryDns = async () => { 
try {
if (domain && selectedType) {
    loading = true;
    const data = await fetch(`/api/propagation?host=${domain}&type=${selectedType}`)
    const res = await data.json()
    propagationResults.set(res)
    if(selectedType === "NS") {
        localStorage.setItem(`last_${domain}`, JSON.stringify(res));
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
onMount(() => {
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") open = false;
    })
    document.addEventListener("click", (e) => {
    if (e.target !== document.querySelector(".sel-type")) {
        open = false;
    }})
})
</script>

<div class="grid grid-cols-[4fr_1fr] text-xl border-[3px] rounded-[4px] border-secondary transition hover:border-secondary_light
main-container">
    <button on:click={()=> {open = !open;}}
    class="mx-auto w-full relative rounded-l-md flex flex-row items-center sel-type">
        <span class="mx-auto">{selectedType}</span> <div class="triangle transition mr-[1%]"/>
    </button>
    <button on:click={handleClick} class="btn border-l-2 border-secondary rounded-none">
        <span>CHECK</span> 
    </button>
</div>
<div class="grid grid-cols-[4fr_1fr] relative">
    <div class="{open ? 'open' : ''}
    flex flex-col gap-2 items-center px-8 border-x-2 border-b-2 border-secondary_light rounded-md pb-5 transition-all
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
    <span class="absolute loader left-[35%]"></span>
{/if}

{#if $propagationResults}
    <div class="w-full flex flex-col gap-2">
        {#each $propagationResults.results as result }
            <div class="w-full grid grid-cols-[3fr_1fr_0.5fr] items-center border-y border-slate-400">
                <span>{result.server} </span>
                <div class="flex flex-col gap-1 col-start-2">
                    {#each result.answer as answer }
                         <span>{$propagationResults.type === 'MX' ? answer.exchange : answer.data || answer.address}</span>
                    {/each}
                </div>
                <span class="text-xl {result.answer.length ? 'text-green-500' : 'text-red-500'}"
                >{result.answer.length ? 'V' : 'X'}</span>
            </div>
        {/each}
    </div>
{/if}
<div class="{$propagationResults? "h-[20px]": "h-[150px]"}"/>
<style lang="postcss">
    .main-container:hover .btn {
        @apply border-secondary_light;
    }
    .btn:hover {
        @apply bg-secondary_light;
    }
    .sel-type:hover .triangle {
    border-color: #163383 transparent transparent transparent; 
    }
    .dropdown {
        transform-origin: top;
    }
    :global(.open) {
        @apply scale-y-100 h-auto;
    }
</style>