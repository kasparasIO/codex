<script lang="ts">
import {Github} from "lucide-svelte";
</script>

<header class="w-full py-3 sticky top-0 z-[99]">
<div class="grid grid-cols-[0.5fr_3fr_1fr] px-4 items-center">
    <div class="flex flex-row items-center gap-2 min-w-max">
    <a href="/" class="flex flex-row gap-4 items-center logo-container"> 
        <img src="/logo.png" alt="A pixel art randition of a tome in a spacey background" class="w-16">
        <span class="text-3xl italic">CODEX</span>
    </a>
    <img src="/header_separator.png" alt="A pixel art randition of a glowing orb" class="max-w-[24px] max-h-[24px]">
    </div>
    <nav class="flex flex-row gap-3 mr-auto text-xl pl-5">
        <a href="/host-check" class="transition hover:text-blue-400">Host Check</a>
    </nav>
    <div class="flex flex-row gap-4 text-lg ml-auto">
    <img src="/header_separator.png" alt="A pixel art randition of a glowing orb" class="max-w-[24px] max-h-[24px]">
    <a href="/contact" class="text-accent hover:text-accent_light">Contact</a>
    <a href="https://github.com/kasparasIO/codex/issues" class="text-accent hover:text-accent_light min-w-max" target="_blank">
        Found a bug?
    </a>
        <a href="https://github.com/kasparasIO/codex" target="_blank"
         class="flex flex-row gap-2 max-w-min text-accent hover:text-accent_light col-start-3">
            <span>Github</span> <Github size={"24px"} />
        </a>
    </div>
</div>
</header>

<style lang="postcss">
    header{
    background: linear-gradient(0deg, #041440 -280%, #040916 100%);
    box-shadow: 0px 4px 9px 0px black;
    }
    .logo-container img, .logo-container span {
        @apply transition; 
    } 
    .logo-container:hover img {
        transform: scale(1.1);
    }
    .logo-container:hover span {
        @apply text-blue-400;
    }
    nav a {
        font-family: 'Iceberg', sans-serif;
    }
</style>