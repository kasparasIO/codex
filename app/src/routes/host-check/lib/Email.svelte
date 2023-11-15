<script lang="ts">
import { copyToClipboard } from "$lib/utils";
import {checkNS, isNsPropagated} from "./lib";
import {hostData} from "./lib";
import type {MXRecord, NsPropagationCheck} from "./types";
import { onDestroy } from "svelte";
let filteredMxRecords: MXRecord[] = [];
let filteredSpfRecords: string[] = [];
let loadingNs = false; 
let nameserverData: NsPropagationCheck | undefined = undefined;

const filterMx = () => {
    const mxRecords = $hostData?.dns_lookup?.filter((record) => record.recordType === "MX");
    mxRecords?.forEach((record) => {
        if (record.records && Array.isArray(record.records)) {
            filteredMxRecords = record.records as MXRecord[];
        }
    })
}
const filterSpf = () => {
    const txtRecords = $hostData?.dns_lookup?.filter((record) => record.recordType === "TXT");
    if (txtRecords && Array.isArray(txtRecords)) {
        filteredSpfRecords = txtRecords.flatMap(record => {
            if (record.records && Array.isArray(record.records)) {
                return record.records.flat().filter((txt): txt is string => typeof txt === 'string' && txt.startsWith("v=spf1"));
            }
            return [];
        });
    }
}
const getNsData = async () => {
    try {
        loadingNs = true; 
        if ($hostData){
        const nsData = await checkNS($hostData?.domain_name);
        if (nsData) {
            const resObject = isNsPropagated(nsData);
            nameserverData = resObject
        }
    }
} catch (e) {
    console.log(e);
} finally {
    loadingNs = false; 
    }
}
 let unsubscribe: () => void;
    const subscribeToHostData = () => {
        unsubscribe = hostData.subscribe(() => {
            filterMx();
            filterSpf();
            getNsData();
        });
    };

subscribeToHostData();

onDestroy(()=>{
    if (unsubscribe) unsubscribe()
});
</script>

<div class="w-full grid grid-cols-3 gap-2 p-2">
    <div class="result-container">
        <span class="text-xl">
            {filteredMxRecords.length > 0 ? "Mail Exchange records found 👍 - the mail server should be able to receive emails" :
            "❗ No Mail Excahnge records found, the email server is not able to receive mail."}
        </span>
        <div class="flex flex-col gap-2 my-auto items-center content-center">
        {#if filteredMxRecords.length > 0 }
        <span class="text-lg">Results:</span>
            {#each filteredMxRecords as record }
            <span use:copyToClipboard 
            class="text-center border-b border-secondary_light copy">
                {record.exchange} 
            </span>
            {/each}
        {/if}
        </div>
    </div>
    <div class="result-container">
         <span class="text-xl mt-auto h-fit">
            {filteredSpfRecords.length > 0 ? "SPF records found 👍 - Emails should not go to spam" :
            "❗ No SPF records found, the domain might not be configured for email sender validation."}
        </span>
        <div class="flex flex-col gap-2 my-auto items-center content-center">
        {#if filteredSpfRecords.length > 0 }
            <span class="text-lg">Results:</span>
             {#each filteredSpfRecords as record }
            <span use:copyToClipboard 
            class="text-center border-b border-secondary_light copy">
                {record} 
            </span>
             {/each}
        {/if}
        </div>
    </div>
    <div class="result-container relative">
        {#if loadingNs}
            <span class="loader absolute top-[30%]"></span>
        {/if}
        {#if nameserverData && nameserverData.isPropagated === true && !loadingNs}
            <span class="text-lg my-auto">
                Nameservers are propagated and the DNS zone is active, there is nothing to worry about 👍
            </span>
        {/if}
        {#if !nameserverData?.isPropagated && !loadingNs}
            <span class="text-lg my-auto">
                ❗ Not all nameservers are propagated, the DNS zone might not be active yet, consider going to the
                Domains tab to check the status of propagation.
            </span>
        {/if}
    </div>
</div>
<section class="flex flex-col gap-2">
    <h3 class="text-xl w-full text-center border-b border-primary py-2">Breakdown</h3>
    {#if nameserverData && nameserverData.isPropagated}
        <ul>
            <li class="copy {filteredMxRecords.length > 0 ? 'green' : 'yellow'}" use:copyToClipboard>
                {filteredMxRecords.length > 0 
                 ? 'MX records are present, emails should be receivable to the mail inbox.' 
                 : 'MX records are not present, emails will not be receivable to the mail inbox.'}
            </li>
            <li class="copy {filteredSpfRecords.length > 0 ? 'green' : 'yellow'}" use:copyToClipboard>
                {filteredSpfRecords.length > 0 
                 ? 'SPF records are present, sent out emails should not go to spam' 
                 : 'SPF records are not present, sent out emails might go to spam'}
            </li>
            <li class="copy green" use:copyToClipboard>
                Dns Zone should be working correctly and is able to accommodate traffic to the mail server
            </li>
        </ul>
    {:else if !nameserverData?.isPropagated}
    <li class="text-red-500">
        NS records do not seem to be propagated, meaning that the DNS zone is not active yet. Nothing connected to this domain should be working.
    </li>
    {/if}
</section>



<style lang="postcss">
 .copy::after{
    right: -2rem;
 }
 .result-container { 
    @apply w-full flex flex-col items-center content-center gap-2 border-2 border-primary p-2 rounded-[6px] py-6 min-h-full;

 }
 .result-container > span {
    @apply text-center;
 }
 ul {
    @apply list-inside list-disc;
 }
 li {
    @apply w-fit
 }
 .green {
    @apply text-emerald-500;
 }
 .yellow {
    @apply text-yellow-500;
 }
</style>