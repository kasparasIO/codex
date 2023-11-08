<script lang="ts">
import { writable } from "svelte/store";
export let domain: string | undefined;

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
const propagationResults = writable([]);
const queryDns = async() => { 
 if (domain && selectedType) {
    const data = await fetch(`/api/dns-query?domain=${domain}&type=${selectedType}`)
    const res = await data.json()
    console.log(res)
    propagationResults.set(res)
 }
}
const handleClick = () => {
    queryDns();
}
</script>

<div class="grid grid-cols-[4fr_1fr] text-xl border-[3px] rounded-[4px] border-secondary transition hover:border-secondary_light
main-container">
    <button class="mx-auto w-full relative rounded-l-md">
        {selectedType}
    </button>
    <button on:click={handleClick} class="btn border-l-2 border-secondary rounded-l-none">
        CHECK
    </button>
</div>
{#each dnsTypes as type }
        <button on:click={() => {selectedType = type;}}>
            {type}
        </button>
{/each}

<style lang="postcss">
    .main-container:hover .btn {
        @apply border-secondary_light;
    }
    .btn:hover {
        @apply bg-secondary_light;
    }
</style>