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

<div class="toast" bind:this={toast}>
   {toastText}
</div>

<style lang="postcss">
    .toast {
        @apply fixed bottom-4 right-4 bg-secondary text-text p-4 rounded-md transition-opacity duration-200 ease-in-out opacity-0;
    }
    :global(.toast.visible) {
        @apply opacity-100;
    }
</style>