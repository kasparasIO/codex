<script lang="ts">
import HostCheck from "./lib/HostCheck.svelte";
import type { HostLoadData } from "./lib/types";
export let data: undefined | HostLoadData;
</script>
<svelte:head>
    <title>Codex - Host Check</title>
    <meta name="description" content="A simple utility app for debugging Host related domain, email and website issues" />
    <meta name="keywords" content="codex, utility apps, creative projects, sveltekit, web tools, personal projects" />
    <meta property="og:title" content="Codex - Host Check" />
    <meta property="og:description" content="A simple utility app for debugging Host related domain, email and website issues" />
    <meta property="twitter:title" content="Codex - Host check" />
    <meta property="twitter:description" content="A simple utility app for debugging Host related domain, email and website issues" />
    <meta property="og:url" content="https://codex.kasparas.io/host-check" />
    <meta property="twitter:url" content="https://codex.kasparas.io/host-check" />
</svelte:head>

<div class="page-container min-h-screen">
    <HostCheck paramData={data?.paramData}/>
</div>