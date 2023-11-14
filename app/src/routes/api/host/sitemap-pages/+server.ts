import { json } from "@sveltejs/kit";

export const GET = async ({ fetch, url }) => {
    const domain = url.searchParams.get('host');
    if (!domain) {
        return json('No domain provided', {status: 400});
    }
    try {
        const req = await fetch(`http://localhost:5000/codex-cb91f/us-central1/fetchSitemap?domain=${domain}`);
        const res: string[] = await req.json();
        const paths: string[] = [];
        res.forEach((fullUrl) => {
            const path = fullUrl.replace(`https://${domain}`, '').replace(`http://${domain}`, '')
            .replace(`https://www.${domain}`, '')
            .replace(`http://www.${domain}`, '');
            paths.push(path);
        });
        return json(paths);
    } catch (e) {
        return json(e, {status: 500});
    }
};
