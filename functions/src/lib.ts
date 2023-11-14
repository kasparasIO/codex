import type {DNSResponse} from "./types";
// eslint-disable-next-line
//@ts-ignore
import * as nativeDns from "native-dns";
import {XMLParser} from "fast-xml-parser";

export const getWhoisResKey = (whoisRes: any, queryString: string) => {
  for (const key in whoisRes) {
    if (whoisRes[key] && whoisRes[key][queryString]) {
      return whoisRes[key][queryString];
    }
  }
};

export const queryDns = (domain: string, recordType: string) => {
  const dnsServers = [
    "8.8.8.8", // Google Public DNS
    "8.8.4.4", // Google Public DNS
    "1.1.1.1", // Cloudflare
    "1.0.0.1", // Cloudflare
    "208.67.222.222", // OpenDNS
    "208.67.220.220", // OpenDNS
    "9.9.9.9", // Quad9
    "149.112.112.112", // Quad9
  ];

  return Promise.all(dnsServers.map((server) => {
    return new Promise((resolve, reject) => {
    // eslint-disable-next-line
      const question = nativeDns.Question({
        name: domain,
        type: recordType,
      });
      // eslint-disable-next-line
      const req = nativeDns.Request({
        question,
        server,
        timeout: 1000,
      });
      req.on("timeout", () => {
        reject(new Error("Timeout in making request"));
      });
      req.on("message", (err: Error|null, answer: DNSResponse) => {
        if (err) reject(err);
        resolve({server, response: answer});
      });

      req.send();
    });
  }));
};

export const getSitemap = async (domain: string) => {
  if (!domain) {
    throw new Error("Domain not found!");
  }
  const parser = new XMLParser();
  const res = await fetch(`https://${domain}/robots.txt`);
  const content = await res.text();

  if (!content) {
    throw new Error("no content");
  }
  const sitemapSelector = content.match(/^Sitemap:\s*(.+?)(?=\n|$)/im);
  if (!sitemapSelector) {
    throw new Error("Sitemap not provided");
  }

  const sitemapUrl = sitemapSelector[1].trim();
  const sitemapResponse = await fetch(sitemapUrl);
  const sitemapContent = await sitemapResponse.text();

  const jsonObj = parser.parse(sitemapContent);
  if (jsonObj && jsonObj.sitemapindex && jsonObj.sitemapindex.sitemap) {
  // If there's only one sitemap, wrap it in an array for consistent handling
    const sitemaps = Array.isArray(jsonObj.sitemapindex.sitemap)?
      jsonObj.sitemapindex.sitemap: [jsonObj.sitemapindex.sitemap];

    return sitemaps.map((sitemapObj: any) => sitemapObj.loc);
  } else if (jsonObj && jsonObj.urlset && jsonObj.urlset.url) {
  // If there's only one URL, wrap it in an array for consistent handling
    const urls = Array.isArray(jsonObj.urlset.url) ? jsonObj.urlset.url:
      [jsonObj.urlset.url];

    return urls.map((urlObj: any) => urlObj.loc);
  }
  throw new Error("Error parsing the sitemap XML");
};
