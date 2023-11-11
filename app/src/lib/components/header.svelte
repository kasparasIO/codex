<script lang="ts">
let open = false;
</script>

<header class="w-full bg-background border-b border-primary fixed top-0 z-50 text-xl">
<div class="grid grid-cols-[0.8fr_5fr] pr-5">
    <div class="image-container w-full h-full col-start-1 border-r border-primary"/>
    <nav class="flex flex-row gap-2 pl-4 items-center">
        <a href="/" class="py-2 flex flex-row gap-3 items-center transition home-link">
            <img class="max-h-[48px]" src="logo.webp" alt="A pixel art randition of a book">
            <span class="text-2xl italic">CODEX</span>
        </a>
        <div class="text-xl ml-auto other-links h-full flex">
          <div on:mouseenter={()=> {open = true;}}
               on:mouseleave={()=> {open = false;}} 
               role="button"
               tabindex="0"
           class="relative h-full flex">
            <a href="/#apps"
            class="flex flex-row gap-2 items-center">
             Apps 
             <img src="right.png" alt="pixel art arrow" class="max-w-[12px] rotate-90"></a>
                <div class="{open ? 'open' : ''}
                px-5 py-4 border-x-2 border-b-2 border-primary absolute flex flex-col gap-2 right-0 top-[3.9rem]
                bg-background rounded-b-md transition ease-in-out dropdown">
                    <a href="/host-check" class="link min-w-max border-b border-primary">Host Check</a>
                </div>    
            </div>
        </div>
        <a href="changelog" class="link">Changelog</a>
        <a href="https://github.com/kasparasIO" target="blank" class="link flex flex-row gap-2 items-center">
            <img src="github.png" alt="Github logo" class="h-4">
            <span>Github</span></a>
    </nav>
</div>
</header>


<style lang="postcss">
.image-container{
    background-image: url('new_test.webp');
    background-position: center;
    background-size: cover;
}
img[src="logo.webp"]{
    transform: skew(-10deg);
}
.home-link:hover{
    transform: scale(1.1);
    @apply text-accent
}
.dropdown {
    transform-origin: top;
    transform: scaleY(0);
}
.open {
    transform: scaleY(1);
}
</style>