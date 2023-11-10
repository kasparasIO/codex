<script lang="ts">
	import Tester from "./tester.svelte";
</script>

<div class="w-full min-h-screen h-full tester-overlay absolute z-0"/>
<div class="w-full relative flex flex-col gap-2 py-7 px-8">
<a class="w-fit ml-auto flex flex-col gap-1 items-center doc-link" 
href="/host-check/docs">
<img src="docs.svg" alt="A pixel art randition of a book" class="max-w-[58px] transition">
<span class="text-xl link">Usefull Info</span>
</a>
 <h1 class="text-2xl mt-2">Provide a domain name to check: </h1>
    <Tester/>
</div>

<style lang="postcss">
    .tester-overlay { 
        @apply bg-background opacity-75;

    }
    .doc-link:hover img { 
        transform: scale(1.2);
    }
    .doc-link:hover span {
        @apply text-accent_light;
    }
</style>