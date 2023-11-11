<script>
	import Polygon from "$components/polygon.svelte";
	import Card from "$components/card.svelte";

</script>

<div class="w-full h-full py-5 px-4 bg-background flex flex-col gap-4">
    <main class="w-full min-h-[35rem] bg-no-repeat bg-cover rounded-md flex relative"> 
        <div class="sm:w-[40%] sm:min-w-[471px] 
        min-h-[243px] mt-auto mx-auto relative flex justify-center card-container">
            <div class="absolute bottom-0 w-full z-0">
                <Polygon />
            </div>
            <div class="relative z-10 sm:w-[80%] flex flex-col gap-2 justify-center items-center py-2 container">
                <h1 class="sm:text-4xl text-xl text-center">Welcome to Codex</h1>
                <p class="sm:text-lg text-center">Codex is a collection of applications built with 
                <a href="https://kit.svelte.dev/" target="_blank" class="link">Sveltekit</a>, mainly meant for personal use and
                portfolio building.
            </p>
                <div class="flex flex-row justify-center w-fit items-center">
                    <a href="#apps" class="btn btn-primary-border border-r-0 rounded-r-none min-w-max">Find Apps</a>
                    <a href="/changelog" class="btn btn-primary-border border-x-0 min-w-max rounded-none">Changelog</a>
                    <a href="#about" class="btn btn-primary-border border-l-0 min-w-max rounded-l-none">Learn More</a>
                </div>
            </div>
        </div>
    </main>
    <div class="w-full">
        <img src="new_new_separator.webp" class="w-full max-h-[32px]" alt="">
    </div>
    <section id="apps" class="w-full flex flex-col gap-5 py-4 px-2">
        <h2 class="text-4xl text-center">Apps</h2>
    <div class="flex flex-row justify-center">
        <Card imgSrc="planet.png" imgAlt="Pixel art depiction of a stylized Norse Viking inspired symbol representing the world">
        <h3 slot="title">Host lookup</h3>
            <p slot="description" class="text-center mt-auto">
                A simple website checker, that helps with debugging any services or components relating to a website / hosting service
            </p>
            <a slot="btn" href="/host-check" class="btn btn-primary">Check</a>
        </Card>
    </div>
    </section>
    <div class="w-full">
        <img src="new_new_separator.webp" class="w-full max-h-[32px]" alt=""> 
    </div>
    <section id="about" class="w-full flex flex-col gap-5 py-4 px-2">
        <h2 class="text-4xl text-center">What's this?</h2>
        <p class="text-lg">
            This corner of the internet, started off as a side project while I was working at Hostinger, 
            made for programming practice and to have something to publish and be helpfull for my colleagues. Hosting check 
            was the first and only app that was originally meant for this project, but after using it for personally for a bit, I understood
            that it required a re-write and a better design, so this is the official 1.0 release of the site. 
        </p>
        <p class="text-lg">
            Overall, I really enjoy tinkering around with code and building apps, espcially since there's pretty niche things I like and don't
            so this website is a collection of apps that I built for myself and my ex-colleagues,
            I hope will be usefull for you as well if it's you're first time here.
        </p>
        <p class="text-lg">
            If you're interested in the technical details of the site you may find them <a href="/technical-details" class="link">HERE</a>,
            You can also take a look at the code in my <a href="https://github.com/kasparasIO" class="link">Github</a>
        </p>
    </section>
</div>

<style lang="postcss">
    main {
        background-image: url('/generated-background.webp');
        background-position: center;
    }
    @media screen and (max-width: 442px) {
        .btn {
            font-size: 12px !important;
            padding-inline: 15px;
        }
        .container {
            @apply bg-background;
        }
        
    }
</style>