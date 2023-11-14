<script lang="ts">
import { domainValidation } from "$lib/utils";
import {Search} from "lucide-svelte"
import { onMount } from "svelte";
import { fetchHostData } from "./lib";

let inputValue = "";
let inputState: string = "";
let loading = false;
const testInputValidation = () => {
    if (inputValue.length < 3 ) {
        inputState = "";
    }
    else if (domainValidation.test(inputValue)) {
        inputState = "";
    } else {
        inputState = "error";
    }
}
const submitWrapper = async () => {
    if (loading) return;
    loading = true;

    try {
    await fetchHostData(inputValue);
    } catch (e) {
        console.log((e as Error).message);
    } finally {
        loading = false;
    }
}
const submit = () => {
    submitWrapper()
}

onMount(() => {
    window.addEventListener("keydown", (e)=> {
        if (e.key === "Enter") submit()
    })
})
</script>


<div class="flex flex-col gap-4 w-full relative">
    <label for="Domain" class="text-xl">Please provide a Domain name:</label>
    <div class="w-full grid grid-cols-[4fr_1fr]">
        <input type="text" name="Domain" class="{inputState}"
         bind:value={inputValue} on:input={testInputValidation} >
        <button disabled={inputState === "error"? true: false} on:click={submit}>
            <Search />
        </button>
    </div>
    {#if inputState === "error"}
        <span class="text-red-500">Please enter a valid domain name.</span>
    {/if}
    {#if loading}
    <div class="absolute top-full w-full flex justify-center">
        <span class="loader w-[5rem]"/>
    </div>
    {/if}
</div>





<style lang="postcss">
    input {
        background: none;
        @apply border border-primary transition border-r-0 rounded-l-md p-2;
    }
    input:focus{
        outline: none;
        @apply border-primary_light;
    }
    button {
        @apply w-full h-full bg-primary transition hover:bg-primary_light rounded-r-md flex justify-center items-center;
    }
    button:focus {
        outline: none;
        @apply bg-primary_light;
    }
    button:disabled {
        @apply bg-secondary;
    }
    :global(.error) {
        @apply !border-red-500;
    }
</style>