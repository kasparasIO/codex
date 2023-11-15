<svelte:head>
    <title>Codex Changelog - Latest Updates and Improvements</title>
    <meta name="description" content="Stay updated with the latest changes and improvements in Codex. Discover new features, fixes, and enhancements in our changelog." />
    <meta name="keywords" content="Codex, changelog, updates, improvements, new features, SvelteKit" />
    
    <meta property="og:title" content="Codex Changelog - Latest Updates and Improvements" />
    <meta property="og:description" content="Explore the latest updates, features, and improvements in Codex. Our changelog keeps you informed about what's new and enhanced." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://codex.kasparas.io/changelog" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://codex.kasparas.io/changelog" />
    <meta property="twitter:title" content="Codex Changelog - Latest Updates and Improvements" />
    <meta property="twitter:description" content="Explore the latest updates, features, and improvements in Codex. Our changelog keeps you informed about what's new and enhanced." />
</svelte:head>
<div class="page-container vertical-flex min-h-screen">
    <h1 class="text-5xl border-b-2 pb-4 border-secondary">
        Changelog
    </h1>
    <div class="vertical-flex">
        <h2 class="text-3xl">Version 1.0</h2>
        <h3 class="text-2xl">Major changes</h3>
        <ul class="list-disc list-inside text-xl">
            <li>Recreated design for home and other pages, including adding header and other utility components.</li>
            <li>Added utility pages, including contact and changelog.</li>
            <li>Remade "Websites" tab for Host-checker to return more relevant information, added tab for checking emails.</li>
            <li>Moved all backend functions to firebase for more consistent logic and control over runtime. </li>
            <li>No more dependancies on third-party api's such as API Ninja, for DNS lookups.</li>
            <li>Adjusted Subscribe/unsubscribe logic, now all components that don't use automatic subscriptions, unsubscribe when onDestroy lifecycle hook runs.
                The app is no longer memory leaky and faster as a result.
            </li>
            <li>Event listeners are removed when onDestroy lifecycle hook runs.</li>
            <li>Added Copy logic, for quick copying of returned data from host-check</li>
        </ul>
        <h3 class="text-2xl">
            Minor adjustments
        </h3>
        <ul class="list-disc list-inside text-lg">
            <li>Mobile view improved.</li>
            <li>Added meta-data.</li>
            <li>Source code available on Github.</li>
        </ul>
    </div>
</div>