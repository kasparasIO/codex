<script lang="ts">
	import Tester from "./tester.svelte";
</script>

<div class="w-full min-h-screen h-full tester-overlay absolute z-0"/>
<div class="w-full relative flex flex-col gap-2 py-7 px-8">
 <h1 class="text-2xl mt-2">Provide a domain name to check: </h1>
    <Tester/>
</div>

<style lang="postcss">
    .tester-overlay { 
        @apply bg-background opacity-75;

    }
</style>