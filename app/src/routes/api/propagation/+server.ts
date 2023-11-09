import { SECRET_PROPAGATION_FIREBASE_URL } from "$env/static/private";
import { json } from "@sveltejs/kit";

export const GET = async ({url, fetch}) => {
    const domain = url.searchParams.get("host");
    const type = url.searchParams.get("type");
    if(!domain || !type) {
        return json("Domain name not provided", {status: 400})
    }
    try {
        const getPropagationRecords = await fetch(SECRET_PROPAGATION_FIREBASE_URL + `?domain=${domain}&type=${type}`);
        const propagationData = await getPropagationRecords.json();
        console.log(propagationData);
        return json({
            type: type,
            results: propagationData});
    } catch (e) {
        console.log(e)
        return json((e as Error).message, {status: 500})
    }   
}