<script lang="ts">
	import { onMount } from "svelte";
	import { errorStore, hostData } from "./stores";
	import ResultTable from "./ResultTable/ResultTable.svelte";
	import CopyToast from "$components/CopyToast.svelte";
    let inputVal: string|undefined;
    const fetchHostData = async () => { 
        try {
        const data = await fetch(`/api/host-check?host=${inputVal}`)
        const res = await data.json()
        hostData.set(res)
     } catch (e) { 
        errorStore.set((e as Error).message);
     }
    }
    hostData.subscribe((res) => console.log(res))
    const submit = () => {
        if (inputVal && inputVal.length > 0) fetchHostData();
    }
    const handlePaste = (e:KeyboardEvent) => {
        if (e.ctrlKey && e.code === "KeyV") submit()
    }
    onMount(() => {
        window.addEventListener("keydown", (e) => {
            if (e.code === "Enter") submit();
        })
    })
</script>


<div class="w-full flex flex-row relative">
<input type="text" 
on:keydown={handlePaste}
bind:value={inputVal}
class="w-[80%] py-2 px-2 rounded-l-md border-b-[1px] border-primary_light focus:outline"> 

<button on:click={submit}
class="rounded-r-md w-1/5 py-2 bg-primary transition hover:bg-primary_light flex justify-center">

<img src="search.png" alt="magnifying glass" class="max-w-[24px]">
 </button>
</div>
<ResultTable/>
<CopyToast/>


<style lang="postcss">
    input {
        background: none; 
    }
</style>