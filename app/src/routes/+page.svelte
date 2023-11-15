<script lang="ts">
    import Card from "$components/ui/Card.svelte";
    import Slider from "$components/ui/Slider.svelte";
    import HeroUnit from "../lib/components/HeroUnit.svelte";
</script>
<svelte:head>
    <title>Codex - A Collection of Practical and Creative Apps</title>
    <meta name="description" content="explore codex, a diverse collection of apps ranging from practical utilities to creative projects, crafted for personal use and shared for everyone to discover." />
    <meta name="keywords" content="codex, utility apps, creative projects, sveltekit, web tools, personal projects" />
    <link rel="canonical" href="https://codex.kasparas.io" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://codex.kasparas.io" />
    <meta property="og:title" content="Codex - A Collection of Practical and Creative Apps" />
    <meta property="og:description" content="Explore Codex, a diverse collection of apps ranging from practical utilities to creative projects, crafted for personal use and shared for everyone to discover." />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://codex.kasparas.io" />
    <meta property="twitter:title" content="Codex - A Collection of Practical and Creative Apps" />
    <meta property="twitter:description" content="Explore Codex, a diverse collection of apps ranging from practical utilities to creative projects, crafted for personal use and shared for everyone to discover." />
    <meta property="twitter:image" content="https://www.yourwebsite.com/image.jpg" />
</svelte:head>




<div class="page-container w-full min-h-screen py-5 px-4 bg-background flex flex-col gap-4">
    <main class="w-full min-h-[35rem] h-full bg-no-repeat bg-cover rounded-md flex relative"> 
        <HeroUnit>
            <h1 class="lg:text-3xl text-xl">
            Codex
            </h1>
            <p class="text-center lg:text-lg">
            A collections of apps, crafted for personal use 
            that range from practical utilities to creative projects. They're shared here for you to explore,
            perhaps finding something that resonates with your own needs.
            </p>
            <div class="grid grid-cols-2 lg:mb-auto">
                <a class="btn border-y border-l border-primary rounded-l-sm hover:border-primary_light" 
                href="#apps">Apps</a>
                <a class="btn border-y border-r border-primary rounded-r-sm hover:border-primary_light"
                 href="#apps">
                    Learn More
                </a>
            </div>
        </HeroUnit>        
    </main>
    <div class="w-full">
        <img src="separator.webp" alt="" class="w-full">
    </div>
    <section id="apps" class="w-full py-4 px-2 flex flex-col gap-4 justify-center items-center">
        <h2 class="text-3xl text-center">
            Apps
        </h2>
        <Slider>
            <Card imgSrc="planet.png" style="">
                <h3 slot="title">Host Check</h3>
                <p slot="description" class="text-center text-lg my-auto">
                    A simple utility app to check website hosts
                </p>
                <a href="/host-check" slot="btn" class="btn btn-primary-border text-xl py-1 px-6 hover:bg-primary_light">Go Now!</a>
            </Card>
            <Card imgSrc="question-mark.webp">
                <h3 slot="title" class="text-center">Coming soon</h3>
                <p slot="description" class="text-center mt-auto">This application is not ready to be seen publically just yet.</p>
                <button slot="btn" class="btn text-xl py-1 px-6 bg-secondary rounded-sm" disabled>
                    Not available yet.
                </button>
            </Card>
            <Card imgSrc="question-mark.webp">
                <h3 slot="title" class="text-center">Coming soon</h3>
                <p slot="description" class="text-center mt-auto">This application is not ready to be seen publically just yet.</p>
                <button slot="btn" class="btn text-xl py-1 px-6 bg-secondary rounded-sm" disabled>
                    Not available yet.
                </button>
            </Card>
        </Slider>
    </section>
    <div class="w-full">
        <img src="separator.webp" alt="" class="w-full">
    </div>
    <section class="flex flex-col gap-4 w-full py-6 px-4">
        <h2 class="text-3xl text-center">
            What's this?
        </h2>
        <p class="text-lg">
            This is a personal Sveltekit Project that is mainly meant for personal use. The main branch is open to the public for conveniance,
            however keep in mind that this is not the full version as it is behind dev branch by quite a bit of commits, due to overall
            code cleanliness and in desperate need of refactoring. 
        </p>
        <p class="text-lg">
            Nontheless I hope this will be usefull for you, if you have any suggestions, see any bugs, feel free to 
        <a href="/contact" class="text-accent hover:text-accent_light">
        reach out</a>,
        or submit an issue on
        <a href="https://github.com/kasparasIO/codex/issues/new" target="_blank" class="text-accent hover:text-accent_light">
            Github</a>
        </p>

    </section>
</div>

<style lang="postcss">
    main {
        background-image: url("background.webp");
        background-position: center;
  }
</style>
