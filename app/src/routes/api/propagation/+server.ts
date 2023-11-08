import { SECRET_PROPAGATION_FIREBASE_URL } from "$env/static/private";
import { json } from "@sveltejs/kit";

export const GET = async ({url, fetch}) => {
    const host = url.searchParams.get("host");
    const type = url.searchParams.get("type");
    if(!host || !type) {
        return json("Domain name not provided", {status: 400})
    }
    try {
        const getPropagationRecords = await fetch(SECRET_PROPAGATION_FIREBASE_URL + `?host=${host}&type=${type}`);
        const propagationData = await getPropagationRecords.json();
        return json(propagationData);
    } catch (e) {
        return json((e as Error).message, {status: 500})
    }   
}