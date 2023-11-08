<script>
	import Card from "$components/card.svelte";
</script>

<div class="page">
    <main class="w-full p-2 flex flex-col gap-10">
        <h1 class="text-5xl w-fit whitespace-pre-wrap">Welcome to Codex </h1>
        <p class="sm:text-2xl">If there's no need for introductions 
            <a href="#app-carousel" class="link">pick an app to use below</a>, <br> 
            if you're new and not sure what's going on feel free to check out more information about this website 
            <a class="link" href="#app-description">here</a>,<br>
            if you're an absolute veteran and a "G" and want to check out newest features and/or changelog, you can find it  
            <a class="link" href="changelog">here</a> <br>
        </p>
    </main>
    <div id="app-carousel" class="w-full py-2 flex flex-row gap-2 justify-center border-y-4 border-secondary">
        <Card imgSrc="world.svg" imgAlt="Pixel art depiction of a stylized Norse Viking inspired symbol representing the world">
            <h3 slot="title">Website lookup</h3>
            <p slot="description" class="text-center mt-auto">
                A simple website checker, that helps with debugging any services or components relating to a website / hosting service
            </p>
            <a slot="btn" href="/tester" class="btn btn-primary">Check</a>
        </Card>
    </div>
    <div id="app-description" class="border-y-4 border-secondary flex flex-col gap-2 p-2">
    <p class="text-lg">
        This corner of the internet started off as a side project while I was at Hostinger.
         It's grown into a cozy spot for me to tinker with web tools and share the results.
         Mostly, it's a collection of handy apps that I built for my colleagues initiall.
         If you find something useful that you wish was here or found a bug, drop me a message at my
         <a target="_blank" href="https://github.com/kasparasIO" class="link">GitHub</a>, feel free to check out the code.
        </p>

    <p class="text-lg">
        I built this site with my favorite web technologies - tools that make coding fun and my life a bit easier:
    </p>
    <ul class="list-disc pl-5">
        <li>
            <a target="_blank" class="link" href="https://kit.svelte.dev/">SvelteKit</a> - it's the front-end framework I enjoy the most.
            It's not just me; Sveltekit has been getting lots of love for being fast and flexible.
             Plus, it lets you build things without the bloat.
        </li>
        <li><a target="_blank" href="https://firebase.google.com/" class="link">Firebase</a> - The classic serverless backend
            for a lot of svelte applications. Fireship even has a library for this union called 
            <a target="_blank" href="https://sveltefire.fireship.io/" class="link">Sveltefire</a> (even though I'm not using it here). 
            While these days firebase is not the most known for a quick and simple developer experience compared to 
            something that
            <a target="_blank" href="https://vercel.com/docs/functions/serverless-functions" class="link">Vercel functions</a>  
            or 
             <a target="_blank" href="https://www.fl0.com/" class="link">Fl0</a>  
             provide, it's still my preffered way to approach serverless due to deep integration with 
            other Google products, such as analytics, auth and firestore. 
        </li>
        <li>
            <a href="https://vercel.com/" target="_blank" class="link">Vercel</a>
             - it's the go-to for putting front-end projects live, especially when you want to keep things simple.
              It hooks up to your GitHub and takes care of the rest, which provides the most conveniance for personal projects.
        </li>
        <li><a href="https://tailwindcss.com/" target="_blank" class="link">TailwindCSS</a> - 
        Who doesn't love Tailwind? It's my preferred way of writting any sort of CSS. Tailwind is great, it provides a ton of 
        utility classes, while not limiting you and allowing you to create or use your own design system, making CSS quick and simple.</li>
        <li><a href="https://www.realtimecolors.com/" target="_blank" class="link">Realtimecolors.com</a> - 
            while not really a <span class="italic"> web technology </span> per say, it's a website built by 
            <a href="https://www.youtube.com/@juxtopposed" target="_blank" class="link">Juxtopposed</a> 
            that I really liked and I used it to make this sites color scheme, choose the font and get some inspiration on design. 
            If you're building websites, do check it out.
            The creator herself is really awesome and I enjoy her insights into the frontend world. Besides, since I'm bad at desgin this tool 
            saved me hours of work, thus it deffinately deserves an honourable mention here!</li>
        </ul>
    </div>

</div>