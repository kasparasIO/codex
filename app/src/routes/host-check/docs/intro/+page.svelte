<h1 class="text-5xl border-b border-slate-700">
    Introduction
</h1>
<h2 class="text-2xl">
    Table of contents
</h2>
<ol class="list-inside list-decimal">
    <li>
        <a href="#start" class="link">Starting introductions</a>
    </li>
    <li><a href="#how-to" class="link">How to use?</a></li>
    <li><a href="#whois" class="link">Whois explanation</a></li>
    <li><a href="#dns-zone" class="link">DNS zone</a></li>
    <li><a href="#subdomain" class="link">Subdomain</a></li>
    <li><a href="#propagation-tab" class="link">Propagation</a></li>
</ol>
<section id="start"> 
<p class="text-lg">
    If this is the first time you're using this app, or this is your first time with having issues with Hosting and such terms as:
    <ul class="list-inside list-disc">
        <li>DNS</li>
        <li>DNS zone</li>
        <li>DNS records</li>
        <li>SPF</li>
        <li>etc.</li>
    </ul>
<p class="text-lg">Please check out the page, where it's explained how to check the data provided and use this tool. </p>
</section>
<section id="how-to" class="flex flex-col gap-2">
    <h2 class="text-2xl">How to use?</h2>
    <p class="text-lg">
        So let's start from the top and let's look at what's provided. Firstly, you will add a domain name to check and after that 
        you will see some data returned, let's break everything down to make it easier to understand what to do with it. 
    </p>
    <div class="flex flex-col gap-2">
        <p>Here's checking my domain name, for example:</p>
        <img src="/example-check.webp" alt="An example breakdown of Domain checker" class="max-w-[80%]">
    </div>
</section>
<section id="whois">
    <h2 class="text-2xl">Whois Explanation</h2>
    <p class="text-lg">
    First, we notice the Whois section, which is the first thing you should check if your website was working for a while and suddenly stopped.
    Whois is a protocol that allows you to check the information about the domain name, such as the owner, the registrar, the date of creation and etc.
    For this application, we don't need to know the owner or any other irrelavant information, but we do need to check if the domain is still active and not expired.
    Domains are usually registered on a yearly basis, so first check if "Created At" field is not older than a year, if it is, then the domain is most likely to be expired. 
    Most domains aren't deleted right away after it expires 
    (depends on the <a href="https://www.cloudflare.com/learning/dns/top-level-domain/" target="_blank" class="link">TLD</a>). 
</p>
<p class="text-lg">
    When a domain expires it usually goes into one of two phases, the first one is called "Redemption period",
    which is a period of time where the domain is still renewable, but will not be accessible and it will cost you a pretty penny to renew it
    while this depends on the registrar, how much the price will be, forst most domain TLDs it will be around 80$ USD. <br>
    Then there's the "Grace period", domains in grace are fine and can be renewed, but be vary as it needs to be done quick, as after that the domain will go into the dreaded "Redemption period",
    due to that fact the "Domain Status" field is provided in the checker to see what phase the domain is in. <br>

    Now, since I'm querying the actual Whois servers, the response from domain status is not always understandable. When you see a status and 
    do not know what it means, you can check out the official documentation provided by ICANN on
    <a href="https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en#" target="_blank" class="link">EPP Status code meanings</a>

    If this is still a bit difficult to understand Hostinger has an article on 
    <a href="https://support.hostinger.com/en/articles/3004042-what-happens-when-a-domain-expires" class="link" target="_blank">
        What happens when a domain expires?
    </a>
