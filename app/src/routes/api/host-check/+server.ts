import { json } from "@sveltejs/kit";
import {SECRET_DNS_FIREBASE_URL} from "$env/static/private";
import { SECRET_WHOIS_FIREBASE_URL } from "$env/static/private";



export const GET = async ({url, fetch}) => {
    const paramData = url.searchParams.get("host");
    if(!paramData) {
        return json("Domain name not provided", {status: 400})
    }
    try {
    const getDnsRecords = await fetch(SECRET_DNS_FIREBASE_URL + `?domain=${paramData}`);
    const getWhoisRecords = await fetch(SECRET_WHOIS_FIREBASE_URL + `?domain=${paramData}`);
    const [dnsData, whoisData] = await Promise.all([getDnsRecords.json(), getWhoisRecords.json()]);
    const response = {
        domain_name: paramData,
        dns_lookup: dnsData,
        whois: whoisData
    };
    return json(response);
    } catch (e) {
        return json((e as Error).message, {status: 500})
    }
}