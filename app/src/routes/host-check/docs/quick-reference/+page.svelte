<script lang="ts">
import { copyToClipboard } from "$lib";
</script>

<h1 class="text-5xl border-b border-slate-700">
    Quick Reference
</h1>
<section>
    <h2 class="text-2xl">Table of contents</h2>
    <ol class="list-inside list-decimal text-xl">
        <li>
            <a href="#Nameservers" class="link">Nameservers</a>
        </li>
        <li><a href="#MX" class="link">Mail Exchange Records</a></li>
    </ol>
</section>

<section class="border-y-4 border-secondary py-2" id="Nameservers">
<h2 class="text-2xl">
    Nameservers
</h2>

<ul>
  <li>
    <a href="https://www.hostinger.com">Hostinger</a> -
     <div>
         <span use:copyToClipboard 
         class="copy">ns1.hostinger.com </span>
         <span use:copyToClipboard 
         class="copy">ns2.hostinger.com </span>
        </div>
    </li>
  <li>
    <a href="https://www.godaddy.com">GoDaddy</a> - 
    <div>
     <span use:copyToClipboard 
     class="copy">ns1.domaincontrol.com</span>
     <span use:copyToClipboard 
     class="copy">ns2.domaincontrol.com</span>
     </div>
</li>
  <li>
    <a href="https://www.bluehost.com">Bluehost</a> -
     <div> 
        <span use:copyToClipboard
         class="copy">ns1.bluehost.com</span>
         <span use:copyToClipboard 
         class="copy">ns2.bluehost.com</span>
        </div>
    </li>
  <li>
    <a href="https://www.namecheap.com">Namecheap</a> - 
    <div>
        <span use:copyToClipboard 
        class="copy"> dns1.registrar-servers.com</span>
        <span use:copyToClipboard 
        class="copy">dns2.registrar-servers.com </span>
     </div>
</li>
  <li>
    <a href="https://www.siteground.com">SiteGround </a>  - 
    <div> 
        <span use:copyToClipboard
        class="copy">ns1.siteground.net </span>
        <span use:copyToClipboard 
        class="copy">ns2.siteground.net</span> 
    </div>
</li>
  <li>
    <a href="https://www.dreamhost.com">DreamHost</a> - 
    <div>
        <span use:copyToClipboard 
        class="copy"> ns1.dreamhost.com </span>
        <span use:copyToClipboard 
        class="copy"> ns2.dreamhost.com</span>
    </div>
</li>
  <li>
    <a href="https://vercel.com/">Vercel</a> - 
    <div> 
        <span use:copyToClipboard 
        class="copy">ns1.vercel-dns.com</span>
        <span use:copyToClipboard 
        class="copy">ns2.vercel-dns.com</span>
    </div>
 </li>
</ul>
</section>


<section class="border-y-4 border-secondary py-2" id="MX">
    <h2 class="text-2xl">
        Mail Exchange Records
    </h2>

    <ul>
        <li>
            <a href="https://www.hostinger.com">Hostinger</a> - 
            <div>
                <span use:copyToClipboard class="copy">mx1.hostinger.com</span>
                <span use:copyToClipboard class="copy">mx2.hostinger.com</span>
            </div>
        </li>
        <li>
            <a href="https://workspace.google.com">Google Workspace</a> - 
            <div>
                <span use:copyToClipboard class="copy">aspmx.l.google.com</span>
                <span use:copyToClipboard class="copy">alt1.aspmx.l.google.com</span>
                <span use:copyToClipboard class="copy">alt2.aspmx.l.google.com</span>
                <span use:copyToClipboard class="copy">alt3.aspmx.l.google.com</span>
                <span use:copyToClipboard class="copy">alt4.aspmx.l.google.com</span>
            </div>
        </li>
        <li>
            <a href="https://titan.email">Titan</a> - 
            <div>
                <span use:copyToClipboard class="copy">mx1.titan.email</span>
                <span use:copyToClipboard class="copy">mx2.titan.email</span>
            </div>
        </li>
        <li>
            <a href="https://www.zoho.com/mail/">Zoho Mail</a> - 
            <div>
                <span use:copyToClipboard class="copy">mx.zoho.com</span>
                <span use:copyToClipboard class="copy">mx2.zoho.com</span>
            </div>
        </li>
    </ul>
</section>


<style lang="postcss">
ul li {
    @apply grid grid-cols-[1fr_0.2fr_3fr] items-center w-[40%] border-y-2 border-slate-700;
}
div {
    @apply flex flex-col gap-1 items-center;
}
.copy::after{
    right: -2rem;
}
</style>