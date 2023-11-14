import { json } from "@sveltejs/kit";
import {SECRET_DNS_FIREBASE_URL} from "$env/static/private";
import { SECRET_WHOIS_FIREBASE_URL } from "$env/static/private";
import { domainValidation } from "$lib/utils.js";

export const POST = async ({url, fetch}) => {
    const host = url.searchParams.get("host");
    if(!host) {
        return json("Domain name not provided", {status: 400})
    }
    if(domainValidation.test(host) === false) {
        return json("Invalid domain name", {status: 400})
    }
    try {
    const getDnsRecords = await fetch(SECRET_DNS_FIREBASE_URL + `?domain=${host}`);
    const getWhoisRecords = await fetch(SECRET_WHOIS_FIREBASE_URL + `?domain=${host}`);
    const [dnsData, whoisData] = await Promise.all([getDnsRecords.json(), getWhoisRecords.json()]);
    return json({
        domain_name: host,
        dns_lookup: dnsData,
        whois: whoisData
    });
    } catch (e) {
        return json((e as Error).message, {status: 500})
    }
}