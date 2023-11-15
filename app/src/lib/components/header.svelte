<script lang="ts">
import { Home, File, Github } from "lucide-svelte";
import { onMount } from "svelte";

onMount(()=> {
    document.addEventListener('click', (e) =>{
        if(e.target !== document.querySelector('input[type="checkbox"]')) {
            (document.querySelector('input[type="checkbox"]') as HTMLInputElement).checked = false;
        }
    })
})
</script>

<header class="py-4 px-2 grid grid-cols-[24px_0.6fr_8fr_24px] gap-4 items-center sticky top-0 z-50">
    <img src="header_separator.png" alt="A pixel art randition of a glowing orb" class="separator mr-auto">
    <div class="w-full px-4 flex flex-row gap-3 min-h-[48px] items-center justify-center border-r-2 border-secondary">
    <a href="/" class="text-sky-700 transition hover:text-sky-600"><Home /></a>
        <div class="dropdown text-sky-700 transition hover:text-sky-600 relative h-full">
            <File />
            <input type="checkbox" class="absolute z-20">
            <div class="dropdown-content transition absolute bg-background px-4 py-5 vertical-flex text-sky-500">
                <a class="transition hover:text-sky-400 text-center" href="/host-check">Host Check</a>
                <div class="other-links justify-center items-center mt-auto">
                    <a href="https://github.com/kasparasIO/codex" target="_blank" class="p-1 rounded-full border-2 border-sky-600 
                    hover:border-sky-500 max-w-[30px]">
                        <Github size={"1.2rem"}/>
                    </a>
                    <a href="https://github.com/kasparasIO/codex/issues" target="_blank">
                        Found an issue?</a>
                    <a href="/contact">Contact</a>
                    <a href="/changelog">Changelog</a>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full h-full flex flex-row items-center justify-end gap-4 px-4 border-r-2 border-secondary other-links mobile-hidden">
        <a href="https://github.com/kasparasIO/codex" target="_blank" class="p-1 rounded-full border-2 border-sky-600 
        hover:border-sky-500">
            <Github size={"1.2rem"}/>
        </a>
        <a href="https://github.com/kasparasIO/codex/issues" target="_blank">
            Found an issue?</a>
        <a href="/contact">Contact</a>
        <a href="/changelog">Changelog</a>
    </div>
    <img src="header_separator.png" alt="A pixel art randition of a glowing orb" class="separator ml-auto col-start-4">

</header>

<style lang="postcss">
header{
    background: linear-gradient(0deg, #041440 -280%, #040916 100%);
    box-shadow: 0px 4px 9px 0px black;
    font-family: 'Iceberg', sans-serif;
}
header .separator {
    height: 24px;
    width: 24px;
}
.dropdown-content{
    top: 1.8rem;
    left: -2rem;
    z-index: 90;
    min-width: max-content;
    border-radius: 6px;
    box-shadow: 0px 1px 0 1px;
    transform-origin: top;
    transform: scaleY(0);
}
.dropdown-content:hover {
    transform: scaleY(1);
}
.dropdown:hover .dropdown-content {
    transform: scaleY(1);
}
.other-links a {
    @apply text-sky-500 transition hover:text-sky-400 text-center;
}
.dropdown-content .other-links {
    @apply flex flex-col gap-2;
}
@media screen and (min-width: 920px){
    .dropdown input {
        display: none;
    }
    .dropdown-content .other-links {
        display: none;
    }
}
@media screen and (max-width: 920px){
.mobile-hidden {
    display: none;
}
 input {
    width: 100% !important;
    height: 100% !important;
    top: 0;
    opacity: 0;
 }
 .dropdown-content {
    transform-origin: left;
    left: -6.5rem;
    transform: scaleX(0);
    box-shadow: 1px 0px 0 1px;
    height: 90vh;
    width: 50vw;
 }
 .dropdown input:checked ~ .dropdown-content {
    transform: scaleX(1);
 }
}
</style>