</p>
</section>
<section id="dns-zone">
    <h2 class="text-2xl">Dns Zone</h2>
    <p class="text-lg">
        Secondly there's the DNS zone. A DNS zone is a collection of DNS records that share the same domain name. When a DNS record is added, 
        it may not be shown here or in any DNS resolver. We will talk about this later (propagation).
        
        DNS records are used to point the domain name to some IP (every DNS record technically points to an IP, even if you see a name there).
        You can use this to check a DNS zone that you use, but do not own. A client asked to build some shoddy website on WordPress and they 
        swear on their life that they deffinately changed the nameservers. Instead of going through the pain and explanation on how they should take a 
        screenshot, you can just check this. 

        DNS record issues are the most common when trying to make a website work with the domain and it may not be explained perfectly in the platforms you use. 
        So here's some important things to check. Firstly, I'd like to divert your eyes to the Host field:
    </p>
    <img src="/Host-tab.webp" alt="Screenshot of the host tab">
    <p class="text-lg">
        Here you can see to what name does the DNS record belong to. One domain can have DNS records with different names, so if the host 
        only shows the vanilla domain without any www's or other names, it means that the DNS record is added to the 
        <span class="font-bold"> Root level </span>. <br>
        Records to the root level usually point the whole domain somwhere, so for example, if your hosting provider requires you to point 
        a domain to a specific IP for it to open the website in that host, you would add an A record to the root of that domain. <br>

        The root level of the domain is also, not always neccessarily shown as domain.tld, it can also be shown as @, which is just a shorthand.
    </p>
    <p class="text-lg">
        There's also subdomains, don't worry I'll explain it. <br>
        Subdomains are a part of the domain name that is added before the root level, for example, if you have a domain called example.com,
        the subdomain would be something like <span class="font-bold">www</span>.example.com. <br>

        Let's use this website as an example and check how does making the same request to the subdomain provide this information:
    </p>
    <img src="/Subdomain-info.webp" alt="">
    <p class="text-lg" id="subdomain">
        The first thing we notice is that the whois tab returns <span class="font-bold">Undefined</span>, this just simply means that the
        request resource is not in the whois database. And it shouldn't be, as the subdomain is created from the domain itself. <br>

        Now, the most important and potentially confusing thing is that the subdomain returns some DNS records as well. These records belong to
        the subdomain name and not the root level of the domain. So check the host, in this case the host returns 
        <span class="font-bold">codex</span>.kasparas.io, which means that when adding the DNS record the name or the host field was "codex".
        If you know what you're looking for, this is a great way to debug subdomain and mail server issues as some mail hosts will require 
        you to create an A record to mail.domain.tld as opposed to an MX record to the root. 
    </p>
</section>
<section id="propagation-tab">
    <h2 class="text-2xl">
        Propagation
    </h2>
    <p class="text-lg">
        Lastly there's the propagation tab. <br>
        It may look daunting at first, where there's a bunch of servers and a bunch of records with <span class="text-red-500">X</span>'s
        and <span class="text-green-500">V</span>'s <br>

        Understanding propagation is simple, Imagine the Domain Name System (DNS) as the internet's phonebook.
        It matches human-friendly domain names (like "example.com") to machine-friendly IP addresses (like 192.0.2.1)
        that computers use to identify each other on the network.
        When you make changes to your DNS records (like moving your website to a new IP address),
        this updated information has to be passed around the world to all the various servers that make up the DNS. <br>
        
        Let's see another example for more information:
    </p>
    <img src="/Propagation.webp" alt="">
    <p class="text-lg">
        On the left we see some IP's. These are public DNS resolvers that reference the domain name accross the Domain Name System. 
        On the right you will see the DNS records being returned from those public resolvers. If the record is returned, it means that the
        propagation has been completed, if it is not, it means that you will have to wait a bit before the resolver finds the DNS record. <br>
        If you've already waited for ~24/48 hours most likely it means that the hosts DNS zone is stuck. <br>

        A stuck DNS zone can sometimes happen, check your domain host to see if you can reset it, you can also delete and add the record again. 
        If you do not see any change, contact the hosts support team. 
    </p>
</section>
<style lang="postcss">
    img {
        max-width: 80%;
    }
    section {
        @apply border-y-4 border-secondary;
    }
    p {
        @apply text-slate-300 leading-8
    }
</style>