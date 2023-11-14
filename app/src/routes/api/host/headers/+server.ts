import { json } from '@sveltejs/kit';
interface Headers {
    [key: string]: string;
}

const analyzeHeaders = (headers:Headers) => {
    const analysis = [];
    if (headers['content-type']) {
        analysis.push(`The content type of this page is ${headers['content-type']}, which is typical for web pages.`);
    } else {
        analysis.push("This site doesn't specify a content type, which might cause display issues on some browsers.");
    }
    if (headers['content-encoding']) {
        analysis.push(`This page uses ${headers['content-encoding']} encoding for efficient data transmission.`);
    } else {
        analysis.push("No content encoding specified, which could affect page load performance.");
    }
    if (headers['server']) {
        analysis.push(`This website is hosted on a ${headers['server']} server.`);
    } else {
        analysis.push("Server information is not provided, which could be a security measure.");
    }
    if (headers['x-content-type-options'] === 'nosniff') {
        analysis.push("This site is protected against MIME type sniffing for enhanced security.");
    } else {
        analysis.push("The site lacks protection against MIME type sniffing, which could be a security risk.");
    }
    if (headers['x-frame-options']) {
        analysis.push(`This site sets frame options to ${headers['x-frame-options']}, which affects how it can be embedded in other sites.`);
    } else {
        analysis.push("No frame options are set, so this site could be embedded in frames on other sites.");
    }
    if (headers['x-xss-protection']) {
        analysis.push("This site has measures in place to protect against cross-site scripting (XSS) attacks.");
    } else {
        analysis.push("There's no explicit protection against XSS attacks, which might make the site vulnerable.");
    }
    return analysis;
}


export const GET = async ({fetch, url}) => {
    const host = url.searchParams.get('host');
    if (!host) {
        return json('No domain provided', {status: 400});
    }
    try {
    const req = await fetch(`https://${host}`);
    return json(analyzeHeaders(Object.fromEntries(req.headers)))
    } catch (e) {
        return json(e, {status: 500});
    }
}
