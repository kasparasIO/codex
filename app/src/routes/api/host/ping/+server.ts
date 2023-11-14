import { SECRET_CHECK_FIREBASE_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST = async ({url, fetch}) => { 
    const host = url.searchParams.get('host');
    if (!host) {
        return json('No domain provided', {status: 400});
    }
    try {
    const req = await fetch(`${SECRET_CHECK_FIREBASE_URL}/?domain=${host}`);
    const res = await req.json();
    return json(res);
    } catch (e) {
        return json(e, {status: 500});
    }
}
