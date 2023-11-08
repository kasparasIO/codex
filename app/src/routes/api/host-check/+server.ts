import { json } from "@sveltejs/kit";
import {SECRET_FIREBASE_URL} from "$env/static/private";
export const GET = async ({url, fetch}) => {
    const paramData = url.searchParams.get("host");
    if(!paramData) {
        return json("Domain name not provided", {status: 400})
    }
    try {
    const getDnsRecords = await fetch(SECRET_FIREBASE_URL + `?domain=${paramData}`);
    const data = await getDnsRecords.json();
    const response = {
        domain_name: paramData,
        dns_lookup: data
    };
    return json(response);
    } catch (e) {
        return json((e as Error).message, {status: 500})
    }
}