/* eslint-disable linebreak-style */
import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
import type {DNSRecord, WhoisRes} from "./types";
import {getWhoisResKey, queryDns, getSitemap} from "./lib";
import * as dns from "dns";


setGlobalOptions({maxInstances: 10});

export const dnsCheck = onRequest((request, response) => {
  const domain = request.query.domain as string;
  const recordTypes = ["A", "AAAA", "NS", "TXT", "CNAME", "MX"];
  const domainRecords: DNSRecord[] = [];
  let lookupCount = 0;
  if (!domain) {
    response.status(400).send("Domain query parameter is required.");
    return;
  }
  recordTypes.forEach((recordType) => {
    dns.resolve(domain, recordType as string, (err, records) => {
      lookupCount++;
      domainRecords.push({
        recordType,
        records,
      });
      if (lookupCount === recordTypes.length) {
        response.send(domainRecords);
      }
    });
  });
});

export const whois = onRequest(async (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whoiser = require("whoiser");
  const queryStrings = ["Updated Date", "Created Date", "Expiry Date",
    "Domain Status", "Registrar"];
  const domain = request.query.domain as string;
  if (!domain) {
    response.status(400).send("Domain query parameter is required.");
    return;
  }
  try {
    const data = await whoiser(domain);
    const res:WhoisRes = {};
    queryStrings.forEach((queryString) => {
      const attr = getWhoisResKey(data, queryString);
      if (attr) {
        res[queryString] = attr;
      }
    });
    response.send(res);
  } catch (e) {
    response.status(500).send((e as Error).message);
  }
});
export const propagation = onRequest(async (request, response) => {
  const domain = request.query.domain as string;
  const type = request.query.type as string;
  if (!domain || !type) {
    response.status(400).send("Domain and type query parameters are required.");
    return;
  }
  const dnsRes = await queryDns(domain, type);
  // eslint-disable-next-line
 // @ts-ignore
  const res = dnsRes.map(({server, response}) => {
    const answer = response.answer;
    return {
      server,
      answer,
    };
  });
  response.send(res);
});

export const checkHostSpeed = onRequest(async (request, response) => {
  const domain = request.query.domain as string;
  if (!domain) {
    response.status(400).send("Domain query parameter is required.");
    return;
  }
  try {
    const startTime = performance.now();
    const res = await fetch(`https://${domain}`);
    if (!res.ok) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      response.send({
        status: "Did not respond",
        duration,
      });
    }
    const endTime = performance.now();
    const duration = endTime - startTime;
    response.send({
      status: "Responded",
      duration,
    });
  } catch (e) {
    response.status(500).send((e as Error).message);
  }
});

export const fetchSitemap = onRequest(async (request, response) => {
  const targetURL = request.query.domain as string;
  if (!targetURL) {
    response.status(400).send("No target found");
  }
  try {
    const sitemap = await getSitemap(targetURL);
    response.send(sitemap);
  } catch (e) {
    response.status(500).send({error: (e as Error).message});
  }
});
