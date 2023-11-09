<script lang="ts">
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { hostData } from "../stores";
let domain = $hostData?.domain_name;

interface DnsAnswer {
    name: string;
    type: string;
    ttl: number;
    data: string;
    exchange: string;
    address: string;
}

interface MXAnswer {
    class: number;
    exchange: string;
    priority: number;
    ttl: number;
    type: number;
    data: string;
    address: string;
}

interface PropagationResult {
    server: string;
    answer: Array<DnsAnswer> | Array<MXAnswer>;
}
interface PropagationResponse {
    type: string
    results: Array<PropagationResult>;
}
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
 if (domain && selectedType) {
    const data = await fetch(`/api/propagation?host=${domain}&type=${selectedType}`)
    const res = await data.json()
    console.log(res)
    propagationResults.set(res)
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
            <button class="w-full mr-4 border-b border-secondary transition hover:border-secondary_light" 
            on:click={() => {selectedType = type; open = false;}}>
                {type}
            </button>
    {/each}
    </div>
</div>
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
                <span>{result.answer.length ? 'V' : 'X'}</span>
            </div>
        {/each}
    </div>
{/if}   
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