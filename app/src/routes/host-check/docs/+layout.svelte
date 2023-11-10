<script lang="ts">
	import DocSidebar from "$components/DocSidebar.svelte";
</script>
<div class="grid grid-cols-[1fr_4fr] min-h-screen">
<DocSidebar/>
    <div class="flex flex-col gap-2 px-2 py-4 pr-10 doc-pages">
        <slot/>
    </div>
</div>
<style lang="postcss"> 
    .doc-pages {
        grid-column: 2;
    }
    @media (max-width: 560px) {
    .doc-pages {
        grid-column: span 2;
    }
}
</style>