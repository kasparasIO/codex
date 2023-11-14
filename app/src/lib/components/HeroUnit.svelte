<script lang="ts">
import Polygon from "$components/ui/Polygon.svelte";
</script>

<div class="sm:w-[50%] sm:min-w-[471px] min-h-[243px] mt-auto mx-auto relative flex justify-center">
    <div class="absolute bottom-0 w-full z-0">
        <Polygon />
    </div>
    <div class="relative z-10 sm:w-[80%] flex flex-col gap-2 justify-center items-center py-2 container">
        <slot/>
    </div>
</div>

<style lang="postcss">
@media screen and (max-width: 442px) {
    .container {
        @apply bg-background
    }
}
</style>