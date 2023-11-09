<script lang="ts">
	import { onMount } from "svelte";

    let toast:HTMLDivElement;
    let toastText = "";

    const handleCopyEvent = (e:CustomEvent) => {
        toast.classList.add("visible");
        toastText = e.detail.text;
        setTimeout(() => {
            if (toast.classList.contains("visible"))
            toast.classList.remove("visible")
        }, 2000);
    }
    onMount(() => {
        document.addEventListener("copied", handleCopyEvent as EventListener);
        return () => window.removeEventListener("copied", handleCopyEvent as EventListener);
    })
</script>

<div class="toast flex flex-row gap-2 items-center" bind:this={toast}>
   <img src="info.png" alt="icon represeting information" class="w-4 h-4">{toastText}
</div>

<style lang="postcss">
    .toast {
        display: none;
        @apply fixed bottom-4 right-4 bg-accent text-background p-4 rounded-md transition-opacity duration-200 ease-in-out opacity-0;
       
    }
    :global(.toast.visible) {
        display: flex;
        @apply opacity-100;
        
    }
</style>