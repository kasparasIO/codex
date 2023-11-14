<header class="w-full py-3 sticky top-0 z-[99]">
<nav class="grid grid-cols-[1fr_3fr_1fr] px-4">
    <a href="/" class="flex flex-row gap-4 items-center logo-container"> 
        <img src="/logo.png" alt="A pixel art randition of a tome in a spacey background" class="w-16">
        <span class="text-3xl italic">CODEX</span>
    </a>
</nav>
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
</style>