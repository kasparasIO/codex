<script lang="ts">
import HostCheck from "./lib/HostCheck.svelte";
import type { HostLoadData } from "./lib/types";
export let data: undefined | HostLoadData;
</script>

<div class="page-container min-h-screen">
    <HostCheck paramData={data?.paramData}/>
</div>