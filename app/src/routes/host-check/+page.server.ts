import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch, url }) => {
    const host = url.searchParams.get("host");
    if (host) {
        const req = await (await fetch(`/api/host?host=${host}`, { method: "POST" })).json();
        return {
            paramData: req,
        }
    }
}